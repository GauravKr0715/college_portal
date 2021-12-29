const section_repo = require('../models/section_repo');
const faculty_repo = require('../models/faculty_repo');
const subject_repo = require('../models/subject_repo');
const department_repo = require('../models/department_repo');
const faculty_controller = require('../controllers/faculty');
const logger = require('../helpers/logger');
const { default_section_time_table } = require('../global/data');
const student_repo = require('../models/student_repo');

const addDetails = async (details) => {
  try {
    details.time_table = default_section_time_table;
    const data = await section_repo.add(details);

    return {
      success: true,
      message: 'Section Added Successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getSectionDetails = async (uid) => {
  try {
    const section_data = await section_repo.fetchOne({ uid });
    const dept_data = await department_repo.fetchOneCertainFields("name", {
      code: section_data.dept
    });
    let data = {};
    data.name = section_data.name;
    data.classes = section_data.classes;
    data.time_table = section_data.time_table;
    data.year = section_data.year;
    data.dept_name = dept_data.name;
    data.dept_code = section_data.dept;

    return {
      success: true,
      message: 'Data retrived successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const getFacultiesAndSubjectsList = async (uid) => {
  try {
    const section_data = await section_repo.fetchCertainFieldsByCondition("dept year", {
      uid
    });
    console.log(section_data);
    let sem1 = ((section_data.year - 1) * 2) + 1;
    let sem2 = ((section_data.year - 1) * 2) + 2;
    const faculty_data = await faculty_repo.fetchAllCertainFields("uni_id full_name dept", {});
    console.log(faculty_data);
    const subject_data = await subject_repo.fetchAllOrConditions(
      [
        { sem: sem1 },
        { sem: sem2 }
      ]);
    console.log(subject_data);
    return {
      success: true,
      message: 'Data retrived successfully',
      faculty_data,
      subject_data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getEligibleStudentsForSection = async (yop) => {
  try {
    const data = await student_repo.fetchAllByConditionCertainFields("roll_no full_name course", {
      yop, section: null
    });

    let final_result = data.map(student => {
      return {
        ...student._doc,
        id: student.roll_no
      }
    })

    return {
      success: true,
      message: 'List retrieved Successfully',
      eligible_students: final_result
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const addClasses = async (classes, uid) => {
  try {
    const section_data = await section_repo.fetchCertainFieldsByCondition("name", { uid });
    console.log(section_data);
    console.log(classes);
    let intermediate_array = classes.map(async (c) => {
      await faculty_repo.updateDetailsByPush({
        class_id: c.class_id,
        subject_id: c.subject_id,
        subject_name: c.subject_name,
        subject_type: c.subject_type,
        section: section_data.name,
      }, {
        uni_id: c.faculty_id
      }, 'classes');
      await section_repo.updateDetailsByPush(c, { uid }, "classes");
    });


    await Promise.all(intermediate_array);

    return {
      success: true,
      message: 'Classes added successfully',
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const updateTimeTable = async (time_table, uid) => {

  try {

    // for each changed slot, update that slot for prev teacher (if exists) and then update new value to new teacher
    const data = await section_repo.fetchCertainFieldsByCondition("time_table name", { uid });
    let old_time_table = data.time_table;
    // console.log(data.time_table[0][0]);
    // console.log(time_table);

    let outer_array = time_table.map(async (day) => {
      let inner_array = day.map(async (slot) => {
        if (slot.is_changed) {
          delete (slot.is_changed)
          // get old teacher for that slot and update their slot, if exists
          let slot_id = slot.slot_id;
          let day_idx = +slot_id.substring(1, 2) - 1;
          let slot_idx = +slot_id.substring(3, 4) - 1;
          console.log(`day_idx: ${day_idx} and slot_idx: ${slot_idx}`);
          console.log(old_time_table[day_idx][slot_idx].faculty_id);
          // check old time table slot and if teacher exists, update it's slot to be free
          if (old_time_table[day_idx][slot_idx].faculty_id != "UND123") {
            console.log('why are we in here?')
            let old_faculty_id = old_time_table[day_idx][slot_idx].faculty_id;
            let free_slot = {
              slot_id: old_time_table[day_idx][slot_idx].slot_id,
              class_id: "ABC123",
              subject_id: "UND123",
              subject_name: "Unalloted",
              subject_type: 0,
              section: "ABCXYZ"
            }
            await faculty_controller.updateSlot(old_faculty_id, free_slot, day_idx, slot_idx);
          }
          // update slot for new teacher
          if (slot.faculty_id != "UND123") {
            let new_faculty_id = slot.faculty_id;
            let updated_slot = {
              slot_id: slot.slot_id,
              class_id: slot.class_id,
              subject_id: slot.subject_id,
              subject_name: slot.subject_name,
              subject_type: slot.subject_type,
              section: `${data.name}`
            }
            await faculty_controller.updateSlot(new_faculty_id, updated_slot, day_idx, slot_idx);
          }
        }
      });

      let inner_promise_resolve = await Promise.all(inner_array);

    })


    let outer_promise_resolve = await Promise.all(outer_array);
    // set time table for the section - last step
    await section_repo.update({ time_table }, { uid });

    return {
      success: true,
      message: `Time table updated successfully`
    };

  } catch (error) {
    logger.error(error);
    throw error;
  }


  return
};

const getAllForAdmin = async (dept) => {
  try {
    const sections_data = await section_repo.getAllWithCondition({
      dept
    });
    sections_data.sort((a, b) => {
      return a.year - b.year
    })

    return {
      success: true,
      message: 'Sections Retrived successfully',
      final_result: {
        sections_data,
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const saveStudentsForSection = async (details, uid) => {
  try {
    const section_data = await section_repo.fetchCertainFieldsByCondition("name", { uid });

    const inter_array = details.selected_students.map(async r_no => {
      await student_repo.updateOne({
        section: section_data.name
      }, {
        roll_no: r_no
      });
    });

    await Promise.all(inter_array);

    return {
      success: true,
      message: 'Students added succefully'
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  getSectionDetails,
  getFacultiesAndSubjectsList,
  getEligibleStudentsForSection,
  addDetails,
  addClasses,
  updateTimeTable,
  getAllForAdmin,
  saveStudentsForSection
}
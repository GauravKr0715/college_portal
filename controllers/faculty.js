const faculty_repo = require('../models/faculty_repo');
const student_repo = require('../models/student_repo');
const attendance_repo = require('../models/attendance_repo');
const department_repo = require('../models/department_repo');
const section_repo = require('../models/section_repo');
const logger = require('../helpers/logger');
const util = require('../helpers/utils');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { default_time_table, days_map } = require('../global/data');

const addDetails = async (details) => {
  try {
    const user_exisits = await faculty_repo.fetchOneOrConditions([{ uni_id: details.uni_id }, { email: details.email }]);

    if (user_exisits.length) {
      return {
        success: false,
        message: 'User already exists'
      }
    }
    details.display_password = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(15);
    details.password = await bcrypt.hash(details.display_password, salt);
    details.time_table = default_time_table;

    const data = await faculty_repo.add(details);

    return {
      success: true,
      message: 'Added Successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getBasicDetails = async (uni_id) => {
  try {
    let data = await faculty_repo.fetchOneCertainFields("uni_id full_name dept time_table classes links -_id", { uni_id });

    let final_result = {};
    final_result.time_table = data.time_table;
    final_result.links = data.links;
    let todays_time_table = [];
    let class_ids = data.classes.map(c => c.class_id);
    let day_idx = days_map[moment().format("dddd")];

    if (moment().format('dddd') !== 'Sunday') {
      for (let i = 0; i < data.time_table[day_idx].length; i++) {
        let current_slot = data.time_table[day_idx][i]._doc;
        current_slot = {
          ...current_slot,
          link: null
        };
        // console.log(current_slot);
        if (class_ids.includes(current_slot.class_id) && data.classes.filter(c => c.class_id === current_slot.class_id)[0].link.uid !== undefined) {
          current_slot = {
            ...current_slot,
            link: data.classes.filter(c => c.class_id === current_slot.class_id)[0].link
          };
        }
        todays_time_table.push(current_slot);
      }
    }
    final_result.todays_time_table = todays_time_table;

    // let result = data._doc;

    // if (moment().format("dddd") !== 'Sunday') {
    //   let day_idx = days_map[moment().subtract(5, 'days').format("dddd")];
    //   let todays_time_table = [];
    //   // let todays_time_table = data.time_table[day_idx];
    //   let class_ids = data.classes.map(c => c.class_id);
    //   for (let i = 0; i < result.time_table[day_idx].length; i++) {
    //     let current_slot = result.time_table[day_idx][i];
    //     current_slot = {
    //       ...current_slot,
    //       link: null
    //     }
    //     // console.log(current_slot);
    //     if (class_ids.includes(current_slot.class_id)) {
    //       let class_obj = result.classes.filter(c => c.class_id === current_slot.class_id)[0];
    //       console.log(class_obj);
    //       console.log(class_obj.link.url);
    //       console.log(Object.keys(class_obj.link).length);
    //       if (Object.keys(class_obj.link).length !== 0) {
    //         current_slot.link = class_obj.link;
    //         console.log('---------------------------------------------------------------');
    //         console.log(class_obj);
    //         console.log(current_slot);
    //         console.log('---------------------------------------------------------------');
    //       }
    //     }
    //     // console.log(current_slot);
    //     todays_time_table.push(current_slot);
    //   }
    //   console.log(todays_time_table);
    //   result.todays_time_table = todays_time_table;
    // }
    // console.log(result);

    console.log(final_result);

    return {
      success: true,
      message: 'Data retrived successfully',
      final_result
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const updateSlot = async (faculty_id, new_slot, day_idx, slot_idx) => {
  try {
    console.log('updating for faculty:' + faculty_id);
    let faculty_detail = await faculty_repo.fetchOne({ uni_id: faculty_id });
    console.log(faculty_detail)
    faculty_detail.time_table[day_idx][slot_idx] = new_slot;
    await faculty_detail.save();
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const validateUser = async (details) => {
  try {
    console.log(details);
    const user_exists_res = await faculty_repo.fetchOne({
      uni_id: details.uni_id
    });
    console.log(user_exists_res);
    if (user_exists_res) {
      // correct user id
      const pass_check = await bcrypt.compare(details.password, user_exists_res.password);
      if (pass_check) {
        // correct password - authentication successful

        const token = util.getToken({
          user_id: details.uni_id,
          is_faculty: true
        });

        return {
          success: true,
          message: 'Logged In successfully',
          token: token
        }
      } else {
        return {
          success: false,
          message: 'Invalid User ID or password. Try Again'
        };
      }
    } else {
      // incorrect user id
      return {
        success: false,
        message: 'Invalid User ID or password. Try Again'
      };
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getClassesForAttendance = async (uni_id) => {
  try {
    const faculty_details = await faculty_repo.fetchOneCertainFields("time_table classes -_id", { uni_id });

    // let day_idx = days_map[moment().subtract(3, 'days').format("dddd")];
    let day_idx = days_map[moment().format("dddd")];
    let todays_time_table = faculty_details.time_table[day_idx];
    // console.log(todays_time_table);
    let final_data = [];
    let inter_array = todays_time_table.map(async c => {
      if (c.class_id !== 'ABC123') {
        // valid class here
        let new_obj = {};
        new_obj.class_id = c.class_id;
        new_obj.subject_name = c.subject_name;
        new_obj.section = c.section;
        let student_list = await student_repo.fetchAllByCondition({
          section: c.section
        });
        // let todays_date = moment().subtract(3, 'days').format('DD-MM-yyyy');
        let todays_date = moment().format("dddd");
        let present_students = await attendance_repo.fetchOneAndConditions(
          { date: todays_date, class_id: c.class_id });
        // console.log(present_students);
        new_obj.all_students = student_list.map(student => {
          return {
            roll_no: student.roll_no,
            name: student.full_name,
            is_present: present_students ? present_students.present_students.some(r_no => r_no === student.roll_no) : false
          }
        });
        // console.log(new_obj);
        final_data.push(new_obj);
      }
    });

    await Promise.all(inter_array);
    console.log(final_data);
    return final_data;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getClasses = async (uni_id) => {
  try {
    const data = await faculty_repo.fetchOneCertainFields("classes", { uni_id });
    return {
      success: true,
      message: 'Classes retrieved successfully',
      data
    };
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getProfileDetails = async (uni_id) => {
  try {
    const data = await faculty_repo.fetchOneCertainFields("uni_id full_name email mobile dept yoj classes", { uni_id });
    console.log(uni_id);
    console.log(data);

    return {
      success: true,
      message: 'Faculty data retrieved successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const addNewLink = async (details, class_id, uni_id) => {
  try {
    const faculty_data = await faculty_repo.fetchOne({ uni_id });
    faculty_data.links.push(details);
    faculty_data.classes = faculty_data.classes.map(c => {
      if (c.class_id === class_id) {
        c.link = details;
        return c;
      } else {
        return c;
      }
    });
    await faculty_data.save();

    const section_data = await section_repo.fetchOne({ 'classes.class_id': class_id });
    section_data.classes = section_data.classes.map(c => {
      if (c.class_id === class_id) {
        c.link = details;
        return c;
      } else {
        return c;
      }
    });

    await section_data.save();
    return {
      success: true,
      message: 'Link added successfully'
    }

  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const applyLink = async (link, class_id, uni_id) => {
  try {
    const faculty_data = await faculty_repo.fetchOne({ uni_id });
    faculty_data.classes = faculty_data.classes.map(c => {
      if (c.class_id === class_id) {
        c.link = link;
        return c;
      } else {
        return c;
      }
    });
    await faculty_data.save();

    const section_data = await section_repo.fetchOne({ 'classes.class_id': class_id });
    section_data.classes = section_data.classes.map(c => {
      if (c.class_id === class_id) {
        c.link = link;
        return c;
      } else {
        return c;
      }
    });

    await section_data.save();
    return {
      success: true,
      message: 'Link applied successfully'
    }

  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const removeLinkFromClass = async (class_id, uni_id) => {
  try {
    const faculty_data = await faculty_repo.fetchOne({ uni_id });
    faculty_data.classes = faculty_data.classes.map(c => {
      if (c.class_id === class_id) {
        c.link = null;
        return c;
      } else {
        return c;
      }
    });
    await faculty_data.save();

    const section_data = await section_repo.fetchOne({ 'classes.class_id': class_id });
    section_data.classes = section_data.classes.map(c => {
      if (c.class_id === class_id) {
        c.link = null;
        return c;
      } else {
        return c;
      }
    });

    await section_data.save();
    return {
      success: true,
      message: 'Link removed successfully'
    }

  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const getFacultyByID = async (uni_id) => {
  try {
    const data = await faculty_repo.fetchOneCertainFields("uni_id full_name email mobile dept yoj", {
      uni_id
    });
    let faculty_data = {};
    if (data) {
      faculty_data.uni_id = data.uni_id;
      faculty_data.full_name = data.full_name;
      faculty_data.email = data.email;
      faculty_data.mobile = data.mobile;
      faculty_data.dept = data.dept;
      faculty_data.yoj = data.yoj;
      const dept_data = await department_repo.fetchOneCertainFields("name", {
        code: faculty_data.dept
      });
      faculty_data.dept_name = dept_data.name;
      return {
        success: true,
        message: 'Data retrived succeffully',
        faculty_data
      }
    }
    return {
      success: false,
      message: 'No Faculty found. Try again with different ID',
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getSimplifiedUser = async (uni_id) => {
  try {
    const data = await faculty_repo.fetchOneCertainFields("full_name", { uni_id });
    // console.log(data);
    if (data) {
      return {
        id: uni_id,
        name: data._doc.full_name
      }
    } else {
      return {
        id: null,
        name: null
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getTimeTable = async (uni_id) => {
  try {
    const data = await faculty_repo.fetchOneCertainFields("time_table", { uni_id });
    console.log(uni_id);
    console.log(data);

    return {
      success: true,
      message: 'Faculty timetable retrieved successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  addDetails,
  getBasicDetails,
  updateSlot,
  validateUser,
  getClasses,
  getClassesForAttendance,
  getProfileDetails,
  addNewLink,
  applyLink,
  removeLinkFromClass,
  getFacultyByID,
  getSimplifiedUser,
  getTimeTable
}
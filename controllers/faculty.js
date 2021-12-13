const faculty_repo = require('../models/faculty_repo');
const student_repo = require('../models/student_repo');
const attendance_repo = require('../models/attendance_repo');
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
    let day_idx = days_map[moment().subtract(5, 'days').format("dddd")];

    if(moment().format('dddd') !== 'Sunday') {
      for (let i = 0; i < data.time_table[day_idx].length; i++) {
        let current_slot = data.time_table[day_idx][i]._doc;
        current_slot = {
          ...current_slot,
          link: null
        };
        if(class_ids.includes(current_slot.class_id)) {
          console.log(data.classes.filter(c => c.class_id === current_slot.class_id)[0]);
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
    let day_idx = days_map[moment().subtract(2, 'days').format("dddd")];
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
        let todays_date = moment().subtract(2, 'days').format('DD-MM-yyyy');
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
}

module.exports = {
  addDetails,
  getBasicDetails,
  updateSlot,
  validateUser,
  getClasses,
  getClassesForAttendance
}
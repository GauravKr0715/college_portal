const faculty_repo = require('../models/faculty_repo');
const student_repo = require('../models/student_repo');
const admin_repo = require('../models/admin_repo');
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
    let day_idx = days_map[moment().format("dddd")];

    if (moment().format('dddd') !== 'Sunday') {
      for (let i = 0; i < data.time_table[day_idx].length; i++) {
        let current_slot = data.time_table[day_idx][i]._doc;
        current_slot = {
          ...current_slot,
          link: null
        };
        if (class_ids.includes(current_slot.class_id)) {
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



const validateUser = async (details) => {
  try {
    console.log(details);
    const user_exists_res = await admin_repo.fetchOne({
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
          is_admin: true
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

module.exports = {
  addDetails,
  getBasicDetails,
  validateUser,
  getProfileDetails
}
const student_repo = require('../models/student_repo');
const section_repo = require('../models/section_repo');
const logger = require('../helpers/logger');
const bcrypt = require('bcryptjs');
const csv = require('csvtojson');
const util = require('../helpers/utils');
const { registerValidation, loginValidation } = require("../validators/studentValidator");
const moment = require('moment');
const { json } = require('express');
const { default_time_table, days_map } = require('../global/data');

const addDetails = async (details) => {
  try {
    console.log(details);
    const user_exisits = await student_repo.fetchOneOrConditions([{ roll_no: details.roll_no }, { email: details.email }]);

    if (user_exisits.length) {
      return {
        success: false,
        message: 'User already exists'
      }
    }
    details.display_password = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(15);
    details.password = await bcrypt.hash(details.display_password, salt);
    details.createdAt = Math.floor(Date.now() / 1000);
    const data = await student_repo.add(details);

    return {
      success: true,
      message: 'Student Added Successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const saveAllStudents = async (path) => {
  console.log(path);
  let options = {
    headers: ['roll_no', 'full_name', 'email', 'mobile', 'course', 'yop'],
    trim: true,
    colParser: {
      'roll_no': 'string',
      'full_name': 'string',
      'email': 'string',
      'mobile': 'string',
      'course': 'string',
      'yop': 'string'
    }
  };

  try {
    const jsonObj = await csv(options).fromFile(path);
    let intermediate_array = jsonObj.map(async (student) => {
      console.log(student);
      const { error } = registerValidation(student);
      if (error) return;
      const user_exisits = await student_repo.fetchOneOrConditions([{ roll_no: student.roll_no }, { email: student.email }]);
      console.log(user_exisits);

      if (user_exisits.length) {
        return {
          success: false,
          message: 'User already exists'
        }
      }
      student.display_password = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(15);
      student.password = await bcrypt.hash(student.display_password, salt);
      student.createdAt = Math.floor(Date.now() / 1000);

      const data = await student_repo.add(student);

    });

    console.log(intermediate_array);
    let student_data = await Promise.all(intermediate_array);
    console.log(student_data);
  } catch (error) {
    logger.error(error);
    throw error;
  }

}

const updateDetails = async (details, condition) => {
  try {
    const data = await department_repo.update(details, condition);

    return {
      success: true,
      message: 'Updated Successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
const validateUser = async (details) => {
  try {
    console.log(details);
    const user_exists_res = await student_repo.fetchOne({
      roll_no: details.roll_no
    });
    console.log(user_exists_res);
    if (user_exists_res) {
      // correct user id
      const pass_check = await bcrypt.compare(details.password, user_exists_res.password);
      if (pass_check) {
        // correct password - authentication successful

        const token = util.getToken({
          user_id: details.roll_no,
          is_student: true
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


const addSubjects = async (details, condition) => {
  try {
    const data = await department_repo.updateSubjects(details, condition);

    return {
      success: true,
      message: 'Updated Successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
const getBasicDetails = async (roll_no) => {
  try {
    let student_data = await student_repo.fetchOneCertainFields("roll_no full_name section ", { roll_no });
    let section_data = await section_repo.fetchCertainFieldsByCondition("time_table classes ", { name: student_data.section })

    let result = {};
    result.roll_no = student_data.roll_no
    result.full_name = student_data.full_name
    result.section = student_data.section
    result.time_table = section_data.time_table
    result.classes = section_data.classes
    let todays_time_table = [];
    let class_ids = section_data.classes.map(c => c.class_id);
    let day_idx = days_map[moment().format("dddd")];

    if (moment().format('dddd') !== 'Sunday') {
      for (let i = 0; i < section_data.time_table[day_idx].length; i++) {
        let current_slot = section_data.time_table[day_idx][i]._doc;
        current_slot = {
          ...current_slot,
          link: null
        };
        // console.log(current_slot);
        if (class_ids.includes(current_slot.class_id) && section_data.classes.filter(c => c.class_id === current_slot.class_id)[0].link.uid !== undefined) {
          current_slot = {
            ...current_slot,
            link: section_data.classes.filter(c => c.class_id === current_slot.class_id)[0].link
          };
        }
        todays_time_table.push(current_slot);
      }
    }
    result.todays_time_table = todays_time_table;

    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const getClasses = async (roll_no) => {
  try {
    const data = await student_repo.fetchOneCertainFields("classes", { roll_no });
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
const getProfileDetails = async (roll_no) => {
  try {
    const details = await student_repo.fetchOneCertainFields("roll_no full_name email mobile course yop section", { roll_no });
    const data = await section_repo.fetchCertainFieldsByCondition("classes", { name: details.section });
    console.log(roll_no);
    console.log(data);
    let result = {};
    result.roll_no = details.roll_no
    result.full_name = details.full_name
    result.section = details.section
    result.email = details.email
    result.mobile = details.mobile
    result.course = details.course
    result.yop = details.yop

    result.classes = data.classes



    return {
      success: true,
      message: 'Student data retrieved successfully',
      result
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const getStudentByID = async (roll_no) => {
  try {
    const student_data = await student_repo.fetchOneCertainFields("roll_no full_name section email mobile course yop", {
      roll_no
    });
    if (student_data) {
      return {
        success: true,
        message: 'Data retrived succeffully',
        student_data
      }
    }
    return {
      success: false,
      message: 'No student found. Try again with different ID',
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getSimplifiedUser = async (roll_no) => {
  try {
    const data = await student_repo.fetchOneCertainFields("full_name", { roll_no });
    if (data) {
      return {
        id: roll_no,
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
}

module.exports = {
  addDetails,
  saveAllStudents,
  updateDetails,
  validateUser,
  addSubjects,
  getBasicDetails,
  getClasses,
  getProfileDetails,
  getStudentByID,
  getSimplifiedUser
}
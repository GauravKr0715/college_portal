const test_repo = require('../models/test_repo');
const faculty_repo = require('../models/faculty_repo');
const logger = require('../helpers/logger');
const moment = require('moment');

const getAllByFaculty = async (faculty_id) => {
  try {
    let data = await test_repo.getAll("-id", { faculty_id });
    let fac_data = await faculty_repo.fetchOneCertainFields("full_name classes", { uni_id: faculty_id });
    delete (fac_data._id);
    let final_result = {
      test_data: data,
      faculty_data: fac_data
    }
    return {
      success: true,
      message: 'Tests fetched successfully',
      final_result
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const addTest = async (details, uni_id) => {
  try {
    const faculty_details = await faculty_repo.fetchOneCertainFields("full_name", { uni_id });
    details.faculty_id = uni_id;
    details.faculty_name = faculty_details.full_name;

    await test_repo.add(details);
    return {
      success: true,
      message: 'Test added successfully'
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
}

module.exports = {
  getAllByFaculty,
  addTest
}
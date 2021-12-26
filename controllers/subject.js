const subject_repo = require('../models/subject_repo');
const department_repo = require('../models/department_repo');
const logger = require('../helpers/logger');

const addDetails = async (details) => {
  try {
    const data = await subject_repo.add(details);

    return {
      success: true,
      message: 'Subject Added Successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const getAllForAdmin = async (dept) => {
  try {
    const subjects_data = await subject_repo.getAllWithCondition({
      dept
    });
    subjects_data.sort((a, b) => {
      if (a.sem === b.sem)
        return a.type - b.type
      else return a.sem - b.sem
    })

    return {
      success: true,
      message: 'Subjects Retrived successfully',
      final_result: {
        subjects_data,
      }
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const updateDetails = async (details, condition) => {
  try {
    const data = await subject_repo.update(details, condition);

    return {
      success: true,
      message: 'Updated Successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  addDetails,
  updateDetails,
  getAllForAdmin
}
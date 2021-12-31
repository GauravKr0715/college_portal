const feed_repo = require('../models/feed_repo');
const student_repo = require('../models/student_repo');
const logger = require('../helpers/logger');

const getFeedForStudent = async (roll_no, page_no) => {
  try {
    const student_details = await student_repo.fetchOneCertainFields("section", {
      roll_no
    });

    const data = await feed_repo.fetchAllWithPagination({
      $or: [
        { to: roll_no },
        { to: student_details.section }
      ]
    }, (page_no - 1) * 5);

    console.log(data);

    return {
      success: true,
      message: 'Data retrieved Successfully',
      data
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  getFeedForStudent
}
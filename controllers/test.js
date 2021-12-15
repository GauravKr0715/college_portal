const test_repo = require('../models/test_repo');
const test_submission_repo = require('../models/test_submission_repo');
const faculty_repo = require('../models/faculty_repo');
const section_repo = require('../models/section_repo');
const student_repo = require('../models/student_repo');
const logger = require('../helpers/logger');
const moment = require('moment');

const getAllByFaculty = async (faculty_id) => {
  try {
    let data = await test_repo.getAll("-id", { faculty_id });
    let fac_data = await faculty_repo.fetchOneCertainFields("full_name classes", { uni_id: faculty_id });
    delete (fac_data._id);
    let final_result = {
      test_data: data.sort((a, b) => b.createdAt - a.createdAt),
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
};

const editTest = async (details, uid) => {
  try {
    if (details.files) {
      // files is an array
      if (details.old_files) {
        if (typeof details.old_files === 'string') {
          details.files = [...details.files, details.old_files];
        } else {
          details.files = [...details.files, ...details.old_files];
        }
      }
    } else {
      // make a files array with somthing
      if (details.old_files) {
        details.files = details.old_files;
      }
    }

    delete (details.old_files);

    console.log(details);
    await test_repo.updateOne(details, { uid });
    return {
      success: true,
      message: 'Test edited successfully'
    };
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getAllForStudent = async (roll_no) => {
  try {
    const student_data = await student_repo.fetchOneCertainFields("section", { roll_no });
    const section_data = await section_repo.fetchCertainFieldsByCondition("classes", { name: student_data.section });
    const test_data = await test_repo.getAllWithCertainFields("-id", { section: student_data.section });
    let final_result = [];
    let inter_array = test_data.map(async test => {
      let final_obj = {};
      final_obj.uid = test.uid;
      final_obj.title = test.title;
      final_obj.class_id = test.class_id;
      final_obj.subject = test.subject;
      final_obj.faculty_name = test.faculty_name;
      final_obj.createdAt = test.createdAt;
      final_obj.due_date = test.due_date;
      final_obj.completion_status = '';
      final_obj.time_status = '';
      final_obj.status_class = '';
      console.log(test.uid + ":" + roll_no)
      const submission_data = await test_submission_repo.fetchOneCertainFields("uid createdAt last_edit_date", {
        test_id: test.uid,
        student_id: roll_no
      });
      console.log(submission_data);
      if (submission_data) {
        final_obj.status_class += 'green-status';
        final_obj.completion_status += 'Completed';
        if (submission_data.last_edit_date <= test.due_date) {
          final_obj.time_status = ', In Time';
        } else {
          final_obj.time_status = ', Late';
        }
      } else {
        final_obj.status_class += 'red-status';
        final_obj.completion_status += 'Pending';
        if (test.due_date) {
          if (Math.floor(Date.now() / 1000) <= +test.due_date + 600) {
            final_obj.time_status = ', Due';
          } else {
            final_obj.time_status = ', Expired';
          }
        }
      }
      // console.log(final_obj);
      final_result.push(final_obj);
    });
    await Promise.all(inter_array);
    final_result.sort((a, b) => b.createdAt - a.createdAt);
    // console.log(final_result);
    return {
      success: true,
      message: 'Tests retrived successfully',
      data: final_result,
      classes: section_data.classes
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getTestDetailsForStudent = async (roll_no, uid) => {
  try {
    let result_obj = {};
    const test_data = await test_repo.getOneCertainFields("-id", { uid });
    const submission_data = await test_submission_repo.fetchOneCertainFields("-id", { test_id: uid, student_id: roll_no });

    result_obj.status_class = '';
    result_obj.completion_status = '';
    result_obj.time_status = '';

    if (submission_data) {
      result_obj.status_class += 'green-status';
      result_obj.completion_status += 'Completed';
      if (submission_data.last_edit_date <= test_data.due_date) {
        result_obj.time_status = ', In Time';
      } else {
        result_obj.time_status = ', Late';
      }
    } else {
      result_obj.status_class += 'red-status';
      result_obj.completion_status += 'Pending';
      if (Math.floor(Date.now() / 1000) <= +test_data.due_date + 600) {
        result_obj.time_status = ', Due';
      } else {
        result_obj.time_status = ', Expired';
      }
    }

    return {
      success: true,
      test_data,
      submission_data,
      result_obj
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const addTestSubmission = async (details, roll_no) => {
  try {
    const test_data = await test_repo.getOneCertainFields("due_date", {
      uid: details.test_id
    });
    if (Math.floor(Date.now() / 1000) > +test_data.due_date + 600) {
      return {
        success: false,
        message: 'Sorry, Test Submission is Closed.'
      }
    }
    const student_details = await student_repo.fetchOneCertainFields("full_name", { roll_no });
    details.student_id = roll_no;
    details.student_name = student_details.full_name;

    await test_submission_repo.add(details);
    return {
      success: true,
      message: 'Test Submission added successfully'
    };
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getTestDetailsForFaculty = async (uid) => {
  try {
    const test_data = await test_repo.getOneCertainFields("-id", { uid });
    let submission_data = await test_submission_repo.getAllWithCertainFields("-id", { test_id: uid });

    submission_data = submission_data.map(submission => {
      let status_class = '';
      let time_status = '';

      if (submission.last_edit_date <= test_data.due_date) {
        status_class += 'green-status'
        time_status += 'In Time';
      } else {
        status_class += 'orange-status'
        time_status += 'Late';
      }

      return {
        ...submission._doc,
        status_class,
        time_status
      }
    });

    console.log(submission_data);

    return {
      success: true,
      test_data,
      submission_data
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getTestSubmissionDetailsForFaculty = async (test_id, submission_id) => {
  try {
    let result_obj = {};
    const test_data = await test_repo.getOneCertainFields("-id", { uid: test_id });
    const submission_data = await test_submission_repo.fetchOneCertainFields("-id", { uid: submission_id });

    result_obj.status_class = '';
    result_obj.time_status = '';

    if (submission_data.last_edit_date <= test_data.due_date) {
      result_obj.status_class += 'green-status'
      result_obj.time_status += 'In Time';
    } else {
      result_obj.status_class += 'orange-status'
      result_obj.time_status += 'Late';
    }

    return {
      success: true,
      test_data,
      submission_data,
      result_obj
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const deleteOneByUID = async (uid) => {
  try {
    await test_repo.delete({ uid });
    return {
      success: true,
      message: 'Test deleted successfully'
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

module.exports = {
  getAllByFaculty,
  addTest,
  getAllForStudent,
  getTestDetailsForStudent,
  addTestSubmission,
  getTestDetailsForFaculty,
  getTestSubmissionDetailsForFaculty,
  deleteOneByUID
}
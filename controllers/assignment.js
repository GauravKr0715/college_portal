const assignment_repo = require('../models/assignment_repo');
const faculty_repo = require('../models/faculty_repo');
const section_repo = require('../models/section_repo');
const student_repo = require('../models/student_repo');
const assignment_submission_repo = require('../models/assignment_submission_repo');
const logger = require('../helpers/logger');
const moment = require('moment');

const getAllByFaculty = async (faculty_id) => {
  try {
    let data = await assignment_repo.getAllWithCertainFields("-id", { faculty_id });
    let fac_data = await faculty_repo.fetchOneCertainFields("full_name classes", { uni_id: faculty_id });
    delete (fac_data._id);
    let final_result = {
      assignment_data: data,
      faculty_data: fac_data
    }
    return {
      success: true,
      message: 'Assignments fetched successfully',
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

const addAssignment = async (details, uni_id) => {
  try {
    const faculty_details = await faculty_repo.fetchOneCertainFields("full_name", { uni_id });
    details.faculty_id = uni_id;
    details.faculty_name = faculty_details.full_name;

    await assignment_repo.add(details);
    return {
      success: true,
      message: 'Assignment added successfully'
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
    const assignment_data = await assignment_repo.getAllWithCertainFields("-id", { section: student_data.section });
    let final_result = [];
    let inter_array = assignment_data.map(async assignment => {
      let final_obj = {};
      final_obj.uid = assignment.uid;
      final_obj.title = assignment.title;
      final_obj.class_id = assignment.class_id;
      final_obj.subject = assignment.subject;
      final_obj.faculty_name = assignment.faculty_name;
      final_obj.due_date = assignment.due_date;
      final_obj.completion_status = '';
      final_obj.time_status = '';
      final_obj.status_class = '';
      console.log(assignment.uid + ":" + roll_no)
      const submission_data = await assignment_submission_repo.fetchOneCertainFields("uid createdAt last_edit_date", {
        assignment_id: assignment.uid,
        student_id: roll_no
      });
      console.log(submission_data);
      if (submission_data) {
        final_obj.status_class += 'green-status';
        final_obj.completion_status += 'Completed';
        if (assignment.due_date) {
          if (submission_data.last_edit_date <= assignment.due_date) {
            final_obj.time_status = ', In Time';
          } else {
            final_obj.time_status = ', Late';
          }
        }
      } else {
        final_obj.status_class += 'red-status';
        final_obj.completion_status += 'Pending';
        if (assignment.due_date) {
          if (Math.floor(Date.now() / 1000) <= assignment.due_date) {
            final_obj.time_status = ', Due';
          } else {
            final_obj.time_status = ', Overdue';
          }
        }
      }
      // console.log(final_obj);
      final_result.push(final_obj);
    });
    await Promise.all(inter_array);
    // console.log(final_result);
    return {
      success: true,
      message: 'Assignments retrived successfully',
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

const getAssignmentDetailsForStudent = async (roll_no, uid) => {
  try {
    let result_obj = {};
    const assignment_data = await assignment_repo.getOneCertainFields("-id", { uid });
    const submission_data = await assignment_submission_repo.fetchOneCertainFields("-id", { assignment_id: uid, student_id: roll_no });

    result_obj.status_class = '';
    result_obj.completion_status = '';
    result_obj.time_status = '';

    if (submission_data) {
      result_obj.status_class += 'green-status';
      result_obj.completion_status += 'Completed';
      if (assignment_data.due_date) {
        if (submission_data.last_edit_date <= assignment_data.due_date) {
          result_obj.time_status = ', In Time';
        } else {
          result_obj.time_status = ', Late';
        }
      }
    } else {
      result_obj.status_class += 'red-status';
      result_obj.completion_status += 'Pending';
      if (assignment_data.due_date) {
        if (Math.floor(Date.now() / 1000) <= assignment_data.due_date) {
          result_obj.time_status = ', Due';
        } else {
          result_obj.time_status = ', Overdue';
        }
      }
    }

    return {
      success: true,
      assignment_data,
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

const addAssignmentSubmission = async (details, roll_no) => {
  try {
    const student_details = await student_repo.fetchOneCertainFields("full_name", { roll_no });
    details.student_id = roll_no;
    details.student_name = student_details.full_name;

    await assignment_submission_repo.add(details);
    return {
      success: true,
      message: 'Assignment Submission added successfully'
    };
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
  addAssignment,
  getAllForStudent,
  getAssignmentDetailsForStudent,
  addAssignmentSubmission
}
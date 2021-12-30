const assignment_repo = require('../models/assignment_repo');
const faculty_repo = require('../models/faculty_repo');
const section_repo = require('../models/section_repo');
const student_repo = require('../models/student_repo');
const feed_repo = require('../models/feed_repo');
const assignment_submission_repo = require('../models/assignment_submission_repo');
const logger = require('../helpers/logger');
const moment = require('moment');
const jsonexport = require('jsonexport');
const uuidv4 = require('uuid').v4;

const getAllByFaculty = async (faculty_id) => {
  try {
    let data = await assignment_repo.getAllWithCertainFields("-id", { faculty_id });
    let fac_data = await faculty_repo.fetchOneCertainFields("full_name classes", { uni_id: faculty_id });
    delete (fac_data._id);
    let final_result = {
      assignment_data: data.sort((a, b) => b.createdAt - a.createdAt),
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

    let feed_obj = {};
    feed_obj.uid = uuidv4();
    feed_obj.from = faculty_details.full_name;
    feed_obj.to = details.section;
    feed_obj.content = `<b>${faculty_details.full_name}</b> added a new assignment <b>${details.title}</b> for your <b>${details.subject}</b> class`;
    feed_obj.link = `/assignments/${details.uid}`;
    feed_obj.createdAt = Math.floor(Date.now() / 1000);

    await assignment_repo.add(details);
    await feed_repo.add(feed_obj);
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

const editAssignment = async (details, uid) => {
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
    await assignment_repo.updateOne(details, { uid });
    return {
      success: true,
      message: 'Assignment edited successfully'
    };
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const editAssignmentSubmission = async (details, uid) => {
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
    await assignment_submission_repo.updateOne(details, { uid });
    return {
      success: true,
      message: 'Assignment Submission edited successfully'
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
      final_obj.createdAt = assignment.createdAt;
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
    final_result.sort((a, b) => b.createdAt - a.createdAt);
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

const getAssignmentDetailsForFaculty = async (uid) => {
  try {
    const assignment_data = await assignment_repo.getOneCertainFields("-id", { uid });
    let submission_data = await assignment_submission_repo.getAllWithCertainFields("-id", { assignment_id: uid });

    submission_data = submission_data.map(submission => {
      let status_class = '';
      let time_status = '';

      if (assignment_data.due_date) {
        if (submission.last_edit_date <= assignment_data.due_date) {
          status_class += 'green-status'
          time_status += 'In Time';
        } else {
          status_class += 'orange-status'
          time_status += 'Late';
        }
      } else {
        status_class += 'green-status'
        time_status += 'Completed';
      }

      return {
        ...submission._doc,
        status_class,
        time_status
      }
    });

    console.log(submission_data);

    submission_data.sort((a, b) => b.createdAt - a.createdAt);

    return {
      success: true,
      assignment_data,
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

const getAssignmentSubmissionDetailsForFaculty = async (assignment_id, submission_id) => {
  try {
    let result_obj = {};
    const assignment_data = await assignment_repo.getOneCertainFields("-id", { uid: assignment_id });
    const submission_data = await assignment_submission_repo.fetchOneCertainFields("-id", { uid: submission_id });

    result_obj.status_class = '';
    result_obj.time_status = '';

    if (assignment_data.due_date) {
      if (submission_data.last_edit_date <= assignment_data.due_date) {
        result_obj.status_class += 'green-status'
        result_obj.time_status += 'In Time';
      } else {
        result_obj.status_class += 'orange-status'
        result_obj.time_status += 'Late';
      }
    } else {
      result_obj.status_class += 'green-status'
      result_obj.time_status += 'Completed';
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

const deleteOneByUID = async (uid) => {
  try {
    await assignment_repo.delete({ uid });
    return {
      success: true,
      message: 'Assignment deleted successfully'
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const deleteOneSubmissionByUID = async (uid) => {
  try {
    await assignment_submission_repo.delete({ uid });
    return {
      success: true,
      message: 'Assignment Submission deleted successfully'
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const scoreAssignmentSubmission = async (uid, details) => {
  try {

    const assignment_submission_details = await assignment_submission_repo.fetchOneCertainFields("assignment_id student_id", {
      uid
    });
    const assignment_details = await assignment_repo.getOneCertainFields("title faculty_id faculty_name", {
      uid: assignment_submission_details.assignment_id
    })

    let feed_obj = {};
    feed_obj.uid = uuidv4();
    feed_obj.from = assignment_details.faculty_id;
    feed_obj.to = assignment_submission_details.student_id;
    feed_obj.content = `Your submission for the assignment titled <b>${assignment_details.title}</b> was marked by <b>${assignment_details.faculty_name}</b>`;
    feed_obj.link = `/assignments/${assignment_submission_details.assignment_id}`;
    feed_obj.createdAt = Math.floor(Date.now() / 1000);

    await assignment_submission_repo.updateOne(details, { uid });

    await feed_repo.add(feed_obj);
    return {
      success: true,
      message: 'Assignment Scored successfully'
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getCSVData = async (uid, type) => {
  try {
    let final_result = [];
    if (type == 1) {
      const assignment_data = await assignment_repo.getOneCertainFields("section due_date total_marks", { uid });
      const students_data = await student_repo.fetchAllByCondition({ section: assignment_data.section });
      const inter_array = students_data.map(async student => {
        const submission_data = await assignment_submission_repo.fetchOneCertainFields("student_id student_name marks_scored last_edit_date", {
          assignment_id: uid,
          student_id: student.roll_no
        });
        let student_obj = {};
        student_obj['Roll No'] = `"${student.roll_no}"`;
        student_obj['Name'] = student.full_name;
        if (submission_data) {
          // there is a submission
          student_obj['Submission Status'] = 'Completed';
          if (assignment_data.total_marks) {
            student_obj['Marks Given'] = submission_data.marks_scored ? submission_data.marks_scored : 'NA';
          }
        } else {
          // there is no submission
          student_obj['Submission Status'] = 'Pending';
          if (assignment_data.total_marks) {
            student_obj['Marks Given'] = 'NA';
          }
        }
        final_result.push(student_obj);
      });
      await Promise.all(inter_array);
    } else if (type == 2) {
      const assignment_data = await assignment_repo.getOneCertainFields("section due_date total_marks", { uid });
      let submission_data = await assignment_submission_repo.getAllWithCertainFields("-id", { assignment_id: uid });
      submission_data = submission_data.map(submission => {
        let student_obj = {};
        student_obj['Roll No'] = `"${submission.student_id}"`;
        student_obj['Name'] = submission.student_name;
        if (assignment_data.total_marks) {
          student_obj['Marks Given'] = submission.marks_scored ? submission.marks_scored : 'NA';
        }
        final_result.push(student_obj);
      });
    } else {
      const assignment_data = await assignment_repo.getOneCertainFields("section due_date total_marks", { uid });
      const students_data = await student_repo.fetchAllByCondition({ section: assignment_data.section });
      const inter_array = students_data.map(async student => {
        const submission_data = await assignment_submission_repo.fetchOneCertainFields("student_id student_name marks_scored last_edit_date", {
          assignment_id: uid,
          student_id: student.roll_no
        });
        if (!submission_data) {
          // there is no submission
          let student_obj = {};
          student_obj['Roll No'] = `"${student.roll_no}"`;
          student_obj['Name'] = student.full_name;
          final_result.push(student_obj);
        }
      });
      await Promise.all(inter_array);
    }
    final_result.sort((a, b) => a['Roll No'].substring(1, 4) - b['Roll No'].substring(1, 4));
    const resolved_data = await new Promise((resolve, reject) => {
      jsonexport(final_result, function (err, csv) {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        return resolve(csv);
      });
    });
    return {
      success: 'true',
      message: 'CSV Downloaded successfully',
      csv_data: resolved_data
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
  addAssignment,
  getAllForStudent,
  getAssignmentDetailsForStudent,
  addAssignmentSubmission,
  getAssignmentDetailsForFaculty,
  getAssignmentSubmissionDetailsForFaculty,
  deleteOneByUID,
  deleteOneSubmissionByUID,
  editAssignment,
  editAssignmentSubmission,
  scoreAssignmentSubmission,
  getCSVData
}
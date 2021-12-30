const notes_repo = require('../models/notes_repo');
const faculty_repo = require('../models/faculty_repo');
const student_repo = require('../models/student_repo');
const section_repo = require('../models/section_repo');
const feed_repo = require('../models/feed_repo');
const logger = require('../helpers/logger');
const moment = require('moment');
const uuidv4 = require('uuid').v4;

const getAllByFaculty = async (faculty_id) => {
  try {
    let data = await notes_repo.getAll("-id", { faculty_id });
    let fac_data = await faculty_repo.fetchOneCertainFields("full_name classes", { uni_id: faculty_id });
    delete (fac_data._id);
    let final_result = {
      notes_data: data,
      faculty_data: fac_data
    }
    return {
      success: true,
      message: 'Notes fetched successfully',
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

const addNotes = async (details, uni_id) => {
  try {
    const faculty_details = await faculty_repo.fetchOneCertainFields("full_name", { uni_id });
    details.faculty_id = uni_id;
    details.faculty_name = faculty_details.full_name;

    let feed_obj = {};
    feed_obj.uid = uuidv4();
    feed_obj.from = faculty_details.full_name;
    feed_obj.to = details.section;
    feed_obj.content = `<b>${faculty_details.full_name}</b> added new notes <b>${details.title}</b> for your <b>${details.subject}</b> class`;
    feed_obj.link = `/notes/${details.uid}`;
    feed_obj.createdAt = Math.floor(Date.now() / 1000);

    await notes_repo.add(details);
    await feed_repo.add(feed_obj);
    return {
      success: true,
      message: 'Notes added successfully'
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const editNotes = async (details, uid) => {
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
    await notes_repo.updateOne(details, { uid });
    return {
      success: true,
      message: 'Notes edited successfully'
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
    const notes_data = await notes_repo.getAllWithCertainFields("-id", { section: student_data.section });
    // notes_data.sort((a, b) => b.createdAt - a.createdAt);
    // console.log(final_result);
    return {
      success: true,
      message: 'Notes retrived successfully',
      data: notes_data,
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

const getNotesDetailsForStudent = async (roll_no, uid) => {
  try {
    let result_obj = {};
    const notes_data = await notes_repo.getOneCertainFields("-id", { uid });

    return {
      success: true,
      message: 'Notes details retrived successfully',
      notes_data
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getNotesDetailsForFaculty = async (uid) => {
  try {
    const notes_data = await notes_repo.getOneCertainFields("-id", { uid });

    return {
      success: true,
      notes_data
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
    await notes_repo.delete({ uid });
    return {
      success: true,
      message: 'Notes deleted successfully'
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
  addNotes,
  editNotes,
  getAllForStudent,
  getNotesDetailsForStudent,
  getNotesDetailsForFaculty,
  deleteOneByUID
}
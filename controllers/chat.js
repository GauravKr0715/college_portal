const conversation_repo = require('../models/conversation_repo');
const message_repo = require('../models/message_repo');
const faculty_repo = require('../models/faculty_repo');
const student_repo = require('../models/student_repo');
const section_repo = require('../models/section_repo');
const student_controller = require('../controllers/student');
const faculty_controller = require('../controllers/faculty');
const logger = require('../helpers/logger');

const addNewConversation = async (details) => {
  try {
    const data = await conversation_repo.add({
      members: [
        details.sender_id,
        details.receiver_id
      ]
    });

    return {
      success: true,
      message: 'Conversation added Successfully',
      data
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getConversationsForFaculty = async (user_id) => {
  try {
    const data = await conversation_repo.fetchAllByCondition({
      members: { $in: [user_id] }
    });

    const user_data = await faculty_controller.getSimplifiedUser(user_id);

    // console.log(data);

    return {
      success: true,
      message: 'Conversations retrieved successfully',
      data,
      user_data
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getStudentsForFaculty = async (uni_id) => {
  try {
    const faculty_data = await faculty_repo.fetchOneCertainFields("classes", {
      uni_id
    });

    let sections_list = faculty_data.classes.map(c => c.section);
    sections_list = [... new Set(sections_list)];
    let final_result = [];

    let inter_array = sections_list.map(async section => {
      const students = await student_repo.fetchAllByConditionCertainFields("roll_no full_name", {
        section
      });
      final_result = [...final_result, ...students];
    });

    await Promise.all(inter_array);

    console.log(final_result);

    return {
      success: true,
      message: 'Students retrieved successfully',
      students_list: final_result
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getFacultiesForStudent = async (roll_no) => {
  try {
    const student_data = await student_repo.fetchOneCertainFields("section", {
      roll_no
    });

    const section_data = await section_repo.fetchCertainFieldsByCondition("classes", {
      name: student_data.section
    });

    console.log(section_data.classes)

    let faculties_list = Array.from(new Set(section_data.classes.map(c => c.faculty_id)))
      .map(id => {
        return {
          uni_id: id,
          full_name: section_data.classes.find(c => c.faculty_id === id).faculty_name
        };
      });

    console.log(faculties_list);

    return {
      success: true,
      message: 'Students retrieved successfully',
      faculties_list
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getConversationsForStudent = async (user_id) => {
  try {
    const data = await conversation_repo.fetchAllByCondition({
      members: { $in: [user_id] }
    });

    const user_data = await student_controller.getSimplifiedUser(user_id);

    // console.log(data);

    return {
      success: true,
      message: 'Conversations retrieved successfully',
      data,
      user_data
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const addNewMessage = async (details) => {
  try {
    details.createdAt = Math.floor(Date.now() / 1000);
    const data = await message_repo.add(details);

    return {
      success: true,
      message: 'Message sent Successfully',
      data
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
};

const getMessagesForConversation = async (conversation_id) => {
  try {
    const data = await message_repo.fetchAllByCondition({
      conversation_id
    });

    // console.log(data);

    return {
      success: true,
      message: 'Messages retrieved successfully',
      data
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
  addNewConversation,
  getConversationsForStudent,
  getConversationsForFaculty,
  getStudentsForFaculty,
  getFacultiesForStudent,
  addNewMessage,
  getMessagesForConversation
}
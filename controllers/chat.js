const conversation_repo = require('../models/conversation_repo');
const message_repo = require('../models/message_repo');
const student_controller = require('../controllers/student');
const faculty_controller = require('../controllers/faculty');
const logger = require('../helpers/logger');

const addNewConversation = async (details) => {
  try {
    await conversation_repo.add({
      members: [
        details.sender_id,
        details.receiver_id
      ]
    });

    return {
      success: true,
      message: 'Conversation added Successfully'
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
  addNewMessage,
  getMessagesForConversation
}
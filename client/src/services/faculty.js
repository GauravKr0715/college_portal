import { environment } from '../environments/environment';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const base_url = 'api/v1/faculty';
const profileDetailsURL = '/profileDetails';
const basicDetailsURL = '/basicDetails';
const getClassesURL = '/classes';
const attendanceSheetURL = '/attendance/classes';
const postAttendanceURL = '/attendance/add';
const assignmentSheetURL = '/assignment/all';
const testSheetURL = '/test/all';
const notesSheetURL = '/notes/all';
const postAssignmentWithAttachURL = '/assignment/addWithAttach';
const postAssignmentWithoutAttachURL = '/assignment/addWithoutAttach';
const editAssignmentWithAttachURL = '/assignment/editWithAttach';
const editAssignmentWithoutAttachURL = '/assignment/editWithoutAttach';
const postTestWithAttachURL = '/test/addWithAttach';
const postTestWithoutAttachURL = '/test/addWithoutAttach';
const editTestWithAttachURL = '/test/editWithAttach';
const editTestWithoutAttachURL = '/test/editWithoutAttach';
const postNotesWithAttachURL = '/notes/addWithAttach';
const postNotesWithoutAttachURL = '/notes/addWithoutAttach';
const editNotesWithAttachURL = '/notes/editWithAttach';
const editNotesWithoutAttachURL = '/notes/editWithoutAttach';
const assignmentDetailsURL = '/assignment/details';
const testDetailsURL = '/test/details';
const notesDetailsURL = '/notes/details';
const assignmentSubmissionDetailsURL = '/assignment/submissionDetails';
const testSubmissionDetailsURL = '/test/submissionDetails';
const deleteAssignmentURL = '/assignment/';
const deleteTestURL = '/test/';
const deleteNotesURL = '/notes/';

const scoreAssignmentSubmissionURL = '/assignment/scoreSubmission';
const scoreTestSubmissionURL = '/test/scoreSubmission';

const assignmentCSVURL = '/assignment/getCSVData';
const TestCSVURL = '/test/getCSVData';
const attendanceCSVURL = '/attendance/getCSVData';

const addLinkURL = '/addLink';
const applyLinkURL = '/applyLink';
const removeLinkURL = '/removeLink';

const getConversationsURL = '/chat/conversations';
const getStudentsForChatURL = '/chat/studentsList';
const getStudentSimplifiedDataURL = '/student/getSimplified';
const getMessagesURL = '/chat/messages';
const sendMessageURL = '/chat/newMessage';
const addConversationURL = '/chat/newConversation';

const getFeedURL = '/feed/';

export const getFacultyBasicDetails = () => {
  return axios.get(environment.apiUrl + base_url + basicDetailsURL, {
    withCredentials: true
  });
}

export const getClasses = () => {
  return axios.get(environment.apiUrl + base_url + getClassesURL, {
    withCredentials: true
  });
}

export const getAttendanceSheet = () => {
  return axios.get(environment.apiUrl + base_url + attendanceSheetURL, {
    withCredentials: true
  })
}
export const getProfileDetails = () => {
  return axios.get(environment.apiUrl + base_url + profileDetailsURL, {
    withCredentials: true
  })
}

export const postAttendanceSheet = (details) => {
  return axios.post(environment.apiUrl + base_url + postAttendanceURL, details, {
    withCredentials: true
  });
}

export const getAssignmentSheet = () => {
  return axios.get(environment.apiUrl + base_url + assignmentSheetURL, {
    withCredentials: true
  })
}

export const getTestSheet = () => {
  return axios.get(environment.apiUrl + base_url + testSheetURL, {
    withCredentials: true
  })
}

export const getNotesSheet = () => {
  return axios.get(environment.apiUrl + base_url + notesSheetURL, {
    withCredentials: true
  })
}

export const uploadNewAssignmentWithoutAttach = (details) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postAssignmentWithoutAttachURL + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const uploadNewAssignmentWithAttach = (details) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postAssignmentWithAttachURL + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const editAssignmentWithoutAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editAssignmentWithoutAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const editAssignmentWithAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editAssignmentWithAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const uploadNewTestWithoutAttach = (details) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postTestWithoutAttachURL + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const uploadNewTestWithAttach = (details) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postTestWithAttachURL + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const editTestWithoutAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editTestWithoutAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const editTestWithAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editTestWithAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const uploadNewNotesWithoutAttach = (details) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postNotesWithoutAttachURL + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const uploadNewNotesWithAttach = (details) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postNotesWithAttachURL + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const editNotesWithoutAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editNotesWithoutAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const editNotesWithAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editNotesWithAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const getAssignmentDetails = (id) => {
  return axios.get(environment.apiUrl + base_url + assignmentDetailsURL + '?id=' + id, {
    withCredentials: true
  });
}

export const getTestDetails = (id) => {
  return axios.get(environment.apiUrl + base_url + testDetailsURL + '?id=' + id, {
    withCredentials: true
  });
}

export const getNotesDetails = (id) => {
  return axios.get(environment.apiUrl + base_url + notesDetailsURL + '?id=' + id, {
    withCredentials: true
  });
}

export const getAssignmentSubmissionDetails = (assignment_id, submission_id) => {
  return axios.get(environment.apiUrl + base_url + assignmentSubmissionDetailsURL + '?assignment_id=' + assignment_id + '&submission_id=' + submission_id, {
    withCredentials: true
  });
}

export const getTestSubmissionDetails = (test_id, submission_id) => {
  return axios.get(environment.apiUrl + base_url + testSubmissionDetailsURL + '?test_id=' + test_id + '&submission_id=' + submission_id, {
    withCredentials: true
  });
}

export const deleteAssignmentDetails = (assignment_id) => {
  return axios.delete(environment.apiUrl + base_url + deleteAssignmentURL + '?id=' + assignment_id, {
    withCredentials: true
  });
}

export const deleteTestDetails = (test_id) => {
  return axios.delete(environment.apiUrl + base_url + deleteTestURL + '?id=' + test_id, {
    withCredentials: true
  });
}

export const deleteNotesDetails = (test_id) => {
  return axios.delete(environment.apiUrl + base_url + deleteNotesURL + '?id=' + test_id, {
    withCredentials: true
  });
}

export const scoreAssignmentSubmission = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + scoreAssignmentSubmissionURL + '?id=' + uid, details, {
    withCredentials: true
  });
}

export const scoreTestSubmission = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + scoreTestSubmissionURL + '?id=' + uid, details, {
    withCredentials: true
  });
}

export const getCSVDataForAssignment = (uid, type) => {
  return axios.get(environment.apiUrl + base_url + assignmentCSVURL + '?id=' + uid + '&type=' + type, {
    withCredentials: true
  });
}

export const getCSVDataForTest = (uid, type) => {
  return axios.get(environment.apiUrl + base_url + TestCSVURL + '?id=' + uid + '&type=' + type, {
    withCredentials: true
  });
}

export const getCSVDataForAttendance = (class_id) => {
  return axios.get(environment.apiUrl + base_url + attendanceCSVURL + '?class=' + class_id, {
    withCredentials: true
  });
}

export const addNewLink = (details, class_id) => {
  return axios.post(environment.apiUrl + base_url + addLinkURL + '?class=' + class_id, details, {
    withCredentials: true
  });
}

export const applyLinkToClass = (link, class_id) => {
  return axios.put(environment.apiUrl + base_url + applyLinkURL + '?class=' + class_id, link, {
    withCredentials: true
  });
}

export const removeLink = (class_id) => {
  return axios.put(environment.apiUrl + base_url + removeLinkURL + '?class=' + class_id, {}, {
    withCredentials: true
  });
}

export const getConversationsForFaculty = () => {
  return axios.get(environment.apiUrl + base_url + getConversationsURL, {
    withCredentials: true
  });
}

export const getStudentsForFaculty = () => {
  return axios.get(environment.apiUrl + base_url + getStudentsForChatURL, {
    withCredentials: true
  });
}

export const getStudentSimplifiedData = (id) => {
  return axios.get(environment.apiUrl + base_url + getStudentSimplifiedDataURL + '?id=' + id, {
    withCredentials: true
  });
}

export const getMessagesForConversation = (id) => {
  return axios.get(environment.apiUrl + base_url + getMessagesURL + "?conv_id=" + id, {
    withCredentials: true
  });
}

export const sendMessage = (details) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + sendMessageURL, details, {
    withCredentials: true
  });
}

export const addConversation = (details) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + addConversationURL, details, {
    withCredentials: true
  });
}

export const getFacultyFeed = (page_no) => {
  return axios.get(environment.apiUrl + base_url + getFeedURL + "?page_no=" + page_no, {
    withCredentials: true
  });
}
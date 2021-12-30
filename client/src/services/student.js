import { environment } from '../environments/environment';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const base_url = 'api/v1/student';
const profileDetailsURL = '/profileDetails';
const getClassesURL = '/classes'
const basicDetailsURL = '/basicDetails';
const attendanceReportURL = '/attendance/report';
const assignmentSheetURL = '/assignment/all';
const testSheetURL = '/test/all';
const notesSheetURL = '/notes/all';
const assignmentDetailsURL = '/assignment/details';
const testDetailsURL = '/test/details';
const notesDetailsURL = '/notes/details';
const postAssignmentSubmissionWithoutAttach = '/assignment/submitWithoutAttach';
const postAssignmentSubmissionWithAttach = '/assignment/submitWithAttach';
const postTestSubmissionWithoutAttach = '/test/submitWithoutAttach';
const postTestSubmissionWithAttach = '/test/submitWithAttach';

const deleteAssignmentSubmissionURL = '/assignment/';
const deleteTestSubmissionURL = '/test/';
const editAssignmentSubmissionWithAttachURL = '/assignment/editWithAttach';
const editAssignmentSubmissionWithoutAttachURL = '/assignment/editWithoutAttach';
const editTestSubmissionWithAttachURL = '/test/editWithAttach';
const editTestSubmissionWithoutAttachURL = '/test/editWithoutAttach';

const getConversationsURL = '/chat/conversations';
const getFacultySimplifiedDataURL = '/faculty/getSimplified';
const getMessagesURL = '/chat/messages';
const sendMessageURL = '/chat/newMessage';

const getFeedURL = '/feed/';

export const getStudentBasicDetails = () => {
  return axios.get(environment.apiUrl + base_url + basicDetailsURL, {
    withCredentials: true
  });
}

export const getAttendanceReport = () => {
  return axios.get(environment.apiUrl + base_url + attendanceReportURL, {
    withCredentials: true
  })
}

export const getAssignmentSheet = () => {
  return axios.get(environment.apiUrl + base_url + assignmentSheetURL, {
    withCredentials: true
  });
}

export const getTestSheet = () => {
  return axios.get(environment.apiUrl + base_url + testSheetURL, {
    withCredentials: true
  });
}

export const getNotesSheet = () => {
  return axios.get(environment.apiUrl + base_url + notesSheetURL, {
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

export const uploadNewAssignmentSubmissionWithoutAttach = (details, uid) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postAssignmentSubmissionWithoutAttach + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const uploadNewAssignmentSubmissionWithAttach = (details, uid) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postAssignmentSubmissionWithAttach + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const uploadNewTestSubmissionWithoutAttach = (details, uid) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postTestSubmissionWithoutAttach + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const uploadNewTestSubmissionWithAttach = (details, uid) => {
  console.log(details);
  return axios.post(environment.apiUrl + base_url + postTestSubmissionWithAttach + '?uid=' + uuidv4(), details, {
    withCredentials: true
  });
}

export const getprofileDetails = () => {
  return axios.get(environment.apiUrl + base_url + profileDetailsURL, {
    withCredentials: true
  })
}

export const getClasses = () => {
  return axios.get(environment.apiUrl + base_url + getClassesURL, {
    withCredentials: true
  });
}

export const deleteAssignmentSubmissionDetails = (submission_id) => {
  return axios.delete(environment.apiUrl + base_url + deleteAssignmentSubmissionURL + '?id=' + submission_id, {
    withCredentials: true
  });
}

export const deleteTestSubmissionDetails = (submission_id) => {
  return axios.delete(environment.apiUrl + base_url + deleteTestSubmissionURL + '?id=' + submission_id, {
    withCredentials: true
  });
}

export const editAssignmentSubmissionWithoutAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editAssignmentSubmissionWithoutAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const editAssignmentSubmissionWithAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editAssignmentSubmissionWithAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const editTestSubmissionWithoutAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editTestSubmissionWithoutAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const editTestSubmissionWithAttach = (details, uid) => {
  console.log(details);
  return axios.put(environment.apiUrl + base_url + editTestSubmissionWithAttachURL + '?uid=' + uid, details, {
    withCredentials: true
  });
}

export const getConversationsForStudent = () => {
  return axios.get(environment.apiUrl + base_url + getConversationsURL, {
    withCredentials: true
  });
}

export const getFacultySimplifiedData = (id) => {
  return axios.get(environment.apiUrl + base_url + getFacultySimplifiedDataURL + '?id=' + id, {
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

export const getStudentFeed = (page_no) => {
  return axios.get(environment.apiUrl + base_url + getFeedURL + "?page_no=" + page_no, {
    withCredentials: true
  });
}
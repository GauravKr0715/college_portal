import { environment } from '../environments/environment';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const base_url = 'api/v1/faculty';

const basicDetailsURL = '/basicDetails';
const getClassesURL = '/classes';
const attendanceSheetURL = '/attendance/classes';
const postAttendanceURL = '/attendance/add';
const assignmentSheetURL = '/assignment/all';
const testSheetURL = '/test/all';
const notesSheetURL = '/notes/all';
const postAssignmentWithAttachURL = '/assignment/addWithAttach';
const postAssignmentWithoutAttachURL = '/assignment/addWithoutAttach';
const postTestWithAttachURL = '/test/addWithAttach';
const postTestWithoutAttachURL = '/test/addWithoutAttach';
const postNotesWithAttachURL = '/notes/addWithAttach';
const postNotesWithoutAttachURL = '/notes/addWithoutAttach';
const assignmentDetailsURL = '/assignment/details';
const testDetailsURL = '/test/details';
const notesDetailsURL = '/notes/details';
const assignmentSubmissionDetailsURL = '/assignment/submissionDetails';
const testSubmissionDetailsURL = '/test/submissionDetails';
const deleteAssignmentURL = '/assignment/';
const deleteTestURL = '/test/';
const deleteNotesURL = '/notes/';

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
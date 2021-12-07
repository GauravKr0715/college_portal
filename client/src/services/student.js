import { environment } from '../environments/environment';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const base_url = 'api/v1/student';

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
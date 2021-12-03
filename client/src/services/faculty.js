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
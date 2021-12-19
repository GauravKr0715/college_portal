import { environment } from '../environments/environment';
import axios from 'axios';

const base_url = 'api/v1';

const facultySessionValidateURL = '/faculty/validateSession';
const facultyLoginURL = '/faculty/login';
const facultyLogoutURL = '/faculty/logout';
const StudentSessionValidateURL = '/student/validateSession';
const StudentLoginURL = '/student/login';
const StudentLogoutURL = '/student/logout';

export const validateFacultySession = () => {
  return axios.get(environment.apiUrl + base_url + facultySessionValidateURL, {
    withCredentials: true
  });
}

export const loginFaculty = (userID, password) => {
  return axios.post(environment.apiUrl + base_url + facultyLoginURL, { uni_id: userID, password: password }, {
    withCredentials: true
  })
}

export const logoutFaculty = () => {
  return axios.put(environment.apiUrl + base_url + facultyLogoutURL, {}, {
    withCredentials: true
  })
}


export const validateStudentSession = () => {
  return axios.get(environment.apiUrl + base_url + StudentSessionValidateURL, {
    withCredentials: true
  });
}

export const loginStudent = (userID, password) => {
  return axios.post(environment.apiUrl + base_url + StudentLoginURL, { roll_no: userID, password: password }, {
    withCredentials: true
  })
}

export const logoutStudent = () => {
  return axios.put(environment.apiUrl + base_url + StudentLogoutURL, {}, {
    withCredentials: true
  })
}
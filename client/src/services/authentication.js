import { environment } from '../environments/environment';
import axios from 'axios';

const base_url = 'api/v1';

const facultySessionValidateURL = '/faculty/validateSession';
const facultyLoginURL = '/faculty/login';
const StudentSessionValidateURL = '/student/validateSession';
const StudentLoginURL = '/student/login';

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
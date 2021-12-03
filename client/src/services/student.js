import { environment } from '../environments/environment';
import axios from 'axios';

const base_url = 'api/v1/student';

const basicDetailsURL = '/basicDetails';
const attendanceSheetURL = '/attendance/classes';
const postAttendanceURL = '/attendance/add';

export const getStudentBasicDetails = () => {
  return axios.get(environment.apiUrl + base_url + basicDetailsURL, {
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
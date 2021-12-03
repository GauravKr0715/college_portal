import { environment } from '../environments/environment';
import axios from 'axios';

const base_url = 'api/v1/student';

const basicDetailsURL = '/basicDetails';
const attendanceReportURL = '/attendance/report';

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
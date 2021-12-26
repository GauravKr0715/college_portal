import { environment } from '../environments/environment';
import axios from 'axios';

const base_url = 'api/v1/admin';

const basicDetailsURL = '/basicDetails';
const getDepartmentsURL = '/department/all';
const addDepartmentURL = '/department/add';
const getSubjectsWithDeptURL = '/subject/all';
const addSubjectURL = '/subject/add';

export const getAdminBasicDetails = () => {
  return axios.get(environment.apiUrl + base_url + basicDetailsURL, {
    withCredentials: true
  });
}

export const getDepartments = () => {
  return axios.get(environment.apiUrl + base_url + getDepartmentsURL, {
    withCredentials: true
  })
}

export const addNewDepartment = (details) => {
  return axios.post(environment.apiUrl + base_url + addDepartmentURL, details, {
    withCredentials: true
  });
}

export const getSubjectsWithDepartmentID = (dept_id) => {
  return axios.get(environment.apiUrl + base_url + getSubjectsWithDeptURL + '?id=' + dept_id, {
    withCredentials: true
  })
}

export const addNewSubject = (details) => {
  return axios.post(environment.apiUrl + base_url + addSubjectURL, details, {
    withCredentials: true
  });
}



import { environment } from '../environments/environment';
import axios from 'axios';

const base_url = 'api/v1/admin';

const basicDetailsURL = '/basicDetails';
const getDepartmentsURL = '/department/all';
const addDepartmentURL = '/department/add';
const getSubjectsWithDeptURL = '/subject/all';
const getSectionsWithDeptURL = '/section/all';
const addSubjectURL = '/subject/add';
const addSectionURL = '/section/addBasicDetails';
const searchStudentURL = '/student/search';
const addStudentURL = '/student/register';
const bulkStudentRegisterURL = '/student/bulkRegister';
const searchFacultyURL = '/faculty/search';
const addFacultyURL = '/faculty/register';
const sectionDataURL = '/section/details';
const subjectsAndFacultiesURL = '/section/facandsubslist';
const saveClassesForSectionURL = '/section/addClasses';
const saveTimeTableForSectionURL = '/section/saveTimeTable';
const getStudentsForSectionURL = '/section/getStudentsList';
const saveStudentsListURL = '/section/saveStudents';

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

export const getSectionsWithDepartmentID = (dept_id) => {
  return axios.get(environment.apiUrl + base_url + getSectionsWithDeptURL + '?id=' + dept_id, {
    withCredentials: true
  })
}

export const addNewSubject = (details) => {
  return axios.post(environment.apiUrl + base_url + addSubjectURL, details, {
    withCredentials: true
  });
}

export const addNewSection = (details) => {
  return axios.post(environment.apiUrl + base_url + addSectionURL, details, {
    withCredentials: true
  });
}

export const searchStudentByID = (student_id) => {
  return axios.get(environment.apiUrl + base_url + searchStudentURL + '?id=' + student_id, {
    withCredentials: true
  })
}

export const addNewStudent = (details) => {
  return axios.post(environment.apiUrl + base_url + addStudentURL, details, {
    withCredentials: true
  });
}

export const bulkStudents = (details) => {
  return axios.post(environment.apiUrl + base_url + bulkStudentRegisterURL, details, {
    withCredentials: true
  });
}

export const searchFacultyByID = (faculty_id) => {
  return axios.get(environment.apiUrl + base_url + searchFacultyURL + '?id=' + faculty_id, {
    withCredentials: true
  })
}

export const addNewFaculty = (details) => {
  return axios.post(environment.apiUrl + base_url + addFacultyURL, details, {
    withCredentials: true
  });
}

export const getSectionData = (section_id) => {
  return axios.get(environment.apiUrl + base_url + sectionDataURL + '?id=' + section_id, {
    withCredentials: true
  })
}

export const getSubjectsAndFaculties = (section_id) => {
  return axios.get(environment.apiUrl + base_url + subjectsAndFacultiesURL + '?id=' + section_id, {
    withCredentials: true
  })
}

export const saveClassesForSection = (details, id) => {
  return axios.post(environment.apiUrl + base_url + saveClassesForSectionURL + '?id=' + id, details, {
    withCredentials: true
  });
}

export const saveTimeTableForSection = (time_table, id) => {
  return axios.put(environment.apiUrl + base_url + saveTimeTableForSectionURL + '?id=' + id, {
    time_table
  }, {
    withCredentials: true
  });
}

export const getStudentsList = (batch) => {
  return axios.get(environment.apiUrl + base_url + getStudentsForSectionURL + '?batch=' + batch, {
    withCredentials: true
  })
}

export const saveStudentsList = (details, id) => {
  return axios.put(environment.apiUrl + base_url + saveStudentsListURL + '?id=' + id, details, {
    withCredentials: true
  });
}
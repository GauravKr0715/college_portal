import { environment } from '../environments/environment';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const base_url = 'api/v1/admin';

const basicDetailsURL = '/basicDetails';
const getClassesURL = '/classes';
const profileDetailsURL = '/profileDetails';

export const getAdminBasicDetails = () => {
  return axios.get(environment.apiUrl + base_url + basicDetailsURL, {
    withCredentials: true
  });
}



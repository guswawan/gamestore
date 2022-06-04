import axios from 'axios';
import { LoginType } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export default async function setSignUp(data) {
  const URL = 'auth/signup';

  const response = await axios
    .post(`${ROOT_API}/${API_VERSION}/${URL}`, data)
    .catch((err) => err.response);

  const axiosResponse = response.data;
  if (axiosResponse?.error === 1) {
    return axiosResponse;
  }
  return axiosResponse.data;
}

export async function setLogin(data: LoginType) {
  const URL = 'auth/signin';

  const response = await axios
    .post(`${ROOT_API}/${API_VERSION}/${URL}`, data)
    .catch((err) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: '',
    };
    return res;
  }

  const res = {
    error: false,
    message: response.data.message,
    data: response.data.data,
  };
  return res;
}

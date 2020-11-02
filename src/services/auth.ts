import axios, { AxiosRequestConfig } from 'axios';

// console.log(`env ${process.env.baseURL}`);

// const baseURL = 'http://ngredient.us-east-2.elasticbeanstalk.com/';
const baseURL = 'http://localhost:4000';
const urlPrefix = `/auth`;

const loginUrl = `${urlPrefix}/signin`;
const signupUrl = `${urlPrefix}/signup`;

type AuthPayload = {
  username: string;
  password: string;
};

const request = (config: AxiosRequestConfig) =>
  axios.request({
    baseURL,
    ...config,
  });

export const loginService = async (payload: AuthPayload) => {
  console.log('login service');

  const response = await request({
    url: loginUrl,
    method: 'POST',
    data: payload,
  });

  return response;
};

export const signupService = async (payload: AuthPayload) => {
  return await request({
    url: signupUrl,
    method: 'POST',
    data: payload,
  });
};

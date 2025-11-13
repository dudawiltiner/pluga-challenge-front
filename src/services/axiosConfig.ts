import axios from 'axios';

export const appsApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APPS_API_URL || 'https://pluga.co',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

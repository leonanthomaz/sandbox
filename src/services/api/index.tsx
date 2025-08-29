import axios from 'axios';

const isDev = import.meta.env.VITE_APP_ENVIRONMENT === 'development';

export const api = axios.create({
  baseURL: isDev
    ? import.meta.env.VITE_API_BASE_URL_SERVER_CHATBOT_DEV
    : import.meta.env.VITE_API_BASE_URL_SERVER_CHATBOT,
});

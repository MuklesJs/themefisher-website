import axios from "axios";
import { getSession } from "next-auth/react";
const Token = process.env.NEXT_PUBLIC_TOKEN;
const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Axios = axios.create({
  baseURL: BackendURL,
  headers: {
    authorization_token: `Bearer ${Token}`,
  },
});

Axios.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});

export default Axios;

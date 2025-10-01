// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://www.waytomeet.site",  // 서버 주소
  withCredentials: true,              // 쿠키 인증 쓰면 필요
});

export default api;

import axios from "./axiosInstance";

const baseurl = "https://b62121fb4076.ngrok-free.app";
const classroomBase = `${baseurl}/user`;

// Login
export const login = (email, password) =>
  axios.post(`${classroomBase}/login`, { email, password });

// Submit code
export const submitCode = (questionId, text, language) =>
  axios.put(`${classroomBase}/submit`, {
    questionId,
    text,
    language
  });

// Run code
export const runCode = (questionId, text, language) =>
  axios.put(`${classroomBase}/run`, {
    questionId,
    text,
    language
  });

// Tab switch
export const tabSwitch = () =>
  axios.put(`${classroomBase}/tabswitch`);

// Copy paste
export const copyPaste = () =>
  axios.put(`${classroomBase}/copypaste`);

// Unlock
export const unlock = (unlockCode) =>
  axios.put(`${classroomBase}/unlock`, null, {
    params: { pass: unlockCode }
  });

// Check if locked
export const isLock = () =>
  axios.get(`${classroomBase}/islock`);

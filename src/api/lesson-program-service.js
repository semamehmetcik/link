import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getLessonProgramsByPage = async (page=0, size=20, sort="day", type="ASC") => {
  const resp = await axios.get(`${baseURL}/lessonPrograms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const getAllLessonPrograms = async () => { 
  const resp = await axios.get(`${baseURL}/lessonPrograms/getAll`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }

 export const getAllUnassignedLessonPrograms = async () => { 
  const resp = await axios.get(`${baseURL}/lessonPrograms/getAllUnassigned`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }

 export const getAllLessonProgramsByTeacher = async () => { 
  const resp = await axios.get(`${baseURL}/lessonPrograms/getAllLessonProgramByTeacher`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }

 export const getAllLessonProgramsByStudent = async () => { 
  const resp = await axios.get(`${baseURL}/lessonPrograms/getAllLessonProgramByStudent`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }


export const getUnassignedPrograms = async () => { 
  const resp = await axios.get(`${baseURL}/lessonPrograms/getAllUnassigned`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }


export const createLessonProgram = async (payload) => { 
  const resp = await axios.post(`${baseURL}/lessonPrograms/save`, payload, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }


 export const deleteLessonProgram = async (id) => { 
  const resp = await axios.delete(`${baseURL}/lessonPrograms/delete/${id}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }


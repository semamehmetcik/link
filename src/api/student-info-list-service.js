import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const getStudentInfoByPage = async (page=0, size=20, sort="name", type="ASC") => {
  const resp = await axios.get(`${baseURL}/studentInfo/getAllForTeacher?page=${page}&size=${size}&sort=${sort}&type=${type}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};


export const deleteStudentInfo = async (id) => { 
  const resp = await axios.delete(`${baseURL}/studentInfo/delete/${id}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
 }
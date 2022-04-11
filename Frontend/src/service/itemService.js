import axios from "axios";
import { backend } from "../config/backend";


const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "",
};

export const itemUploadImage = (data) => {
    return axios.post(`${backend}/images/`, data, {headers: headers})
}

export const itemAddNew = (data) => {
  return axios.post(`${backend}/item/add-new`, { data }, {headers: headers})
}
import axios from "axios";

const baseUrl = "https://vue3-course-api.hexschool.io/v2/";

export function Api({ method, url, data, token }) {
  let baseURL = `${baseUrl}${url}`;

  const config = {
    headers: { Authorization: token },
  };

  switch (method) {
    case "get":
      return axios.get(baseURL, config);
    case "post":
      return axios.post(baseURL, data);
    case "put":
      return axios.put(baseURL, data);
    case "delete":
      return axios.delete(baseURL, data);
    default:
      return axios.get(baseURL);
  }
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function clearCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export default Api;

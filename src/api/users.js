import axios from "axios";

export const getUsers = () => {
  return axios.get("/MOCK_DATA.json", {});
};

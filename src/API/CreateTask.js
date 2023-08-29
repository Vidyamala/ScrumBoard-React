import axios from "axios";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const createTask = async (Details) => {
  try {
    const res = await axios.post(`${BASE_URL}/task`, Details, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(res, "responseCreate");
    return res.data;
  } catch (e) {
    console.log(e.response.data, "EEEEEEEEEEEEEE");
    return { Error: e.response.data.message };
  }
};
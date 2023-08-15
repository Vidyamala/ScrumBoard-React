import axios from "axios";
export const createTask = async (Details) => {
  try {
    const res = await axios.post("http://localhost:8888/task", Details, {
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

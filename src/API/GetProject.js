import axios from "axios";
export const getProject = async () => {
  try {
    const res = await axios.get("http://localhost:8888/project", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(res, "response from reg");
    return res.data;
  } catch (e) {
    console.log(e.response.data, "EEEEEEEEEEEEEE");
    return { Error: e.response.data.message };
  }
};

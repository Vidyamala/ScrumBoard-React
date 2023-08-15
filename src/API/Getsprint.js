import axios from "axios";
export const getSprint = async (project, phase) => {
  try {
    const res = await axios.get(
      `http://localhost:8888/sprint?project=${project}&phase=${phase}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(res, "response from reg");
    return res.data;
  } catch (e) {
    console.log(e.response.data, "EEEEEEEEEEEEEE");
    return { Error: e.response.data.message };
  }
};

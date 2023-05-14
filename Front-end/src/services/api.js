import axios from "axios";

export const api = axios.create({
  baseURL: "",
});

export function uploadCsv(file) {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/clients/csv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

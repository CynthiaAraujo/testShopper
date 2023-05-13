import axios from "axios";

export const api = axios.create({
  baseURL: "https://homolog.planetasec.com.br/prova/front/api/clients",
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

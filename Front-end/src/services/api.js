import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const validateFile = async (data) => {
  const response = await api.post("/prices", data);
  return response.data;
};

export const updatePrices = async (data) => {
  const response = await api.put("/prices", data);
  return response.data;
};

export default api;

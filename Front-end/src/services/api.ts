import axios from "axios";

export interface IValidatedProducts {
  product?: {
    code: number;
    name: string;
    sales_price: number;
    new_price: number | string;
  }
  errorMessage?: string;
}

interface IValidatedProductsResponse {
  validatedProducts: Array<IValidatedProducts>
}

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const validateFile = async (data: FormData) => {
  const response = await api.post<IValidatedProductsResponse>("/prices", data);
  return response.data;
};

export const updatePrices = async (data: IValidatedProductsResponse) => {
  const response = await api.put("/prices", data);
  return response.data;
};

export default api;

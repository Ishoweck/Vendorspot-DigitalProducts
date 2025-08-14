import { api } from "./base";

export const categoriesAPI = {
  getAll: () => api.get<any[]>("/categories"),
};

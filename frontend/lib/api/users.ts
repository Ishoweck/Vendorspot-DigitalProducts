import { api } from "./base";

export const usersAPI = {
  getProfile: () => api.get<any>("/users/profile"),

  updateProfile: (userData: any) => api.put<any>("/users/profile", userData),

  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.post<{ avatar: string }>("/users/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

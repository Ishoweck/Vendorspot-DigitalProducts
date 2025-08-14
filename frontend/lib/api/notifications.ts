import { api } from "./base";

export const notificationsAPI = {
  getAll: () => api.get<{ data: any[]; total: number }>("/notifications"),

  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
};

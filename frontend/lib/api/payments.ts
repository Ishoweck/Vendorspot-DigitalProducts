import { api } from "./base";

export const paymentsAPI = {
  initialize: (paymentData: {
    amount: number;
    email: string;
    reference: string;
  }) =>
    api.post<{ authorization_url: string; reference: string }>(
      "/payments/initialize",
      paymentData
    ),

  verify: (reference: string) =>
    api.post<{ status: string; data: any }>("/payments/verify", { reference }),
};

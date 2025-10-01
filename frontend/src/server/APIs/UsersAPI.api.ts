import { apiClient } from "../Client";

export const UsersApis = {
  async signup({
    signal,
    firstName,
    secondName,
    birthday,
    email,
    password,
    confirmPassword,
  }: {
    signal: AbortSignal;
    firstName: string;
    secondName: string;
    birthday: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return apiClient.post(
      `/signup`,
      {
        firstName,
        secondName,
        birthday,
        email,
        password,
        confirmPassword,
      },
      {
        signal,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  },
  async signin({
    signal,
    email,
    password,
  }: {
    signal: AbortSignal;
    email: string;
    password: string;
  }) {
    return apiClient.post(
      `/signin`,
      {
        email,
        password,
      },
      {
        signal,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  },
};
export default UsersApis;

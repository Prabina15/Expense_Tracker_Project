import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(
  data: RegisterData
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/users/register",
    data
  );

  return response.data;
}

export async function loginUser(
  data: LoginData
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/users/login",
    data
  );

  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get<{
    success: boolean;
    user: { _id: string; id?: string; name: string; email: string };
  }>("/users/me");

  const userData = response.data.user;
  return {
    id: userData.id || userData._id,
    name: userData.name,
    email: userData.email,
  };
}
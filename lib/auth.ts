export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

export const mockLogin = async (payload: LoginPayload): Promise<LoginResponse> => {
  await new Promise((res) => setTimeout(res, 1000));

  if (payload.username === "wrong" || payload.password === "wrong") {
    throw new Error("Invalid credentials");
  }

  return { token: "mock-jwt-token", username: payload.username };
};

import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  user_id: number;
  email: string;
  exp: number;
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token");

  console.log("Stored token:", token);

  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("Decoded token:", decoded);

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

import Cookies from "js-cookie";

export const getAuthToken = (): string | undefined => {
  return Cookies.get("token"); 
};

export const setAuthToken = (token: string): void => {
  Cookies.set("token", token, { expires: 0.0417 });
};

export const removeAuthToken = (): void => {
  Cookies.remove("token"); 
};

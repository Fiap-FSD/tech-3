import Cookies from "js-cookie";

export const getAuthToken = (): string | undefined => {
  return Cookies.get("token"); // Obtém o token do cookie
};

export const setAuthToken = (token: string): void => {
  Cookies.set("token", token, { expires: 7 }); // Define o token com validade de 7 dias
};

export const removeAuthToken = (): void => {
  Cookies.remove("token"); // Remove o token do cookie
};

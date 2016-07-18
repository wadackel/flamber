const isProduction = process.env.NODE_ENV === "production";

export const URL_ROOT = isProduction ? "http://todo.com" : "http://localhost:3000";
export const API_ROOT = `${URL_ROOT}/api`;

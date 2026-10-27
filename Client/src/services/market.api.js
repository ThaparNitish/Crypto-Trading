import api from "./api.js";

export async function getTopMovers() {
  const response = await api.get("/top-movers");
  return response.data;
}
import api from "./api.js";
import { validateTopMoversResponse } from "@/validation/topmovers.validation.js";

export async function getTopMovers() {
  const response = await api.get("/top-movers");
  const data = await response.data;

  return validateTopMoversResponse(data);
}
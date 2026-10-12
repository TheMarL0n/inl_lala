import { fetchAPI } from "../lib/strapi";

export async function getAllPages() {
  const data = await fetchAPI(`/paginas`);
  return data?.data?.[0] || null;
}
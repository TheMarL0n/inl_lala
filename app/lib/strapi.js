// lib/strapi.js
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${STRAPI_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`
      },
      // Puedes ajustar la caché según te convenga (por ejemplo, 'no-store' para datos frescos)
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error(`Error en la API de Strapi: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching Strapi data:', error);
    return null;
  }
}
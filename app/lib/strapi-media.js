export function getStrapiMedia(url) {
  const host = "https://inl-production.up.railway.app"
  if (!url || typeof url !== "string") return null;

  const trimmedUrl = url.trim();
  if (!trimmedUrl) return null;

  if (trimmedUrl.startsWith("http") || trimmedUrl.startsWith("//")) {
    return trimmedUrl;
  }

  // En servidor toma STRAPI_HOST; en cliente usa el host recibido o la variable pública si existe
  const resolvedHost =
    host ||
    process.env.STRAPI_HOST ||
    process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL;

  if (!resolvedHost || typeof resolvedHost !== "string") return null;

  const cleanHost = resolvedHost.trim().replace(/\/+$/, "");
  if (!cleanHost || cleanHost === "undefined") return null;

  const cleanPath = trimmedUrl.startsWith("/") ? trimmedUrl : `/${trimmedUrl}`;
  return `${cleanHost}${cleanPath}`;
}
export default async function sitemap() {
  const baseUrl = 'https://www.institutolala.com.mx';

  // 1. Rutas estáticas
  const staticRoutes = [
    '', // Página de inicio (Home)
    '/paginas/dudas',
    '/paginas/etapas',
    '/paginas/mitos-y-realidades',
    '/paginas/nutricion',
    '/paginas/profesionales',
    '/paginas/sala_prensa',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Rutas dinámicas
  // const mitos = await fetch('https://api.tu-backend.com/mitos').then((res) => res.json());
  // const dynamicMitoRoutes = mitos.map((mito) => ({
  //   url: `${baseUrl}/paginas/mitos-y-realidades/${mito.slug}`,
  //   lastModified: new Date(mito.updatedAt || Date.now()),
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }));

  // Retornamos la combinación de todas las rutas
  return [
    ...staticRoutes,
    // ...dynamicMitoRoutes // Descomenta esto cuando conectes tus datos dinámicos
  ];
}
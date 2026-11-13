import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchAPI } from "@/app/lib/strapi";

export default async function SearchPage({ searchParams }) {
  // 1. Llamamos a ambas APIs en paralelo de forma segura
  let mitos = [];
  let etapas = [];

  try {
    const [responseMitos, responseEtapas] = await Promise.all([
      fetchAPI(`/mitos-y-realidades?populate[0]=imagen_principal`),
      fetchAPI(`/etapas?populate[0]=imagen_principal`),
    ]);
    mitos = responseMitos?.data || [];
    etapas = responseEtapas?.data || [];
  } catch (error) {
    console.error("Error al cargar los datos de Strapi:", error);
  }

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_HOST;

  const formattedMitos = mitos.map((item) => {
    const imgUrl = item.imagen_principal?.url;
    // Si la URL viene relativa (ej: /uploads/...), le anteponemos el dominio de Strapi. Si no hay imagen, usamos el respaldo.
    const fullImageUrl = imgUrl ? (imgUrl.startsWith("http") ? imgUrl : `${STRAPI_URL}${imgUrl}`) : "/images/home_bkg.png";

    return {
      id: `mito-${item.id}`,
      slug: `mitos-y-realidades/${item.slug || item.id}`,
      title: item.mito || item.mito || "Sin título",
      summary: item.resumen || item.realidad || "",
      category: "Mitos y Realidades",
      image: fullImageUrl,
    };
  });

  const formattedEtapas = etapas.map((item) => {
    const imgUrl = item.imagen_principal?.url;
    const fullImageUrl = imgUrl ? (imgUrl.startsWith("http") ? imgUrl : `${STRAPI_URL}${imgUrl}`) : "/images/home_bkg.png";

    return {
      id: `etapa-${item.id}`,
      slug: `etapas/${item.slug || item.id}`,
      title: item.titulo || item.title || "Sin título",
      summary: item.resumen || item.descripcion || "",
      category: "Etapas",
      image: fullImageUrl,
    };
  });

  const allArticles = [...formattedMitos, ...formattedEtapas];

  const resolvedParams = await searchParams;
  const criteria = resolvedParams?.criteria || "";
  const rawQuery = criteria.trim().toLowerCase();

  const results = allArticles.filter((article) => {
    if (!rawQuery) return false;

    const title = article.title.toLowerCase();
    const summary = article.summary.toLowerCase();
    const category = article.category.toLowerCase();

    if (
      title.includes(rawQuery) ||
      summary.includes(rawQuery) ||
      category.includes(rawQuery)
    ) {
      return true;
    }

    const keywords = rawQuery.split(" ").filter((word) => word.length > 2);
    return keywords.some(
      (word) =>
        title.includes(word) ||
        summary.includes(word) ||
        category.includes(word)
    );
  });

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto py-40 px-6">
        {/* Encabezado */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <p className="text-sm uppercase tracking-wider text-[#15428C] font-semibold mb-1">
            Resultados de búsqueda
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {criteria ? (
              <>
                Mostrando resultados para:{" "}
                <span className="text-[#15428C]">"{criteria}"</span>
              </>
            ) : (
              "Ingresa un término para buscar"
            )}
          </h1>
          {criteria && (
            <p className="text-gray-500 mt-2">
              Se encontraron {results.length}{" "}
              {results.length === 1 ? "resultado" : "resultados"}
            </p>
          )}
        </div>

        {/* Estado sin resultados */}
        {results.length === 0 && criteria && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No se encontraron contenidos
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Intenta utilizar palabras clave más generales o verifica la
              ortografía de tu búsqueda.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#15428C] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#0f326c] transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        )}

        {/* Tarjetas de resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
            >
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#009638] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#15428C] transition-colors">
                    <Link href={`/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.summary}
                  </p>
                </div>

                <Link
                  href={`/${article.slug}`}
                  className="text-[#15428C] font-semibold text-sm inline-flex items-center gap-1 hover:underline mt-auto"
                >
                  Leer artículo <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
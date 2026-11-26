import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import BuscadorDudas from "@/app/components/Dudas/BuscadorDudas";
import CategoriasDudas from "@/app/components/Dudas/CategoriasDudas";
import FooterDudas from "@/app/components/Dudas/FooterDudas";
import { Suspense } from "react";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";
import CTAGenerico from "@/app/components/CTAGenerico";
import { getStrapiMedia } from "@/app/lib/strapi-media";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://institutolala.com.mx";
const PAGE_PATH = "/paginas/dudas";
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const hasFilter = Boolean(resolvedSearchParams?.criteria || resolvedSearchParams?.cat);

  const responseContenido = await fetchAPI(
    `/paginas?populate[0]=imagen_principal&populate[1]=imagen_footer`
  );
  const contenidoFromStrapi = responseContenido?.data || [];
  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "dudas");

  const title = data?.titulo || "Resuelve tus dudas";
  const description =
    data?.descripcion ||
    "Respuestas claras y basadas en evidencia científica para comprender el papel de la leche y los productos lácteos en tu salud.";
  const ogImage = getStrapiMedia(data?.imagen_principal?.url);

  return {
    title,
    description,
    alternates: {
      canonical: CANONICAL_URL,
    },
    robots: hasFilter
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
          },
        },
    openGraph: {
      type: "website",
      locale: "es_MX",
      url: CANONICAL_URL,
      siteName: "Instituto de Nutrición Lala",
      title,
      description,
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: data?.imagen_principal?.width || 1200,
            height: data?.imagen_principal?.height || 630,
            alt: data?.imagen_principal?.alternativeText || title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

async function DudasContent({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.criteria?.toLowerCase() || "";

  const [
    responseContenido,
    responseDudas,
    responseCategorias,
    responseMenu,
    responseSociales,
  ] = await Promise.all([
    fetchAPI(`/paginas?populate[0]=imagen_principal&populate[1]=imagen_footer`),
    fetchAPI(`/dudas?populate[0]=imagen_principal&populate[1]=categoria`),
    fetchAPI(`/categoria-dudas?populate[0]=imagen_principal`),
    fetchAPI(`/item-menus`),
    fetchAPI(`/redes-sociales`),
  ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  const allDudasFromStrapi = responseDudas?.data || [];
  const catDudasFromStrapi = responseCategorias?.data || [];
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];
  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "dudas");

  // FILTRADO: Solo filtramos si hay texto en la consulta.
  const dudasFiltradas = query
    ? allDudasFromStrapi.filter((duda) => {
        const tituloDuda = (
          duda.attributes?.titulo ||
          duda.titulo ||
          `${duda.titulo_linea_1 || ""} ${duda.titulo_linea_2 || ""}`
        ).toLowerCase();
        return tituloDuda.includes(query);
      })
    : [];

  // Construcción de entidades FAQ para SEO y motores generativos (GEO)
  const faqEntities = allDudasFromStrapi
    .map((duda) => {
      const pregunta = [duda.titulo_linea_1, duda.titulo_linea_2]
        .filter(Boolean)
        .join(" ")
        .trim() || duda.titulo;
      const respuesta = (duda.descripcion || "").trim();

      if (!pregunta || !respuesta) return null;

      return {
        "@type": "Question",
        name: pregunta,
        acceptedAnswer: {
          "@type": "Answer",
          text: respuesta,
          url: duda.slug ? `${SITE_URL}/paginas/dudas/${duda.slug}` : CANONICAL_URL,
        },
      };
    })
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: data?.titulo || "Resuelve tus dudas",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: data?.titulo || "Resuelve tus dudas",
        description:
          data?.descripcion ||
          "Respuestas claras para comprender el papel de la leche y los productos lácteos en tu salud.",
        inLanguage: "es-MX",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          name: "Instituto de Nutrición Lala",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Instituto de Nutrición Lala",
          url: SITE_URL,
        },
        breadcrumb: {
          "@id": `${CANONICAL_URL}#breadcrumb`,
        },
        about: {
          "@type": "Thing",
          name: "Nutrición láctea, leche y productos lácteos en la salud",
        },
        hasPart: catDudasFromStrapi.map((cat) => ({
          "@type": "DefinedTerm",
          name: cat.titulo,
          url: `${CANONICAL_URL}?cat=${cat.id}`,
        })),
      },
      ...(faqEntities.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${CANONICAL_URL}#faq`,
              mainEntity: faqEntities,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header menuI_tems={menuItems} socialesI_tems={socialesItems}/>
      <PagesJumbotron
        titulo={data?.titulo}
        subtitulo={data?.subtitulo}
        background={data?.imagen_principal}
        titulo_descripcion={data?.titulo_descripcion}
        descripcion={data?.descripcion}
      />
      <BuscadorDudas />

      {/* SECCIÓN DE RESULTADOS DE BÚSQUEDA (Solo aparece si el usuario escribió algo) */}
      {query && (
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#164190]">
            Resultados de búsqueda para: &quot;{resolvedSearchParams.criteria}&quot;
          </h2>

          {dudasFiltradas.length > 0 ? (
            <CTAGenerico array={dudasFiltradas} parent={"dudas"} />
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
              <p className="text-gray-600 text-lg italic">
                No encontramos ninguna duda que coincida con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      )}

      {/* CategoriasDudas se queda intacto mostrando siempre todo el contenido original */}
      <CategoriasDudas
        dudas={allDudasFromStrapi}
        categorias_dudas={catDudasFromStrapi}
      />

      <FooterDudas imagen_footer={data?.imagen_footer} />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default function Dudas({ searchParams }) {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <DudasContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
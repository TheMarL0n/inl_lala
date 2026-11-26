import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import CategoriasEtapas from "@/app/components/Etapas/CategoriasEtapas";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";
import { getStrapiMedia } from "@/app/lib/strapi-media";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://institutolala.com.mx";
const PAGE_PATH = "/paginas/etapas";
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;

const buildEtapaTitle = (item) => {
  if (!item) return "";
  const combined = `${item.titulo_linea_1 || ""} ${item.titulo_linea_2 || ""}`
    .replace(/\s+/g, " ")
    .trim();
  return combined || item.titulo || "";
};

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const hasFilter = Boolean(resolvedSearchParams?.cat || resolvedSearchParams?.criteria);

  const responseContenido = await fetchAPI(`/paginas?populate[0]=imagen_principal`);
  const contenidoFromStrapi = responseContenido?.data || [];
  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "etapas");

  const title = data?.titulo || "Etapas de la vida";
  const description =
    data?.descripcion ||
    "Explora contenidos sobre nutrición y leche y lácteos adaptados a cada etapa de la vida.";
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

// Componente secundario que realiza las peticiones a Strapi de forma asíncrona
async function EtapasContent() {
  const [
    responseContenido,
    responseEtapa,
    responseCategorias,
    responseMenu,
    responseSociales,
  ] = await Promise.all([
    fetchAPI(`/paginas?populate[0]=imagen_principal`),
    fetchAPI(`/etapas?populate[0]=imagen_principal&populate[1]=categoria`),
    fetchAPI(`/categorias-etapas?populate[0]=imagen_principal`),
    fetchAPI(`/item-menus`),
    fetchAPI(`/redes-sociales`),
  ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  const allEtapasFromStrapi = responseEtapa?.data || [];
  const catEtapasFromStrapi = responseCategorias?.data || [];
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];

  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "etapas");

  const pageTitle = data?.titulo || "Etapas de la vida";
  const pageDescription =
    data?.descripcion ||
    "Explora contenidos sobre nutrición y leche y lácteos adaptados a cada etapa de la vida.";

  const itemListElements = allEtapasFromStrapi
    .map((item, index) => {
      const itemTitle = buildEtapaTitle(item);
      if (!itemTitle || !item.slug) return null;
      const itemImage = getStrapiMedia(item?.imagen_principal?.url);

      return {
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/paginas/etapas/${item.slug}`,
        item: {
          "@type": "Article",
          headline: itemTitle,
          url: `${SITE_URL}/paginas/etapas/${item.slug}`,
          ...(item.descripcion && { description: item.descripcion.trim() }),
          ...(item?.categoria?.titulo && {
            articleSection: item.categoria.titulo,
          }),
          ...(itemImage && { image: itemImage }),
          author: {
            "@type": "Organization",
            name: "Instituto de Nutrición Lala",
            url: SITE_URL,
          },
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
            name: pageTitle,
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: pageTitle,
        description: pageDescription,
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
        about: [
          {
            "@type": "Thing",
            name: "Nutrición por etapas de la vida y consumo de lácteos",
          },
          ...catEtapasFromStrapi
            .filter((cat) => cat?.titulo)
            .map((cat) => ({
              "@type": "DefinedTerm",
              name: cat.titulo,
            })),
        ],
        ...(itemListElements.length > 0 && {
          mainEntity: {
            "@id": `${CANONICAL_URL}#itemlist`,
          },
        }),
      },
      ...(itemListElements.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${CANONICAL_URL}#itemlist`,
              name: `Contenidos por ${pageTitle}`,
              numberOfItems: itemListElements.length,
              itemListElement: itemListElements,
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
      <CategoriasEtapas
        etapas={allEtapasFromStrapi}
        categorias={catEtapasFromStrapi}
      />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default function Etapas() {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <EtapasContent />
      </Suspense>
    </main>
  );
}
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import CategoriasNutricion from "@/app/components/Nutricion/CategoriasNutricion";
import { Suspense } from "react";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";
import { getStrapiMedia } from "@/app/lib/strapi-media";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://institutolala.com.mx";
const PAGE_PATH = "/paginas/nutricion";
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;

const buildItemTitle = (item) => {
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
  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "nutricion");

  const title = data?.titulo || "Come mejor, vive mejor";
  const description =
    data?.descripcion ||
    "La alimentación y el papel de la leche y los lácteos como parte de una vida saludable.";
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

// Componente separado que hace el fetch
async function NutricionContent() {
  const [
    responseContenido,
    responseNutricion,
    responseCategorias,
    responseMenu,
    responseSociales,
  ] = await Promise.all([
    fetchAPI(`/paginas?populate[0]=imagen_principal`),
    fetchAPI(`/nutriciones?populate[0]=imagen_principal&populate[1]=categoria`),
    fetchAPI(`/categoria-nutriciones?populate[0]=imagen_principal`),
    fetchAPI(`/item-menus`),
    fetchAPI(`/redes-sociales`),
  ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  const allNutricionFromStrapi = responseNutricion?.data || [];
  const catNutricionFromStrapi = responseCategorias?.data || [];
  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "nutricion"
  );
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];

  const pageTitle = data?.titulo || "Come mejor, vive mejor";
  const pageDescription =
    data?.descripcion ||
    "La alimentación y el papel de la leche y los lácteos como parte de una vida saludable.";

  const itemListElements = allNutricionFromStrapi
    .map((item, index) => {
      const itemTitle = buildItemTitle(item);
      if (!itemTitle || !item.slug) return null;
      const itemImage = getStrapiMedia(item?.imagen_principal?.url);

      return {
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/paginas/nutricion/${item.slug}`,
        item: {
          "@type": "Article",
          headline: itemTitle,
          url: `${SITE_URL}/paginas/nutricion/${item.slug}`,
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
            name: "Alimentación saludable, nutrición y productos lácteos",
          },
          ...catNutricionFromStrapi
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
              name: `Temas de ${pageTitle}`,
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
      <CategoriasNutricion
        nutricion={allNutricionFromStrapi}
        categorias_nutricion={catNutricionFromStrapi}
      />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default function Nutricion() {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <NutricionContent />
      </Suspense>
    </main>
  );
}
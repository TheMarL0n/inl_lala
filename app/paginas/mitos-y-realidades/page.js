import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MitosGrid from "@/app/components/Mitos/MitosGrid";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://institutolala.com.mx";
const PAGE_PATH = "/paginas/mitos-y-realidades";
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;

const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST || "";
  return `${host}${url}`;
};

const buildMitoQuestion = (mito) => {
  if (!mito) return "";
  const combined = `${mito.titulo_linea_1 || ""} ${mito.titulo_linea_2 || ""}`
    .replace(/\s+/g, " ")
    .trim();
  return combined || (mito.titulo || mito.mito || "").trim();
};

const buildMitoAnswer = (mito) => {
  if (!mito) return "";
  const raw =
    mito.respuesta ||
    mito.realidad ||
    mito.descripcion ||
    mito.contenido ||
    "";
  return raw
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`>\[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export async function generateMetadata() {
  const responseContenido = await fetchAPI(`/paginas?populate[0]=imagen_principal`);
  const contenidoFromStrapi = responseContenido?.data || [];
  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "mitos_realidades"
  );

  const title = data?.titulo || "Mitos y realidades";
  const description =
    data?.descripcion ||
    "Aclarando dudas, creencias y mitos alrededor del consumo de lácteos con base en evidencia científica.";
  const ogImage = getStrapiMedia(data?.imagen_principal?.url);

  return {
    title,
    description,
    alternates: {
      canonical: CANONICAL_URL,
    },
    robots: {
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
async function MitosContent() {
  const [responseContenido, responseMitos, responseMenu, responseSociales] =
    await Promise.all([
      fetchAPI(`/paginas?populate[0]=imagen_principal`),
      fetchAPI(`/mitos-y-realidades?populate[0]=imagen_principal`),
      fetchAPI(`/item-menus`),
      fetchAPI(`/redes-sociales`),
    ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  const allMitosFromStrapi = responseMitos?.data || [];
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];

  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "mitos-y-realidades"
  );

  const pageTitle = data?.titulo || "Mitos y realidades";
  const pageDescription =
    data?.descripcion ||
    "Aclarando dudas, creencias y mitos alrededor del consumo de lácteos";

  const faqEntities = allMitosFromStrapi
    .map((mito) => {
      const question = buildMitoQuestion(mito);
      const answer = buildMitoAnswer(mito);
      if (!question || !answer) return null;

      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
          url: CANONICAL_URL,
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
        about: {
          "@type": "Thing",
          name: "Mitos y realidades sobre el consumo de leche y productos lácteos",
        },
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

      <Header menuI_tems={menuItems} />
      <PagesJumbotron
        titulo={data?.titulo}
        subtitulo={data?.subtitulo}
        background={data?.imagen_principal}
        titulo_descripcion={data?.titulo_descripcion}
        descripcion={data?.descripcion}
      />
      <MitosGrid mitos={allMitosFromStrapi} />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default function Mitos() {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <MitosContent />
      </Suspense>
    </main>
  );
}
import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import FormContacto from "@/app/components/FormContacto";
// import NotasList from "@/app/components/Noticias/Notas";
// import RecursosList from "@/app/components/Noticias/Recursos";
// import EventosList from "@/app/components/Noticias/Eventos";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://institutolala.com.mx";
const PAGE_PATH = "/paginas/sala-de-prensa";
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;

const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST || "";
  return `${host}${url}`;
};

export async function generateMetadata() {
  const responseContenido = await fetchAPI(
    `/paginas?populate[0]=imagen_principal&populate[1]=imagen_footer`
  );
  const contenidoFromStrapi = responseContenido?.data || [];
  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "sala-de-prensa"
  );

  const title = data?.titulo || "Sala de Prensa";
  const description =
    data?.descripcion ||
    "Comunicados, materiales institucionales, recursos visuales e información oficial del Instituto de Nutrición Lala.";
  const ogImage = getStrapiMedia(
    data?.imagen_principal?.url || data?.imagen_footer?.url
  );
  const imageSource = data?.imagen_principal?.url
    ? data.imagen_principal
    : data?.imagen_footer;

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
            width: imageSource?.width || 1200,
            height: imageSource?.height || 630,
            alt: imageSource?.alternativeText || title,
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

async function PrensaContent() {
  const [responseContenido, responseMenu, responseSociales] =
    await Promise.all([
      fetchAPI(
        `/paginas?populate[0]=imagen_principal&populate[1]=imagen_footer`
      ),
      fetchAPI(`/item-menus`),
      fetchAPI(`/redes-sociales`),
    ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];
  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "sala-de-prensa"
  );

  const pageTitle = data?.titulo || "Sala de Prensa";
  const pageDescription =
    data?.descripcion ||
    "Comunicados, materiales institucionales, recursos visuales e información oficial del Instituto de Nutrición Lala.";

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
        "@type": "WebPage",
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
          name: "Comunicados, prensa y materiales institucionales del Instituto de Nutrición Lala",
        },
      },
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
      {/* <NotasList />
      <RecursosList />
      <EventosList /> */}
      <FormContacto imagen_footer={data?.imagen_footer} />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default function SalaPrensa() {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <PrensaContent />
      </Suspense>
    </main>
  );
}
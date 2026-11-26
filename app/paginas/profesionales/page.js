import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import TemaDestacado from "@/app/components/Profesionales/TemaDestacado";
import HerramientasMateriales from "@/app/components/Profesionales/HerramientasMateriales";
import Aprende from "@/app/components/Home/Aprende";
import AlianzasColaboraciones from "@/app/components/Profesionales/AlianzasColaboraciones";
import FormContacto from "@/app/components/FormContacto";

import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";
import { getStrapiMedia } from "@/app/lib/strapi-media";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://institutolala.com.mx";
const PAGE_PATH = "/paginas/profesionales";
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;

const buildItemTitle = (item) => {
  if (!item) return "";
  const combined = `${item.titulo_linea_1 || ""} ${item.titulo_linea_2 || ""}`
    .replace(/\s+/g, " ")
    .trim();
  return combined || (item.titulo || item.nombre || "").trim();
};

export async function generateMetadata() {
  const responseContenido = await fetchAPI(
    `/paginas?populate[0]=imagen_principal&populate[1]=tema_destacado&populate[2]=imagen_footer&populate[3]=tema_destacado.imagen`
  );
  const contenidoFromStrapi = responseContenido?.data || [];
  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "profesionales"
  );

  const title = data?.titulo || "Para Profesionales";
  const description =
    data?.descripcion ||
    "Lo último de la ciencia de la leche y lácteos, validado por autoridades científicas.";
  const ogImage = getStrapiMedia(
    data?.imagen_principal?.url || data?.tema_destacado?.imagen?.url
  );
  const imageSource = data?.imagen_principal?.url
    ? data.imagen_principal
    : data?.tema_destacado?.imagen;

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

// Componente separado que hace el fetch
async function ProfesionalesContent() {
  const [
    responseContenido,
    responseElementos,
    responseProfesionales,
    responseMenu,
    responseSociales,
    responseVideos,
    responseColaboradores,
  ] = await Promise.all([
    fetchAPI(
      `/paginas?populate[0]=imagen_principal&populate[1]=tema_destacado&populate[2]=imagen_footer&populate[3]=tema_destacado.imagen`
    ),
    fetchAPI(`/profesionales?populate[0]=imagen_principal&populate[1]=categoria`),
    fetchAPI(`/categoria-profesionales?populate[0]=imagen_principal`),
    fetchAPI(`/item-menus`),
    fetchAPI(`/redes-sociales`),
    fetchAPI(`/videos?populate[0]=miniatura&populate[1]=video`),
    fetchAPI(`/colaboradores?populate[0]=logo`),
  ]);

  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];
  const contenidoFromStrapi = responseContenido?.data || [];
  const allProfesionalesFromStrapi = responseProfesionales?.data || [];
  const allElementosFromStrapi = responseElementos?.data || [];
  const allVideos = responseVideos?.data || [];
  const allColaboradores = responseColaboradores?.data || [];

  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "profesionales"
  );

  const pageTitle = data?.titulo || "Para Profesionales";
  const pageDescription =
    data?.descripcion ||
    "Lo último de la ciencia de la leche y lácteos, validado por autoridades científicas.";

  const herramientasListElements = allElementosFromStrapi
    .map((item, index) => {
      const itemTitle = buildItemTitle(item);
      if (!itemTitle) return null;
      const itemImage = getStrapiMedia(item?.imagen_principal?.url);
      const itemUrl = item.slug
        ? `${SITE_URL}/paginas/profesionales/${item.slug}`
        : CANONICAL_URL;

      return {
        "@type": "ListItem",
        position: index + 1,
        url: itemUrl,
        item: {
          "@type": "CreativeWork",
          name: itemTitle,
          url: itemUrl,
          ...(item.descripcion && { description: item.descripcion.trim() }),
          ...(item?.categoria?.titulo && { genre: item.categoria.titulo }),
          ...(itemImage && { image: itemImage }),
          publisher: {
            "@type": "Organization",
            name: "Instituto de Nutrición Lala",
            url: SITE_URL,
          },
        },
      };
    })
    .filter(Boolean);

  const videoEntities = allVideos
    .map((vid) => {
      const vidTitle = (vid?.titulo || vid?.nombre || "").trim();
      const thumbUrl = getStrapiMedia(vid?.miniatura?.url);
      const contentUrl = getStrapiMedia(vid?.video?.url);
      if (!vidTitle || (!thumbUrl && !contentUrl)) return null;

      return {
        "@type": "VideoObject",
        name: vidTitle,
        description: (vid?.descripcion || vidTitle).trim(),
        ...(thumbUrl && { thumbnailUrl: [thumbUrl] }),
        ...(contentUrl && { contentUrl }),
        ...(vid?.publishedAt && { uploadDate: vid.publishedAt }),
        publisher: {
          "@type": "Organization",
          name: "Instituto de Nutrición Lala",
          url: SITE_URL,
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
        audience: {
          "@type": "Audience",
          audienceType: "Profesionales de la salud y nutrición",
        },
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
            name: "Ciencia de la leche, lácteos y nutrición clínica",
          },
          ...allProfesionalesFromStrapi
            .filter((cat) => cat?.titulo)
            .map((cat) => ({
              "@type": "DefinedTerm",
              name: cat.titulo,
            })),
        ],
        ...(herramientasListElements.length > 0 && {
          mainEntity: {
            "@id": `${CANONICAL_URL}#itemlist`,
          },
        }),
      },
      ...(herramientasListElements.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${CANONICAL_URL}#itemlist`,
              name: `Herramientas y materiales - ${pageTitle}`,
              numberOfItems: herramientasListElements.length,
              itemListElement: herramientasListElements,
            },
          ]
        : []),
      ...videoEntities,
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
      {data?.tema_destacado && (
        <TemaDestacado
          imagen_tema_destacado={data.tema_destacado?.imagen}
          titulo_tema_destacado={data.tema_destacado?.titulo}
          subtitulo_tema_destacado={data.tema_destacado?.subtitulo}
          enlace_tema_destacado={data.tema_destacado?.enlace}
          descripcion_tema_destacado={data.tema_destacado?.descripcion}
        />
      )}
      <HerramientasMateriales
        elementos={allElementosFromStrapi}
        herramientas_materiales={allProfesionalesFromStrapi}
      />

      {allVideos.length > 0 && (
        <Aprende fromPage={true} videos_aprende={allVideos} />
      )}

      {allColaboradores.length > 0 && (
        <AlianzasColaboraciones colaboradores={allColaboradores} />
      )}

      <FormContacto imagen_footer={data?.imagen_footer} />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default function Profesionales() {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <ProfesionalesContent />
      </Suspense>
    </main>
  );
}
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { Suspense } from "react";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";
import { getStrapiMedia } from "@/app/lib/strapi-media";
import SeccionIntroductoria from "@/app/components/Sobre/SeccionIntroductoria";
import SeccionProposito from "@/app/components/Sobre/SeccionProposito";
import SeccionEvolucion from "@/app/components/Sobre/SeccionEvolucion";
import SeccionEquipo from "@/app/components/Sobre/SeccionEquipo";
import SeccionPilares from "@/app/components/Sobre/SeccionPilares";
import SomosSwiper from "@/app/components/Swipers/SomosSwiper";
import SeccionColaboracion from "@/app/components/Sobre/SeccionColaboracion";
import SeccionEspacios from "@/app/components/Sobre/SeccionEspacios";
import FormContacto from "@/app/components/FormContacto";

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
  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "sobre-el-intituto");

  const title = data?.titulo || "Sobre el instituto";
  const description =
    data?.descripcion ||
    "En el Instituto de Nutrición Lala creemos en el poder del conocimiento científico para contribuir a la salud de las personas.";
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

async function SobreContent() {
  const [
    responseContenido,
    responseMiembros,
    responseMenu,
    responseSociales,
    responsePilares,
    responseEspacios,
  ] = await Promise.all([
    fetchAPI(`/paginas?populate[0]=imagen_principal&populate[1]=imagen_footer&populate[2]=pagina_somos&populate[3]=pagina_somos.introduccion_imagen_principal&populate[4]=pagina_somos.evolucion_imagen_principal&populate[5]=pagina_somos.pilares_imagen_principal&populate[6]=pagina_somos.colaboracion_imagen_principal`),
    fetchAPI(`/miembros?populate[0]=imagen_principal`),
    fetchAPI(`/item-menus`),
    fetchAPI(`/redes-sociales`),
    fetchAPI(`/pilares?populate[0]=imagen_principal`),
    fetchAPI(`/espacios-de-impacto?populate[0]=imagen_principal`),
  ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  const menuMiembros = responseMiembros?.data || [];
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];
  const pilaresItems = responsePilares?.data || [];
  const espaciosItems = responseEspacios?.data || [];
  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "sobre-el-intituto");

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
            name: data?.titulo || "Sobre el instituto",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: data?.titulo || "Sobre el instituto",
        description:
          data?.descripcion ||
          "En el Instituto de Nutrición Lala creemos en el poder del conocimiento científico para contribuir a la salud de las personas.",
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
          name: "En el Instituto de Nutrición Lala creemos en el poder del conocimiento científico para contribuir a la salud de las personas.",
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

      <Header menuI_tems={menuItems} socialesI_tems={socialesItems} />
      <PagesJumbotron
        titulo={data?.titulo}
        subtitulo={data?.subtitulo}
        background={data?.imagen_principal}
        titulo_descripcion={data?.titulo_descripcion}
        descripcion={data?.descripcion}
      />
      <div className="custom_article-etapas">
        {
          data?.pagina_somos.introduccion_titulo_1 ?
            <SeccionIntroductoria
              titulo_1={data?.pagina_somos.introduccion_titulo_1}
              titulo_2={data?.pagina_somos.introduccion_titulo_2}
              descripcion={data?.pagina_somos.introduccion_descripcion}
              imagen_principal={data?.pagina_somos.introduccion_imagen_principal}
            />
            :
            ""
        }

        {
          data?.pagina_somos.proposito_titulo_1 ?
            <SeccionProposito
              titulo_1={data?.pagina_somos.proposito_titulo_1}
              titulo_2={data?.pagina_somos.proposito_titulo_2}
              descripcion={data?.pagina_somos.proposito_descripcion}
            />
            :
            ""
        }

        {
          data?.pagina_somos.evolucion_titulo_1 ?
            <SeccionEvolucion
              titulo_1={data?.pagina_somos.evolucion_titulo_1}
              titulo_2={data?.pagina_somos.evolucion_titulo_2}
              descripcion={data?.pagina_somos.evolucion_descripcion}
              imagen_principal={data?.pagina_somos.evolucion_imagen_principal}
            />
            :
            ""
        }

        {
          menuMiembros ?
            <SeccionEquipo contenido={menuMiembros} />
            :
            ""
        }

        {
          data?.pagina_somos.pilares_titulo_1 ?
            <SeccionPilares
              titulo_1={data?.pagina_somos.pilares_titulo_1}
              titulo_2={data?.pagina_somos.pilares_titulo_2}
              descripcion={data?.pagina_somos.pilares_descripcion}
              imagen_principal={data?.pagina_somos.pilares_imagen_principal}
            />
            :
            ""
        }

        {
          pilaresItems.length > 0 ?
            <SomosSwiper contenido={pilaresItems} />
            :
            ""
        }

        {
          data?.pagina_somos.colaboracion_titulo_1 ?
            <SeccionColaboracion
              titulo_1={data?.pagina_somos.colaboracion_titulo_1}
              titulo_2={data?.pagina_somos.colaboracion_titulo_2}
              descripcion={data?.pagina_somos.colaboracion_descripcion}
              imagen_principal={data?.pagina_somos.colaboracion_imagen_principal} />
            :
            ""
        }

        {
          espaciosItems ?
            <SeccionEspacios contenido={espaciosItems} />
            :
            ""
        }

        <FormContacto imagen_footer={data?.imagen_footer} contenido={data?.contenido_contacto} titulo_linea_1={"vinculación y"} />
      </div>
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default function Dudas() {
  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <SobreContent />
      </Suspense>
    </main>
  );
}
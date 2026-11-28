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
// ⚠️ Ajusta esta ruta al path real de la página en Next.js
const PAGE_PATH = "/paginas/sobre-el-instituto"; 
const CANONICAL_URL = `${SITE_URL}${PAGE_PATH}`;
const SLUG_STRAPI = "sobre-el-intituto";

export async function generateMetadata() {
  const responseContenido = await fetchAPI(
    `/paginas?filters[slug][$eq]=${SLUG_STRAPI}&populate[0]=imagen_principal`
  );
  const data = responseContenido?.data?.[0];

  const title = data?.titulo || "Sobre el Instituto | Instituto de Nutrición Lala";
  const description =
    data?.descripcion ||
    "En el Instituto de Nutrición Lala creemos en el poder del conocimiento científico para contribuir a la salud y nutrición de las personas.";
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

async function SobreContent() {
  const [
    responseContenido,
    responseMiembros,
    responseMenu,
    responseSociales,
    responsePilares,
    responseEspacios,
  ] = await Promise.all([
    fetchAPI(
      `/paginas?filters[slug][$eq]=${SLUG_STRAPI}&populate[0]=imagen_principal&populate[1]=imagen_footer&populate[2]=pagina_somos&populate[3]=pagina_somos.introduccion_imagen_principal&populate[4]=pagina_somos.evolucion_imagen_principal&populate[5]=pagina_somos.pilares_imagen_principal&populate[6]=pagina_somos.colaboracion_imagen_principal`
    ),
    fetchAPI(`/miembros?populate[0]=imagen_principal`),
    fetchAPI(`/item-menus`),
    fetchAPI(`/redes-sociales`),
    fetchAPI(`/pilares?populate[0]=imagen_principal`),
    fetchAPI(`/espacios-de-impacto?populate[0]=imagen_principal`),
  ]);

  const data = responseContenido?.data?.[0];
  const somos = data?.pagina_somos;
  const menuMiembros = responseMiembros?.data || [];
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];
  const pilaresItems = responsePilares?.data || [];
  const espaciosItems = responseEspacios?.data || [];

  const pageTitle = data?.titulo || "Sobre el instituto";
  const pageDescription =
    data?.descripcion ||
    "En el Instituto de Nutrición Lala creemos en el poder del conocimiento científico para contribuir a la salud de las personas.";

  // Schema optimizado para GEO (AboutPage + ResearchOrganization + Equipo)
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
        "@type": "AboutPage",
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
        breadcrumb: {
          "@id": `${CANONICAL_URL}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${SITE_URL}#organization`,
        },
      },
      {
        "@type": ["Organization", "ResearchOrganization"],
        "@id": `${SITE_URL}#organization`,
        name: "Instituto de Nutrición Lala",
        url: SITE_URL,
        description: somos?.proposito_descripcion || pageDescription,
        knowsAbout: [
          "Nutrición",
          "Ciencia de los alimentos",
          "Salud pública",
          "Investigación científica en nutrición",
          "Alimentación saludable",
        ],
        ...(menuMiembros.length > 0 && {
          member: menuMiembros.map((miembro) => ({
            "@type": "Person",
            name: miembro.nombre || miembro.titulo,
            ...(miembro.puesto && { jobTitle: miembro.puesto }),
          })),
        }),
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
      <main>
        <PagesJumbotron
          titulo={data?.titulo}
          subtitulo={data?.subtitulo}
          background={data?.imagen_principal}
          titulo_descripcion={data?.titulo_descripcion}
          descripcion={data?.descripcion}
        />
        <div className="custom_article-etapas">
          {somos?.introduccion_titulo_1 && (
            <SeccionIntroductoria
              titulo_1={somos.introduccion_titulo_1}
              titulo_2={somos.introduccion_titulo_2}
              descripcion={somos.introduccion_descripcion}
              imagen_principal={somos.introduccion_imagen_principal}
            />
          )}

          {somos?.proposito_titulo_1 && (
            <SeccionProposito
              titulo_1={somos.proposito_titulo_1}
              titulo_2={somos.proposito_titulo_2}
              descripcion={somos.proposito_descripcion}
            />
          )}

          {somos?.evolucion_titulo_1 && (
            <SeccionEvolucion
              titulo_1={somos.evolucion_titulo_1}
              titulo_2={somos.evolucion_titulo_2}
              descripcion={somos.evolucion_descripcion}
              imagen_principal={somos.evolucion_imagen_principal}
            />
          )}

          {menuMiembros.length > 0 && <SeccionEquipo contenido={menuMiembros} />}

          {somos?.pilares_titulo_1 && (
            <SeccionPilares
              titulo_1={somos.pilares_titulo_1}
              titulo_2={somos.pilares_titulo_2}
              descripcion={somos.pilares_descripcion}
              imagen_principal={somos.pilares_imagen_principal}
            />
          )}

          {pilaresItems.length > 0 && <SomosSwiper contenido={pilaresItems} />}

          {somos?.colaboracion_titulo_1 && (
            <SeccionColaboracion
              titulo_1={somos.colaboracion_titulo_1}
              titulo_2={somos.colaboracion_titulo_2}
              descripcion={somos.colaboracion_descripcion}
              imagen_principal={somos.colaboracion_imagen_principal}
            />
          )}

          {espaciosItems.length > 0 && <SeccionEspacios contenido={espaciosItems} />}

          <FormContacto
            imagen_footer={data?.imagen_footer}
            contenido={data?.contenido_contacto}
            titulo_linea_1={"vinculación y"}
          />
        </div>
      </main>
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default function SobreElInstituto() {
  return (
    <Suspense fallback={<Skeleton />}>
      <SobreContent />
    </Suspense>
  );
}
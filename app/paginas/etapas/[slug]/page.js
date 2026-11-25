// etapas/[slug]/page.js
import { Suspense } from "react";
import BlueGrid from "@/app/components/BlueGrid";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CTAGenerico from "@/app/components/CTAGenerico";
import ContenidoDestacado from "@/app/components/Etapas/ContenidoDestacado";
import EnlacesEtapas from "@/app/components/Etapas/EnlacesEtapas";
import SingleEtapaMain from "@/app/components/Etapas/SingleEtapaMain";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MitosSwiper from "@/app/components/Home/MitosSwiper";
import PagesSmallJumbotron from "@/app/components/PagesSmallJumbotron";
import PageTitle from "@/app/components/PageTitle";
import PaginasNavegacion from "@/app/components/PaginasNavegacion";
import Referencias from "@/app/components/Referencias";
import DobleFotoSwiper from "@/app/components/Swipers/DobleFotoSwiper";
import SimpleSwiper from "@/app/components/Swipers/SimpleSwiper";
import VerticalSwiper from "@/app/components/Swipers/VerticalSwiper";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://institutolala.com.mx";

const stripHtmlAndMarkdown = (text = "") =>
  text
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`>\[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const buildEtapaTitle = (item) => {
  if (!item) return "";
  const combined = `${item.titulo_linea_1 || ""} ${item.titulo_linea_2 || ""}`
    .replace(/\s+/g, " ")
    .trim();
  return combined || item.titulo || "";
};

const extractSummaryText = (item) => {
  if (item?.descripcion?.trim()) {
    return item.descripcion.trim();
  }
  const bloques = Array.isArray(item?.contenido) ? item.contenido : [];
  for (const bloque of bloques) {
    const raw =
      bloque?.html ||
      bloque?.contenido ||
      (Array.isArray(bloque?.diapositiva)
        ? bloque.diapositiva.map((d) => d?.contenido || "").join(" ")
        : "");
    const limpio = stripHtmlAndMarkdown(raw);
    if (limpio) {
      return limpio.slice(0, 320);
    }
  }
  return "";
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const canonicalUrl = `${SITE_URL}/paginas/etapas/${slug}`;

  const responseEtapa = await fetchAPI(
    `/etapas?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=imagen_principal&populate[1]=categoria`
  );
  const etapaData = responseEtapa?.data?.[0];

  if (!etapaData) {
    return {
      title: "Etapa no encontrada",
      description:
        "Explora contenidos sobre nutrición y leche y lácteos adaptados a cada etapa de la vida en el Instituto de Nutrición Lala.",
      robots: { index: false, follow: false },
    };
  }

  const title = buildEtapaTitle(etapaData) || "Etapas de la vida";
  const description =
    extractSummaryText(etapaData) ||
    `Información sobre nutrición y consumo de lácteos en ${title}, publicada por el Instituto de Nutrición Lala.`;
  const ogImage = getStrapiMedia(etapaData?.imagen_principal?.url);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
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
      type: "article",
      locale: "es_MX",
      url: canonicalUrl,
      siteName: "Instituto de Nutrición Lala",
      title,
      description,
      ...(etapaData?.publishedAt && { publishedTime: etapaData.publishedAt }),
      ...(etapaData?.updatedAt && { modifiedTime: etapaData.updatedAt }),
      ...(etapaData?.categoria?.titulo && { section: etapaData.categoria.titulo }),
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: etapaData?.imagen_principal?.width || 1200,
            height: etapaData?.imagen_principal?.height || 630,
            alt: etapaData?.imagen_principal?.alternativeText || title,
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

// Componente secundario que realiza los fetch pesados de la etapa y su contenido
async function EtapaContent({ slug }) {
  const [responseEtapa, responseTodas, responseCategorias, responseMenu, responseSociales] =
    await Promise.all([
      fetchAPI(
        `/etapas?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=imagen_principal&populate[1]=contenido&populate[2]=contenido.diapositiva&populate[3]=contenido.diapositiva.imagen&populate[4]=contenido.diapositiva.imagen_izquierda&populate[5]=contenido.diapositiva.imagen_derecha&populate[6]=categoria&populate[7]=contenido.imagen_destacada&populate[8]=contenido.imagen_izquierda&populate[9]=contenido.imagen_derecha`
      ),
      fetchAPI(`/etapas?populate[0]=imagen_principal&populate[1]=categoria`),
      fetchAPI(`/categorias-etapas`),
      fetchAPI(`/item-menus`),
      fetchAPI(`/redes-sociales`),
    ]);

  const currentEtapaData = responseEtapa?.data?.[0];
  if (!currentEtapaData) {
    return <div className="py-20 text-center">Etapa no encontrada</div>;
  }

  const currentEtapa = {
    id: currentEtapaData.id,
    ...currentEtapaData,
  };
  const allEtapasFromStrapi = responseTodas?.data || [];
  const catEtapasFromStrapi = responseCategorias?.data || [];
  const background = currentEtapa?.imagen_principal || "";
  const cat_id = currentEtapa?.categoria?.id || "";
  const title = buildEtapaTitle(currentEtapa);
  const title_linea_1 = currentEtapa?.titulo_linea_1 || "";
  const title_linea_2 = currentEtapa?.titulo_linea_2 || "";
  const referencias = currentEtapa?.Referencias || "";
  const contenido = currentEtapa?.contenido || [];
  const titulo_mitos = "Mitos frecuentes durante el embarazo y la lactancia...";
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];

  // Filtramos las etapas relacionadas
  const etapasRelacionadas = allEtapasFromStrapi.filter(
    (item) => item?.categoria?.id === cat_id && item.id !== currentEtapa?.id
  );

  const canonicalUrl = `${SITE_URL}/paginas/etapas/${slug}`;
  const parentUrl = `${SITE_URL}/paginas/etapas`;
  const summaryText = extractSummaryText(currentEtapa);
  const imageUrl = getStrapiMedia(currentEtapa?.imagen_principal?.url);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
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
            name: "Etapas de la vida",
            item: parentUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title || slug,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        headline: title || slug,
        ...(summaryText && { description: summaryText }),
        inLanguage: "es-MX",
        ...(currentEtapa?.publishedAt && { datePublished: currentEtapa.publishedAt }),
        ...(currentEtapa?.updatedAt && { dateModified: currentEtapa.updatedAt }),
        ...(currentEtapa?.categoria?.titulo && {
          articleSection: currentEtapa.categoria.titulo,
          about: {
            "@type": "Thing",
            name: currentEtapa.categoria.titulo,
          },
        }),
        ...(imageUrl && {
          image: {
            "@type": "ImageObject",
            url: imageUrl,
            ...(currentEtapa?.imagen_principal?.width && {
              width: currentEtapa.imagen_principal.width,
            }),
            ...(currentEtapa?.imagen_principal?.height && {
              height: currentEtapa.imagen_principal.height,
            }),
          },
        }),
        author: {
          "@type": "Organization",
          name: "Instituto de Nutrición Lala",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Instituto de Nutrición Lala",
          url: SITE_URL,
        },
        breadcrumb: {
          "@id": `${canonicalUrl}#breadcrumb`,
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
      <PagesSmallJumbotron background={background} />
      <Breadcrumbs
        title={title}
        parent={"Etapas de la vida"}
        url={`/paginas/etapas`}
      />
      <EnlacesEtapas cat_id={cat_id} categorias_etapas={catEtapasFromStrapi} />

      <article className="custom_article-etapas">
        <PageTitle
          title_linea_1={title_linea_1}
          title_linea_2={title_linea_2}
        />

        {contenido.map((item, idx) => {
          if (item.__component === "contenido-principal.carrusel") {
            return (
              <SimpleSwiper
                key={idx}
                contenido={item.diapositiva || []}
                tipo={item.tipo}
                diapositivas={item.diapositivas_por_vista}
              />
            );
          }

          if (item.__component === "contenido-principal.mitos-y-realidades") {
            return (
              <MitosSwiper
                key={idx}
                contenido={item.diapositiva || []}
                alternative={true}
                titulo_mitos={titulo_mitos}
              />
            );
          }

          if (item.__component === "contenido-principal.carrusel-compuesto") {
            return (
              <DobleFotoSwiper
                key={idx}
                contenido={item.diapositiva || []}
                tipo={item.tipo}
              />
            );
          }

          if (item.__component === "contenido-principal.navegacion-vertical") {
            return (
              <VerticalSwiper key={idx} contenido={item.diapositiva || []} />
            );
          }

          if (item.__component === "contenido-principal.cuadricula") {
            return (
              <BlueGrid
                key={idx}
                contenido={item.diapositiva || []}
                tipo={item.tipo || []}
                titulo_columna_1={item.titulo_columna_1 || ""}
                titulo_columna_2={item.titulo_columna_2 || ""}
                titulo_columna_3={item.titulo_columna_3 || ""}
              />
            );
          }

          if (item.__component === "contenido-principal.destacado") {
            return <ContenidoDestacado key={idx} contenido={item} />;
          }

          return (
            <SingleEtapaMain
              key={idx}
              contenido={item.html}
              float={item.float}
            />
          );
        })}
      </article>

      {etapasRelacionadas.length > 0 && (
        <CTAGenerico array={etapasRelacionadas} parent={"etapas"} />
      )}

      <Referencias contenido={referencias} />

      <PaginasNavegacion
        themes={allEtapasFromStrapi}
        parent_url={"etapas"}
        currentTheme={currentEtapa}
      />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default async function Etapa_Pagina({ params }) {
  const resolvedParams = await params;
  return (
    <main>
      {/* El contenido complejo y pesado de Strapi fluye con Suspense */}
      <Suspense fallback={<Skeleton />}>
        <EtapaContent slug={resolvedParams.slug} />
      </Suspense>
    </main>
  );
}
// mitos-y-realidades/[slug]/page.js
import { Suspense } from "react";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MitosSwiper from "@/app/components/Home/MitosSwiper";
import BuscadorMitos from "@/app/components/Mitos/BuscadorMitos";
import Referencias from "@/app/components/Referencias";
import SingleMitoMain from "@/app/components/Mitos/SingleMitoMain";
import PagesSmallJumbotron from "@/app/components/PagesSmallJumbotron";
import PaginasNavegacion from "@/app/components/PaginasNavegacion";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://institutolala.com.mx";

const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST || "";
  return `${host}${url}`;
};

const stripHtmlAndMarkdown = (text = "") =>
  text
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`>\[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const canonicalUrl = `${SITE_URL}/paginas/mitos-y-realidades/${slug}`;

  const responseMito = await fetchAPI(
    `/mitos-y-realidades?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=imagen_principal`
  );
  const mitoData = responseMito?.data?.[0];

  if (!mitoData) {
    return {
      title: "Mito o realidad no encontrado",
      description:
        "Aclarando dudas, creencias y mitos alrededor del consumo de lácteos en el Instituto de Nutrición Lala.",
      robots: { index: false, follow: false },
    };
  }

  const title = (mitoData?.mito || "Mitos y realidades").trim();
  const cleanReality = stripHtmlAndMarkdown(mitoData?.realidad || "");
  const description = cleanReality
    ? cleanReality.slice(0, 160)
    : `Conoce la evidencia científica detrás del mito: "${title}", analizado por el Instituto de Nutrición Lala.`;
  const ogImage = getStrapiMedia(mitoData?.imagen_principal?.url);

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
      section: "Mitos y realidades",
      ...(mitoData?.publishedAt && { publishedTime: mitoData.publishedAt }),
      ...(mitoData?.updatedAt && { modifiedTime: mitoData.updatedAt }),
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: mitoData?.imagen_principal?.width || 1200,
            height: mitoData?.imagen_principal?.height || 630,
            alt: mitoData?.imagen_principal?.alternativeText || title,
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

// Componente secundario que hace el fetch pesado
async function MitoContent({ slug }) {
  const [responseMito, responseTodos, responseMenu, responseSociales] =
    await Promise.all([
      fetchAPI(
        `/mitos-y-realidades?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=imagen_principal`
      ),
      fetchAPI(`/mitos-y-realidades?populate[0]=imagen_principal`),
      fetchAPI(`/item-menus`),
      fetchAPI(`/redes-sociales`),
    ]);

  const currentMitoData = responseMito?.data?.[0];
  if (!currentMitoData) {
    return (
      <div className="py-20 text-center">Mito o realidad no encontrado</div>
    );
  }

  const currentMito = {
    id: currentMitoData.id,
    ...currentMitoData,
  };
  const allMitosFromStrapi = responseTodos?.data || [];

  const title = currentMito.mito || "";
  const reality = currentMito.realidad || "";
  const main_image = currentMito.imagen_principal || "";
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];

  const canonicalUrl = `${SITE_URL}/paginas/mitos-y-realidades/${slug}`;
  const parentUrl = `${SITE_URL}/paginas/mitos-y-realidades`;
  const cleanReality = stripHtmlAndMarkdown(reality);
  const imageUrl = getStrapiMedia(main_image?.url);

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
            name: "Mitos y realidades",
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
        ...(cleanReality && { description: cleanReality.slice(0, 320) }),
        inLanguage: "es-MX",
        articleSection: "Mitos y realidades",
        ...(currentMito?.publishedAt && { datePublished: currentMito.publishedAt }),
        ...(currentMito?.updatedAt && { dateModified: currentMito.updatedAt }),
        ...(imageUrl && {
          image: {
            "@type": "ImageObject",
            url: imageUrl,
            ...(main_image?.width && { width: main_image.width }),
            ...(main_image?.height && { height: main_image.height }),
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
      ...(title && cleanReality
        ? [
            {
              "@type": "ClaimReview",
              "@id": `${canonicalUrl}#claimreview`,
              url: canonicalUrl,
              claimReviewed: title,
              reviewBody: cleanReality,
              ...(currentMito?.publishedAt && {
                datePublished: currentMito.publishedAt,
              }),
              author: {
                "@type": "Organization",
                name: "Instituto de Nutrición Lala",
                url: SITE_URL,
              },
              reviewRating: {
                "@type": "Rating",
                alternateName: "Evidencia científica sobre lácteos",
              },
            },
            {
              "@type": "QAPage",
              "@id": `${canonicalUrl}#qapage`,
              mainEntity: {
                "@type": "Question",
                name: title,
                text: title,
                answerCount: 1,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: cleanReality,
                  url: canonicalUrl,
                  author: {
                    "@type": "Organization",
                    name: "Instituto de Nutrición Lala",
                    url: SITE_URL,
                  },
                },
              },
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
      <PagesSmallJumbotron background={main_image} />
      <article>
        <Breadcrumbs
          title={title}
          parent={"Mitos y realidades"}
          url={`/paginas/mitos-y-realidades`}
        />
        <SingleMitoMain image={main_image} title={title} reality={reality} />
      </article>

      <MitosSwiper
        contenido={allMitosFromStrapi}
        alternative={true}
        currentSlug={currentMito.slug}
      />

      <BuscadorMitos themes={allMitosFromStrapi} />
      <Referencias contenido={currentMito.referencias} />

      <PaginasNavegacion
        themes={allMitosFromStrapi}
        parent_url={"mitos-y-realidades"}
        currentTheme={currentMito}
      />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </>
  );
}

export default async function Mito_Realidad({ params }) {
  const resolvedParams = await params;

  return (
    <main>
      <Suspense fallback={<Skeleton />}>
        <MitoContent slug={resolvedParams.slug} />
      </Suspense>
    </main>
  );
}
import Footer from "./components/Footer";
import Header from "./components/Header";
import Aprende from "./components/Home/Aprende";
import Dudas from "./components/Home/Dudas";
import HomeMitosSwiper from "./components/Home/HomeMitosSwiper";
import Nutricion from "./components/Home/Nutricion";
import Preguntas from "./components/Home/Preguntas";
import Profesionales from "./components/Home/Profesionales";
import HomeJumbotron from "./components/HomeJumbotron";
import { fetchAPI } from "@/app/lib/strapi";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Instituto de Nutrición Lala | Nutrición basada en evidencia",
  description:
    "Lo que comes importa, entenderlo también. Información confiable sobre nutrición, etapas de la vida, mitos y realidades, y recursos para profesionales.",
  alternates: {
    canonical: "https://www.institutolala.com.mx",
  },
  openGraph: {
    title: "Instituto de Nutrición Lala",
    description:
      "Lo que comes importa, entenderlo también. Nutrición, mitos y realidades y recursos respaldados.",
    url: "https://www.institutolala.com.mx",
    siteName: "Instituto de Nutrición Lala",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "https://www.institutolala.com.mx/og-home.png",
        width: 1200,
        height: 630,
        alt: "Instituto de Nutrición Lala",
      },
    ],
  },
  keywords: [
    "Instituto de Nutrición Lala",
    "nutrición",
    "alimentación saludable",
    "mitos y realidades de nutrición",
    "salud y nutrición en México",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Instituto de Nutrición Lala",
    description: "Lo que comes importa, entenderlo también.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home() {
  const [responseContenido, responseMitos, responseMenu, responseSociales, responseVideos] = await Promise.all(
    [
      fetchAPI(`/paginas?populate[0]=imagen_principal&populate[1]=imagen_footer&populate[2]=imagen_sobre_inl&populate[3]=imagen_dudas&populate[4]=imagen_profesionales`),
      fetchAPI(`/mitos-y-realidades?populate[0]=imagen_principal`),
      fetchAPI(`/item-menus`),
      fetchAPI(`/redes-sociales`),
      fetchAPI(`/videos?populate[0]=miniatura&populate[1]=video`),
    ]
  )
  const contenidoFromStrapi = responseContenido?.data || [];
  const allMitosFromStrapi = responseMitos?.data || [];
  const menuItems = responseMenu?.data || [];
  const socialesItems = responseSociales?.data || [];
  const allVideos = responseVideos?.data || [];
  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "inicio");

  const socialUrls = socialesItems
    .map((item) => {
      const attrs = item?.attributes ?? item;
      return attrs?.url ?? attrs?.link ?? attrs?.href ?? "";
    })
    .filter((url) => typeof url === "string" && /^https:\/\//i.test(url.trim()))
    .map((url) => url.trim());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": "https://www.institutolala.com.mx/#organization",
    name: "Instituto de Nutrición Lala",
    url: "https://www.institutolala.com.mx",
    logo: {
      "@type": "ImageObject",
      url: "https://www.institutolala.com.mx/logo.svg",
    },
    description: "Lo que comes importa, entenderlo también.",
    areaServed: {
      "@type": "Country",
      name: "México",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de México",
      addressCountry: "MX",
    },
    knowsAbout: [
      "Nutrición",
      "Alimentación saludable",
      "Mitos y realidades sobre nutrición",
      "Nutrición por etapas de la vida",
    ],
    ...(socialUrls.length > 0 ? { sameAs: Array.from(new Set(socialUrls)) } : {}),
  };

  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <Header menuI_tems={menuItems} socialesI_tems={socialesItems}/>
      <HomeJumbotron titulo={data.titulo} subtitulo={data.subtitulo} />
      <Nutricion titulo_1={data.titulo_sobre_inl_1} titulo_2={data.titulo_sobre_inl_2} contenido={data.contenido_sobre_inl} imagen_destacada={data.imagen_sobre_inl} />
      <Dudas titulo_1={data.titulo_dudas_1} titulo_2={data.titulo_dudas_2} contenido={data.contenido_dudas} imagen_destacada={data.imagen_dudas} />
      <br /><br />

      {
        allVideos.length > 0 ?
          <Aprende titulo_video={data.titulo_videos} videos_aprende={allVideos} />
          :
          ""
      }


      <Preguntas titulo_1={data.titulo_nutricion_1} titulo_2={data.titulo_nutricion_2} />
      <HomeMitosSwiper titulo_1={data.titulo_mitos_1} titulo_2={data.titulo_mitos_2} contenido={allMitosFromStrapi} />
      <Profesionales titulo_profesionales={data.titulo_profesionales} contenido={data.contenido_profesionales} imagen_destacada={data.imagen_profesionales} />
      <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
    </main>
  );
}
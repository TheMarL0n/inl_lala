import Footer from "./components/Footer";
import Header from "./components/Header";
import Aprende from "./components/Home/Aprende";
import Dudas from "./components/Home/Dudas";
import MitosSwiper from "./components/Home/MitosSwiper";
import Nutricion from "./components/Home/Nutricion";
import Preguntas from "./components/Home/Preguntas";
import Profesionales from "./components/Home/Profesionales";
import HomeJumbotron from "./components/HomeJumbotron";

import { fetchAPI } from "@/app/lib/strapi";

// 1. Ejecutamos ambas peticiones en paralelo para optimizar tiempos
  const response = await fetchAPI(`/mitos-y-realidades?populate[0]=imagen_principal`);
  const allMitosFromStrapi = response?.data || [];

export default async function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    'name': 'Instituto de Nutrición Lala',
    'url': 'https://www.institutolala.com.mx',
    'logo': 'https://www.institutolala.com.mx/logo.svg',
    'description': 'Lo que comes importa, entenderlo también.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Ciudad de México',
      'addressCountry': 'MX'
    },
    'sameAs': [
      // Enlaces oficiales de redes sociales de tu instituto
    ]
  };

  return (
    <main>
      {console.log(allMitosFromStrapi)}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <HomeJumbotron />
      <Nutricion />
      <Dudas />
      <Aprende />
      <Preguntas />
      <MitosSwiper contenido={allMitosFromStrapi} />
      <Profesionales />
      <Footer />
    </main>
  );
}
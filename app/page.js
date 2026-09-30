import Footer from "./components/Footer";
import Header from "./components/Header";
import Aprende from "./components/Home/Aprende";
import Dudas from "./components/Home/Dudas";
import Mitos from "./components/Home/Mitos";
import Nutricion from "./components/Home/Nutricion";
import Preguntas from "./components/Home/Preguntas";
import Profesionales from "./components/Home/Profesionales";
import HomeJumbotron from "./components/HomeJumbotron";

export default function Home() {

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
      <Mitos />
      <Profesionales />
      <Footer />
    </main>
  );
}
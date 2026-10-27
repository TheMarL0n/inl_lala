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

const Mito_Realidad = async ({ params }) => {
  const resolvedParams = await params;
 
  // 1. Ejecutamos ambas peticiones en paralelo para optimizar tiempos
  const [responseMito, responseTodos] = await Promise.all([
    fetchAPI(
      `/mitos-y-realidades?filters[slug][$eq]=${resolvedParams.slug}&populate[0]=imagen_principal`,
    ),
    fetchAPI(`/mitos-y-realidades?populate[0]=imagen_principal`)
  ]);

  const currentMitoData = responseMito?.data?.[0];
  if (!currentMitoData) {
    return <div>Etapa no encontrada</div>;
  }
  const currentMito = {
    id: currentMitoData.id,
    ...currentMitoData,
  };
  const allMitosFromStrapi = responseTodos?.data || [];

  const title = currentMito ? currentMito.mito : "";
  const reality = currentMito ? currentMito.realidad : "";
  const main_image = currentMito ? currentMito.imagen_principal : "";
  const date = currentMito ? currentMito.date : "";
  const author = currentMito ? currentMito.author : "";
  const background = "/images/mitos/mitos_bkg.png";
  const baseUrl = "https://www.institutolala.com.mx";
  const currentUrl = `${baseUrl}/paginas/mitos-y-realidades/${resolvedParams.slug}`;


  return (
    <main>
      <Header />
      <article>
        <PagesSmallJumbotron background={background} />
        <Breadcrumbs
          title={title}
          parent={"Mitos y realidades"}
          url={`/paginas/mitos-y-realidades`}
        />
        <SingleMitoMain image={main_image} title={title} reality={reality} />
      </article>

      {console.log(currentMito)}

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
      <Footer />
    </main>
  );
};
export default Mito_Realidad;

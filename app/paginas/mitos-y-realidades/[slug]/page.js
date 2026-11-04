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

// Componente secundario que hace el fetch pesado
async function MitoContent({ slug }) {
  const [responseMito, responseTodos] = await Promise.all([
    fetchAPI(
      `/mitos-y-realidades?filters[slug][$eq]=${slug}&populate[0]=imagen_principal`,
    ),
    fetchAPI(`/mitos-y-realidades?populate[0]=imagen_principal`),
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

  return (
    <>
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
    </>
  );
}

// Esqueleto de carga ligero mientras Strapi responde
function MitoSkeleton() {
  return (
    <div className="w-full flex flex-col items-center justify-center -mt-10 sm:-mt-15 px-6 relative z-2">
      <div className="w-full sm:w-7xl mx-auto bg-white p-4">
        <div className="w-full animate-pulse flex flex-col items-start space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 max-w-lg"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 max-w-md"></div>
          <div className="w-full h-64 bg-gray-200 rounded-xl mt-8"></div>
        </div>
      </div>
    </div>
  );
}

export default async function Mito_Realidad({ params }) {
  const resolvedParams = await params;
  const background = "/images/mitos/mitos_bkg.png";

  return (
    <main>
      <Header />
      {/* El Jumbotron se pinta al instante junto con el Header */}
      <PagesSmallJumbotron background={background} />

      {/* Todo el contenido que depende de la API se carga mediante Suspense */}
      <Suspense fallback={<MitoSkeleton />}>
        <MitoContent slug={resolvedParams.slug} />
      </Suspense>
      
      <Footer />
    </main>
  );
}

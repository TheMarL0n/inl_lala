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
    </>
  );
}

export default async function Mito_Realidad({ params }) {
  const resolvedParams = await params;

  return (
    <main>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <MitoContent slug={resolvedParams.slug} />
      </Suspense>      
      <Footer />
    </main>
  );
}

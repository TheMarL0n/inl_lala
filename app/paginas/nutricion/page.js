import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import CategoriasNutricion from "@/app/components/Nutricion/CategoriasNutricion";
import { Suspense } from "react";
import { fetchAPI } from "@/app/lib/strapi";

export const metadata = {
  title: "Come mejor, vive mejor",
  description:
    "La alimentación y el papel de la leche y los lácteos como parte de una vida saludable",
};

// Componente separado que hace el fetch
async function NutricionContent() {
  const [responseContenido, responseNutricion, responseCategorias] =
    await Promise.all([
      fetchAPI(`/paginas?populate[0]=imagen_principal`),
      //fetchAPI(`/dudas?populate[0]=imagen_principal&populate[1]=categoria`),
      //fetchAPI(`/categoria-nutricion?populate[0]=imagen_principal`),
    ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  //const allNutricionFromStrapi = responseNutricion?.data || [];
  //const catNutricionFromStrapi = responseCategorias?.data || [];
  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "nutricion",
  );

  return (
    <>
      <PagesJumbotron
        titulo={data.titulo}
        subtitulo={data.subtitulo}
        background={data.imagen_principal}
        titulo_descripcion={data.titulo_descripcion}
        descripcion={data.descripcion}
      />
      <CategoriasNutricion />
      <Footer />
    </>
  );
}

// Esqueleto de carga mientras responde la API
function NutricionSkeleton() {
  return (
    <div className="w-full py-20 flex justify-center items-center">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-300 rounded w-48"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-96"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Nutricion() {
  return (
    <main>
      <Header />
      <Suspense fallback={<NutricionSkeleton />}>
        <NutricionContent />
      </Suspense>
    </main>
  );
}

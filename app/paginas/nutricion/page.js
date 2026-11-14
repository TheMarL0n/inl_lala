import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import CategoriasNutricion from "@/app/components/Nutricion/CategoriasNutricion";
import { Suspense } from "react";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";

export const dynamic = 'force-dynamic';

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

export default function Nutricion() {
  return (
    <main>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <NutricionContent />
      </Suspense>
    </main>
  );
}

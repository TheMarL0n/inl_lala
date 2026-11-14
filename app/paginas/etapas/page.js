import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import CategoriasEtapas from "@/app/components/Etapas/CategoriasEtapas";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Etapas de la vida",
  description: "Explora contenidos sobre nutrición y leche y lácteos adaptados a cada etapa de la vida.",
};

// Componente secundario que realiza las peticiones a Strapi de forma asíncrona
async function EtapasContent() {
  const [responseContenido, responseEtapa, responseCategorias] = await Promise.all([
    fetchAPI(`/paginas?populate[0]=imagen_principal`),
    fetchAPI(`/etapas?populate[0]=imagen_principal&populate[1]=categoria`),
    fetchAPI(`/categorias-etapas?populate[0]=imagen_principal`),
  ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  const allEtapasFromStrapi = responseEtapa?.data || [];
  const catEtapasFromStrapi = responseCategorias?.data || [];

  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "etapas",
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
      <CategoriasEtapas
        etapas={allEtapasFromStrapi}
        categorias={catEtapasFromStrapi}
      />
      <Footer />
    </>
  );
}

export default function Etapas() {
  return (
    <main>
      <Header />
    
      <Suspense fallback={<Skeleton />}>
        <EtapasContent />
      </Suspense>

      <Footer />
    </main>
  );
}
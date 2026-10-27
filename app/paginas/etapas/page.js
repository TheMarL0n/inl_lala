import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import CategoriasEtapas from "@/app/components/Etapas/CategoriasEtapas";

import { fetchAPI } from "@/app/lib/strapi";

export const metadata = {
  title: "Etapas de la vida",
  description: "Explora contenidos sobre nutrición y leche y lácteos adaptados a cada etapa de la vida.",
};

// 1. Ejecutamos ambas peticiones en paralelo para optimizar tiempos
  const [responseEtapa, responseCategorias] = await Promise.all([
    fetchAPI(
      `/etapas?populate[0]=imagen_principal&populate[1]=categoria`
    ),
    fetchAPI(`/categorias-etapas?populate[0]=imagen_principal`) // Trae todas las etapas para la navegación y filtros
  ]);
  
  const allEtapasFromStrapi = responseEtapa?.data || [];
  const catEtapasFromStrapi = responseCategorias?.data || [];

export default async function Etapas() {
    const data = paginas.find((pagina) => pagina.slug === "etapas");
    return (
        <main>
            <Header />
            <PagesJumbotron titulo={data.titulo} subtitulo={data.subtitulo} background={data.imagen_principal} titulo_descripcion={data.titulo_descripcion} descripcion={data.descripcion} />
            <CategoriasEtapas etapas={allEtapasFromStrapi} categorias={catEtapasFromStrapi} />
            <Footer />
        </main>
    );
}
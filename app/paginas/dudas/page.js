import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import BuscadorDudas from "@/app/components/Dudas/BuscadorDudas";
import CategoriasDudas from "@/app/components/Dudas/CategoriasDudas";
import FooterDudas from "@/app/components/Dudas/FooterDudas";
import { Suspense } from "react";
import { fetchAPI } from "@/app/lib/strapi";
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Resuelve tus dudas",
  description:
    "Respuestas claras para comprender el papel de la leche y los productos lácteos en tu salud.",
};

// Componente separado que hace el fetch
async function DudasContent() {
  const [responseContenido, responseDudas, responseCategorias] =
    await Promise.all([
      fetchAPI(`/paginas?populate[0]=imagen_principal&populate[1]=imagen_footer`),
      fetchAPI(`/dudas?populate[0]=imagen_principal&populate[1]=categoria`),
      fetchAPI(`/categoria-dudas?populate[0]=imagen_principal`),
    ]);

  const contenidoFromStrapi = responseContenido?.data || [];
  const allDudasFromStrapi = responseDudas?.data || [];
  const catDudasFromStrapi = responseCategorias?.data || [];
  const data = contenidoFromStrapi.find((pagina) => pagina.slug === "dudas");

  return (
    <>
      <PagesJumbotron
        titulo={data.titulo}
        subtitulo={data.subtitulo}
        background={data.imagen_principal}
        titulo_descripcion={data.titulo_descripcion}
        descripcion={data.descripcion}
      />
      <BuscadorDudas />
      <CategoriasDudas
        dudas={allDudasFromStrapi}
        categorias_dudas={catDudasFromStrapi}
      />
      <FooterDudas imagen_footer={data.imagen_footer} />
      <Footer />
    </>
  );
}

// Esqueleto de carga mientras responde la API
function DudasSkeleton() {
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

export default function Dudas() {
  return (
    <main>
      <Header />
      {/* Suspense permite que la estructura base cargue al instante 
          y la cortina fluya perfecto mientras se obtienen los datos */}
      <Suspense fallback={<DudasSkeleton />}>
        <DudasContent />
      </Suspense>
    </main>
  );
}

// mitos-y-realidades/page.js
import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import MitosGrid from "@/app/components/Mitos/MitosGrid";
import { fetchAPI } from "@/app/lib/strapi";

export const metadata = {
  title: "Mitos y realidades",
  description:
    "Aclarando dudas, creencias y mitos alrededor del consumo de lácteos",
};

// Componente separado que hace el fetch
async function MitosContent() {
  const response = await fetchAPI(
    `/mitos-y-realidades?populate[0]=imagen_principal`
  );
  const allMitosFromStrapi = response?.data || [];

  return <MitosGrid mitos={allMitosFromStrapi} />;
}

// Esqueleto de carga mientras responde la API
function MitosSkeleton() {
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

export default function Mitos() {
  const data = paginas.find((pagina) => pagina.slug === "mitos_realidades");

  return (
    <main>
      <Header />
      <PagesJumbotron
        titulo={data.titulo}
        subtitulo={data.subtitulo}
        background={data.imagen_principal}
        titulo_descripcion={data.titulo_descripcion}
        descripcion={data.descripcion}
        detalles={data.detalles}
      />
      
      {/* Suspense permite que la página pinte el diseño base de inmediato 
          y muestre el esqueleto mientras Strapi responde */}
      <Suspense fallback={<MitosSkeleton />}>
        <MitosContent />
      </Suspense>

      <Footer />
    </main>
  );
}
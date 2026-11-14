import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MitosGrid from "@/app/components/Mitos/MitosGrid";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Mitos y realidades",
  description:
    "Aclarando dudas, creencias y mitos alrededor del consumo de lácteos",
};

// Componente separado que hace el fetch
async function MitosContent() {
  const [responseContenido, responseMitos,] = await Promise.all(
    [
      fetchAPI(`/paginas?populate[0]=imagen_principal`),
      fetchAPI(`/mitos-y-realidades?populate[0]=imagen_principal`)
    ]
  );

  const contenidoFromStrapi = responseContenido?.data || [];
  const allMitosFromStrapi = responseMitos?.data || [];

  const data = contenidoFromStrapi.find(
    (pagina) => pagina.slug === "mitos_realidades",
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
      <MitosGrid mitos={allMitosFromStrapi} />
      <Footer />
    </>);
}

export default function Mitos() {
  return (
    <main>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <MitosContent />
      </Suspense>

    </main>
  );
}
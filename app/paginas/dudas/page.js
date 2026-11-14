import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import BuscadorDudas from "@/app/components/Dudas/BuscadorDudas";
import CategoriasDudas from "@/app/components/Dudas/CategoriasDudas";
import FooterDudas from "@/app/components/Dudas/FooterDudas";
import { Suspense } from "react";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";
import CTAGenerico from "@/app/components/CTAGenerico";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Resuelve tus dudas",
  description:
    "Respuestas claras para comprender el papel de la leche y los productos lácteos en tu salud.",
};

async function DudasContent({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.criteria?.toLowerCase() || "";

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

  // FILTRADO: Solo filtramos si hay texto en la consulta. Si no hay, devolvemos un arreglo vacío.
  const dudasFiltradas = query 
    ? allDudasFromStrapi.filter((duda) => {
        const tituloDuda = (duda.attributes?.titulo || duda.titulo || "").toLowerCase();
        return tituloDuda.includes(query);
      })
    : [];

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

      {/* SECCIÓN DE RESULTados DE BÚSQUEDA (Solo aparece si el usuario escribió algo) */}
      {query && (
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#164190]">
            Resultados de búsqueda para: &quot;{resolvedSearchParams.criteria}&quot;
          </h2>
          
          {dudasFiltradas.length > 0 ? (
            <CTAGenerico array={dudasFiltradas} parent={"dudas"} />
          ) : (
            <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
              <p className="text-gray-600 text-lg italic">
                No encontramos ninguna duda que coincida con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      )}

      {/* CategoriasDudas se queda intacto mostrando siempre todo el contenido original */}
      <CategoriasDudas
        dudas={allDudasFromStrapi} 
        categorias_dudas={catDudasFromStrapi}
      />
      
      <FooterDudas imagen_footer={data.imagen_footer} />
      <Footer />
    </>
  );
}

export default function Dudas({ searchParams }) {
  return (
    <main>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <DudasContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
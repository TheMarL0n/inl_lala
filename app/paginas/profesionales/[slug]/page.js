// etapas/[slug]/page.js
import { Suspense } from "react";
import BlueGrid from "@/app/components/BlueGrid";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CTAGenerico from "@/app/components/CTAGenerico";
import ContenidoDestacado from "@/app/components/Etapas/ContenidoDestacado";
import EnlacesEtapas from "@/app/components/Etapas/EnlacesEtapas";
import SingleEtapaMain from "@/app/components/Etapas/SingleEtapaMain";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MitosSwiper from "@/app/components/Home/MitosSwiper";
import PagesSmallJumbotron from "@/app/components/PagesSmallJumbotron";
import PageTitle from "@/app/components/PageTitle";
import PaginasNavegacion from "@/app/components/PaginasNavegacion";
import Referencias from "@/app/components/Referencias";
import DobleFotoSwiper from "@/app/components/Swipers/DobleFotoSwiper";
import SimpleSwiper from "@/app/components/Swipers/SimpleSwiper";
import VerticalSwiper from "@/app/components/Swipers/VerticalSwiper";
import { fetchAPI } from "@/app/lib/strapi";
import StoryLine from "@/app/components/StoryLine";
import TituloDestacado from "@/app/components/TituloDestacado";
import Skeleton from "@/app/components/Skeleton";
import Tabla from "@/app/components/Tabla";

// Componente secundario que realiza los fetch pesad y su contenido
async function ProfesionalesContent({ slug }) {
  const [responseProfesionales, responseTodas, responseCategorias] = await Promise.all([
    fetchAPI(
      `/profesionales?filters[slug][$eq]=${slug}&populate[0]=imagen_principal&populate[1]=contenido&populate[2]=contenido.diapositiva&populate[3]=contenido.diapositiva.imagen&populate[4]=contenido.diapositiva.imagen_izquierda&populate[5]=contenido.diapositiva.imagen_derecha&populate[6]=categoria&populate[7]=contenido.imagen_destacada&populate[8]=contenido.imagen_izquierda&populate[9]=contenido.imagen_derecha&populate[10]=contenido.imagen_principal`,
    ),
    fetchAPI(`/profesionales?populate[0]=imagen_principal&populate[1]=categoria`),
    fetchAPI(`/categoria-profesionales`),
  ]);

  const currentProfesionalesData = responseProfesionales?.data?.[0];
  if (!currentProfesionalesData) {
    return <div className="py-20 text-center">Etapa no encontrada</div>;
  }

  const currentProfesionales = {
    id: currentProfesionalesData.id,
    ...currentProfesionalesData,
  };
  const allProfesionalesFromStrapi = responseTodas?.data || [];
  const catProfesionalesFromStrapi = responseCategorias?.data || [];
  const background = currentProfesionales?.imagen_principal || "";
  const cat_id = currentProfesionales?.categoria?.id || "";
  const title =
    (currentProfesionales?.titulo_linea_1 || "") +
    " " +
    (currentProfesionales?.titulo_linea_2 || "");
  const title_linea_1 = currentProfesionales?.titulo_linea_1 || "";
  const title_linea_2 = currentProfesionales?.titulo_linea_2 || "";
  const referencias = currentProfesionales?.Referencias || "";
  const contenido = currentProfesionales?.contenido || [];
  const titulo_mitos = "Mitos frecuentes durante el embarazo y la lactancia...";

  // Filtramos las etapas relacionadas
  const profesionalesRalacionados = allProfesionalesFromStrapi.filter(
    (item) => item?.categoria?.id === cat_id && item.id !== currentProfesionales?.id,
  );

  return (
    <>
      <PagesSmallJumbotron background={background} />
      <Breadcrumbs
        title={title}
        parent={"Para profesionales"}
        url={`/paginas/profesionales`}
      />
      <EnlacesEtapas cat_id={cat_id} categorias_etapas={catProfesionalesFromStrapi} />

      <article className="custom_article-etapas">
        <PageTitle
          title_linea_1={title_linea_1}
          title_linea_2={title_linea_2}
        />

        {contenido.map((item, idx) => {
          if (item.__component === "contenido-principal.carrusel") {
            return (
              <SimpleSwiper
                key={idx}
                contenido={item.diapositiva || []}
                tipo={item.tipo}
                diapositivas={item.diapositivas_por_vista}
              />
            );
          }

          if (item.__component === "contenido-principal.mitos-y-realidades") {
            return (
              <MitosSwiper
                key={idx}
                contenido={item.diapositiva || []}
                alternative={true}
                titulo_mitos={titulo_mitos}
              />
            );
          }

          if (item.__component === "contenido-principal.carrusel-compuesto") {
            return (
              <DobleFotoSwiper
                key={idx}
                contenido={item.diapositiva || []}
                tipo={item.tipo}
              />
            );
          }

          if (item.__component === "contenido-principal.navegacion-vertical") {
            return (
              <VerticalSwiper key={idx} contenido={item.diapositiva || []} />
            );
          }

          if (item.__component === "contenido-principal.cuadricula") {
            return (
              <BlueGrid
                key={idx}
                contenido={item.diapositiva || []}
                tipo={item.tipo || []}
                titulo_columna_1={item.titulo_columna_1 || ""}
                titulo_columna_2={item.titulo_columna_2 || ""}
                titulo_columna_3={item.titulo_columna_3 || ""}
              />
            );
          }

          if (item.__component === "contenido-principal.destacado") {
            return <ContenidoDestacado key={idx} contenido={item} />;
          }

          if (item.__component === "contenido-principal.linea-del-tiempo") {
            return <StoryLine
              key={idx}
              contenido={item.diapositiva || []}
              tipo={item.tipo || ""}
            />
          }

          if (item.__component === "contenido-principal.titulo-destacado") {
            return <TituloDestacado
              key={idx}
              title_linea_1={item.titulo_parte_1}
              title_linea_2={item.titulo_parte_2}
              color_fondo_1={item.color_titulo_parte_1}
              color_fondo_2={item.color_titulo_parte_2}
              background={item.imagen_principal ? item.imagen_principal : ""}
              contenido={item.contenido}
            />
          }
          if (item.__component === "contenido-principal.tabla") {
            return <Tabla
              key={idx}
              primera_columna={item.primera_columna}
              segunda_columna={item.segunda_columna}
              contenido={item.diapositiva}
            />
          }

          return (
            <SingleEtapaMain
              key={idx}
              contenido={item.html}
              float={item.float}
              acordion={item.acordion}
              ver_mas_enlace={item.ver_mas_enlace}
            />
          );
        })}
      </article>

      {profesionalesRalacionados.length > 0 && (
        <CTAGenerico array={profesionalesRalacionados} parent={"profesionales"} />
      )}

      {referencias ? <Referencias contenido={referencias} /> : ""}

      <PaginasNavegacion
        themes={allProfesionalesFromStrapi}
        parent_url={"profesionales"}
        currentTheme={currentProfesionales}
      />
    </>
  );
}

export default async function Profesionales_Pagina({ params }) {
  const resolvedParams = await params;

  return (
    <main>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <ProfesionalesContent slug={resolvedParams.slug} />
      </Suspense>
      <Footer />
    </main>
  );
}

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

const Etapa_Pagina = async ({ params }) => {
  const resolvedParams = await params;

  // 1. Ejecutamos ambas peticiones en paralelo para optimizar tiempos
  const [responseEtapa, responseTodas, responseCategorias] = await Promise.all([
    fetchAPI(
      `/etapas?filters[slug][$eq]=${resolvedParams.slug}&populate[0]=imagen_principal&populate[1]=contenido&populate[2]=contenido.diapositiva&populate[3]=contenido.diapositiva.imagen&populate[4]=contenido.diapositiva.imagen_izquierda&populate[5]=contenido.diapositiva.imagen_derecha&populate[6]=categoria&populate[7]=contenido.imagen_destacada&populate[8]=contenido.imagen_izquierda&populate[9]=contenido.imagen_derecha`,
    ),
    fetchAPI(`/etapas?populate[0]=imagen_principal&populate[1]=categoria`),
    fetchAPI(`/categorias-etapas`),
  ]);

  const currentEtapaData = responseEtapa?.data?.[0];
  if (!currentEtapaData) {
    return <div>Etapa no encontrada</div>;
  }
  const currentEtapa = {
    id: currentEtapaData.id,
    ...currentEtapaData,
  };
  const allEtapasFromStrapi = responseTodas?.data || [];
  const catEtapasFromStrapi = responseCategorias?.data || [];

  // Si la URL viene de Strapi y no empieza con http, le agregamos el host
  const getStrapiMedia = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    return `${process.env.NEXT_PUBLIC_STRAPI_HOST}${url}`;
  };
  //-----------------------------------------------------------------------------------------------

  //Variables de datos-----------------------------------------------------------------------------
  const cat_id = currentEtapa ? currentEtapa.categoria.id : "";
  const title = currentEtapa
    ? currentEtapa.titulo_linea_1 + " " + currentEtapa.titulo_linea_2
    : "";
  const title_linea_1 = currentEtapa ? currentEtapa.titulo_linea_1 : "";
  const title_linea_2 = currentEtapa ? currentEtapa.titulo_linea_2 : "";
  const referencias = currentEtapa ? currentEtapa.Referencias : "";
  const contenido = currentEtapa?.contenido || [];
  const background = getStrapiMedia(currentEtapa?.imagen_principal?.url);
  const baseUrl = "https://www.institutolala.com.mx";
  const titulo_mitos = "Mitos frecuentes durante el embarazo y la lactancia...";
  //-----------------------------------------------------------------------------------------------

  const currentUrl = `${baseUrl}/paginas/etapas/${resolvedParams.slug}`;
  const main_image = currentEtapa ? currentEtapa.imagen_principal : "";

  // Filtramos las etapas relacionadas excluyendo la actual de una sola vez
  const etapasRelacionadas = allEtapasFromStrapi.filter(
    (item) => item.categoria.id === cat_id && item.id !== currentEtapa?.id,
  );

  return (
    <main>
      <Header />

      {/* Componente de cabecera ****************************************************/}
      <PagesSmallJumbotron background={background} title={title} />
      {/* Componente de migas de pan ************************************************/}
      <Breadcrumbs
        title={title}
        parent={"Etapas de la vida"}
        url={`/paginas/etapas`}
      />
      {/* Componente de indicador de etapa ******************************************/}
      <EnlacesEtapas cat_id={cat_id} categorias_etapas={catEtapasFromStrapi} />
      {/* Componente de titulo de dos lineas ****************************************/}
      <article className="custom_article-etapas">
        <PageTitle
          title_linea_1={title_linea_1}
          title_linea_2={title_linea_2}
        />
        
        {contenido.map((item, idx) => {
          //Tipo de contenido CARRUSEL -------------------------------------------------------------
          if (item.__component === "contenido-principal.carrusel") {
            const slidesData = item.diapositiva || [];
            const slideType = item.tipo;
            const numberOfSlides = item.diapositivas_por_vista;
            return (
              <SimpleSwiper
                key={idx}
                contenido={slidesData}
                tipo={slideType}
                diapositivas={numberOfSlides}
              />
            );
          }

          //Tipo de contenido MITOS Y REALIDADES----------------------------------------------------
          if (item.__component === "contenido-principal.mitos-y-realidades") {
            const slidesData = item.diapositiva || [];
            return (
              <MitosSwiper
                key={idx}
                contenido={slidesData}
                alternative={true}
                titulo_mitos={titulo_mitos}
              />
            );
          }

          //Tipo de contenido CARRUSEL COMPUESTO--------------------------------------------------------------
          if (item.__component === "contenido-principal.carrusel-compuesto") {
            const slidesData = item.diapositiva || [];
            const slideType = item.tipo;
            return (
              <DobleFotoSwiper
                key={idx}
                contenido={slidesData}
                tipo={slideType}
              />
            );
          }

          //Tipo de contenido NEVEGACION VERTICAL--------------------------------------------------
          if (item.__component === "contenido-principal.navegacion-vertical") {
            const slidesData = item.diapositiva || [];
            return <VerticalSwiper key={idx} contenido={slidesData} />;
          }

          //Tipo de contenido CUADRICULA-----------------------------------------------------------
          if (item.__component === "contenido-principal.cuadricula") {
            const cuadriculasData = item.diapositiva || [];
            const cuadriculaType = item.tipo || [];
            const titulo_columna_1 = item.titulo_columna_1 || "";
            const titulo_columna_2 = item.titulo_columna_2 || "";
            const titulo_columna_3 = item.titulo_columna_3 || "";
            return (
              <BlueGrid
                key={idx}
                contenido={cuadriculasData}
                tipo={cuadriculaType}
                titulo_columna_1={titulo_columna_1}
                titulo_columna_2={titulo_columna_2}
                titulo_columna_3={titulo_columna_3}
              />
            );
          }

          //Tipo de contenido DESTACADO
          if (item.__component === "contenido-principal.destacado") {
            return <ContenidoDestacado key={idx} contenido={item} />;
          }

          return (
            <SingleEtapaMain
              key={idx}
              contenido={item.html}
              float={item.float}
            />
          );
        })}
      </article>

      {/* CTAGenerico */}
      {etapasRelacionadas.length > 0 ? (
        <CTAGenerico array={etapasRelacionadas} parent={"etapas"} />
      ) : null}

      {/* Referencias */}
      <Referencias contenido={referencias} />

      {/* Navegación */}
      <PaginasNavegacion
        themes={allEtapasFromStrapi}
        parent_url={"etapas"}
        currentTheme={currentEtapa}
      />
      <Footer />
    </main>
  );
};

export default Etapa_Pagina;

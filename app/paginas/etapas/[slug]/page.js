import Breadcrumbs from "@/app/components/Breadcrumbs";
import EnlacesEtapas from "@/app/components/Etapas/EnlacesEtapas";
import SingleEtapaMain from "@/app/components/Etapas/SingleEtapaMain";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import MitosSwiper from "@/app/components/Home/MitosSwiper";
import PagesSmallJumbotron from "@/app/components/PagesSmallJumbotron";
import PageTitle from "@/app/components/PageTitle";
import PaginasNavegacion from "@/app/components/PaginasNavegacion";
import Referencias from "@/app/components/Referencias";
import SimpleSwiper from "@/app/components/Swipers/SimpleSwiper";
import { etapas, mitos_de_etapas_referencias } from "@/app/utils/Copies";

const Etapa_Pagina = async ({ params }) => {
    const resolvedParams = await params;
    const currentEtapa = etapas.find(
        (etapa) => etapa.slug === resolvedParams.slug
    );

    const cat_id = currentEtapa ? currentEtapa.categoria_id : "";
    const title = currentEtapa ? currentEtapa.titulo_linea_1 + " " + currentEtapa.titulo_linea_2 : "";
    const title_linea_1 = currentEtapa ? currentEtapa.titulo_linea_1 : "";
    const title_linea_2 = currentEtapa ? currentEtapa.titulo_linea_2 : "";
    const contenido = currentEtapa ? currentEtapa.contenido : "";
    const background = currentEtapa ? currentEtapa.imagen_principal : "";
    const baseUrl = "https://www.institutolala.com.mx";

    const contenido_carrusel = currentEtapa ? currentEtapa.datos_utiles : "";
    const contenido_carrusel_mitos = currentEtapa ? currentEtapa.mitos_de_etapas : "";
    const titulo_mitos = currentEtapa ? currentEtapa.titulo_mitos : "";
    const currentUrl = `${baseUrl}/paginas/etapas/${resolvedParams.slug}`;
    const main_image = currentEtapa ? currentEtapa.imagen_principal : "";

    return (
        <main>
            <Header />
            <PagesSmallJumbotron background={background} />
            <Breadcrumbs title={title} parent={"Etapas de la vida"} url={`/paginas/etapas`} />
            <EnlacesEtapas cat_id={cat_id} />

            <article className="custom_article-etapas">
                <PageTitle
                    title_linea_1={title_linea_1}
                    title_linea_2={title_linea_2} />

                {contenido.map((item, idx) => {
                    if (item.tipo === "carrusel") {
                        return <SimpleSwiper key={idx} contenido={item.slides} />;
                    }

                    return <SingleEtapaMain key={idx} contenido={item.html} />;
                })}
            </article>

            <MitosSwiper contenido={contenido_carrusel_mitos} alternative={true} titulo_mitos={titulo_mitos} />
            <Referencias contenido={mitos_de_etapas_referencias} />
            <PaginasNavegacion
                themes={etapas}
                parent_url={"etapas"}
                currentTheme={currentEtapa}
            />
            <Footer />
        </main>
    )
}
export default Etapa_Pagina
import Breadcrumbs from "@/app/components/Breadcrumbs";
import EnlacesEtapas from "@/app/components/Etapas/EnlacesEtapas";
import SingleEtapaMain from "@/app/components/Etapas/SingleEtapaMain";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import PagesSmallJumbotron from "@/app/components/PagesSmallJumbotron";
import { etapas } from "@/app/utils/Copies";

const Etapa_Pagina = async ({ params }) => {
    const resolvedParams = await params;
    const currentEtapa = etapas.find(
        (etapa) => etapa.slug === resolvedParams.slug
    );

    const title = currentEtapa ? currentEtapa.tema : "";
    const title_linea_1 = currentEtapa ? currentEtapa.titulo_linea_1 : "";
    const title_linea_2 = currentEtapa ? currentEtapa.titulo_linea_2 : "";
    const contenido_linea_1 = currentEtapa ? currentEtapa.contenido_1 : "";
    const contenido_linea_2 = currentEtapa ? currentEtapa.contenido_2 : "";
    const main_image = currentEtapa ? currentEtapa.imagen_principal : "";
    const background = currentEtapa ? currentEtapa.imagen_principal : "";
    const baseUrl = "https://www.institutolala.com.mx";
    const currentUrl = `${baseUrl}/paginas/etapas/${resolvedParams.slug}`;

    return (
        <main>
            <Header />
            <article>
                <PagesSmallJumbotron background={background} />
                <Breadcrumbs title={title} parent={"Etapas de la vida"} url={`/paginas/etapas`}/>
                <EnlacesEtapas />
                <SingleEtapaMain 
                title_linea_1={title_linea_1} 
                title_linea_2={title_linea_2}
                contenido_linea_1={contenido_linea_1}
                contenido_linea_2={contenido_linea_2}/>
            </article>
            <Footer />
        </main>
    )
}
export default Etapa_Pagina
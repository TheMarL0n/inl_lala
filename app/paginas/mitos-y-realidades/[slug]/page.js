import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Mitos from "@/app/components/Home/Mitos";
import BuscadorMitos from "@/app/components/Mitos/BuscadorMitos";
import MitosNavegacion from "@/app/components/Mitos/MitosNavegacion";
import ReferenciasMitos from "@/app/components/Mitos/ReferenciasMitos";
import SingleMitoMain from "@/app/components/Mitos/SingleMitoMain";
import PagesSmallJumbotron from "@/app/components/PagesSmallJumbotron";
import { mitos } from "@/app/utils/Copies";

const Mito_Realidad = async ({ params }) => {
    const resolvedParams = await params;
    const currentMito = mitos.find(
        (mito) => mito.slug === resolvedParams.slug
    );

    const title = currentMito ? currentMito.titulo : "";
    const reality = currentMito ? currentMito.realidad : "";
    const main_image = currentMito ? currentMito.imagen_principal : "";
    const background = "/images/mitos/mitos_bkg.png";

    return (
        <main>
            <Header />
            <PagesSmallJumbotron background={background} />
            <SingleMitoMain image={main_image} title={title} reality={reality} />
            <Mitos alternative={true} />
            <BuscadorMitos />
            <ReferenciasMitos />
            <MitosNavegacion currentTheme={currentMito}/>
            <Footer />
        </main>
    )
}
export default Mito_Realidad
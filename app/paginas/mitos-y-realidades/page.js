import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import MitosGrid from "@/app/components/Mitos/MitosGrid";

export default function Mitos() {
    const data = paginas.find((pagina) => pagina.slug === "mitos_realidades");
    return (
        <main>
            <Header />
            <PagesJumbotron titulo={data.titulo} subtitulo={data.subtitulo} background={data.imagen_principal} titulo_descripcion={data.titulo_descripcion} descripcion={data.descripcion} detalles={data.detalles} />
            <MitosGrid/>
            <Footer />
        </main>
    );
}
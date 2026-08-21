import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";

export default function Dudas() {
    const data = paginas.find((pagina) => pagina.slug === "dudas");
    return (
        <main>
            <Header />
            <PagesJumbotron titulo={data.titulo} subtitulo={data.subtitulo} background={data.imagen_principal} descripcion={data.descripcion} />
            <Footer />
        </main>
    );
}
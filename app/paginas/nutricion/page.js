import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import CategoriasNutricion from "@/app/components/Nutricion/CategoriasNutricion";

export default function Nutricion() {
    const data = paginas.find((pagina) => pagina.slug === "nutricion");
    return (
        <main>
            <Header />
            <PagesJumbotron titulo={data.titulo} subtitulo={data.subtitulo} background={data.imagen_principal} titulo_descripcion={data.titulo_descripcion} descripcion={data.descripcion} />
            <CategoriasNutricion/>
            <Footer />
        </main>
    );
}
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import CategoriasEtapas from "@/app/components/Etapas/CategoriasEtapas";

export const metadata = {
  title: "Etapas de la vida",
  description: "Explora contenidos sobre nutrición y leche y lácteos adaptados a cada etapa de la vida.",
};

export default function Etapas() {
    const data = paginas.find((pagina) => pagina.slug === "etapas");
    return (
        <main>
            <Header />
            <PagesJumbotron titulo={data.titulo} subtitulo={data.subtitulo} background={data.imagen_principal} titulo_descripcion={data.titulo_descripcion} descripcion={data.descripcion} />
            <CategoriasEtapas />
            <Footer />
        </main>
    );
}
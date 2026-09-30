import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import CategoriasNutricion from "@/app/components/Nutricion/CategoriasNutricion";
import { Suspense } from "react";

export const metadata = {
  title: "Come mejor, vive mejor",
  description: "La alimentación y el papel de la leche y los lácteos como parte de una vida saludable",
};

export default function Nutricion() {
    const data = paginas.find((pagina) => pagina.slug === "nutricion");
    return (
        <main>
            <Header />
            <PagesJumbotron titulo={data.titulo} subtitulo={data.subtitulo} background={data.imagen_principal} titulo_descripcion={data.titulo_descripcion} descripcion={data.descripcion} />
            <Suspense fallback={<div>Cargando categorías...</div>}>
                <CategoriasNutricion />
            </Suspense>
            <Footer />
        </main>
    );
}
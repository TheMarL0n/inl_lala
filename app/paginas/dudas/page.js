import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import BuscadorDudas from "@/app/components/Dudas/BuscadorDudas";
import CategoriasDudas from "@/app/components/Dudas/CategoriasDudas";
import FooterDudas from "@/app/components/Dudas/FooterDudas";
import { Suspense } from "react";

export default function Dudas() {
    const data = paginas.find((pagina) => pagina.slug === "dudas");
    return (
        <main>
            <Header />
            <PagesJumbotron titulo={data.titulo} subtitulo={data.subtitulo} background={data.imagen_principal} titulo_descripcion={data.titulo_descripcion} descripcion={data.descripcion} />
            <BuscadorDudas />
            <Suspense fallback={<div>Cargando categorías...</div>}>
                <CategoriasDudas />
            </Suspense>
            <FooterDudas imagen_footer={data.imagen_footer} />
            <Footer />
        </main>
    );
}
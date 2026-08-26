import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import TemaDestacado from "@/app/components/Profesionales/TemaDestacado";
import HerramientasMateriales from "@/app/components/Profesionales/HerramientasMateriales";
import Aprende from "@/app/components/Home/Aprende";
import AlianzasColaboraciones from "@/app/components/Profesionales/AlianzasColaboraciones";
import FormContacto from "@/app/components/FormContacto";

export default function Profesionales() {
    const data = paginas.find((pagina) => pagina.slug === "profesionales");
    return (
        <main>
            <Header />
            <PagesJumbotron
                titulo={data.titulo}
                subtitulo={data.subtitulo}
                background={data.imagen_principal}
                titulo_descripcion={data.titulo_descripcion}
                descripcion={data.descripcion}
            />
            <TemaDestacado
                imagen_tema_destacado={data.imagen_tema_destacado}
                titulo_tema_destacado={data.titulo_tema_destacado}
                subtitulo_tema_destacado={data.subtitulo_tema_destacado}
                enlace_tema_destacado={data.enlace_tema_destacado}
                descripcion_tema_destacado={data.descripcion_tema_destacado}
            />
            <HerramientasMateriales />
            <Aprende fromPage={true} />
            <AlianzasColaboraciones />
            <FormContacto imagen_footer={data.imagen_footer} />
            <Footer />
        </main>
    );
}
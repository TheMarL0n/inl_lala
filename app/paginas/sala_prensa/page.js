import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { paginas } from "@/app/utils/Copies";
import FormContacto from "@/app/components/FormContacto";
import NotasList from "@/app/components/Noticias/Notas";
import RecursosList from "@/app/components/Noticias/Recursos";
import EventosList from "@/app/components/Noticias/Eventos";

export default function SalaPrensa() {
    const data = paginas.find((pagina) => pagina.slug === "sala_prensa");
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
            <NotasList />
            <RecursosList />
            <EventosList />
            <FormContacto imagen_footer={data.imagen_footer} />
            <Footer />
        </main>
    );
}
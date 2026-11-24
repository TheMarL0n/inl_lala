import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import FormContacto from "@/app/components/FormContacto";
// import NotasList from "@/app/components/Noticias/Notas";
// import RecursosList from "@/app/components/Noticias/Recursos";
// import EventosList from "@/app/components/Noticias/Eventos";
import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Sala de Prensa",
    description: "Comunicados, materiales institucionales, recursos visuales e información oficial del Instituto de Nutrición Lala.",
};

async function PrensaContent() {
    const [responseContenido, responseMenu, responseSociales] = await Promise.all(
        [
            fetchAPI(`/paginas?populate[0]=imagen_principal&populate[1]=imagen_footer`),
            fetchAPI(`/item-menus`),
            fetchAPI(`/redes-sociales`),
        ]
    )

    const contenidoFromStrapi = responseContenido?.data || [];
    const menuItems = responseMenu?.data || [];
    const socialesItems = responseSociales?.data || [];
    const data = contenidoFromStrapi.find((pagina) => pagina.slug === "sala_prensa");

    return (
        <>
            <Header menuI_tems={menuItems} />
            <PagesJumbotron
                titulo={data.titulo}
                subtitulo={data.subtitulo}
                background={data.imagen_principal}
                titulo_descripcion={data.titulo_descripcion}
                descripcion={data.descripcion}
            />
            {/* <NotasList />
            <RecursosList />
            <EventosList /> */}
            <FormContacto imagen_footer={data.imagen_footer} />
            <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
        </>
    )
}

export default function SalaPrensa() {
    return (
        <main>
            <Suspense fallback={<Skeleton />}>
                <PrensaContent />
            </Suspense>

        </main>
    );
}
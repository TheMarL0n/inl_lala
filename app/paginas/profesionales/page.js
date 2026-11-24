import { Suspense } from "react";
import PagesJumbotron from "@/app/components/PagesJumbotron";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import TemaDestacado from "@/app/components/Profesionales/TemaDestacado";
import HerramientasMateriales from "@/app/components/Profesionales/HerramientasMateriales";
import Aprende from "@/app/components/Home/Aprende";
import AlianzasColaboraciones from "@/app/components/Profesionales/AlianzasColaboraciones";
import FormContacto from "@/app/components/FormContacto";

import { fetchAPI } from "@/app/lib/strapi";
import Skeleton from "@/app/components/Skeleton";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Para Profesionales",
    description: "Lo último de la ciencia de la leche y lácteos, validado por autoridades científicas.",
};

// Componente separado que hace el fetch
async function ProfesionalesContent() {
    const [responseContenido, responseElementos, responseProfesionales, responseMenu, responseSociales] = await Promise.all(
        [
            fetchAPI(`/paginas?populate[0]=imagen_principal&populate[1]=tema_destacado&populate[2]=imagen_footer&populate[3]=tema_destacado.imagen`),
            fetchAPI(`/profesionales?populate[0]=imagen_principal&populate[1]=categoria`),
            fetchAPI(`/categoria-profesionales?populate[0]=imagen_principal`),
            fetchAPI(`/item-menus`),
            fetchAPI(`/redes-sociales`),
        ]
    );
    const menuItems = responseMenu?.data || [];
    const socialesItems = responseSociales?.data || [];
    const contenidoFromStrapi = responseContenido?.data || [];
    const allProfesionalesFromStrapi = responseProfesionales?.data || [];
    const allElementosFromStrapi = responseElementos?.data || [];

    const data = contenidoFromStrapi.find(
        (pagina) => pagina.slug === "profesionales",
    );

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
            <TemaDestacado
                imagen_tema_destacado={data.tema_destacado.imagen}
                titulo_tema_destacado={data.tema_destacado.titulo}
                subtitulo_tema_destacado={data.tema_destacado.subtitulo}
                enlace_tema_destacado={data.tema_destacado.enlace}
                descripcion_tema_destacado={data.tema_destacado.descripcion}
            />
            <HerramientasMateriales elementos={allElementosFromStrapi} herramientas_materiales={allProfesionalesFromStrapi} />
            <Aprende fromPage={true} />
            <AlianzasColaboraciones />
            <FormContacto imagen_footer={data.imagen_footer} />
            <Footer menuI_tems={menuItems} socialesI_tems={socialesItems} />
        </>);
}

export default function Profesionales() {
    return (
        <main>
            <Suspense fallback={<Skeleton />}>
                <ProfesionalesContent />
            </Suspense>
        </main>
    );
}
"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { categorias_dudas, dudas } from "@/app/utils/Copies";
import { encabezado_h3, parrafo_normal, WhiteButton } from "@/app/utils/CSS_clases";
import Image from "next/image";
import CustomLink from "../Auxiliares/CustomLinks";

// Si la URL viene de Strapi y no empieza con http, le agregamos el host
const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST;
  return `${host}${url}`;
};

const Dudas = ({ 
  titulo_1,
  titulo_2,
  contenido,
  imagen_destacada }) => {
    const [criterio, setCriterio] = useState("");
    const [busquedaActiva, setBusquedaActiva] = useState(false);
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // De 100vw (todo el ancho) a 50vw (mitad de pantalla) al hacer scroll
    const imageWidth = useTransform(scrollYProgress, [0, 0.25], ["100%", "50%"]);

    const handleSearch = (e) => {
        e.preventDefault();
        setBusquedaActiva(true);
    };

    const resultadosDudas =
        criterio.trim() === ""
            ? []
            : dudas.filter(
                  (duda) =>
                      duda.pregunta.toLowerCase().includes(criterio.toLowerCase()) ||
                      duda.respuesta.toLowerCase().includes(criterio.toLowerCase())
              );

    return (
        <section ref={sectionRef} className="relative bg-[#15428C] overflow-x-clip">
            {/* Imagen sticky: arranca en 100vw y se reduce a 50vw en desktop */}
            <div className="sm:sticky sm:top-0 h-[500px] sm:h-screen z-20 pointer-events-none overflow-x-clip">
                <motion.div
                    style={{ width: imageWidth }}
                    suppressHydrationWarning
                    className="relative w-full h-full overflow-hidden will-change-[width]"
                >
                    <Image
                        src={getStrapiMedia(imagen_destacada.url)}
                        alt="Joven disfrutando de una alimentación saludable y equilibrada"
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, 100vw"
                        className="object-cover object-center"
                    />
                </motion.div>
            </div>

            {/* Contenido azul a la derecha en desktop (-mt-screen para emparejar con la altura sticky) */}
            <div className="relative z-10 bg-[#15428C] p-8 sm:w-1/2 sm:ml-auto sm:-mt-screen">
                <h2>
                    <span className={`${encabezado_h3} bg-[#0B75B9]`}>{titulo_1}</span>
                    <br />
                    <span className="uppercase text-[120px] sm:text-[250px] sm:leading-55 text-[#0B75B9] font-[600]">
                        {titulo_2}
                    </span>
                </h2>

                <p className={`${parrafo_normal} text-white max-w-113 mt-4 text-[25px]!`}>
                    {contenido}
                </p>

                {/* Formulario de Buscador */}
                <form onSubmit={handleSearch} className="flex flex-col items-start gap-4 mt-12">
                    <input
                        type="text"
                        name="criteria"
                        value={criterio}
                        onChange={(e) => {
                            setCriterio(e.target.value);
                            if (e.target.value === "") setBusquedaActiva(false);
                        }}
                        placeholder="¿Qué estás buscando?"
                        className="border-white border p-2 h-11.5 w-full sm:w-86.25 focus:outline-0 text-white text-[18px] placeholder:text-white placeholder:text-[23px] placeholder:italic"
                    />
                    <button type="submit" className={WhiteButton}>
                        Buscar
                    </button>
                </form>

                {/* Resultados de la Búsqueda o Listado de Categorías por Defecto */}
                <div className="space-y-8 mt-26 max-w-[580px]">
                    {busquedaActiva && criterio.trim() !== "" ? (
                        resultadosDudas.length > 0 ? (
                            resultadosDudas.map((duda, idx) => {
                                const categoriaAsociada = categorias_dudas.find(
                                    (cat) => cat.id === duda.categoria_id
                                );

                                return (
                                    <div
                                        key={idx}
                                        className="border-b border-white pb-2 gap-8 grid grid-cols-1 sm:grid-cols-4"
                                    >
                                        <p className={`${parrafo_normal} text-white sm:col-span-3`}>
                                            <strong>{categoriaAsociada?.titulo}</strong>
                                            <br />
                                            {duda.respuesta}
                                        </p>
                                        <CustomLink
                                            href={`/paginas/dudas?cat=${duda.categoria_id}`}
                                            target="_blank"
                                            className={`${WhiteButton}`}
                                        >
                                            Ver más
                                            <span className="sr-only">Saber más sobre los mitos que existen sobre los lácteos</span>
                                        </CustomLink>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-white text-lg italic">
                                No se encontraron dudas relacionadas con &ldquo;{criterio}&ldquo;.
                            </p>
                        )
                    ) : (
                        categorias_dudas.map((item, idx) => (
                            <div
                                key={idx}
                                className="border-b border-white pb-2 gap-8 grid grid-cols-1 sm:grid-cols-4"
                            >
                                <p className={`${parrafo_normal} text-white sm:col-span-3`}>
                                    <strong>{item.titulo}</strong>
                                    <br />
                                    {item.subtitulo}
                                </p>
                                <CustomLink
                                    href={`/paginas/dudas?cat=${item.id}`}
                                    target="_blank"
                                    className={WhiteButton}
                                >
                                    Ver más
                                    <span className="sr-only">{item.subtitulo}</span>
                                </CustomLink>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dudas;
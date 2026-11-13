"use client"
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "@/app/utils/SVG_Icons";
import { encabezado_h2 } from "@/app/utils/CSS_clases";

// Función auxiliar para extraer el texto del primer H2 (##) en el Markdown
const extraerH2Markdown = (markdownText) => {
    if (!markdownText) return "";
    const match = markdownText.match(/^##\s+(.+)$/m);
    return match ? match[1] : "";
};

// Función auxiliar para extraer el texto excluyendo el primer H2 (##) en el Markdown
const extraerRestoDeMarkdown = (markdownText) => {
    if (!markdownText) return "";
    // Remueve todas las líneas que comiencen con 2 o 3 numerales en todo el texto
    const textoSinTitulos = markdownText.replace(/^#{2,3}\s+.+$/gm, "");
    return textoSinTitulos.trim();
};

const SingleEtapaMain = ({ contenido, float, acordion }) => {
    const [isOpen, setIsOpen] = useState(true);
    const tituloH2 = extraerH2Markdown(contenido);
    const restoContenido = extraerRestoDeMarkdown(contenido);

    return (
        <section className="px-4 py-10 relative overflow-hidden">
            {
                acordion ?
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center justify-between gap-2 cursor-pointer text-left focus:outline-none w-full group"
                        >
                            <h2
                                className={`${encabezado_h2} text-[#15428C]! text-[32px]! m-0!`}
                            >
                                {tituloH2}
                            </h2>
                            <ChevronDown
                                className={`transition-transform duration-300 ${isOpen ? "" : "rotate-180"}`}
                            />
                        </button>

                        <div
                            className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
                        >
                            <div className="overflow-hidden">
                                <ReactMarkdown>
                                    {restoContenido}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={`max-w-5xl mx-auto clearfix transition-all ${float ? "sm:pr-[260px]" : ""
                        }`}>
                        <div className="prose max-w-none">
                            <ReactMarkdown
                                components={{
                                    // Usamos un span con display block para evitar que el navegador rompa la regla de hidratación del <p>
                                    img: ({ src, alt }) => {
                                        const containerClasses = float
                                            ? "relative sm:absolute right-0 w-full md:w-[420px] lg:w-[462px] h-[350px] md:h-[420px] lg:h-[500px] top-10 md:top-20 pointer-events-none block"
                                            : "my-6 relative w-full h-[400px] block";

                                        return (
                                            <span className={containerClasses}>
                                                <Image
                                                    src={src}
                                                    alt={alt || 'Imagen del artículo'}
                                                    fill
                                                    sizes="(max-width: 1024px) 100vw, 500px"
                                                    className="object-contain"
                                                    priority={false}
                                                />
                                            </span>
                                        );
                                    }
                                }}
                            >
                                {contenido}
                            </ReactMarkdown>
                        </div>
                    </div>
            }
        </section>
    );
};

export default SingleEtapaMain;
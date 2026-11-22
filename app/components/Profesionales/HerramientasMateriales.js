"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { BlueButton, encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases";
import CustomLink from "../Auxiliares/CustomLinks";

const HerramientasMateriales = ({ elementos, herramientas_materiales }) => {
    const searchParams = useSearchParams();
    const catUrl = searchParams.get("cat"); // Obtenemos el valor de ?cat=...

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(() => {
        // Si viene un parámetro 'cat' en la URL, lo usamos (convertido a número si tus IDs son numéricos)
        if (catUrl) {
            const parsedCat = Number(catUrl);
            const existe = herramientas_materiales.some((item) => item.id === parsedCat);
            if (existe) return parsedCat;
        }
        // Fallback: Si no hay parámetro o no es válido, toma el primero o null
        return herramientas_materiales.length > 0 ? herramientas_materiales[0].id : null;
    });

    // Opcional: Si el usuario cambia de página o cambia el parámetro 'cat' dinámicamente en la misma vista
    useEffect(() => {
        if (catUrl) {
            const parsedCat = Number(catUrl);
            const existe = herramientas_materiales.some((item) => item.id === parsedCat);
            if (existe) {
                setCategoriaSeleccionada(parsedCat);
            }
        }
    }, [catUrl]);

    const handleCategoriaClick = (id) => {
        setCategoriaSeleccionada(id);
        const elemento = document.getElementById("elementos_at_top");
        if (elemento) {
            elemento.scrollIntoView({ behavior: "smooth" });
        }
    };

    const elementosFiltradas = categoriaSeleccionada
        ? elementos.filter((duda) => duda.categoria.id === categoriaSeleccionada)
        : elementos;

    // Si la URL viene de Strapi y no empieza con http, le agregamos el host
    const getStrapiMedia = (url) => {
        if (!url) return null;
        if (url.startsWith("http") || url.startsWith("//")) {
            return url;
        }
        return `${process.env.NEXT_PUBLIC_STRAPI_HOST}${url}`;
    };

    return (
        <section id="elementos_at_top" className="pb-20 px-4">

            <div className="max-w-7xl mx-auto py-20">
                <h2>
                    <span className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}>
                        Herramientas y
                    </span>
                    <span className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>
                        Materiales
                    </span>
                </h2>

            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
                {herramientas_materiales.map((item, idx) => {
                    const isActive = categoriaSeleccionada === item.id;

                    return (
                        <div
                            key={idx}
                            onClick={() => handleCategoriaClick(item.id)}
                            className="space-y-4 group cursor-pointer"
                        >
                            <div className="relative min-h-60 sm:min-h-72">
                                <div
                                    className={`bg-[#15428C]/70 absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 ${isActive
                                        ? "opacity-0"
                                        : "opacity-0 sm:opacity-100 group-hover:opacity-0"
                                        }`}
                                ></div>
                                {item.imagen_principal ? (
                                    <Image
                                        src={getStrapiMedia(item.imagen_principal.url)}
                                        alt={
                                            item.titulo ||
                                            "Imagen de categoría de las elementos más comunes sobre los lácteos"
                                        }
                                        fill
                                        sizes="(max-width: 640px) 50vw, 25vw"
                                        priority={idx < 4} // Optimiza la carga de las primeras imágenes visibles
                                        className="absolute z-1 top-0 left-0 object-cover w-full h-full"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                            <h3 className="text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-[#15428C]">
                                {item.titulo}
                            </h3>
                        </div>
                    );
                })}
            </div>

            <div className="max-w-7xl mx-auto space-y-8 mt-26">
                {elementosFiltradas.length > 0 ? (
                    elementosFiltradas
                        .sort((a, b) => b.id - a.id)
                        .map((item, idx) => (
                            <article
                                key={idx}
                                className="border-b border-[#164190] pb-8 gap-4 grid grid-cols-3 sm:grid-cols-4 items-center"
                            >
                                <div className="col-span-2 sm:col-span-3">
                                    <h3>
                                        <CustomLink
                                            href={`/paginas/profesionales/${item.slug}`}
                                            className={`${parrafo_normal} text-[#164190] font-bold`}
                                        >
                                            {item.titulo_linea_1} {item.titulo_linea_2}
                                        </CustomLink>
                                    </h3>
                                    <p className={`${parrafo_normal} text-[#164190]`}>
                                        {item.descripcion}
                                    </p>
                                </div>
                                <CustomLink
                                    href={`/paginas/profesionales/${item.slug}`}
                                    className={`${BlueButton} w-fit ml-auto`}
                                >
                                    Ver más
                                    <span className="sr-only">{item.descripcion}</span>
                                </CustomLink>
                            </article>
                        ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No hay elementos registradas para esta categoría.
                    </p>
                )}
            </div>
        </section>
    );
};

export default HerramientasMateriales;

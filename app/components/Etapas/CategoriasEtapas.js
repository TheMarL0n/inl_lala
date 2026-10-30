"use client";
import { useState } from "react";
import Image from "next/image";
import {
  BlueButton,
  parrafo_normal,
  stroke_text,
} from "@/app/utils/CSS_clases";

const CategoriasEtapas = ({ etapas, categorias }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(() => {
    if (categorias.length === 0) return null;

    // Creamos una copia, la ordenamos y tomamos el id del primer elemento
    const categoriasOrdenadas = [...categorias].sort(
      (a, b) => a.orden - b.orden,
    );
    return categoriasOrdenadas[0].id;
  });

  const etapasFiltradas = categoriaSeleccionada
    ? etapas.filter((etapa) => etapa.categoria.id === categoriaSeleccionada)
    : etapas;

  // Si la URL viene de Strapi y no empieza con http, le agregamos el host
  const getStrapiMedia = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    return `${process.env.NEXT_PUBLIC_STRAPI_HOST}${url}`;
  };

  return (
    <section className="pb-20 px-4">
      <h2 className={`text-center text-[50px] sm:text-[90px] sm:leading-55 text-[#164190] uppercase font-[600]`}>
        ¿qué edad buscas?:
      </h2>
      <div className="relative max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-6">
        {categorias
          .sort((a, b) => a.orden - b.orden)
          .map((item, idx) => {
            const isActive = categoriaSeleccionada === item.id;

            return (
              <div
                key={idx}
                onClick={() => setCategoriaSeleccionada(item.id)}
                className="relative space-y-4 group cursor-pointer"
              >
                <div className="relative min-h-57 max-h-57 mx-2">
                  <div
                    className={`bg-[#164190] sm:bg-white absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 ${
                      isActive
                        ? "opacity-0"
                        : "opacity-100 group-hover:opacity-0"
                    }`}
                  ></div>
                  <Image
                    src={getStrapiMedia(item.imagen_principal.url)}
                    alt={`Miniatura sobre ${item.titulo}`|| "Miniatura sobre las etapas de la vida y el consumo lácteos"
                    }
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    priority={idx < 4} // Optimiza la carga de las primeras imágenes visibles
                    className="absolute z-1 top-0 left-0 object-cover w-full h-full"
                  />
                </div>
                <div className="absolute sm:relative top-4 sm:top-0 left-4 sm:left-0 z-3">
                  <div className="hidden sm:block relative z-2 w-7 h-7 rounded-full bg-[#0B75B9] group-hover:bg-[#15428C] mx-auto border-2 border-[#15428C] duration-400"></div>
                  <div className="hidden sm:block absolute border-dashed border-2 border-[#164190] w-full top-3"></div>
                  <h3
                    className={`uppercase text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-white sm:text-[#15428C] sm:text-center ${isActive ? "opacity-0 sm:opacity-100" : "opacity-100 group-hover:opacity-0 sm:group-hover:opacity-100"}`}
                  >
                    {item.titulo}
                  </h3>
                </div>
              </div>
            );
          })}
      </div>

      <div className="max-w-7xl mx-auto space-y-8 mt-26">
        {etapasFiltradas.length > 0 ? (
          etapasFiltradas.sort((a, b) => b.id - a.id).map((item, idx) => (
            <article
              key={idx}
              className="border-b border-[#164190] pb-8 gap-4 grid grid-cols-3 sm:grid-cols-4 items-center"
            >
              <div className="col-span-2 sm:col-span-3">
                <h3>
                  <a
                    href={`/paginas/etapas/${item.slug}`}
                    className={`${parrafo_normal} text-[#164190] font-bold`}
                  >
                    {item.titulo_linea_1} {item.titulo_linea_2}
                  </a>
                </h3>
                <p className={`${parrafo_normal} text-[#164190]`}>
                  {item.descripcion}
                </p>
              </div>
              <a
                href={`/paginas/etapas/${item.slug}`}
                className={`${BlueButton} w-fit ml-auto`}
              >
                Ver más
                <span className="sr-only">{item.descripcion}</span>
              </a>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No hay datos para esta etapa.
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoriasEtapas;

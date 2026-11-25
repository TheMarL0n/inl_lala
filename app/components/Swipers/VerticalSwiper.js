"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const nombresFasesMap = {
  fase_1: "antes",
  fase_2: "durante",
  fase_3: "después",
};

const FasesSeccion = ({ contenido = [] }) => {
  const items = useMemo(
    () => (Array.isArray(contenido) ? contenido : []),
    [contenido]
  );
  const debeAgrupar = Boolean(items[0]?.agrupar);

  // Estado para el índice seleccionado cuando NO se agrupa (vista por títulos)
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 1. Agrupamos los elementos por "fases" solo cuando corresponde
  const fasesAgrupadas = useMemo(() => {
    return items.reduce((acc, item) => {
      const faseKey = item.fases || "general";
      if (!acc[faseKey]) {
        acc[faseKey] = [];
      }
      acc[faseKey].push(item);
      return acc;
    }, {});
  }, [items]);

  const listaFases = Object.keys(fasesAgrupadas);

  // Estado para la fase activa cuando SÍ se agrupa
  const [faseActiva, setFaseActiva] = useState(() => listaFases[0] || "");

  if (items.length === 0) return null;

  const faseActual = fasesAgrupadas[faseActiva] ? faseActiva : listaFases[0];

  // VISTA CUANDO NO SE AGRUPA (agrupar === false) -> Vista por títulos
  if (!debeAgrupar) {
    const itemActual = items[selectedIndex] || items[0];

    return (
      <section
        className="vertical-swiper py-16 max-w-7xl mx-auto px-4"
        aria-label="Sección de contenido por temas"
      >
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* COLUMNA IZQUIERDA: Lista de títulos */}
          <div className="w-full md:w-1/4 flex flex-col">
            {items.map((item, idx) => {
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`cursor-pointer text-left py-4 uppercase text-sm md:text-base tracking-wide transition-colors duration-200 text-[#0B75B9] border-b border-[#164190]/60 ${
                    isSelected
                      ? "font-bold text-[#0B75B9]"
                      : "font-normal hover:text-[#164190]"
                  }`}
                >
                  {item.titulo}
                </button>
              );
            })}
          </div>

          {/* COLUMNA DERECHA: Detalle del elemento seleccionado */}
          <div className="w-full md:w-3/4 flex flex-col items-start bg-white md:pl-6">
            {itemActual?.titulo && (
              <h4 className="font-bold text-[#164190] mb-6">
                {itemActual.titulo}
              </h4>
            )}

            {itemActual?.imagen && (
              <div className="w-full relative h-64 mb-6 overflow-hidden">
                <Image
                  src={getStrapiMedia(itemActual.imagen.url)}
                  alt={
                    itemActual.imagen.alternativeText ||
                    itemActual.titulo ||
                    "Ilustración de la diapositiva"
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 75vw"
                  className="object-contain object-left"
                />
              </div>
            )}

            <div className="w-full flex flex-col items-start prose max-w-none text-[#164190]">
              <ReactMarkdown>{itemActual?.contenido || ""}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // VISTA CUANDO SÍ SE AGRUPA (agrupar === true) -> Por fases
  return (
    <section
      className="vertical-swiper py-16 max-w-7xl mx-auto px-4"
      aria-label="Sección por fases"
    >
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* COLUMNA IZQUIERDA: Menú de Fases */}
        <div className="w-full md:w-1/4 flex flex-col pb-6 md:pb-0 md:pr-8">
          {listaFases.map((fase) => {
            const isSelected = faseActual === fase;
            const nombreVisual = nombresFasesMap[fase] || fase.replace("_", " ");

            return (
              <button
                key={fase}
                type="button"
                onClick={() => setFaseActiva(fase)}
                className={`cursor-pointer text-left py-4 text-2xl md:text-3xl transition-colors duration-200 text-[#0B75B9] border-b-2 ${
                  isSelected ? "font-bold" : ""
                }`}
              >
                {nombreVisual}
              </button>
            );
          })}
        </div>

        {/* COLUMNA DERECHA: Elementos asociados a la fase seleccionada */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          {fasesAgrupadas[faseActual]?.map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex flex-col items-start bg-white p-6"
            >
              {/* Imagen */}
              <div className="w-full relative h-64 mb-6 overflow-hidden">
                {item.imagen && (
                  <Image
                    src={getStrapiMedia(item.imagen.url)}
                    alt={
                      item.imagen.alternativeText ||
                      "Ilustración de la diapositiva"
                    }
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain"
                  />
                )}
              </div>

              {/* Contenido en Markdown */}
              <div className="w-full flex flex-col items-start prose max-w-none">
                <ReactMarkdown>{item.contenido}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FasesSeccion;
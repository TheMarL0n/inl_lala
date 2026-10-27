"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

// Si la URL viene de Strapi y no empieza con http, le agregamos el host
const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST;
  return `${host}${url}`;
};

const FasesSeccion = ({ contenido = [] }) => {
  if (!contenido || contenido.length === 0) return null;

  // 1. Agrupamos los elementos automáticamente por su propiedad "fases"
  const fasesAgrupadas = contenido.reduce((acc, item) => {
    const faseKey = item.fases || "general";
    if (!acc[faseKey]) {
      acc[faseKey] = [];
    }
    acc[faseKey].push(item);
    return acc;
  }, {});

  const listaFases = Object.keys(fasesAgrupadas);
  
  // Estado para la fase activa (por defecto la primera)
  const [faseActiva, setFaseActiva] = useState(listaFases[0]);

  // Diccionario opcional para mostrar un texto más amigable en el menú (opcional)
  const nombresFasesMap = {
    fase_1: "antes",
    fase_2: "durante",
    fase_3: "después",
  };

  return (
    <section className="vertical-swiper py-16 max-w-7xl mx-auto px-4" aria-label="Sección por fases">
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* COLUMNA IZQUIERDA: Menú de Fases */}
        <div className="w-full md:w-1/4 flex flex-col pb-6 md:pb-0 md:pr-8">
          {listaFases.map((fase) => {
            const isSelected = faseActiva === fase;
            // Usamos el mapa para mostrar el texto bonito o formateamos el string de la fase
            const nombreVisual = nombresFasesMap[fase] || fase.replace("_", " ");

            return (
              <button
                key={fase}
                onClick={() => setFaseActiva(fase)}
                className={`cursor-pointer text-left py-4 text-2xl md:text-3xl transition-colors duration-200 text-[#0B75B9] border-b-2 ${
                  isSelected
                    ? "font-bold"
                    : ""
                }`}
              >
                {nombreVisual}
              </button>
            );
          })}
        </div>

        {/* COLUMNA DERECHA: Elementos asociados a la fase seleccionada */}
        <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {fasesAgrupadas[faseActiva]?.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start bg-white p-6">
              
              {/* Imagen */}
              <div className="w-full relative h-64 mb-6 overflow-hidden">
                {item.imagen && (
                  <Image
                    src={getStrapiMedia(item.imagen.url)}
                    alt={item.imagen.alternativeText || "Ilustración de la diapositiva"}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain"
                  />
                )}
              </div>

              {/* Contenido en Markdown */}
              <div className="w-full flex flex-col items-start">
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
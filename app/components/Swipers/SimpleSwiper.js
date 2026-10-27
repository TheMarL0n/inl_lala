"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ReactMarkdown from "react-markdown";
import { stroke_text } from "@/app/utils/CSS_clases";

// Si la URL viene de Strapi y no empieza con http, le agregamos el host
const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST;
  return `${host}${url}`;
};

// Función auxiliar para extraer el texto del primer H2 (##) en el Markdown
const extraerH2Markdown = (markdownText) => {
  if (!markdownText) return "";
  // Busca líneas que empiecen con "## " seguido de cualquier texto hasta el salto de línea
  const match = markdownText.match(/^##\s+(.+)$/m);
  return match ? match[1] : "";
};

const extraerH3Markdown = (markdownText) => {
  if (!markdownText) return "";
  // Busca líneas que empiecen con "### " seguido de cualquier texto hasta el salto de línea
  const match = markdownText.match(/^###\s+(.+)$/m);
  return match ? match[1] : "";
};

// Función auxiliar para extraer el texto excluyendo el primer H2 (##) en el Markdown
const extraerRestoDeMarkdown = (markdownText) => {
  if (!markdownText) return "";
  // Remueve todas las líneas que comiencen con 2 o 3 numerales en todo el texto
  const textoSinTitulos = markdownText.replace(/^#{2,3}\s+.+$/gm, "");
  return textoSinTitulos.trim();
};

const SimpleSwiper = ({ contenido, tipo, diapositivas }) => {
  // Estado para llevar el control del índice del slide activo
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="py-10 px-4" aria-label="Sección de etapas de la vida">
      {tipo === "alternativo" ? (
        <div
          className={`max-w-xl mx-auto flex justify-between items-start mb-12`}
        >
          {contenido.map((item, idx) => {
            const isActive = activeIndex === idx;
            const tituloH2 = extraerH2Markdown(item.contenido);

            return (
              <div
                key={`num-${idx}`}
                className="flex flex-col items-center text-center"
              >
                <span
                  className={`${stroke_text} ${isActive ? "text-[#15428C]!" : ""} [-webkit-text-stroke-color:#15428C] text-center text-[120px]! leading-31 uppercase`}
                >
                  {idx + 1}.
                </span>

                {/* Título extraído del h2 del markdown */}
                {tituloH2 && (
                  <span
                    className={`text-[20px] text-[#15428C] capitalize ${
                      isActive ? "font-bold" : "font-normal"
                    }`}
                  >
                    {tituloH2}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}

      <Swiper
        slidesPerView={diapositivas}
        spaceBetween={30}
        navigation={true}
        // autoplay={{
        //   delay: 4500,
        //   disableOnInteraction: false,
        // }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Navigation, Autoplay]}
        className="etapasSwiper max-w-5xl mx-auto"
      >
        {contenido.map((item, idx) => {
          const tituloH2 = extraerH2Markdown(item.contenido) || "";
          const tituloH3 = extraerH3Markdown(item.contenido) || "";
          const subtitulo = extraerRestoDeMarkdown(item.contenido);
          return (
            <SwiperSlide key={idx}>
              {tipo === "texto_gigante_izquierda" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 sm:items-end relative min-h-[400px]">
                  <div className="sm:col-span-2 flex flex-col sm:flex-row items-start h-full">
                    <h2 className="relative z-2 flex flex-col ml-22!">
                      <span
                        className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-[60px]! uppercase`}
                      >
                        {tituloH3}
                      </span>
                      <span
                        className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-[90px]! sm:text-[210px]! sm:leading-[180px] uppercase`}
                      >
                        {tituloH2}
                      </span>
                    </h2>
                  </div>

                  <div className="sm:absolute w-full sm:w-[400px] sm:h-[400px] sm:left-[50%] sm:-ml-[200px] top-0">
                    <div className="w-full max-w-[400px] h-[400px] relative overflow-hidden z-1">
                      <Image
                        src={getStrapiMedia(item.imagen.url)}
                        alt={
                          item.imagen.alternativeText ||
                          `Imagen que representa lo relacionado a ${tituloH2}`
                        } //viene desde la api directo
                        fill
                        sizes="(max-width: 640px)"
                        className="object-contain absolute top-0 left-0"
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col items-center sm:items-start">
                    <p className="font-bold text-[#0B75B9]! text-[26px] leading-[1.1] max-w-[168px]">
                      {subtitulo}
                    </p>
                  </div>
                </div>
              ) : tipo === "texto_gigante_centro" ? (
                <div className="flex flex-col justify-center items-center relative">
                  <div className="w-full max-w-[300px] h-[300px] relative overflow-hidden z-2">
                    <Image
                      src={getStrapiMedia(item.imagen.url)}
                      alt={
                        item.imagen.alternativeText ||
                        `Imagen que representa lo relacionado a ${tituloH2}`
                      } //viene desde la api directo
                      fill
                      sizes="(max-width: 640px)"
                      className="object-contain absolute top-0 left-0"
                    />
                  </div>

                  <h2 className="relative sm:absolute sm:top-[93px] flex flex-col space-y-2">
                    <span
                      className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-center text-[40px]! sm:text-[210px]! leading-1.1 sm:leading-31 uppercase`}
                    >
                      {tituloH2}
                    </span>
                    <span className="sm:ml-auto font-bold text-[#164190] text-[26px] leading-[1.1]">
                      {subtitulo}
                    </span>
                  </h2>
                </div>
              ) : tipo === "destacado" ? (
                <div
                  className={`swiper-destacado max-w-7xl mx-auto relative overflow-hidden z-2 w-full grid grid-cols-1 sm:grid-cols-2 min-h-[470px]`}
                >
                  <div
                    className={`w-full flex flex-col items- justify-end sm:bg-[#164190] p-8 pr-20`}
                  >
                    <ReactMarkdown>{item.contenido}</ReactMarkdown>
                  </div>

                  {item.imagen ? (
                    <div className="w-full relative overflow-hidden h-full">
                      <Image
                        src={getStrapiMedia(item.imagen.url)}
                        alt={
                          item.imagen.alternativeText ||
                          `Imagen que representa lo relacionado a ${tituloH2}`
                        } //viene desde la api directo
                        fill
                        sizes="(max-width: 640px)"
                        className="object-cover absolute top-0 left-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : tipo === "centrado" ? (
                <div
                  className={`relative overflow-hidden z-2 flex swiper-centrado flex-col-reverse items-center w-full`}
                >
                  {item.imagen ? (
                    <div
                      className={`w-full relative overflow-hidden h-[243px]`}
                    >
                      <Image
                        src={getStrapiMedia(item.imagen.url)}
                        alt={
                          item.imagen.alternativeText ||
                          `Imagen que representa lo relacionado a ${tituloH2}`
                        } //viene desde la api directo
                        fill
                        sizes="(max-width: 640px)"
                        className="object-contain absolute top-0 left-0"
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    className={`w-full flex flex-col items-center text-center sm:bg-white p-8`}
                  >
                    <ReactMarkdown>{item.contenido}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div
                  className={`max-w-7xl mx-auto relative overflow-hidden z-2 grid grid-cols-1 sm:grid-cols-3 w-full justify-center items-center`}
                >
                  <div
                    className={`w-full relative overflow-hidden h-96 sm:h-129`}
                  >
                    {tipo === "con_indice" ? (
                      <span
                        className={`${stroke_text} z-2 absolute top-30 left-20 [-webkit-text-stroke-color:#15428C] text-center text-[210px]! leading-31 uppercase`}
                      >
                        {idx + 1}.
                      </span>
                    ) : (
                      ""
                    )}

                    {item.imagen ? (
                      <Image
                        src={getStrapiMedia(item.imagen.url)}
                        alt={
                          item.imagen.alternativeText ||
                          `Imagen que representa lo relacionado a ${tituloH2}`
                        } //viene desde la api directo
                        fill
                        sizes="(max-width: 640px)"
                        className="object-contain absolute top-0 left-0"
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    className={`w-full ${item.imagen || tipo === "con_indice" ? "sm:col-span-2 p-8" : "sm:col-span-3"} flex flex-col items-start sm:bg-white`}
                  >
                    <ReactMarkdown>{item.contenido}</ReactMarkdown>
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};
export default SimpleSwiper;

"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ReactMarkdown from "react-markdown";
import { encabezado_h3, stroke_text } from "@/app/utils/CSS_clases";
import { getStrapiMedia } from "@/app/lib/strapi-media";

// Función auxiliar para extraer el texto del primer H2 (##) en el Markdown
const extraerH2Markdown = (markdownText) => {
  if (!markdownText) return "";
  const match = markdownText.match(/^##\s+(.+)$/m);
  return match ? match[1] : "";
};

const extraerH3Markdown = (markdownText) => {
  if (!markdownText) return "";
  const match = markdownText.match(/^###\s+(.+)$/m);
  return match ? match[1] : "";
};

// Función auxiliar para extraer el texto excluyendo los títulos ## y ### en el Markdown
const extraerRestoDeMarkdown = (markdownText) => {
  if (!markdownText) return "";
  const textoSinTitulos = markdownText.replace(/^#{2,3}\s+.+$/gm, "");
  return textoSinTitulos.trim();
};

const SimpleSwiper = ({ contenido = [], tipo, diapositivas }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleSelectSlide = (idx) => {
    setActiveIndex(idx);
    if (swiperRef.current) {
      swiperRef.current.slideTo(idx);
    }
  };

  return (
    <section className="px-4" aria-label="Sección de etapas de la vida">
      {tipo === "alternativo" && (
        <div className="max-w-xl mx-auto flex justify-between items-start mb-12">
          {contenido.map((item, idx) => {
            const isActive = activeIndex === idx;
            const tituloH2 = extraerH2Markdown(item.contenido);

            return (
              <button
                type="button"
                key={item.id || `num-${idx}`}
                onClick={() => handleSelectSlide(idx)}
                className="flex flex-col items-center text-center cursor-pointer transition-opacity hover:opacity-85"
              >
                <span
                  className={`${stroke_text} ${isActive ? "text-[#15428C]!" : ""
                    } [-webkit-text-stroke-color:#15428C] text-center text-[120px]! leading-31 uppercase transition-colors duration-300`}
                >
                  {idx + 1}.
                </span>

                {tituloH2 && (
                  <span
                    className={`text-[20px] text-[#15428C] capitalize ${isActive ? "font-bold" : "font-normal"
                      }`}
                  >
                    {tituloH2}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Wrapper externo con padding lateral para dejar las flechas fuera del contenido */}
      <div className="relative max-w-6xl mx-auto px-10 sm:px-14">
        <button
          ref={setPrevEl}
          type="button"
          aria-label="Diapositiva anterior"
          className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 text-[#164190] hover:text-[#0B75B9] hover:-translate-x-0.5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-20"
        >
          <svg
            viewBox="0 0 24 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-9 sm:w-7 sm:h-11"
            aria-hidden="true"
          >
            <polyline points="20 4 4 22 20 40" />
          </svg>
        </button>

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            if (prevEl && nextEl) {
              swiper.params.navigation.prevEl = prevEl;
              swiper.params.navigation.nextEl = nextEl;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          slidesPerView={diapositivas}
          spaceBetween={30}
          autoHeight={true}
          navigation={
            prevEl && nextEl
              ? {
                prevEl,
                nextEl,
              }
              : false
          }
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          modules={[Navigation, Autoplay]}
          className={`etapasSwiper max-w-5xl mx-auto ${tipo === "centrado" ? "carusel-imagen-abajo" : ""
            }`}
        >
          {contenido.map((item, idx) => {
            const tituloH2 = extraerH2Markdown(item.contenido) || "";
            const tituloH3 = extraerH3Markdown(item.contenido) || "";
            const subtitulo = extraerRestoDeMarkdown(item.contenido);
            const mediaUrl = getStrapiMedia(item.imagen?.url);

            return (
              <SwiperSlide key={item.id || idx}>
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
                        {mediaUrl && (
                          <Image
                            src={mediaUrl}
                            alt={
                              item.imagen.alternativeText ||
                              `Imagen que representa lo relacionado a ${tituloH2}`
                            }
                            fill
                            sizes="(max-width: 640px) 100vw, 400px"
                            className="object-contain"
                          />
                        )}
                      </div>
                    </div>

                    <div className="w-full flex flex-col items-center sm:items-start">
                      <p className="font-bold text-[#0B75B9]! text-[26px] leading-[1.1] max-w-[168px]">
                        {subtitulo}
                      </p>
                    </div>
                  </div>
                ) : tipo === "texto_gigante_centro" ? (
                  <div className="my-10">
                    {tituloH3 && (
                      <h5 className={`${encabezado_h3} text-white! bg-[#15428C]`}>
                        {tituloH3}
                      </h5>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center relative w-full">
                      <span
                        className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-center text-[40px]! sm:text-[210px]! leading-1.1 sm:leading-none uppercase z-10`}
                      >
                        {tituloH2.slice(0, Math.ceil(tituloH2.length / 2))}
                      </span>

                      {mediaUrl && (
                        <div className="w-full max-w-[300px] h-[300px] relative overflow-hidden z-20 -m-20">
                          <Image
                            src={mediaUrl}
                            alt={
                              item.imagen.alternativeText ||
                              `Imagen que representa lo relacionado a ${tituloH2}`
                            }
                            fill
                            sizes="(max-width: 640px) 100vw, 300px"
                            className="object-contain"
                          />
                        </div>
                      )}

                      <div className="flex flex-col space-y-2 z-10 text-center sm:text-left">
                        <span
                          className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-center text-[40px]! sm:text-[210px]! leading-1.1 sm:leading-none uppercase`}
                        >
                          {tituloH2.slice(Math.ceil(tituloH2.length / 2))}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-right font-bold text-[#164190]! text-[26px]! leading-[1.1] ml-auto! max-w-xl capitalize!">
                      {subtitulo}
                    </h3>
                  </div>
                ) : tipo === "destacado" ? (
                  <div className="swiper-destacado max-w-7xl mx-auto relative overflow-hidden z-2 w-full grid grid-cols-1 sm:grid-cols-2 min-h-[360px]">
                    <div className="w-full flex flex-col justify-end sm:bg-[#164190] text-white! p-8 pr-20">
                      <ReactMarkdown>{item.contenido}</ReactMarkdown>
                    </div>

                    {mediaUrl && (
                      <div className="w-full relative overflow-hidden min-h-[320px] sm:min-h-full">
                        <Image
                          src={mediaUrl}
                          alt={
                            item.imagen.alternativeText ||
                            `Imagen que representa lo relacionado a ${tituloH2}`
                          }
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ) : tipo === "centrado" ? (
                  <div className="relative overflow-hidden z-2 flex swiper-centrado flex-col-reverse items-center w-full">
                    {mediaUrl && (
                      <div className="w-full relative overflow-hidden h-[243px]">
                        <Image
                          src={mediaUrl}
                          alt={
                            item.imagen.alternativeText ||
                            `Imagen que representa lo relacionado a ${tituloH2}`
                          }
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="w-full flex flex-col items-center text-center sm:bg-white p-8 justify-between">
                      <ReactMarkdown>{item.contenido}</ReactMarkdown>
                    </div>
                  </div>
                ) : tipo === "centrado_alternativo" ? (
                  <div className="relative overflow-hidden z-2 flex swiper-centrado flex-col items-center w-full">
                    {mediaUrl && (
                      <div className="w-full relative overflow-hidden h-[243px]">
                        <Image
                          src={mediaUrl}
                          alt={
                            item.imagen.alternativeText ||
                            `Imagen que representa lo relacionado a ${tituloH2}`
                          }
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="w-full flex flex-col items-center text-center sm:bg-white p-8">
                      <ReactMarkdown>{item.contenido}</ReactMarkdown>
                    </div>
                  </div>
                ) : tipo === "multislide" ? (
                  <div className="multislide relative overflow-hidden z-2 flex swiper-centrado flex-col items-start w-full">
                    {mediaUrl && (
                      <div className="w-full relative overflow-hidden h-[243px]">
                        <Image
                          src={mediaUrl}
                          alt={
                            item.imagen.alternativeText ||
                            `Imagen que representa lo relacionado a ${tituloH2}`
                          }
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    )}

                    <div className="w-full flex flex-col items-start sm:bg-white p-8">
                      <ReactMarkdown>{item.contenido}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-7xl mx-auto relative overflow-hidden z-2 grid grid-cols-1 sm:grid-cols-3 w-full justify-center items-center">
                    {(tipo === "con_indice" || mediaUrl) && (
                      <div className="w-full relative overflow-hidden h-96 sm:h-129">
                        {tipo === "con_indice" && (
                          <span
                            className={`${stroke_text} z-2 absolute top-30 left-20 [-webkit-text-stroke-color:#15428C] text-center text-[210px]! leading-31 uppercase`}
                          >
                            {idx + 1}.
                          </span>
                        )}

                        {mediaUrl && (
                          <Image
                            src={mediaUrl}
                            alt={
                              item.imagen.alternativeText ||
                              `Imagen que representa lo relacionado a ${tituloH2}`
                            }
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-contain"
                          />
                        )}
                      </div>
                    )}

                    <div
                      className={`w-full ${mediaUrl || tipo === "con_indice"
                        ? "sm:col-span-2 p-8"
                        : "sm:col-span-3"
                        } flex flex-col items-start sm:bg-white`}
                    >
                      <ReactMarkdown>{item.contenido}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          ref={setNextEl}
          type="button"
          aria-label="Siguiente diapositiva"
          className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 text-[#164190] hover:text-[#0B75B9] hover:translate-x-0.5 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-20"
        >
          <svg
            viewBox="0 0 24 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-9 sm:w-7 sm:h-11"
            aria-hidden="true"
          >
            <polyline points="4 4 20 22 4 40" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default SimpleSwiper;
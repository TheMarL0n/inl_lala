"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/app/lib/strapi-media";

// Función auxiliar para extraer el texto del primer H2 (##) en el Markdown
const extraerH2Markdown = (markdownText) => {
  if (!markdownText) return "";
  const match = markdownText.match(/^##\s+(.+)$/m);
  return match ? match[1] : "";
};

const SomosSwiper = ({ contenido = [], tipo }) => {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const swiperRef = useRef(null);

  const colores = {
    azul: "text-[#15428C]!",
    rojo: "text-[#FF0000]!",
    verde: "text-[#009638]!",
    celeste: "text-[#0B75B9]!",
  };

  return (
    <section className="px-4 py-20" aria-label="Sección de etapas de la vida">

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
          slidesPerView={1}
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
          modules={[Navigation, Autoplay]}
          className={`etapasSwiper max-w-5xl mx-auto`}
        >
          {contenido.map((item, idx) => {
            const tituloH2 = extraerH2Markdown(item.contenido) || "";
            const mediaUrl = getStrapiMedia(item.imagen_principal?.url);

            return (
              <SwiperSlide key={item.id || idx}>
                {
                  tipo === "destacado" ? (
                    <div className="swiper-destacado max-w-7xl mx-auto relative overflow-hidden z-2 w-full grid grid-cols-1 sm:grid-cols-2 min-h-[360px]">
                      <div className="w-full flex flex-col justify-end sm:bg-[#164190] text-white! p-8 pr-20">
                        <ReactMarkdown>{item.contenido}</ReactMarkdown>
                      </div>

                      {mediaUrl && (
                        <div className="w-full relative overflow-hidden min-h-[320px] sm:min-h-full">
                          <Image
                            src={mediaUrl}
                            alt={
                              `Imagen que representa lo relacionado a ${tituloH2}`
                            }
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ) :
                    <div className="max-w-7xl mx-auto relative overflow-hidden z-2 grid grid-cols-1 sm:grid-cols-3 w-full justify-center items-center">
                      {mediaUrl && (
                        <div className="w-full relative overflow-hidden h-96 sm:h-129">
                          {mediaUrl && (
                            <Image
                              src={mediaUrl}
                              alt={
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
                        className={`w-full ${mediaUrl
                          ? "sm:col-span-2 p-8"
                          : "sm:col-span-3"
                          } flex flex-col items-start sm:bg-white`}
                      >
                        <h2 className={`${colores[item.color] || colores.azul} capitalize!`}>{item.titulo}</h2>
                        <ReactMarkdown>{item.contenido}</ReactMarkdown>
                      </div>
                    </div>
                }

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

export default SomosSwiper;
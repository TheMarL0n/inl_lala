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

const DobleFotoSwiper = ({ contenido, tipo }) => {
  // Estado para llevar el control del índice del slide activo
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-label="Sección de etapas de la vida">
      {tipo === "original" ? (
        <div
          className={`max-w-xl mx-auto flex justify-between items-start mb-12`}
        >
          {contenido.map((item, idx) => {
            const tituloH2 = extraerH2Markdown(item.contenido);
            const isActive = activeIndex === idx;

            return (
              <div
                key={`num-${idx}`}
                className="flex flex-col items-center text-center"
              >
                <span
                  className={`${stroke_text} ${isActive ? "text-[#15428C]!" : ""} [-webkit-text-stroke-color:#15428C] text-center text-[120px]! leading-31 uppercase`}
                >
                  {idx + 1 < 9 ? "0" : ""}
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
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Navigation, Autoplay]}
        className="dobleFotoSwiper"
      >
        {contenido.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className={`${item.modo_oscuro ? "bg-[#15428C]" : ""} h-auto flex flex-col justify-between`}
          >
            <div
              className={`grid grid-cols-1 ${tipo === "alternativo" ? "sm:grid-cols-6" : "sm:grid-cols-4"} mx-auto relative overflow-hidden z-2 w-full min-h-[450px] sm:min-h-[790px]`}
            >
              <div
                className={`relative ${tipo === "alternativo" ? "sm:col-span-2" : ""}`}
              >
                {tipo === "alternativo" ? (
                  <span
                    className={`${stroke_text} ${item.modo_oscuro ? "[-webkit-text-stroke-color:#ffffff]" : "[-webkit-text-stroke-color:#15428C]"} text-center text-[120px]! sm:text-[210px]! leading-31 uppercase absolute z-9 right-20 top-12`}
                  >
                    {idx + 1 < 9 ? "0" : ""}{idx + 1}.
                  </span>
                ) : (
                  ""
                )}
                {item.imagen_izquierda ? (
                  <Image
                    src={getStrapiMedia(item.imagen_izquierda.url)}
                    alt={`Ilustración representativa sobre el mito: ${item.titulo}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover absolute top-0 left-0"
                  />
                ) : (
                  ""
                )}
              </div>

              <div
                className={`w-full ${tipo === "alternativo" ? "sm:col-span-3" : "sm:col-span-2"} flex flex-col items-start p-8 ${item.modo_oscuro ? "modo-oscuro" : ""}`}
              >
                <ReactMarkdown>{item.contenido}</ReactMarkdown>
              </div>

              <div className="relative">
                {item.imagen_derecha ? (
                  <Image
                    src={getStrapiMedia(item.imagen_derecha.url)}
                    alt={`Ilustración representativa sobre el mito: ${item.titulo}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover absolute top-0 left-0"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default DobleFotoSwiper;

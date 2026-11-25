"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import {
  BlueButton,
  encabezado_h3,
  encabezado_h4,
  parrafo_normal,
} from "@/app/utils/CSS_clases";
import { Comillas } from "@/app/utils/SVG_Icons";
import ReactMarkdown from "react-markdown";
import CustomLink from "../Auxiliares/CustomLinks";

// Si la URL viene de Strapi y no empieza con http, le agregamos el host
const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.STRAPI_HOST;
  return `${host}${url}`;
};

const HomeMitosSwiper = ({ titulo_1, titulo_2, contenido, alternative, currentSlug, titulo_mitos }) => {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Comienza (0) cuando el inicio de la sección llega a la mitad de la pantalla ("start center")
    offset: ["start center", "end end"],
  });

  // A partir de que el tope toca la mitad de la pantalla (0), pasa de #15428C a #FFFFFF
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.10, 1],
    prefersReducedMotion
      ? ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
      : ["#15428C", "#FFFFFF", "#FFFFFF"]
  );

  // Aparece casi a la par del cambio de fondo
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.35, 1],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 1]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0.1, 0.35, 1],
    prefersReducedMotion ? [0, 0, 0] : [20, 0, 0]
  );

  // Filtramos el arreglo para excluir el mito que coincide con el slug actual
  const filteredMitos = contenido.filter((item) => {
    if (!currentSlug) return true;
    if (!item.slug) return true;
    return item.slug !== currentSlug;
  });

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor: bgColor }}
      suppressHydrationWarning
      className="relative sm:min-h-[175vh] overflow-x-clip"
      aria-label="Sección de mitos y realidades"
    >
      <div className="sm:sticky sm:top-0 sm:min-h-screen flex flex-col justify-center py-10 sm:py-16">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          suppressHydrationWarning
          className="will-change-[transform,opacity]"
        >
          {alternative ? (
            ""
          ) : (
            <div className="relative z-3 max-w-7xl mx-auto -mb-20 pt-4 px-4">
              <h2>
                <span className={`${encabezado_h3} bg-[#0B75B9] hidden sm:block`}>
                  {titulo_1}
                </span>
                <span className={`${encabezado_h3} bg-[#0B75B9] sm:ml-8 block`}>
                  {titulo_2}
                </span>
              </h2>
            </div>
          )}

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            navigation={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay]}
            className="mitosSwiper"
          >
            {filteredMitos.map((item, idx) => (
              <SwiperSlide key={idx}>
                <article className="relative overflow-hidden z-2 flex flex-col sm:flex-row w-full">
                  {/* Contenedor de la imagen optimizada */}
                  <div className="w-full sm:w-1/2 relative overflow-hidden h-96 sm:h-129">
                    <Image
                      src={getStrapiMedia(
                        item.imagen?.url || item.imagen_principal?.url,
                      )}
                      alt={`Ilustración representativa sobre el mito: ${item.mito}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover absolute top-0 left-0"
                    />
                  </div>

                  <div className="w-full sm:w-1/2 flex flex-col items-start sm:bg-white p-8 sm:-ml-30 sm:mt-40 z-3">
                    <div className="space-y-4 max-w-125">
                      <div>
                        <span>
                          <Comillas className="rotate-180 sm:-mt-12 sm:-ml-12" />
                        </span>
                        {titulo_mitos ? (
                          <p className="text-[#15428C] font-black text-[32px] leading-[32px] mb-4!">
                            {titulo_mitos}
                          </p>
                        ) : (
                          ""
                        )}
                        {alternative ? (
                          <p className="text-[#15428C] font-black text-[30px]">
                            mito
                          </p>
                        ) : (
                          ""
                        )}
                        <h2
                          className={`text-[#15428C] ${alternative ? "text-[35px] leading-8 sm:text-[45px] sm:leading-10 font-bold" : "text-[50px] leading-12 sm:text-[60px] sm:leading-14 font-black"}`}
                        >
                          {item.mito}
                        </h2>
                        {alternative ? (
                          ""
                        ) : (
                          <span>
                            <Comillas className="ml-auto block sm:-mt-6" />
                          </span>
                        )}
                      </div>
                      {alternative ? (
                        <p className="text-[#15428C] font-black text-[30px] m-0">
                          realidad
                        </p>
                      ) : (
                        <h4 className={`${encabezado_h4} bg-[#009638]`}>
                          Lo que dice la ciencia
                        </h4>
                      )}
                      <div className={`${parrafo_normal} text-[#15428C]`}>
                        <ReactMarkdown>{item.realidad}</ReactMarkdown>
                      </div>
                      {alternative ? (
                        <span>
                          <Comillas className="ml-auto block sm:-mt-6" />
                        </span>
                      ) : (
                        <CustomLink
                          href={`/paginas/mitos-y-realidades/${item.slug}`}
                          className={`${BlueButton} mb-12 sm:mb-0 sm:mt-12 w-fit`}
                        >
                          Descubre por qué
                        </CustomLink>
                      )}
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeMitosSwiper;
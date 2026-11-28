"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { parrafo_normal } from "../utils/CSS_clases";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "../lib/strapi-media";

const PagesJumbotron = ({
  titulo,
  subtitulo,
  background,
  titulo_descripcion,
  descripcion,
  detalles,
}) => {
  const bannerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });

  // Efecto de scroll en el fondo (similar a HomeJumbotron)
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.05, 1.22]
  );
  const bgBlur = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(5px)"]
  );
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    prefersReducedMotion ? [1, 1, 1] : [1, 1, 0.35]
  );

  // Plano 1: título principal sube y se desvanece
  const tituloY = useTransform(
    scrollYProgress,
    [0, 0.6],
    prefersReducedMotion ? [0, 0] : [0, -55]
  );
  const tituloScale = useTransform(
    scrollYProgress,
    [0, 0.6],
    prefersReducedMotion ? [1, 1] : [1, 0.96]
  );
  const tituloOpacity = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  // Plano 2: subtítulo con mayor desplazamiento y ligero zoom hacia adelante
  const subtituloY = useTransform(
    scrollYProgress,
    [0, 0.65],
    prefersReducedMotion ? [0, 0] : [0, -115]
  );
  const subtituloScale = useTransform(
    scrollYProgress,
    [0, 0.65],
    prefersReducedMotion ? [1, 1] : [1, 1.06]
  );
  const subtituloOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  return (
    <section className="relative overflow-hidden">
      <div
        ref={bannerRef}
        className="relative h-screen min-h-150 max-h-225 2xl:max-h-200 flex flex-col sm:justify-center w-full overflow-hidden"
      >
        {background?.url ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0.7, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              scale: bgScale,
              filter: bgBlur,
              opacity: bgOpacity,
            }}
            suppressHydrationWarning
            className="absolute inset-0 w-full h-full -z-10 will-change-transform"
          >
            <Image
              src={getStrapiMedia(background.url)}
              alt={
                titulo
                  ? `Imagen de fondo para ${titulo}`
                  : "Imagen de fondo del encabezado"
              }
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        ) : (
          ""
        )}

        <div className="max-w-7xl sm:w-7xl mx-auto space-y-20 sm:space-y-4 mt-40 sm:mt-20 relative z-10 px-4 sm:px-0">
          <h1 className="text-white text-[30px] sm:text-[70px] font-black uppercase flex flex-col sm:gap-2 items-start">
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                y: tituloY,
                scale: tituloScale,
                opacity: tituloOpacity,
              }}
              suppressHydrationWarning
              className="bg-[#15428C] px-3 will-change-transform"
            >
              {titulo}
            </motion.span>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                y: subtituloY,
                scale: subtituloScale,
                opacity: subtituloOpacity,
              }}
              suppressHydrationWarning
              className="text-[50px] sm:text-[135px] sm:leading-33.75 ml-10 sm:ml-30 bg-[#15428C] px-3 will-change-transform"
            >
              {subtitulo}
            </motion.span>
          </h1>
        </div>
      </div>

      {
        titulo_descripcion ?
          (<motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            suppressHydrationWarning
            className="page_descripcion max-w-4xl mx-4 sm:mx-auto bg-white -mt-30 p-4 sm:p-20 relative z-20 min-h-37.5 will-change-[transform,opacity]"
          >
            <div className="text-[#15428C] text-center font-medium sm:text-[40px] sm:leading-11 text-[26px]">
              <ReactMarkdown>{titulo_descripcion}</ReactMarkdown>
            </div>
          </motion.div>)
          :
          ""
      }

      {descripcion ? (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          suppressHydrationWarning
          className="page_descripcion max-w-4xl mx-4 sm:mx-auto bg-white p-4 relative z-20 min-h-37.5 will-change-[transform,opacity]"
        >
          <p
            className={`${parrafo_normal} text-[38px]! leading-11! text-[#164190]`}
          >
            {descripcion}
          </p>
        </motion.div>
      ) : (
        ""
      )}
    </section>
  );
};

export default PagesJumbotron;
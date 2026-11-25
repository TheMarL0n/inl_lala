"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlueButton, encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases";

const easeSmooth = [0.22, 1, 0.36, 1];

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const elementVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeSmooth },
  },
};

const TemaDestacado = ({
  imagen_tema_destacado,
  titulo_tema_destacado,
  subtitulo_tema_destacado,
  descripcion_tema_destacado,
  enlace_tema_destacado,
}) => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Desplazamiento vertical sutil ligado al scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const getStrapiMedia = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    const host = process.env.STRAPI_HOST;
    return `${host}${url}`;
  };

  const mediaUrl = getStrapiMedia(imagen_tema_destacado?.url);

  return (
    <section
      ref={sectionRef}
      className="mt-20 relative sm:min-h-screen flex flex-col sm:justify-center overflow-hidden"
    >
      {/* Imagen de fondo con efecto parallax */}
      {mediaUrl && (
        <motion.div
          style={{ y: yParallax, scale: 1.12 }}
          className="absolute inset-0 -z-10 w-full h-full will-change-transform"
        >
          <Image
            src={mediaUrl}
            alt={titulo_tema_destacado || "Imagen de tema destacado"}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center w-full h-full"
          />
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto w-full">
        <div className="relative z-3 max-w-7xl sm:w-7xl mx-auto py-4 px-4">
          <motion.article
            variants={contentContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h2 variants={elementVariants}>
              <a href={`${enlace_tema_destacado}`}>
                <span className={`${encabezado_h3} bg-[#164190] sm:text-[46px]!`}>
                  {titulo_tema_destacado}
                </span>
                <br />
                <span
                  className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}
                >
                  {subtitulo_tema_destacado}
                </span>
              </a>
            </motion.h2>

            <motion.p
              variants={elementVariants}
              className={`${parrafo_normal} text-white font-medium text-[34px]! leading-9 max-w-md sm:ml-26 mt-6`}
            >
              {descripcion_tema_destacado}
            </motion.p>

            <motion.div
              variants={elementVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-fit sm:ml-26 mt-6"
            >
              <a
                href={`${enlace_tema_destacado}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BlueButton} w-fit`}
              >
                Ver más
                <span className="sr-only">{descripcion_tema_destacado}</span>
              </a>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default TemaDestacado;
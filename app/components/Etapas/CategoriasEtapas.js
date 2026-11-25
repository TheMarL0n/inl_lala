"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BlueButton, parrafo_normal } from "@/app/utils/CSS_clases";
import CustomLink from "../Auxiliares/CustomLinks";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const easeSmooth = [0.22, 1, 0.36, 1];

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeSmooth },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeSmooth },
  },
};

const CategoriasEtapas = ({ etapas, categorias }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(() => {
    if (categorias.length === 0) return null;

    const categoriasOrdenadas = [...categorias].sort(
      (a, b) => a.orden - b.orden,
    );
    return categoriasOrdenadas[0].id;
  });

  const handleEtapaClick = (id) => {
    setCategoriaSeleccionada(id);
    const elemento = document.getElementById("etapas_at_top");
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" });
    }
  };

  const etapasFiltradas = categoriaSeleccionada
    ? etapas.filter((etapa) => etapa.categoria.id === categoriaSeleccionada)
    : etapas;

  const categoriasOrdenadas = [...categorias].sort((a, b) => a.orden - b.orden);

  return (
    <section id="etapas_at_top" className="pb-20 px-4">
      <motion.h2
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center text-[50px] sm:text-[90px] sm:leading-55 text-[#164190] uppercase font-[600]"
      >
        ¿qué edad buscas?:
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-[repeat(var(--total-cols),minmax(0,1fr))]"
        style={{
          "--total-cols": categorias.length,
        }}
      >
        {categoriasOrdenadas.map((item, idx) => {
          const isActive = categoriaSeleccionada === item.id;
          const mediaUrl = getStrapiMedia(item.imagen_principal?.url);

          return (
            <motion.div
              key={item.id || idx}
              variants={cardVariants}
              onClick={() => handleEtapaClick(item.id)}
              className="relative space-y-4 group cursor-pointer"
            >
              {/* Elevamos solo la imagen en hover para mantener alineada la línea punteada inferior */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="relative min-h-57 max-h-57 mx-2 overflow-hidden"
              >
                <div
                  className={`bg-[#164190] sm:bg-white absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 ${
                    isActive
                      ? "opacity-0"
                      : "opacity-100 group-hover:opacity-0"
                  }`}
                ></div>
                {mediaUrl && (
                  <Image
                    src={mediaUrl}
                    alt={
                      item.titulo
                        ? `Miniatura sobre ${item.titulo}`
                        : "Miniatura sobre las etapas de la vida y el consumo lácteos"
                    }
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    priority={idx < 4}
                    className="absolute z-1 top-0 left-0 object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                )}
              </motion.div>

              <div className="absolute sm:relative top-4 sm:top-0 left-4 sm:left-0 z-3">
                {/* Punto del timeline con feedback visual al estar activo */}
                <motion.div
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ duration: 0.25 }}
                  className={`hidden sm:block relative z-2 w-7 h-7 rounded-full mx-auto border-2 border-[#15428C] duration-400 ${
                    isActive
                      ? "bg-[#15428C]"
                      : "bg-[#0B75B9] group-hover:bg-[#15428C]"
                  }`}
                ></motion.div>
                <div className="hidden sm:block absolute border-dashed border-2 border-[#164190] w-full top-3"></div>
                <h3
                  className={`uppercase text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-white sm:text-[#15428C] sm:text-center ${
                    isActive
                      ? "opacity-0 sm:opacity-100"
                      : "opacity-100 group-hover:opacity-0 sm:group-hover:opacity-100"
                  }`}
                >
                  {item.titulo}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="max-w-7xl mx-auto mt-26">
        <AnimatePresence mode="wait">
          <motion.div
            key={categoriaSeleccionada ?? "all"}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            {etapasFiltradas.length > 0 ? (
              [...etapasFiltradas]
                .sort((a, b) => b.id - a.id)
                .map((item, idx) => (
                  <motion.article
                    key={item.id || idx}
                    variants={itemVariants}
                    className="border-b border-[#164190] pb-8 gap-4 grid grid-cols-3 sm:grid-cols-4 items-center"
                  >
                    <div className="col-span-2 sm:col-span-3">
                      <h3>
                        <CustomLink
                          href={`/paginas/etapas/${item.slug}`}
                          className={`${parrafo_normal} text-[#164190] font-bold hover:opacity-80 transition-opacity`}
                        >
                          {item.titulo_linea_1} {item.titulo_linea_2}
                        </CustomLink>
                      </h3>
                      <p className={`${parrafo_normal} text-[#164190]`}>
                        {item.descripcion}
                      </p>
                    </div>
                    <CustomLink
                      href={`/paginas/etapas/${item.slug}`}
                      className={`${BlueButton} w-fit ml-auto`}
                    >
                      Ver más
                      <span className="sr-only">{item.descripcion}</span>
                    </CustomLink>
                  </motion.article>
                ))
            ) : (
              <motion.p
                variants={itemVariants}
                className="text-center text-gray-500 col-span-full"
              >
                No hay datos para esta etapa.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CategoriasEtapas;
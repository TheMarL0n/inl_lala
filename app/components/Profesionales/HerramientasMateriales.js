"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BlueButton, encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases";
import CustomLink from "../Auxiliares/CustomLinks";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const easeSmooth = [0.22, 1, 0.36, 1];

const titleGroupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const titleLineVariants = {
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
      staggerChildren: 0.1,
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

const HerramientasMateriales = ({ elementos, herramientas_materiales }) => {
  const searchParams = useSearchParams();
  const catUrl = searchParams.get("cat");

  const getCategoriaDesdeUrl = (catParam) => {
    if (!catParam) return null;
    const parsedCat = Number(catParam);
    const existe = herramientas_materiales.some((item) => item.id === parsedCat);
    return existe ? parsedCat : null;
  };

  const defaultCategoria =
    herramientas_materiales.length > 0 ? herramientas_materiales[0].id : null;

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    () => getCategoriaDesdeUrl(catUrl) ?? defaultCategoria
  );
  const [prevCatUrl, setPrevCatUrl] = useState(catUrl);

  if (catUrl !== prevCatUrl) {
    setPrevCatUrl(catUrl);
    const catDesdeUrl = getCategoriaDesdeUrl(catUrl);
    if (catDesdeUrl !== null) {
      setCategoriaSeleccionada(catDesdeUrl);
    }
  }

  const handleCategoriaClick = (id) => {
    setCategoriaSeleccionada(id);
    const elemento = document.getElementById("elementos_at_top");
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" });
    }
  };

  const elementosFiltradas = categoriaSeleccionada
    ? elementos.filter((duda) => duda.categoria.id === categoriaSeleccionada)
    : elementos;

  return (
    <section id="elementos_at_top" className="pb-20 px-4">
      <div className="max-w-7xl mx-auto py-20">
        <motion.h2
          variants={titleGroupVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={titleLineVariants}
            className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}
          >
            Herramientas y
          </motion.span>
          <motion.span
            variants={titleLineVariants}
            className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}
          >
            Materiales
          </motion.span>
        </motion.h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {herramientas_materiales.map((item, idx) => {
          const isActive = categoriaSeleccionada === item.id;
          const mediaUrl = getStrapiMedia(item.imagen_principal?.url);

          return (
            <motion.div
              key={item.id || idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              onClick={() => handleCategoriaClick(item.id)}
              className="space-y-4 group cursor-pointer"
            >
              <div className="relative min-h-60 sm:min-h-72 overflow-hidden">
                <div
                  className={`bg-[#15428C]/70 absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 ${
                    isActive
                      ? "opacity-0"
                      : "opacity-0 sm:opacity-100 group-hover:opacity-0"
                  }`}
                ></div>
                {mediaUrl && (
                  <Image
                    src={mediaUrl}
                    alt={
                      item.titulo ||
                      "Imagen de categoría de las elementos más comunes sobre los lácteos"
                    }
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    priority={idx < 4}
                    className="absolute z-1 top-0 left-0 object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-[#15428C]">
                {item.titulo}
              </h3>
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
            {elementosFiltradas.length > 0 ? (
              [...elementosFiltradas]
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
                          href={`/paginas/profesionales/${item.slug}`}
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
                      href={`/paginas/profesionales/${item.slug}`}
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
                No hay elementos registradas para esta categoría.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HerramientasMateriales;
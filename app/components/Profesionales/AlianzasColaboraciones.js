"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { encabezado_h3 } from "@/app/utils/CSS_clases";

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

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const logoCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeSmooth },
  },
};

const AlianzasColaboraciones = ({ colaboradores }) => {
  const getStrapiMedia = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    const host = process.env.NEXT_PUBLIC_STRAPI_HOST || "";
    return `${host}${url}`;
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
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
            Alianzas y
          </motion.span>
          <motion.span
            variants={titleLineVariants}
            className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}
          >
            Colaboraciones
          </motion.span>
        </motion.h2>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-20"
        >
          {colaboradores.map((item, idx) => {
            const mediaUrl = getStrapiMedia(item.logo?.url);

            return (
              <motion.div
                key={item.id || idx}
                variants={logoCardVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-27 flex items-center justify-center"
              >
                {!mediaUrl ? (
                  <div className="w-full h-full bg-[#164190]/10 flex items-center justify-center">
                    <h3 className="uppercase text-[#164190] font-bold">Logo</h3>
                  </div>
                ) : (
                  <Image
                    src={mediaUrl}
                    alt={item.nombre || item.titulo || "Logo de colaborador"}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-contain p-2 transition-transform duration-300 ease-out hover:scale-105"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AlianzasColaboraciones;
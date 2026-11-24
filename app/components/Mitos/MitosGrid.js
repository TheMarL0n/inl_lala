"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomLink from "../Auxiliares/CustomLinks";

const easeSmooth = [0.22, 1, 0.36, 1];

const gridVariants = {
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

const MitosGrid = ({ mitos }) => {
  // Si la URL viene de Strapi y no empieza con http, le agregamos el host
  const getStrapiMedia = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    return `${process.env.NEXT_PUBLIC_STRAPI_HOST}${url}`;
  };

  return (
    <section className="py-20 px-4">
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {mitos.map((item, idx) => {
          const mediaUrl = getStrapiMedia(item.imagen_principal?.url);

          return (
            <motion.div
              key={item.id || item.slug || idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <CustomLink
                href={`/paginas/mitos-y-realidades/${item.slug}`}
                className="block space-y-4 group cursor-pointer"
              >
                <div className="relative min-h-60 p-4 overflow-hidden">
                  <div className="bg-[#15428C]/70 absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 opacity-100 group-hover:opacity-0"></div>

                  {mediaUrl && (
                    <Image
                      src={mediaUrl}
                      alt={`Imagen sobre el tema ${item.mito || "mitos y realidades"}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority={idx < 4}
                      className="absolute z-1 top-0 left-0 object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  )}

                  <h3 className="text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-white relative z-2">
                    {item.mito}
                  </h3>
                </div>
              </CustomLink>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default MitosGrid;
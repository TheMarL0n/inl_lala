"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { encabezado_h2, encabezado_h3 } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const EASE_OUT = [0.22, 1, 0.36, 1];
const VIEWPORT_CONFIG = { once: true, amount: "some" };

const SeccionEquipo = ({ contenido }) => {
  if (!Array.isArray(contenido) || contenido.length === 0) {
    return null;
  }

  const contenidoOrdenado = [...contenido].sort(
    (a, b) => (a?.orden ?? 0) - (b?.orden ?? 0)
  );

  return (
    <MotionConfig reducedMotion="user">
      <>
        <div className="w-full sm:w-5xl mx-auto pt-20 px-4 sm:px-0">
          <h2>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.55, ease: EASE_OUT }}
              className={`inline-block ${encabezado_h3} text-white bg-[#164190] text-[46px]`}
            >
              Nuestro
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT }}
              className={`inline-block ${encabezado_h3} ml-6 sm:ml-20 text-white bg-[#164190] text-[70px]!`}
            >
              Equipo
            </motion.span>
          </h2>
        </div>

        {contenidoOrdenado.map((item, idx) => {
          const mediaUrl = item?.imagen_principal?.url
            ? getStrapiMedia(item.imagen_principal.url)
            : null;

          return (
            <section
              key={item?.id ?? idx}
              className="contenido_destacado-alternativo py-20"
            >
              <div className="relative grid grid-cols-1 sm:grid-cols-3 items-start">
                {mediaUrl && (
                  <div className="sm:sticky sm:top-0 h-fit w-full">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={VIEWPORT_CONFIG}
                      transition={{ duration: 0.7, ease: EASE_OUT }}
                      className="relative w-full h-[300px] sm:h-[400px]"
                    >
                      <Image
                        src={mediaUrl}
                        alt={
                          item?.imagen_principal?.alternativeText ||
                          item?.nombre ||
                          "Ilustración representativa"
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-contain object-left"
                      />
                    </motion.div>
                  </div>
                )}

                <div className="sm:col-span-2 px-8 space-y-8 flex flex-col justify-center">
                  {(item?.nombre || item?.puesto) && (
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT_CONFIG}
                      transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT }}
                      className="mt-0! mb-6"
                    >
                      {item?.nombre && (
                        <>
                          <span
                            className={`${encabezado_h3} text-[#164190]! text-[40px]`}
                          >
                            {item.nombre}
                          </span>
                          <br />
                        </>
                      )}

                      {item?.puesto && (
                        <motion.span
                          initial={{ opacity: 0, y: 14 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={VIEWPORT_CONFIG}
                          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
                          className={`${encabezado_h2} ml-12! block text-white text-[30px]! font-light bg-[#FF0000] leading-6!`}
                        >
                          {item.puesto}
                        </motion.span>
                      )}
                    </motion.h2>
                  )}

                  {item?.biografia && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT_CONFIG}
                      transition={{ duration: 0.6, delay: 0.25, ease: EASE_OUT }}
                      className="sm:max-w-xl cuerpo-oscuro text-[30px]! leading-[1.1]"
                    >
                      <ReactMarkdown>{item.biografia}</ReactMarkdown>
                    </motion.div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </>
    </MotionConfig>
  );
};

export default SeccionEquipo;
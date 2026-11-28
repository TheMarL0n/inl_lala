"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { encabezado_h2, encabezado_h3 } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const EASE_OUT = [0.22, 1, 0.36, 1];

const SeccionIntroductoria = ({
  titulo_1,
  titulo_2,
  descripcion,
  imagen_principal,
}) => {
  const imageUrl = imagen_principal ? getStrapiMedia(imagen_principal.url) : null;

  return (
    <MotionConfig reducedMotion="user">
      <section className="contenido_destacado bg-[#15428C] py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-0">
          {(titulo_1 || titulo_2) && (
            <h2>
              {titulo_1 && (
                <>
                  <motion.span
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className={`inline-block ${encabezado_h3} text-white bg-[#0B75B9] text-[46px]`}
                  >
                    {titulo_1}
                  </motion.span>
                  <br />
                  <br />
                </>
              )}

              {titulo_2 && (
                <motion.span
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
                  className={`inline-block ${encabezado_h2} text-white text-[40px] sm:text-[150px]`}
                >
                  {titulo_2}
                </motion.span>
              )}
            </h2>
          )}
        </div>

        <div className="max-w-5xl mx-auto relative grid grid-cols-1 sm:grid-cols-3 items-center">
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
              className="h-fit w-full"
            >
              <div className="relative w-full h-[300px] sm:h-[400px]">
                <Image
                  src={imageUrl}
                  alt={imagen_principal?.alternativeText || "Ilustración representativa"}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain object-center"
                />
              </div>
            </motion.div>
          )}

          {descripcion && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.65, delay: 0.25, ease: EASE_OUT }}
              className="sm:col-span-2 px-8 py-16 space-y-8 flex flex-col justify-center"
            >
              <div className="cuerpo-oscuro text-white text-[30px]! leading-1.1">
                <ReactMarkdown>{descripcion}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
};

export default SeccionIntroductoria;
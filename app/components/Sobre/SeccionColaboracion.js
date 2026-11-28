"use client";

import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import { encabezado_h3, stroke_text } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const EASE_OUT = [0.22, 1, 0.36, 1];
const VIEWPORT_CONFIG = { once: true, amount: "some" };

const SeccionColaboracion = ({
  titulo_1,
  titulo_2,
  descripcion,
  imagen_principal,
}) => {
  const imageUrl = imagen_principal ? getStrapiMedia(imagen_principal.url) : null;

  return (
    <MotionConfig reducedMotion="user">
      <section className="contenido_destacado bg-[#15428C] relative grid grid-cols-1 sm:grid-cols-2">
        {imageUrl && (
          <div className="sm:sticky sm:top-0 h-fit w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="relative w-full h-[500px] sm:h-screen"
            >
              <Image
                src={imageUrl}
                alt={imagen_principal?.alternativeText || "Ilustración colaboración del instituto"}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        )}

        <div className="sm:min-h-[650px] px-8 py-16 space-y-8 flex flex-col justify-center">
          {(titulo_1 || titulo_2) && (
            <h2>
              {titulo_1 && (
                <>
                  <motion.span
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className={`inline-block ${encabezado_h3} text-white bg-[#0B75B9] text-[46px]`}
                  >
                    {titulo_1}
                  </motion.span>
                  <br />
                </>
              )}

              {titulo_2 && (
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_CONFIG}
                  transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT }}
                  className={`inline-block ${stroke_text} [-webkit-text-stroke-color:white] text-center text-[120px]! leading-31 uppercase`}
                >
                  {titulo_2}
                </motion.span>
              )}
            </h2>
          )}

          {descripcion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
              className="mt-4 sm:max-w-xl cuerpo-oscuro text-white! text-[30px] leading-1.1"
            >
              <ReactMarkdown>{descripcion}</ReactMarkdown>
            </motion.div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
};

export default SeccionColaboracion;
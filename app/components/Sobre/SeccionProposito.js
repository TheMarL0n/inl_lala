"use client";

import { motion, MotionConfig } from "framer-motion";
import { encabezado_h3 } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";

const EASE_OUT = [0.22, 1, 0.36, 1];
const VIEWPORT_CONFIG = { once: true, amount: "some" };

const SeccionProposito = ({
  titulo_1,
  titulo_2,
  descripcion,
}) => {
  const extraerH3Markdown = (markdownText) => {
    if (!markdownText) return "";
    const match = markdownText.match(/^###\s+(.+)$/m);
    return match ? match[1].trim() : "";
  };

  const extraerRestoDeMarkdown = (markdownText) => {
    if (!markdownText) return "";
    const textoSinTitulos = markdownText.replace(/^#{2,3}\s+.+$/gm, "");
    return textoSinTitulos.trim();
  };

  const h3Texto = extraerH3Markdown(descripcion);
  const restoMarkdown = extraerRestoDeMarkdown(descripcion);

  return (
    <MotionConfig reducedMotion="user">
      <section className="contenido_destacado-alternativo py-20 overflow-x-clip">
        <div className="max-w-5xl mx-auto px-4 sm:px-0">
          {(titulo_1 || titulo_2) && (
            <h2>
              {titulo_1 && (
                <>
                  <motion.span
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_CONFIG}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className={`inline-block ${encabezado_h3} text-white bg-[#164190] text-[46px]`}
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
                  className={`inline-block ${encabezado_h3} ml-6 sm:ml-20 text-white bg-[#164190] text-[70px]!`}
                >
                  {titulo_2}
                </motion.span>
              )}
            </h2>
          )}
        </div>

        <div className="max-w-5xl mx-auto relative grid grid-cols-1 items-center">
          <div className="sm:col-span-2 px-8 py-16 space-y-8 flex flex-col justify-center">
            {h3Texto && (
              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
                className="font-bold! text-[90px]! leading-22!"
              >
                {h3Texto}
              </motion.h3>
            )}

            {restoMarkdown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.6, delay: 0.25, ease: EASE_OUT }}
              >
                <ReactMarkdown>{restoMarkdown}</ReactMarkdown>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default SeccionProposito;
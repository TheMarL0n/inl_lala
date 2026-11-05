"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  encabezado_h2,
  encabezado_h3,
  parrafo_normal,
} from "@/app/utils/CSS_clases";

const Nutricion = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // La imagen se desplaza fluidamente durante todo el scroll del contenedor
  const imageY = useTransform(scrollYProgress, [0, 1], [-340, 0]);

  return (
    <section ref={containerRef} className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-6xl">
          {/* Título principal con un pequeño retraso */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }} // Se activa cuando el elemento está más adentrado en la pantalla
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={`${encabezado_h3} bg-[#FF0000] sm:ml-40 text-white inline-block px-2 py-1`}
            >
              La nutrición está presente
            </span>
            <br />
            <span
              className={`${encabezado_h2} bg-[#164190] block ml-auto text-white px-9! py-1`}
            >
              en cada decisión que tomamos
            </span>
          </motion.h2>
        </div>

        <div className="max-w-6xl flex mt-18 gap-4 sm:gap-12 items-center sm:items-end">
          {/* Imagen con desplazamiento parallax */}
          <motion.div 
            style={{ y: imageY }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative shrink-0 w-30 sm:w-94.25 aspect-square"
          >
            <Image
              src="/images/home_bowl.png"
              alt="Tazón saludable con ingredientes nutritivos del Instituto de Nutrición Lala"
              fill
              sizes="(max-width: 640px) 120px, 377px"
              className="object-contain"
            />
          </motion.div>

          {/* Párrafo con mayor retraso (delay) para que aparezca después del título y la bajada del tazón */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`${parrafo_normal} text-[#15428C] sm:mb-30 sm:text-[38px]! leading-[1.2]!`}
          >
            En el <strong>Instituto de Nutrición Lala</strong> creemos que
            entender la alimentación no debería ser complicado. Por eso reunimos
            información clara, confiable y basada en evidencia para ayudarte a
            comprender mejor a tu cuerpo y los alimentos y que puedas tomar
            mejores decisiones para tu alimentación.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Nutricion;
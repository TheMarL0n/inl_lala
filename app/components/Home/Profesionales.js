"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { encabezado_h3, parrafo_normal, WhiteButton } from "@/app/utils/CSS_clases";
import CustomLink from "../Auxiliares/CustomLinks";

const Profesionales = () => {
    const sectionRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Inicia cuando la sección alcanza el top de la pantalla y completa el cierre de la imagen
    const imageWidth = useTransform(
        scrollYProgress,
        [0, 0.65],
        prefersReducedMotion ? ["50%", "50%"] : ["100%", "50%"]
    );

    // Se mantiene en 1 desde 0.85 hasta el final (1) sin caer al seguir haciendo scroll
    const contentOpacity = useTransform(
        scrollYProgress,
        [0.55, 0.85, 1],
        prefersReducedMotion ? [1, 1, 1] : [0, 1, 1]
    );

    const contentY = useTransform(
        scrollYProgress,
        [0.55, 0.85, 1],
        prefersReducedMotion ? [0, 0, 0] : [20, 0, 0]
    );

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#15428C] sm:h-[180vh] overflow-x-clip"
        >
            {/* Contenedor sticky de 100vh: permanece fijo mientras se completa la animación */}
            <div className="relative w-full sm:sticky sm:top-0 sm:h-screen overflow-hidden">
                {/* Imagen a la izquierda: arranca en 100% y se contrae a 50% en desktop */}
                <motion.div
                    style={{ width: imageWidth }}
                    suppressHydrationWarning
                    className="relative h-72 sm:absolute sm:top-0 sm:left-0 sm:h-full overflow-hidden z-20 pointer-events-none will-change-[width]"
                >
                    <Image
                        src="/images/woman_doctor.png"
                        alt="Profesional de la salud revisando información científica y nutricional"
                        fill
                        sizes="(max-width: 640px) 100vw, 100vw"
                        className="object-cover object-top"
                    />
                </motion.div>

                {/* Contenido azul a la derecha: alineado a la misma altura (sm:h-full) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    suppressHydrationWarning
                    className="relative z-10 bg-[#15428C] px-8 py-16 space-y-8 flex flex-col justify-center sm:w-1/2 sm:ml-auto sm:h-full will-change-[transform,opacity]"
                >
                    <h2 className={`${encabezado_h3} bg-[#0B75B9] w-fit`}>
                        Para profesionales
                    </h2>
                    <p className={`${parrafo_normal} text-white max-w-113 mt-4`}>
                        Encuentra herramientas y lo más reciente en evidencia científica en temas de nutrición, salud, leche y productos lácteos, y fortalecer tu práctica profesional.
                    </p>
                    <CustomLink
                        href="/paginas/profesionales"
                        className={`${WhiteButton} w-fit`}
                    >
                        conocer más
                    </CustomLink>
                </motion.div>
            </div>
        </section>
    );
};

export default Profesionales;
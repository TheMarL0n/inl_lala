"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { encabezado_h3, parrafo_normal, stroke_text, WhiteButton } from "@/app/utils/CSS_clases"
import { categorias_nutricion } from "@/app/utils/Copies"
import CustomLink from "../Auxiliares/CustomLinks"

const CategoriaItem = ({ item, idx, total, scrollYProgress, prefersReducedMotion }) => {
    // Ventana general de aparición del listado: de 0.35 a 0.92 del progreso de scroll
    const listStart = 0.35
    const listEnd = 0.92
    const span = listEnd - listStart
    const step = span / Math.max(total, 1)

    const itemStart = listStart + idx * step * 0.75
    const itemEnd = Math.min(itemStart + step * 1.4, listEnd)

    const opacity = useTransform(
        scrollYProgress,
        [itemStart, itemEnd],
        prefersReducedMotion ? [1, 1] : [0, 1]
    )
    const y = useTransform(
        scrollYProgress,
        [itemStart, itemEnd],
        prefersReducedMotion ? [0, 0] : [24, 0]
    )

    return (
        <motion.div
            style={{ opacity, y }}
            suppressHydrationWarning
            className="will-change-[transform,opacity]"
        >
            <CustomLink
                href={`/paginas/nutricion?cat=${item.id}`}
                className="text-white block font-black uppercase text-[20px] sm:text-[38px] leading-10.5 border-b border-white py-4 hover:text-white/75 duration-400"
            >
                {item.titulo}
            </CustomLink>
        </motion.div>
    )
}

const Preguntas = ({titulo_1, titulo_2}) => {
    const sectionRef = useRef(null)
    const prefersReducedMotion = useReducedMotion()

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 70%", "center 25%"],
    })

    // Mantiene el estado inicial un tramo más antes de reducir escala y posición
    const titleScale = useTransform(
        scrollYProgress,
        [0, 0.25, 0.95],
        prefersReducedMotion ? [1, 1, 1] : [1.55, 1.55, 1]
    )
    const titleY = useTransform(
        scrollYProgress,
        [0, 0.25, 0.95],
        prefersReducedMotion ? [0, 0, 0] : [60, 60, 0]
    )
    const titleX = useTransform(
        scrollYProgress,
        [0, 0.25, 0.95],
        prefersReducedMotion ? [0, 0, 0] : [40, 40, 0]
    )

    // Badge "Como mejor. vivo mejor."
    const badgeOpacity = useTransform(
        scrollYProgress,
        [0.45, 0.9],
        prefersReducedMotion ? [1, 1] : [0, 1]
    )
    const badgeY = useTransform(
        scrollYProgress,
        [0.45, 0.9],
        prefersReducedMotion ? [0, 0] : [-12, 0]
    )

    // Bloque inferior
    const bottomBarOpacity = useTransform(
        scrollYProgress,
        [0.65, 1],
        prefersReducedMotion ? [1, 1] : [0, 1]
    )
    const bottomBarY = useTransform(
        scrollYProgress,
        [0.65, 1],
        prefersReducedMotion ? [0, 0] : [24, 0]
    )

    return (
        <section
            ref={sectionRef}
            className="bg-[#15428C] pt-20 px-4 space-y-20 sm:space-y-40 overflow-x-clip"
        >
            <div className="max-w-7xl mx-auto gap-8 grid grid-cols-1 sm:grid-cols-2 items-start">
                <div className="sm:sticky sm:top-20">
                    <motion.div
                        style={{ opacity: badgeOpacity, y: badgeY }}
                        suppressHydrationWarning
                        className="mb-3"
                    >
                        <span className={`${encabezado_h3} bg-[#0B75B9]`}>
                            {titulo_1}
                        </span>
                    </motion.div>

                    <motion.h2
                        style={{
                            scale: titleScale,
                            x: titleX,
                            y: titleY,
                            transformOrigin: "left top",
                        }}
                        suppressHydrationWarning
                        className="will-change-transform"
                    >
                        <span
                            className={`${stroke_text} [-webkit-text-stroke-color:white] text-[80px] sm:text-[100px] sm:leading-28 uppercase block`}
                        >
                            {titulo_2}
                        </span>
                    </motion.h2>
                </div>

                <div>
                    {categorias_nutricion.map((item, idx) => (
                        <CategoriaItem
                            key={item.id ?? idx}
                            item={item}
                            idx={idx}
                            total={categorias_nutricion.length}
                            scrollYProgress={scrollYProgress}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    ))}
                </div>
            </div>

            <motion.div
                style={{ opacity: bottomBarOpacity, y: bottomBarY }}
                suppressHydrationWarning
                className="max-w-7xl mx-auto flex justify-between flex-col sm:flex-row border-b border-white pb-4 will-change-[transform,opacity]"
            >
                <p className={`${parrafo_normal} text-white mb-4 sm:mb-0`}>
                    Encuentra información y recomendaciones sobre el tema que más te interesa.
                </p>
                <CustomLink href="/paginas/nutricion" className={WhiteButton}>
                    Ver más
                </CustomLink>
            </motion.div>
        </section>
    )
}

export default Preguntas
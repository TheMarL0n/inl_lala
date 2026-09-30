'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const HomeJumbotron = () => {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

    return (
        <section
            ref={ref}
            className="relative h-screen min-h-150 max-h-225 2xl:max-h-200 overflow-hidden flex flex-col items-center sm:justify-center"
        >
            {/* Imagen de fondo principal con optimización de Next.js */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 scale-110 w-full h-full"
            >
                <Image
                    src="/images/home_bkg.png"
                    alt="Fondo Instituto de Nutrición Lala"
                    fill
                    priority // Vital para LCP: al ser la imagen principal del inicio, carga de inmediato
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </motion.div>

            {/* Imagen de fondo auxiliar (solo desktop) */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute hidden sm:block z-20 w-full h-full scale-110"
            >
                <Image
                    src="/images/home_bkg_auxiliar.png"
                    alt="Elementos gráficos auxiliares"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-20 sm:space-y-4 mt-40 sm:mt-20">
                <motion.h1
                    style={{ y: textY }}
                    className="text-white text-[30px] sm:text-[70px] font-black uppercase flex flex-col gap-2 sm:gap-12 sm:flex-row items-start"
                >
                    <span className="bg-[#15428C] sm:pr-14 px-3">Lo que comes</span>
                    <span className="text-[50px] sm:text-[135px] sm:pl-14 ml-auto sm:ml-0 bg-[#15428C] px-3">importa</span>
                </motion.h1>
                <h2 className="relative z-20 px-4 bg-[#009638] text-[26px] sm:text-[46px] text-white font-medium w-fit ml-auto">Entenderlo también</h2>
            </div>
        </section>
    )
}

export default HomeJumbotron
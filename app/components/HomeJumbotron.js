'use client'
import { useRef } from 'react'
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
            className="relative min-h-screen overflow-hidden flex flex-col items-center sm:justify-center"
        >
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 bg-[url(/images/home_bkg.png)] bg-no-repeat bg-cover bg-center scale-110"
            />
            <motion.div
                style={{ y: backgroundY }}
                className="absolute hidden sm:block z-2 w-full h-full bg-[url(/images/home_bkg_auxiliar.png)] bg-no-repeat bg-cover bg-center scale-110"
            />
            <div className=""></div>
            <div className="relative z-1 max-w-7xl mx-auto space-y-20 sm:space-y-4 mt-40 sm:mt-20">
                <motion.h1
                    style={{ y: textY }}
                    className="text-white text-[30px] sm:text-[70px] font-black uppercase flex flex-col gap-2 sm:gap-0 sm:flex-row items-start"
                >
                    <span className="bg-[#15428C] sm:pr-40 px-3">Lo que comes</span>
                    <span className="text-[50px] sm:text-[135px] ml-auto sm:ml-0 bg-[#15428C] px-3">importa</span>
                </motion.h1>
                <h2 className="relative z-2 px-4 bg-[#009638] text-[26px] sm:text-[46px] text-white font-medium w-fit ml-auto">Entenderlo también</h2>
            </div>
        </section>
    )
}
export default HomeJumbotron
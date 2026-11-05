"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HomeJumbotron = () => {
  const [hasLoaderFinished, setHasLoaderFinished] = useState(false);

  useEffect(() => {
    // Sincronizado con el InitialLoader: 1.2s de espera + 0.7s de duración de la cortina
    const timer = setTimeout(() => {
      setHasLoaderFinished(true);
    }, 1800); // 1.8 segundos exactos

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-150 max-h-225 2xl:max-h-200 overflow-hidden flex flex-col items-center sm:justify-center">
      {/* Imagen de fondo principal para mobile */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={hasLoaderFinished ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute block sm:hidden w-full h-full"
      >
        <Image
          src="/images/home_bkg_mobile.png"
          alt="Fondo Instituto de Nutrición Lala"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Imagen de fondo principal con optimización de Next.js */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.15 }}
        animate={hasLoaderFinished ? { opacity: 1, scale: 1.1 } : { opacity: 0, scale: 1.15 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute hidden sm:block inset-0 scale-110 w-full h-full"
      >
        <Image
          src="/images/home_bkg.png"
          alt="Fondo Instituto de Nutrición Lala"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Imagen de fondo auxiliar (solo desktop) */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.15 }}
        animate={hasLoaderFinished ? { opacity: 1, scale: 1.1 } : { opacity: 0, scale: 1.15 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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

      <div className="relative z-10 w-full px-4 sm:w-5xl mx-auto space-y-40 sm:space-y-4 mt-40 sm:mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={hasLoaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-[43px] sm:text-[70px] font-black uppercase flex flex-col sm:flex-row items-start sm:justify-end"
        >
          <span className="bg-[#15428C] sm:pr-4 sm:pl-12 px-3">Lo que comes</span>
          <span className="text-[73px] sm:pr-16 sm:pl-28 px-3 leading-[80px] sm:text-[135px] sm:leading-[140px] ml-auto sm:ml-0 bg-[#15428C]">
            importa
          </span>
        </motion.h1>
      </div>

      <div className="relative z-30 w-full px-4 sm:w-5xl mx-auto space-y-40 sm:space-y-4 sm:mt-1">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={hasLoaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 bg-[#009638] text-[36px] sm:text-[46px] text-white font-medium w-fit mr-auto ml-auto sm:mr-0"
        >
          Entenderlo también
        </motion.h2>
      </div>
    </section>
  );
};

export default HomeJumbotron;
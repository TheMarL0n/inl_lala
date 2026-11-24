"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const splitTitulo = (texto = "") => {
    if (typeof texto !== "string") return { inicio: "", ultima: "" };
    const palabras = texto.trim().split(/\s+/).filter(Boolean);

    if (palabras.length === 0) return { inicio: "", ultima: "" };
    if (palabras.length === 1) return { inicio: "", ultima: palabras[0] };

    return {
        inicio: palabras.slice(0, -1).join(" "),
        ultima: palabras.at(-1) || "",
    };
};

const HomeJumbotron = ({titulo, subtitulo}) => {
  const [hasLoaderFinished, setHasLoaderFinished] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaderFinished(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Escena unificada (fondo + niño): mismo zoom, blur y opacidad
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.28]);
  const bgBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.25]);
  const effectiveBgOpacity = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    hasLoaderFinished ? [1, 1, 0.25] : [1, 1, 1]
  );

  // Plano 2 (Detrás del niño, z-10): H1 en píxeles fijos para precisión
  const h1Y = useTransform(scrollYProgress, [0, 0.55], [0, -65]);
  const h1Scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.96]);
  const h1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Plano 4 (Primer plano, z-30): H2 más rápido y hacia el frente
  const h2Y = useTransform(scrollYProgress, [0, 0.6], [0, -140]);
  const h2Scale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08]);
  const h2Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mobile
  const mobileScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const { inicio, ultima } = splitTitulo(titulo);

  return (
    <section
      ref={sectionRef}
      className="relative h-[180vh] min-h-[900px]"
    >
      <div className="sticky top-0 h-screen min-h-150 max-h-225 2xl:max-h-200 overflow-hidden flex flex-col items-center justify-center sm:justify-center">
        {/* Fondo mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hasLoaderFinished ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            scale: mobileScale,
            opacity: bgOpacity,
          }}
          className="absolute block sm:hidden w-full h-full will-change-transform"
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

        {/* Plano 1: Fondo principal (desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 1.15 }}
          animate={
            hasLoaderFinished
              ? { opacity: 1, scale: 1.1 }
              : { opacity: 0, scale: 1.15 }
          }
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute hidden sm:block inset-0 w-full h-full"
        >
          <motion.div
            style={{
              scale: bgScale,
              filter: bgBlur,
              opacity: effectiveBgOpacity,
            }}
            className="relative w-full h-full will-change-transform"
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
        </motion.div>

        {/* Plano 3: Niño recorte auxiliar (z-20, mismo efecto que el background) */}
        <motion.div
          initial={{ opacity: 0, scale: 1.15 }}
          animate={
            hasLoaderFinished
              ? { opacity: 1, scale: 1.1 }
              : { opacity: 0, scale: 1.15 }
          }
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute hidden sm:block z-20 w-full h-full pointer-events-none"
        >
          <motion.div
            style={{
              scale: bgScale,
              filter: bgBlur,
              opacity: effectiveBgOpacity,
            }}
            className="relative w-full h-full will-change-transform"
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
        </motion.div>

        {/* Plano 2: H1 detrás del niño (z-10) */}
        <motion.div
          style={{ y: h1Y, scale: h1Scale, opacity: h1Opacity }}
          className="relative z-10 w-full will-change-transform"
        >
          <div className="w-full px-4 sm:w-5xl mx-auto space-y-40 sm:space-y-4 mt-40 sm:mt-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={
                hasLoaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-[43px] sm:text-[70px] font-black uppercase flex flex-col sm:flex-row items-start sm:justify-end"
            >
              <span className="bg-[#15428C] sm:pr-4 sm:pl-12 px-3">
                {inicio}
              </span>
              <span className="text-[73px] sm:pr-16 sm:pl-28 px-3 leading-[80px] sm:text-[135px] sm:leading-[140px] ml-auto sm:ml-0 bg-[#15428C]">
                {ultima}
              </span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Plano 4: H2 delante del niño (z-30) */}
        <motion.div
          style={{ y: h2Y, scale: h2Scale, opacity: h2Opacity }}
          className="relative z-30 w-full will-change-transform"
        >
          <div className="w-full px-4 sm:w-5xl mx-auto space-y-40 sm:space-y-4 sm:mt-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasLoaderFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="px-4 bg-[#009638] text-[36px] sm:text-[46px] text-white font-medium w-fit mr-auto ml-auto sm:mr-0"
            >
              {subtitulo}
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeJumbotron;
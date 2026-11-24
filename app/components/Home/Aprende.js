'use client'
import { encabezado_h3 } from "@/app/utils/CSS_clases"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { PlusSymbol } from "@/app/utils/SVG_Icons";

const Aprende = ({ titulo_video, fromPage, videos_aprende }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const prefersReducedMotion = useReducedMotion();

    const getStrapiMedia = (url) => {
        if (!url) return null;
        if (url.startsWith("http") || url.startsWith("//")) {
            return url;
        }
        const host = process.env.NEXT_PUBLIC_STRAPI_HOST;
        return `${host}${url}`;

    };

    // Cerrar modal con tecla Escape para mejorar accesibilidad con teclado
    useEffect(() => {
        if (!selectedVideo) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setSelectedVideo(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedVideo]);

    const headingTransition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

    return (
        <section className="pt-20 sm:pt-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-0">
                <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={headingTransition}
                    suppressHydrationWarning
                >
                    {fromPage ? (
                        <h2>
                            <span className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}>
                                Formación y
                            </span>
                            <span className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>
                                Actualización
                            </span>
                        </h2>
                    ) : (
                        <h2 className={`${encabezado_h3} bg-[#0B75B9]`}>
                            {titulo_video}
                        </h2>
                    )}
                </motion.div>
            </div>

            <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={
                    prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
                }
                suppressHydrationWarning
                className="py-14"
            >
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    className="videoSwiper"
                >
                    {videos_aprende.map((item, idx) => (
                        <SwiperSlide key={idx} className="group">
                            <motion.div
                                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: "some" }}
                                transition={
                                    prefersReducedMotion
                                        ? { duration: 0 }
                                        : { duration: 0.45, delay: Math.min(idx * 0.08, 0.32) }
                                }
                                suppressHydrationWarning
                            >
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedVideo(item)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelectedVideo(item);
                                        }
                                    }}
                                    className="relative h-95 overflow-hidden cursor-pointer flex flex-col items-center justify-center focus:outline-2 focus:outline-offset-2 focus:outline-[#15428C]"
                                >
                                    <div className="relative z-3 w-42.5 h-42.5 rounded-full border border-white flex flex-col items-center justify-center bg-black/19 backdrop-blur-sm opacity-100 sm:opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-400">
                                        <span className="transition-transform duration-300 group-hover:rotate-90">
                                            <PlusSymbol />
                                        </span>
                                    </div>

                                    <div className="bg-[#15428C]/70 absolute z-2 h-full w-full left-0 top-0 opacity-0 sm:opacity-100 group-hover:opacity-0 transition-opacity duration-400 pointer-events-none" />

                                    <Image
                                        src={getStrapiMedia(item.miniatura.url)}
                                        alt={`Miniatura del video: ${item.titulo}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="absolute z-1 h-full w-full object-cover left-0 top-0 group-hover:scale-110 transition-transform duration-400"
                                    />
                                </div>

                                <p
                                    onClick={() => setSelectedVideo(item)}
                                    className="mx-2 text-[#15428C] text-[29px] text-center sm:text-left leading-7.5 mt-4 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-400 cursor-pointer"
                                >
                                    <strong className="font-black">{item.titulo}</strong>
                                    <br />
                                    {item.descripcion}
                                </p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Modal Box con AnimatePresence */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        key="video-modal-backdrop"
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                        onClick={() => setSelectedVideo(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            key="video-modal-card"
                            initial={
                                prefersReducedMotion
                                    ? { opacity: 1 }
                                    : { opacity: 0, scale: 0.94, y: 16 }
                            }
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={
                                prefersReducedMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, scale: 0.96, y: 12 }
                            }
                            transition={
                                prefersReducedMotion
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 360, damping: 28 }
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors cursor-pointer"
                                aria-label="Cerrar modal"
                            >
                                ✕
                            </button>

                            <div className="p-6 bg-gray-50 border-b">
                                <h3 className="text-2xl font-bold text-[#15428C]">
                                    {selectedVideo.titulo}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {selectedVideo.descripcion}
                                </p>
                            </div>

                            <div className="relative w-full aspect-video bg-black">
                                {selectedVideo?.embebido ? (
                                    <iframe
                                        src={`${selectedVideo.url}${selectedVideo.url.includes("?") ? "&" : "?"}autoplay=1`}
                                        title={selectedVideo.title || "Video"}
                                        className="absolute top-0 left-0 w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    selectedVideo?.video?.url && (
                                        <video
                                            key={selectedVideo.video.url}
                                            src={getStrapiMedia(selectedVideo.video.url)}
                                            controls
                                            autoPlay
                                            playsInline
                                            preload="metadata"
                                            className="absolute top-0 left-0 w-full h-full object-contain"
                                        >
                                            Tu navegador no soporta la reproducción de video.
                                        </video>
                                    )
                                )}

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Aprende;
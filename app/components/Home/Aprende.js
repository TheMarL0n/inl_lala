'use client'
import { encabezado_h3 } from "@/app/utils/CSS_clases"
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { PlusSymbol } from "@/app/utils/SVG_Icons";
import { videos_aprende } from "@/app/utils/Copies";

const Aprende = ({ fromPage }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section className="pt-20 sm:pt-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-0">
                {
                    fromPage ?
                        <h2>
                            <span className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}>Formación  y</span>
                            <span className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>Actualización</span>
                        </h2>
                        :
                        <h2 className={`${encabezado_h3} bg-[#0B75B9]`}>Aprende en minutos</h2>
                }
            </div>

            <div className="py-14">
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
                    {
                        videos_aprende.map((item, idx) => (
                            <SwiperSlide key={idx} className="group">
                                <div
                                    onClick={() => setSelectedVideo(item)}
                                    className="relative h-95 overflow-hidden cursor-pointer flex flex-col items-center justify-center">
                                    
                                    <div className="relative z-3 w-42.5 h-42.5 rounded-full border border-white flex flex-col items-center justify-center bg-black/19 backdrop-blur-sm opacity-100 sm:opacity-0 group-hover:opacity-100 duration-400">
                                        <PlusSymbol />
                                    </div>
                                    
                                    <div className="bg-[#15428C]/70 absolute z-2 h-full w-full object-cover left-0 top-0 opacity-0 sm:opacity-100 group-hover:opacity-0 duration-400"></div>
                                    
                                    {/* Imagen optimizada con Next.js */}
                                    <Image 
                                        src={item.background} 
                                        alt={`Miniatura del video: ${item.title}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="absolute z-1 h-full w-full object-cover left-0 top-0 group-hover:scale-110 transition-transform duration-400" 
                                    />
                                </div>
                                <p
                                    onClick={() => setSelectedVideo(item)}
                                    className="mx-2 text-[#15428C] text-[29px] text-center sm:text-left leading-7.5 mt-4 sm:opacity-0 group-hover:opacity-100 duration-400">
                                    <strong className="font-black">{item.title}</strong>
                                    <br />
                                    {item.abstract}
                                </p>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

            {/* Modal Box */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">

                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors cursor-pointer"
                            aria-label="Cerrar modal"
                        >
                            ✕
                        </button>

                        <div className="p-6 bg-gray-50 border-b">
                            <h3 className="text-2xl font-bold text-[#15428C]">{selectedVideo.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{selectedVideo.abstract}</p>
                        </div>

                        <div className="relative w-full aspect-video bg-black">
                            <iframe
                                src={`${selectedVideo.video}${selectedVideo.video.includes('?') ? '&' : '?'}autoplay=1`}
                                title={selectedVideo.title}
                                className="absolute top-0 left-0 w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
export default Aprende
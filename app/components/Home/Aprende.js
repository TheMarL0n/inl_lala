'use client'
import { encabezado_h3 } from "@/app/utils/CSS_clases"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { PlusSymbol } from "@/app/utils/SVG_Icons";

const swiper_items = [
    {
        background: "/images/swiper_video.png",
        title: "Nombre del video",
        abstract: "Abstract de que va"
    },
    {
        background: "/images/swiper_video.png",
        title: "Nombre del video",
        abstract: "Abstract de que va"
    },
    {
        background: "/images/swiper_video.png",
        title: "Nombre del video",
        abstract: "Abstract de que va"
    },
    {
        background: "/images/swiper_video.png",
        title: "Nombre del video",
        abstract: "Abstract de que va"
    },
    {
        background: "/images/swiper_video.png",
        title: "Nombre del video",
        abstract: "Abstract de que va"
    },
    {
        background: "/images/swiper_video.png",
        title: "Nombre del video",
        abstract: "Abstract de que va"
    }
]

const Aprende = () => {
    return (
        <section className="pt-20 sm:pt-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-0">
                <h3 className={`${encabezado_h3} bg-[#0B75B9]`}>Aprende en minutos</h3>
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
                        swiper_items.map((item, idx) => (
                            <SwiperSlide key={idx} className="group">
                                <div className="relative h-95 overflow-hidden cursor-pointer flex flex-col items-center justify-center">
                                    <div className="relative z-3 w-42.5 h-42.5 rounded-full border border-white flex flex-col items-center justify-center bg-black/19 backdrop-blur-sm opacity-100 sm:opacity-0 group-hover:opacity-100 duration-400">
                                        <PlusSymbol />
                                    </div>
                                    <div className="bg-[#15428C]/70 absolute z-2 h-full w-full object-cover left-0 top-0 opacity-0 sm:opacity-100 group-hover:opacity-0 duration-400"></div>
                                    <img src={item.background} className="absolute z-1 h-full w-full object-cover left-0 top-0 group-hover:scale-110 duration-400" alt="Miniatura de Video" />
                                </div>
                                <p className="mx-2 text-[#15428C] text-[29px] text-center sm:text-left leading-7.5 mt-4 sm:opacity-0 group-hover:opacity-100 duration-400">
                                    <strong className="font-black">{item.title}</strong>
                                    <br />
                                    {item.abstract}
                                </p>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

        </section>
    )
}
export default Aprende
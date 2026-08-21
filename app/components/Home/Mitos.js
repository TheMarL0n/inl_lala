"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { BlueButton, encabezado_h3, encabezado_h4, parrafo_normal } from "@/app/utils/CSS_clases"
import { Comillas } from "@/app/utils/SVG_Icons"

const mitos_items = [
    {
        image: "/images/swiper_video.png",
        mito: "Los adultos no necesitan consumir lácteos.",
        realidad: "Los lácteos siguen siendo una fuente importante de proteínas, calcio y otros nutrientes durante la vida adulta."
    },
    {
        image: "/images/woman_speaking.png",
        mito: "Los adultos no necesitan consumir lácteos.",
        realidad: "Los lácteos siguen siendo una fuente importante de proteínas, calcio y otros nutrientes durante la vida adulta."
    },
    {
        image: "/images/home_bkg.png",
        mito: "Los adultos no necesitan consumir lácteos.",
        realidad: "Los lácteos siguen siendo una fuente importante de proteínas, calcio y otros nutrientes durante la vida adulta."
    },
]

const Mitos = () => {
    return (
        <section className="py-10 sm:pt-20">
            <div className="relative z-3 max-w-7xl mx-auto -mb-20 pt-4 px-4">
                <div>
                    <h3 className={`${encabezado_h3} bg-[#0B75B9] hidden sm:block`}>mito o realidad</h3>
                    <h3 className={`${encabezado_h3} bg-[#0B75B9] sm:ml-8`}>No todo lo que se dice es cierto</h3>
                </div>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="mitosSwiper"
            >
                {mitos_items.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative overflow-hidden z-2 flex flex-col sm:flex-row items-start -mt-20">
                            <img src={item.image} className="w-auto sm:w-2/3 min-h-100 sm:min-h-auto object-cover sm:object-contain object-top" alt="Foto de mito o realidad" />
                            <div className="space-y-12 max-w-125 sm:bg-white p-8 sm:-ml-30 sm:mt-40">
                                <h2 className="text-[#15428C] font-black text-[50px] leading-12 sm:text-[60px] sm:leading-14">
                                    <span><Comillas className="rotate-180 -mt-12 sm:-ml-12" /></span>
                                    {item.mito}
                                    <span><Comillas className="ml-auto block sm:-mt-6" /></span>
                                </h2>
                                <h3 className={`${encabezado_h4} bg-[#009638]`}>Lo que dice la ciencia</h3>
                                <p className={`${parrafo_normal} text-[#15428C]`}>{item.realidad}</p>
                                <button className={`${BlueButton} mb-12 sm:mb-0 sm:mt-12`}>Descubre por qué</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
export default Mitos
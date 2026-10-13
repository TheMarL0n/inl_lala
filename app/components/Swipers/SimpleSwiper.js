'use client'
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { mitos } from '@/app/utils/Copies';
import parse from 'html-react-parser';

const SimpleSwiper = ({contenido}) => {

    return (
        <section className="py-10 sm:pt-20" aria-label="Sección de etapas de la vida">

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="etapasSwiper"
            >
                {contenido.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="max-w-7xl mx-auto relative overflow-hidden z-2 flex flex-col sm:flex-row w-full">

                            <div className="w-full sm:w-1/2 relative overflow-hidden h-96 sm:h-129">
                                <Image
                                    src={item.imagen}
                                    alt={`Ilustración representativa sobre el mito: ${item.titulo}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                    className="object-cover absolute top-0 left-0"
                                />
                            </div>

                            <div className="w-full sm:w-1/2 flex flex-col items-start sm:bg-white p-8">
                                {parse(item.contenido)}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
export default SimpleSwiper;
'use client'
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { BlueButton, encabezado_h3, encabezado_h4, parrafo_normal } from "@/app/utils/CSS_clases"
import { Comillas } from "@/app/utils/SVG_Icons"
import { mitos } from '@/app/utils/Copies';
import parse from 'html-react-parser';

const Mitos = ({ alternative, currentSlug }) => {
    // Filtramos el arreglo para excluir el mito que coincide con el slug actual
    const filteredMitos = mitos.filter((item) => item.slug !== currentSlug);

    return (
        <section className="py-10 sm:pt-20">
            {
                alternative ?
                    ""
                    :
                    <div className="relative z-3 max-w-7xl mx-auto -mb-20 pt-4 px-4">
                        <h2>
                            <span className={`${encabezado_h3} bg-[#0B75B9] hidden sm:block`}>mito o realidad</span>
                            <span className={`${encabezado_h3} bg-[#0B75B9] sm:ml-8 block`}>No todo lo que se dice es cierto</span>
                        </h2>
                    </div>
            }

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
                {filteredMitos.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative overflow-hidden z-2 flex flex-col sm:flex-row w-full">
                            
                            {/* Contenedor de la imagen optimizada */}
                            <div className="w-full sm:w-1/2 relative overflow-hidden h-96 sm:h-129">
                                <Image 
                                    src={item.imagen_principal} 
                                    alt={`Ilustración del mito: ${item.titulo}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                    className="object-cover absolute top-0 left-0" 
                                />
                            </div>

                            <div className="w-full sm:w-1/2 flex flex-col items-start sm:bg-white p-8 sm:-ml-30 sm:mt-40 z-3">
                                <div className="space-y-12 max-w-125">
                                    <h3 className="text-[#15428C] font-black text-[50px] leading-12 sm:text-[60px] sm:leading-14">
                                        <span><Comillas className="rotate-180 sm:-mt-12 sm:-ml-12" /></span>
                                        {
                                            alternative ?
                                                <p className='text-[#15428C] font-black text-[20px]'>mito</p>
                                                :
                                                ""
                                        }
                                        {item.titulo}
                                        {
                                            alternative ?
                                                ""
                                                :
                                                <span><Comillas className="ml-auto block sm:-mt-6" /></span>
                                        }
                                    </h3>
                                    {
                                        alternative ?
                                            <p className='text-[#15428C] font-black text-[40px] m-0'>realidad</p>
                                            :
                                            <h3 className={`${encabezado_h4} bg-[#009638]`}>Lo que dice la ciencia</h3>
                                    }
                                    <div className={`${parrafo_normal} text-[#15428C]`}>{parse(item.realidad)}</div>
                                    {
                                        alternative ?
                                            <span><Comillas className="ml-auto block sm:-mt-6" /></span>
                                            :
                                            <button className={`${BlueButton} mb-12 sm:mb-0 sm:mt-12`}>Descubre por qué</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
export default Mitos
'use client'
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { BlueButton, encabezado_h3, encabezado_h4, parrafo_normal } from "@/app/utils/CSS_clases"
import { Comillas } from "@/app/utils/SVG_Icons"
import parse from 'html-react-parser';

const MitosSwiper = ({ contenido, alternative, currentSlug, titulo_mitos }) => {
    // Filtramos el arreglo para excluir el mito que coincide con el slug actual
    const filteredMitos = contenido.filter((item) => {
        if (!currentSlug) return true;
        // Si el item no tiene slug, decidimos si incluirlo (por ejemplo, true para mostrarlo siempre)
        if (!item.slug) return true;
        return item.slug !== currentSlug;
    });

    return (
        <section className="py-10 sm:pt-20" aria-label="Sección de mitos y realidades">
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
                        <article className="relative overflow-hidden z-2 flex flex-col sm:flex-row w-full">

                            {/* Contenedor de la imagen optimizada */}
                            <div className="w-full sm:w-1/2 relative overflow-hidden h-96 sm:h-129">
                                <Image
                                    src={item.imagen_principal}
                                    alt={`Ilustración representativa sobre el mito: ${item.titulo}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                    className="object-cover absolute top-0 left-0"
                                />
                            </div>

                            <div className="w-full sm:w-1/2 flex flex-col items-start sm:bg-white p-8 sm:-ml-30 sm:mt-40 z-3">
                                <div className="space-y-12 max-w-125">
                                    <div>
                                        <span><Comillas className="rotate-180 sm:-mt-12 sm:-ml-12" /></span>
                                        {
                                            titulo_mitos ?
                                                <p className='text-[#15428C] font-black text-[32px] leading-[32px] mb-4'>{titulo_mitos}</p>
                                                :
                                                ""
                                        }
                                        {
                                            alternative ?
                                                <p className='text-[#15428C] font-black text-[30px]'>mito</p>
                                                :
                                                ""
                                        }
                                        <h2 className={`text-[#15428C] ${alternative ? "text-[35px] leading-8 sm:text-[45px] sm:leading-10 font-bold" : "text-[50px] leading-12 sm:text-[60px] sm:leading-14 font-black"}`}>{item.titulo}</h2>
                                        {
                                            alternative ?
                                                ""
                                                :
                                                <span><Comillas className="ml-auto block sm:-mt-6" /></span>
                                        }
                                    </div>
                                    {
                                        alternative ?
                                            <p className='text-[#15428C] font-black text-[30px] m-0'>realidad</p>
                                            :
                                            <h4 className={`${encabezado_h4} bg-[#009638]`}>Lo que dice la ciencia</h4>
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
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
export default MitosSwiper;
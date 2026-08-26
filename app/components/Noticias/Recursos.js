"use client"
import { noticias } from "@/app/utils/Copies"
import { BlueButton, encabezado_h3 } from "@/app/utils/CSS_clases";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const RecursosList = () => {

    const recursos = noticias.filter(item => item.tipo === "recurso");

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h3 className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}>recursos para</h3>
                <h3 className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>medios</h3>
            </div>
            <div className="max-w-7xl mx-auto mt-20">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    className="recursosSwiper"
                >
                    {
                        recursos.map((item, idx) => (
                            <SwiperSlide key={idx} className="group">
                                <div className="space-y-4 overflow-hidden">
                                    <img src={item.imagen_principal} className="h-60 w-full object-cover" alt="Imagen de recurso" />
                                    <button className={`${BlueButton} w-fit ml-auto`}>Ver más</button>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}
export default RecursosList
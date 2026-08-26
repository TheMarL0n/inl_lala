'use client'
import { noticias } from "@/app/utils/Copies"
import { encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import FechaCalendario from "../AuxiliarFecha";

const EventosList = () => {

    const eventos = noticias.filter(item => item.tipo === "evento" || item.tipo === "conferencia");

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h3 className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}>Próximos</h3>
                <h3 className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>eventos</h3>
            </div>
            <div className="max-w-7xl mx-auto mt-16">
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
                    className="eventosSwiper"
                >
                    {
                        eventos.map((item, idx) => (
                            <SwiperSlide key={idx} className="group">
                                <div key={idx} className="space-y-1 overflow-hidden px-18">
                                    <FechaCalendario fechaStr={item.fecha} />
                                    <h4 className="text-[20px] font-bold text-[#0B75B9] uppercase">{item.tipo}</h4>
                                    <p className={`${parrafo_normal} text-[#164190]`}>{item.descripcion}</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}
export default EventosList
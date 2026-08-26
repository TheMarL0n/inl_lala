"use client"
import { noticias } from "@/app/utils/Copies"
import { BlueButton, encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const NotasList = () => {
    const notas = noticias.filter(item => item.tipo === "nota");

    const agruparDeCuatro = (arr) => {
        const resultado = [];
        for (let i = 0; i < arr.length; i += 4) {
            resultado.push(arr.slice(i, i + 4));
        }
        return resultado;
    };

    const gruposDeNotas = agruparDeCuatro(notas);

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h3 className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}>Notas</h3>
                <h3 className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>destacadas</h3>
            </div>
            <div className="max-w-7xl mx-auto space-y-8 mt-16">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="notasSwiper"
                >
                    {
                        gruposDeNotas.map((grupo, slideIdx) => (
                            <SwiperSlide key={slideIdx}>
                                <div className="space-y-8">
                                    {
                                        grupo.map((nota, index) => (
                                            <div key={index} className="border-b border-[#164190] pb-8 gap-4 grid grid-cols-3 sm:grid-cols-4">
                                                <p className={`${parrafo_normal} text-[#164190] col-span-2 sm:col-span-3`}>
                                                    <strong>{nota.titulo}</strong>
                                                    <br />
                                                    {nota.descripcion}
                                                </p>
                                                <button className={`${BlueButton} w-fit ml-auto`}>Ver más</button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default NotasList
import React from 'react';
import Image from 'next/image';
import { parrafo_normal } from "../utils/CSS_clases";

const PagesJumbotron = ({ titulo, subtitulo, background, titulo_descripcion, descripcion, detalles }) => {
    return (
        <section className="relative overflow-hidden">
            <div className="relative h-screen min-h-150 max-h-225 2xl:max-h-200 flex flex-col sm:justify-center w-full">
                {background && (
                    <Image
                        src={background}
                        alt={titulo ? `Imagen de fondo para ${titulo}` : "Imagen de fondo del encabezado"}
                        fill
                        priority // Prioritario al ser el banner principal (mejora el LCP)
                        sizes="100vw"
                        className="object-cover object-center -z-10"
                    />
                )}

                <div className="max-w-7xl sm:w-7xl mx-auto space-y-20 sm:space-y-4 mt-40 sm:mt-20 relative z-10 px-4 sm:px-0">
                    <h1 className="text-white text-[30px] sm:text-[70px] font-black uppercase flex flex-col sm:gap-2 items-start">
                        <span className="bg-[#15428C] px-3">{titulo}</span>
                        <span className="text-[50px] sm:text-[135px] sm:leading-33.75 ml-10 sm:ml-30 bg-[#15428C] px-3">{subtitulo}</span>
                    </h1>
                </div>
            </div>

            <div className="page_descripcion max-w-4xl mx-4 sm:mx-auto bg-white -mt-30 p-4 sm:p-20 relative z-20 min-h-37.5 shadow-sm">
                <p className="text-[#15428C] text-center font-medium sm:text-[40px] sm:leading-11 text-[26px]">
                    {
                        titulo_descripcion ?
                            <>
                                <strong>{titulo_descripcion}</strong><br />
                            </>
                            :
                            ""
                    }
                    {descripcion}
                </p>
            </div>

            <div className="page_descripcion max-w-4xl mx-4 sm:mx-auto bg-white p-4 relative z-20 min-h-37.5">
                {
                    detalles ?
                        <p className={`${parrafo_normal} text-[38px]! leading-11! text-[#164190]`}>{detalles}</p>
                        :
                        ""
                }
            </div>
        </section>
    )
}
export default PagesJumbotron;
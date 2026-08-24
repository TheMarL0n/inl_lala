"use client"
import { useState } from "react"
import { categorias_etapas } from "@/app/utils/Copies"
import { etapas } from "@/app/utils/Copies"
import { BlueButton, parrafo_normal, stroke_text } from "@/app/utils/CSS_clases"

const CategoriasEtapas = () => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
        categorias_etapas.length > 0 ? categorias_etapas[0].id : null
    )

    const etapasFiltradas = categoriaSeleccionada
        ? etapas.filter(etapa => etapa.categoria_id === categoriaSeleccionada)
        : etapas

    return (
        <section className="pb-20 px-4">
            <h2 className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-center text-[120px] leading-31 sm:text-[200px] sm:leading-56 uppercase`}>¿qué edad buscas?:</h2>
            <div className="relative max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-6">
                {
                    categorias_etapas.map((item, idx) => {
                        const isActive = categoriaSeleccionada === item.id

                        return (
                            <div
                                key={idx}
                                onClick={() => setCategoriaSeleccionada(item.id)}
                                className="relative space-y-4 group cursor-pointer"
                            >
                                <div className="relative min-h-57 max-h-57 mx-2">
                                    <div className={`bg-[#164190] sm:bg-white absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 ${isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                                        }`}></div>
                                    <img src={item.imagen_principal} alt="Imagen de categoría" className="absolute z-1 top-0 left-0 object-cover w-full h-full" />
                                </div>
                                <div className="absolute sm:relative top-4 sm:top-0 left-4 sm:left-0 z-3">
                                    <div className="hidden sm:block relative z-2 w-7 h-7 rounded-full bg-[#0B75B9] group-hover:bg-[#15428C] mx-auto border-2 border-[#15428C] duration-400"></div>
                                    <div className="hidden sm:block absolute border-dashed border-2 border-[#164190] w-full top-3"></div>
                                    <h3 className={`uppercase text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-white sm:text-[#15428C] sm:text-center ${isActive ? "opacity-0 sm:opacity-100" : "opacity-100 group-hover:opacity-0 sm:group-hover:opacity-100"}`}>{item.titulo}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="max-w-7xl mx-auto space-y-8 mt-26">
                {
                    etapasFiltradas.length > 0 ? (
                        etapasFiltradas.map((item, idx) => (
                            <div key={idx} className="border-b border-[#164190] pb-8 gap-4 grid grid-cols-3 sm:grid-cols-4">
                                <p className={`${parrafo_normal} text-[#164190] col-span-2 sm:col-span-3`}>
                                    <strong>{item.tema}</strong>
                                    <br />
                                    {item.contenido}
                                </p>
                                <button className={`${BlueButton} w-fit ml-auto`}>Ver más</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">
                            No hay datos para esta etapa.
                        </p>
                    )
                }
            </div>
        </section>
    )
}

export default CategoriasEtapas
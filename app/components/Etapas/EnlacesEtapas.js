"use client"
import { useState } from "react"

const EnlacesEtapas = ({cat_id, categorias_etapas}) => {
    
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
        categorias_etapas.length > 0 ? cat_id : null
    )

    return (
        <section className="px-4">
                <div className="relative max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-6 gap-4">
                    {
                        categorias_etapas.sort((a, b) => a.orden - b.orden).map((item, idx) => {
                            const isActive = categoriaSeleccionada === item.id

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setCategoriaSeleccionada(item.id)}
                                    className="relative space-y-4 group cursor-pointer"
                                >                                    
                                        <h3 className={`p-2 uppercase text-[18px] leading-5 sm:text-[20px] sm:leading-7 font-medium text-center transition-all ${isActive ? "text-white bg-[#0B75B9] border border-[#0B75B9]" : "text-[#15428C] bg-white border border-[#15428C] hover:text-white hover:bg-[#0B75B9]"}`}>{item.titulo}</h3>    
                                </div>
                            )
                        })
                    }
                </div>
        </section>
    )
}
export default EnlacesEtapas
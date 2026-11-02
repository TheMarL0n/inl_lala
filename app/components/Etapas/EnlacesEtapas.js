"use client"
import { useState } from "react"

const EnlacesEtapas = ({cat_id, categorias_etapas}) => {
    
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
        categorias_etapas.length > 0 ? cat_id : null
    )

    return (
                <div className="relative max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-6 gap-4 -mt-5 sm:-mt-17 z-2 p-8 sm:p-0">
                    {
                        categorias_etapas.sort((a, b) => a.orden - b.orden).map((item, idx) => {
                            const isActive = categoriaSeleccionada === item.id

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setCategoriaSeleccionada(item.id)}
                                    className="relative space-y-4 group"
                                >                                    
                                        <h3 className={`px-2 py-1 uppercase text-[18px] leading-5 sm:text-[23px] sm:leading-[1.1] font-[600] text-center transition-all ${isActive ? "text-white bg-[#0B75B9] border border-[#0B75B9]" : "text-[#15428C] bg-white border border-[#15428C]"}`}>{item.titulo}</h3>    
                                </div>
                            )
                        })
                    }
                </div>
    )
}
export default EnlacesEtapas
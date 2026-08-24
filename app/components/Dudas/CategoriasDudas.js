"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { categorias_dudas } from "@/app/utils/Copies"
import { dudas } from "@/app/utils/Copies"
import { BlueButton, parrafo_normal } from "@/app/utils/CSS_clases"

const CategoriasDudas = () => {
    const searchParams = useSearchParams()
    const catUrl = searchParams.get("cat") // Obtenemos el valor de ?cat=...

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(() => {
        // Si viene un parámetro 'cat' en la URL, lo usamos (convertido a número si tus IDs son numéricos)
        if (catUrl) {
            const parsedCat = Number(catUrl)
            const existe = categorias_dudas.some(item => item.id === parsedCat)
            if (existe) return parsedCat
        }
        // Fallback: Si no hay parámetro o no es válido, toma el primero o null
        return categorias_dudas.length > 0 ? categorias_dudas[0].id : null
    })

    // Opcional: Si el usuario cambia de página o cambia el parámetro 'cat' dinámicamente en la misma vista
    useEffect(() => {
        if (catUrl) {
            const parsedCat = Number(catUrl)
            const existe = categorias_dudas.some(item => item.id === parsedCat)
            if (existe) {
                setCategoriaSeleccionada(parsedCat)
            }
        }
    }, [catUrl])

    const dudasFiltradas = categoriaSeleccionada
        ? dudas.filter(duda => duda.categoria_id === categoriaSeleccionada)
        : dudas

    return (
        <section className="pb-20 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
                {
                    categorias_dudas.map((item, idx) => {
                        const isActive = categoriaSeleccionada === item.id

                        return (
                            <div
                                key={idx}
                                onClick={() => setCategoriaSeleccionada(item.id)}
                                className="space-y-4 group cursor-pointer"
                            >
                                <div className="relative min-h-60 sm:min-h-72">
                                    <div className={`bg-[#15428C]/70 absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 ${isActive ? "opacity-0" : "opacity-0 sm:opacity-100 group-hover:opacity-0"
                                        }`}></div>
                                    <img src={item.imagen_principal} alt="Imagen de categoría" className="absolute z-1 top-0 left-0 object-cover w-full h-full" />
                                </div>
                                <h3 className="text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-[#15428C]">{item.titulo}</h3>
                            </div>
                        )
                    })
                }
            </div>

            <div className="max-w-7xl mx-auto space-y-8 mt-26">
                {
                    dudasFiltradas.length > 0 ? (
                        dudasFiltradas.map((item, idx) => (
                            <div key={idx} className="border-b border-[#164190] pb-8 gap-4 grid grid-cols-3 sm:grid-cols-4">
                                <p className={`${parrafo_normal} text-[#164190] col-span-2 sm:col-span-3`}>
                                    <strong>{item.pregunta}</strong>
                                    <br />
                                    {item.respuesta}
                                </p>
                                <button className={`${BlueButton} w-fit ml-auto`}>Ver más</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">
                            No hay dudas registradas para esta categoría.
                        </p>
                    )
                }
            </div>
        </section>
    )
}

export default CategoriasDudas
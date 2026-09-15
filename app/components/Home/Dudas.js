"use client"
import { useState } from "react"
import { categorias_dudas, dudas } from "@/app/utils/Copies"
import { encabezado_h3, parrafo_normal, WhiteButton } from "@/app/utils/CSS_clases"

const Dudas = () => {
    const [criterio, setCriterio] = useState("")
    const [busquedaActiva, setBusquedaActiva] = useState(false)

    // Manejar el envío del formulario de búsqueda
    const handleSearch = (e) => {
        e.preventDefault()
        setBusquedaActiva(true)
    }

    // Filtrar las dudas que coincidan con el criterio (en pregunta o respuesta)
    const resultadosDudas = criterio.trim() === "" ? [] : dudas.filter(duda =>
        duda.pregunta.toLowerCase().includes(criterio.toLowerCase()) ||
        duda.respuesta.toLowerCase().includes(criterio.toLowerCase())
    )

    return (
        <section className="sm:py-20 grid grid-cols-1 sm:grid-cols-2">
            <div className="sm:sticky sm:top-0 h-fit">
                <img src="/images/girl_eating.png" alt="persona comiendo" />
            </div>
            <div className="bg-[#15428C] p-8">
                <h3 className={`${encabezado_h3} bg-[#0B75B9]`}>Resuelve tus</h3>
                <h2 className="uppercase text-[120px] sm:text-[200px] sm:leading-55 text-[#0B75B9] font-medium">Dudas</h2>
                <p className={`${parrafo_normal} text-white max-w-113 mt-4`}>
                    Explora contenidos para aprender sobre nutrición, salud y alimentación desde una perspectiva científica, práctica y fácil de entender.
                </p>

                {/* Formulario de Buscador */}
                <form onSubmit={handleSearch} className="flex flex-col items-start gap-4 mt-12">
                    <input
                        type="text"
                        name="criteria"
                        value={criterio}
                        onChange={(e) => {
                            setCriterio(e.target.value)
                            if (e.target.value === "") setBusquedaActiva(false)
                        }}
                        placeholder="¿Qué estás buscando?"
                        className="border-white border p-2 h-11.5 w-full sm:w-86.25 focus:outline-0 text-white text-[18px] font-bold placeholder:text-white placeholder:text-[18px] placeholder:italic placeholder:font-bold"
                    />
                    <button type="submit" className={WhiteButton}>Buscar</button>
                </form>

                {/* Resultados de la Búsqueda o Listado de Categorías por Defecto */}
                <div className="space-y-8 mt-26 max-w-[580px]">
                    {
                        busquedaActiva && criterio.trim() !== "" ? (
                            // Muestra los resultados si se realizó una búsqueda
                            resultadosDudas.length > 0 ? (
                                resultadosDudas.map((duda, idx) => {
                                    // Buscamos la categoría a la que pertenece esta duda
                                    const categoriaAsociada = categorias_dudas.find(cat => cat.id === duda.categoria_id)

                                    return (
                                        <div key={idx} className="border-b border-white pb-2 gap-8 grid grid-cols-1 sm:grid-cols-4">
                                            <p className={`${parrafo_normal} text-white sm:col-span-3`}>
                                                <strong>{categoriaAsociada.titulo}</strong>
                                                <br />
                                                {duda.respuesta}
                                            </p>
                                            {/* Enlace para ir a la vista de categorías con su respectivo ID */}
                                            <a
                                                href={`/paginas/dudas?cat=${duda.categoria_id}`}
                                                target="_blank"
                                                className={`${WhiteButton}`}
                                            >
                                                Ver más
                                            </a>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className="text-white text-lg italic">
                                    No se encontraron dudas relacionadas con "{criterio}".
                                </p>
                            )
                        ) : (
                            // Muestra las categorías por defecto si no hay búsqueda activa
                            categorias_dudas.map((item, idx) => (
                                <div key={idx} className="border-b border-white pb-2 gap-8 grid grid-cols-1 sm:grid-cols-4">
                                    <p className={`${parrafo_normal} text-white sm:col-span-3`}>
                                        <strong>{item.titulo}</strong>
                                        <br />
                                        {item.subtitulo}
                                    </p>
                                    <a href={`/paginas/dudas?cat=${item.id}`} target="_blank" className={WhiteButton}>Ver más</a>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default Dudas
import Link from "next/link"
import { mitos } from "@/app/utils/Copies"
import { BlueButton, encabezado_h2, parrafo_normal } from "@/app/utils/CSS_clases"
import { ChevronDown } from "@/app/utils/SVG_Icons"

const MitosNavegacion = ({ currentTheme }) => {
    // 1. Encontramos el índice del artículo actual dentro del arreglo global de mitos
    const currentIndex = mitos.findIndex(item => item.id === currentTheme?.id)

    // 2. Determinamos el artículo anterior y el siguiente (con lógica circular o limitados por los extremos)
    // Opción A: Si llega al final/inicio se detiene (devuelve undefined)
    const prevTheme = currentIndex > 0 ? mitos[currentIndex - 1] : null
    const nextTheme = currentIndex < mitos.length - 1 ? mitos[currentIndex + 1] : null

    // 3. Filtrado para "Sigue explorando" (excluyendo el actual)
    const currentWords = currentTheme?.titulo
        ? currentTheme.titulo.toLowerCase().split(" ").filter(word => word.length > 3)
        : []

    const relatedMitos = mitos
        .filter(item => item.id !== currentTheme?.id)
        .map(item => {
            const itemTitleLower = item.titulo.toLowerCase()
            let score = 0
            currentWords.forEach(word => {
                if (itemTitleLower.includes(word)) score++
            })
            return { ...item, score }
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)

    return (
        <section className="px-4 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Botones de Artículo Anterior y Siguiente */}
                <div className="flex justify-between items-center w-full border-b border-[#15428C] pb-12 mb-12">
                    {/* Artículo Anterior */}
                    {prevTheme ? (
                        <Link 
                            href={`/paginas/mitos-y-realidades/${prevTheme.slug}`} 
                            className={`${parrafo_normal} text-[#15428C] text-[16px]! flex gap-4 items-center hover:opacity-80 transition-opacity`}
                        >
                            <ChevronDown className={`-rotate-90`} />
                            <span>
                                <span className="block text-xs text-gray-400 font-normal">Anterior</span>
                                {prevTheme.titulo}
                            </span>
                        </Link>
                    ) : (
                        <span className="text-gray-300 flex gap-4 items-center cursor-not-allowed">
                            Primer artículo
                        </span>
                    )}

                    {/* Artículo Siguiente */}
                    {nextTheme ? (
                        <Link 
                            href={`/paginas/mitos-y-realidades/${nextTheme.slug}`} 
                            className={`${parrafo_normal} text-[#15428C] text-[16px]! flex gap-4 items-center text-right hover:opacity-80 transition-opacity`}
                        >
                            <span>
                                <span className="block text-xs text-gray-400 font-normal">Siguiente</span>
                                {nextTheme.titulo}
                            </span>
                            <ChevronDown className={`rotate-90`} />
                        </Link>
                    ) : (
                        <span className="text-gray-300 flex gap-4 items-center cursor-not-allowed">
                            Último artículo
                            <ChevronDown className={`rotate-90`} />
                        </span>
                    )}
                </div>

                {/* Sección de Explorar Relacionados */}
                <h2 className={`${encabezado_h2} text-[#15428C]! text-[40px]! m-0!`}>Sigue explorando</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">
                    {
                        relatedMitos.map((item, idx) => (
                            <Link
                                key={idx}
                                href={`/mitos/${item.slug}`}
                                className="flex flex-col justify-between space-y-4 group cursor-pointer"
                            >
                                <div className="space-y-4">
                                    <div className="relative min-h-60 sm:min-h-72 overflow-hidden rounded-lg">
                                        <img 
                                            src={item.imagen_principal} 
                                            alt={item.titulo} 
                                            className="absolute z-1 top-0 left-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                                        />
                                    </div>
                                    <h3 className="text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-[#15428C]">
                                        {item.titulo}
                                    </h3>
                                </div>
                                <span className={`${BlueButton} w-fit`}>Ver más</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default MitosNavegacion
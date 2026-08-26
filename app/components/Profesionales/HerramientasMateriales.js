import { herramientas_materiales } from "@/app/utils/Copies"
import { encabezado_h3 } from "@/app/utils/CSS_clases"

const HerramientasMateriales = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h3 className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}>Herramientas y</h3>
                <h3 className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>Materiales</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20">
                    {
                        herramientas_materiales.map((item, idx)=>(
                            <a
                                key={idx}
                                href="#"
                                className="space-y-4 group cursor-pointer"
                            >
                                <div className="relative min-h-60 sm:min-h-70 overflow-hidden">
                                    <img src={item.imagen_principal} alt="Imagen de categoría" className="absolute z-1 top-0 left-0 object-cover w-full h-full group-hover:scale-105 duration-400" />
                                </div>
                                <h3 className="text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-[#15428C]">{item.titulo}</h3>
                            </a>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
export default HerramientasMateriales
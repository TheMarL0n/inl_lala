import { mitos } from "@/app/utils/Copies"

const MitosGrid = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    mitos.map((item, idx) => (
                        <a
                            key={idx}
                            href={`/paginas/mitos-y-realidades/${item.slug}`}
                            className="space-y-4 group cursor-pointer"
                        >
                            <div className="relative min-h-60 p-4">
                                <div className={`bg-[#15428C]/70 absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 opacity-100 group-hover:opacity-0`}></div>
                                <img src={item.imagen_principal} alt="Imagen de mitos y realidades" className="absolute z-1 top-0 left-0 object-cover w-full h-full" />
                                <h3 className="text-[18px] leading-5 sm:text-[24px] sm:leading-7 font-bold text-white relative z-2">{item.titulo}</h3>
                            </div>
                        </a>
                    ))
                }
            </div>
        </section>
    )
}
export default MitosGrid
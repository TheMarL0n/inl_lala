import { encabezado_h3, parrafo_normal, stroke_text, WhiteButton } from "@/app/utils/CSS_clases"
import { categorias_nutricion } from "@/app/utils/Copies"

const Preguntas = () => {
    return (
        <section className="bg-[#15428C] py-20 px-4 space-y-20 sm:space-y-40">
            <div className="max-w-7xl mx-auto gap-8 grid grid-cols-1 sm:grid-cols-2">
                <div>
                    <h3 className={`${encabezado_h3} bg-[#0B75B9]`}>¿Qué te gustaría cuidar hoy?</h3>
                    <h2 className={`${stroke_text} [-webkit-text-stroke-color:white] text-[120px] sm:text-[200px] sm:leading-55 uppercase`}>Quiero:</h2>
                </div>
                <div className="sm:pt-40">
                    {
                        categorias_nutricion.map((item, idx) => (
                            <a href={`/paginas/nutricion?cat=${item.id}`} key={idx} className="text-white block font-black uppercase text-[20px] sm:text-[38px] leading-10.5 border-b border-white py-4 hover:text-white/75 duration-400">{item.titulo}</a>
                        ))
                    }
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex justify-between flex-col sm:flex-row border-b border-white pb-4">
                <p className={`${parrafo_normal} text-white mb-4 sm:mb-0`}>Encuentra información y recomendaciones sobre el tema que más te interesa.</p>
                <a href="/paginas/nutricion" className={WhiteButton}>Ver más</a>
            </div>
        </section>
    )
}
export default Preguntas

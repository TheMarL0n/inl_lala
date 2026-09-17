'use client'
import { BlueButton, encabezado_h2, parrafo_normal } from "@/app/utils/CSS_clases";

const BuscadorMitos = () => {

    return (
        <section className="px-4 py-10">
            <div className="max-w-7xl mx-auto pb-20 px-4 space-y-20">
                <div className="text-center flex flex-col items-center space-y-4">
                    <h2 className={`${encabezado_h2} text-[#15428C]! text-[40px]! m-0!`}>¿No encontraste la respuesta que buscabas?</h2>
                    <p className={`${parrafo_normal} text-[#15428C] text-[40px]! leading-11.5!`}>Déjanos tu pregunta sobre nutrición y lácteos.
                        Revisaremos las dudas más frecuentes para responder
                        las dudas más frecuentes con información clara y
                        basada en evidencia.</p>
                </div>
                <form className={`flex flex-col sm:flex-row items-center justify-center gap-6 mx-auto`}>
                    <input type="text" name="criteria" placeholder="¿Qué estás buscando?" className="border-[#164190] bg-white/70 border-2 p-2 h-11.5 w-full sm:w-86.25 focus:outline-0 text-[#164190] text-[18px] font-bold placeholder:text-[#164190] placeholder:text-[18px] placeholder:italic placeholder:font-bold text-center sm:text-left" />
                    <button className={BlueButton}>Buscar</button>
                </form>
            </div>
        </section>
    )
}
export default BuscadorMitos
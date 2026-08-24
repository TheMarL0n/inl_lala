'use client'
import { BlueButton } from "@/app/utils/CSS_clases";

const BuscadorDudas = () => {

    return (
        <div className="max-w-7xl mx-auto pb-20 px-4">
            <form className={`flex flex-col sm:flex-row items-center justify-center gap-6 mx-auto`}>
                <input type="text" name="criteria" placeholder="¿Qué estás buscando?" className="border-[#164190] bg-white/70 border-2 p-2 h-11.5 w-full sm:w-86.25 focus:outline-0 text-[#164190] text-[18px] font-bold placeholder:text-[#164190] placeholder:text-[18px] placeholder:italic placeholder:font-bold text-center sm:text-left" />
                <button className={BlueButton}>Buscar</button>
            </form>
        </div>
    )
}
export default BuscadorDudas
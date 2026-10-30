'use client'
import { BlueButton } from "@/app/utils/CSS_clases";

const BuscadorDudas = () => {

    return (
        <div className="max-w-7xl mx-auto pb-20 px-4">
            <form className={`flex flex-col sm:flex-row items-center justify-center gap-6 mx-auto`}>
                <input type="text" name="criteria" placeholder="¿Qué estás buscando?" className="border-[#164190] bg-white/70 border p-3 w-full sm:w-[620px] focus:outline-0 text-[#164190] text-[28px] font-medium placeholder:text-[#164190] placeholder:text-[28px] placeholder:italic placeholder:font-medium text-center sm:text-left" />
                <button className={`${BlueButton} py-5 px-12 h-auto`}>Buscar</button>
            </form>
        </div>
    )
}
export default BuscadorDudas
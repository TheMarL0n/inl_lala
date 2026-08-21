import { encabezado_h3, parrafo_normal, WhiteButton } from "@/app/utils/CSS_clases"

const Profesionales = () => {
    return (
        <section className="sm:py-10 grid grid-cols-1 sm:grid-cols-2 sm:max-h-132 overflow-hidden">
            <div className="relative overflow-hidden">
                <img src="/images/woman_doctor.png" width={710} height={526} className="w-full h-auto object-cover object-top" alt="persona comiendo" />
            </div>
            <div className="bg-[#15428C] px-8 py-16 space-y-8">
                <h3 className={`${encabezado_h3} bg-[#0B75B9]`}>Para profesionales</h3>
                <p className={`${parrafo_normal} text-white max-w-113 mt-4`}>Encuentra herramientas y lo más reciente en evidencia científica en temas de nutrición, salud, leche y productos lácteos, y fortalecer tu práctica profesional.</p>
                <button className={WhiteButton}>conocer más</button>
            </div>
        </section>
    )
}
export default Profesionales
import Image from 'next/image'
import { encabezado_h3, parrafo_normal, WhiteButton } from "@/app/utils/CSS_clases"

const Profesionales = () => {
    return (
        <section className="sm:py-10 grid grid-cols-1 sm:grid-cols-2 sm:max-h-132 overflow-hidden">
            
            {/* Contenedor de la imagen optimizada */}
            <div className="relative overflow-hidden h-72 sm:h-full">
                <Image 
                    src="/images/woman_doctor.png" 
                    alt="Profesional de la salud revisando información científica y nutricional" 
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top" 
                />
            </div>

            <div className="bg-[#15428C] px-8 py-16 space-y-8 flex flex-col justify-center">
                <h2 className={`${encabezado_h3} bg-[#0B75B9]`}>Para profesionales</h2>
                <p className={`${parrafo_normal} text-white max-w-113 mt-4`}>
                    Encuentra herramientas y lo más reciente en evidencia científica en temas de nutrición, salud, leche y productos lácteos, y fortalecer tu práctica profesional.
                </p>
                <a href="/paginas/profesionales" className={`${WhiteButton} w-fit`}>conocer más</a>
            </div>
        </section>
    )
}
export default Profesionales
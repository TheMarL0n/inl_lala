import Image from 'next/image'
import { encabezado_h2, encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases"

const Nutricion = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <h2>
                    <span className={`${encabezado_h3} bg-[#FF0000] sm:ml-40 text-white inline-block px-2 py-1`}>La nutrición está presente</span>
                    <br/>
                    <span className={`${encabezado_h2} bg-[#164190] block ml-auto text-white px-2 py-1`}>en cada decisión que tomamos</span>
                </h2>
                <div className="max-w-4xl mx-auto flex mt-18 gap-4 sm:gap-12 items-center sm:items-end">
                    
                    {/* Imagen optimizada con Next.js */}
                    <div className="relative shrink-0 w-30 sm:w-94.25 aspect-square">
                        <Image 
                            src="/images/home_bowl.png" 
                            alt="Tazón saludable con ingredientes nutritivos del Instituto de Nutrición Lala" 
                            fill
                            sizes="(max-width: 640px) 120px, 377px"
                            className="object-contain"
                        />
                    </div>

                    <p className={`${parrafo_normal} text-[#15428C] sm:mb-30`}>
                        En el <strong>Instituto de Nutrición Lala</strong> creemos que entender la alimentación no debería ser complicado. Por eso reunimos información clara, confiable y basada en evidencia para ayudarte a comprender mejor a tu cuerpo y los alimentos y que puedas tomar mejores decisiones para tu alimentación.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Nutricion
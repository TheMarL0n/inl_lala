import { encabezado_h2, encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases"

const Nutricion = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <h3 className={`${encabezado_h3} bg-[#FF0000] sm:ml-40`}>La nutrición está presente</h3>
                <h2 className={`${encabezado_h2} bg-[#164190]`}>en cada decisión que tomamos</h2>
                <div className="max-w-4xl mx-auto flex mt-18 gap-4 sm:gap-12 items-center sm:items-end">
                    <img src="/images/home_bowl.png" width={377} height={377} className="w-30 sm:w-94.25" alt="Bowl" />
                    <p className={`${parrafo_normal} text-[#15428C] sm:mb-30`}>
                        En el <strong>Instituto de Nutrición Lala</strong> creemos que entender la alimentación no debería ser complicado. Por eso reunimos información clara, confiable y basada en evidencia para ayudarte a comprender mejor a tu cuerpo y los alimentos y que puedas tomar mejores decisiones para tu alimentación.
                    </p>
                </div>
            </div>
        </section>
    )
}
export default Nutricion
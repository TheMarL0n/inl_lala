import { encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases"

const SingleEtapaMain = (
    { title_linea_1,
        title_linea_2,
        contenido_linea_1,
        contenido_linea_2 }
) => {
    return (
        <section className="px-4 py-20">
            <div className="space-y-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="block">
                        <span className={`${encabezado_h3} bg-[#0B75B9] hidden sm:block sm:text-[46px]! sm:leading-10!`}>{title_linea_1}</span>
                        <span className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-21!`}>{title_linea_2}</span>
                    </h2>
                </div>
                <div className="max-w-5xl mx-auto space-y-8">
                    <p className={`${parrafo_normal} text-[38px]! leading-11! text-[#15428C]`}>{contenido_linea_1}</p>
                    <p className={`${parrafo_normal} text-[#15428C]`}>{contenido_linea_2}</p>
                </div>
            </div>
        </section>
    )
}
export default SingleEtapaMain
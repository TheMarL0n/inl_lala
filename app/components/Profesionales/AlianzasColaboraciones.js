import { colaboradores } from "@/app/utils/Copies"
import { encabezado_h3 } from "@/app/utils/CSS_clases"

const AlianzasColaboraciones = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <h3 className={`${encabezado_h3} bg-[#164190] hidden sm:block sm:text-[46px]!`}>Alianzas y</h3>
                <h3 className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>Colaboraciones</h3>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-20">
                    {
                        colaboradores.map((item, idx) => (
                            <div key={idx} className="w-full h-27 flex items-center justify-center">
                                {
                                    item.logo === "" ?
                                        <div className="w-full h-full bg-[#164190]/10 flex items-center justify-center">
                                            <h3 className="uppercase text-[#164190] font-bold">Logo</h3>
                                        </div>
                                        :
                                        <img src={item.logo} className="object-contain" alt="logo de colaborador" />
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
export default AlianzasColaboraciones
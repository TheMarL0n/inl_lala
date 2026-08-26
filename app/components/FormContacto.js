import { BlueButton, encabezado_h3 } from "../utils/CSS_clases"

const FormContacto = ({ imagen_footer }) => {
    return (
        <section
            style={{ backgroundImage: `url(${imagen_footer})` }}
            className={`relative min-h-screen bg-no-repeat bg-cover bg-center flex flex-col sm:justify-center py-20 px-4`}
        >
            <div className="max-w-7xl sm:w-7xl mx-auto">
                <h3 className={`${encabezado_h3} bg-[#164190] sm:text-[70px]! sm:leading-18!`}>Contacto</h3>
                <form className="w-full mt-20 sm:w-1/2 sm:ml-auto space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input type="text" id="nombre" name="nombre" placeholder="Nombre" className="border-b border-b-[#164190] placeholder:text-[#C7C7CC] text-[30px] text-[#164190]" />
                        <input type="text" id="apellido" name="apellido" placeholder="Apellido" className="border-b border-b-[#164190] placeholder:text-[#C7C7CC] text-[30px] text-[#164190]" />
                        <input type="text" id="telefono" name="telefono" placeholder="Teléfono" className="border-b border-b-[#164190] placeholder:text-[#C7C7CC] text-[30px] text-[#164190]" />
                        <input type="text" id="empresa" name="empresa" placeholder="Empresa" className="border-b border-b-[#164190] placeholder:text-[#C7C7CC] text-[30px] text-[#164190]" />
                    </div>
                    <div className="flex items-center mb-4">
                        <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-5 h-5 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default mr-2" />
                        <label htmlFor="default-radio-1" className="text-[20px] text-[#164190]">Lorem ipsum dolor sit amet ipsum dolor sit amet</label>
                    </div>
                    <button className={`${BlueButton} ml-auto`}>ENVIAR</button>
                </form>
            </div>
        </section>
    )
}
export default FormContacto
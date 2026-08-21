import { encabezado_h3, parrafo_normal, WhiteButton } from "@/app/utils/CSS_clases"

const Dudas = () => {
    return (
        <section className="sm:py-20 grid grid-cols-1 sm:grid-cols-2">
            <div>
                <img src="/images/girl_eating.png" alt="persona comiendo" />
            </div>
            <div className="bg-[#15428C] p-8">
                <h3 className={`${encabezado_h3} bg-[#0B75B9]`}>Resuelve tus</h3>
                <h2 className="uppercase text-[120px] sm:text-[200px] sm:leading-55 text-[#0B75B9] font-medium">Dudas</h2>
                <p className={`${parrafo_normal} text-white max-w-113 mt-4`}>Explora contenidos para aprender sobre nutrición, salud y alimentación desde una perspectiva científica, práctica y fácil de entender.</p>
                <form className="flex flex-col items-start gap-4 mt-12">
                    <input type="text" name="criteria" placeholder="¿Qué estás buscando?" className="border-white border p-2 h-11.5 w-full sm:w-86.25 focus:outline-0 text-white text-[18px] font-bold placeholder:text-white placeholder:text-[18px] placeholder:italic placeholder:font-bold" />
                    <button className={WhiteButton}>Buscar</button>
                </form>

                <div className="space-y-8 mt-26">
                    <div className="border-b border-white pb-2 gap-8 grid grid-cols-1 sm:grid-cols-4">
                        <p className={`${parrafo_normal} text-white sm:col-span-3`}><strong>Alimentación saludable</strong>
                            <br />
                            Entiende las bases de una alimentación equilibrada para el día a día.
                        </p>
                        <button className={WhiteButton}>Ver más</button>
                    </div>

                    <div className="border-b border-white pb-2 gap-8 grid grid-cols-1 sm:grid-cols-4">
                        <p className={`${parrafo_normal} text-white sm:col-span-3`}><strong>Nutrientes que tu cuerpo necesita</strong>
                            <br />
                            Identifica qué hace cada nutriente y por qué es importante para tu organismo.
                        </p>
                        <button className={WhiteButton}>Ver más</button>
                    </div>

                    <div className="border-b border-white pb-2 gap-8 grid grid-cols-1 sm:grid-cols-4">
                        <p className={`${parrafo_normal} text-white sm:col-span-3`}><strong>Leche y productos lácteos</strong>
                            <br />
                            Comprende el papel de la leche y los lácteos dentro de una alimentación equilibrada.
                        </p>
                        <button className={WhiteButton}>Ver más</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Dudas
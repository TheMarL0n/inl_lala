import Image from "next/image"
import { parrafo_normal } from "../utils/CSS_clases"

const PagesSmallJumbotron = ({ background }) => {
    return (
        <section className="relative">
            <div className="relative h-screen min-h-150 max-h-117 flex flex-col sm:justify-center overflow-hidden">
                {background && (
                    <Image
                        src={background}
                        alt="Imagen de cabecera"
                        fill
                        priority
                        sizes="100vw"
                        className="absolute inset-0 object-cover object-center z-0"
                    />
                )}
            </div>
            <div className="page_descripcion max-w-7xl mx-4 sm:mx-auto bg-white -mt-10 sm:-mt-30 p-4 sm:p-10 relative z-2 sm:min-h-37.5">
                <a href="/pages/mitos-y-realidades" className={`${parrafo_normal} text-[#164190] uppercase`}>Más ciencia. Menos mitos.</a>
            </div>
        </section>
    )
}

export default PagesSmallJumbotron
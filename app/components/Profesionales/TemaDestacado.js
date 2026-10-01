import Image from "next/image"
import { BlueButton, encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases"

const TemaDestacado = ({
    imagen_tema_destacado,
    titulo_tema_destacado,
    subtitulo_tema_destacado,
    descripcion_tema_destacado,
    enlace_tema_destacado,
}) => {
    return (
        <section className="mt-20 relative sm:min-h-screen flex flex-col sm:justify-center overflow-hidden">
            {/* Imagen de fondo optimizada con Next.js Image */}
            {imagen_tema_destacado && (
                <Image
                    src={imagen_tema_destacado}
                    alt={titulo_tema_destacado || "Imagen de tema destacado"}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover object-center absolute inset-0 -z-10"
                />
            )}

            <div className="max-w-7xl mx-auto w-full">
                <div className="relative z-3 max-w-7xl sm:w-7xl mx-auto py-4 px-4">
                    <article>
                        <h2>
                            <a href={`${enlace_tema_destacado}`}>
                                <span className={`${encabezado_h3} bg-[#164190] sm:text-[46px]!`}>{titulo_tema_destacado}</span>
                                <br />
                                <span className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>{subtitulo_tema_destacado}</span>
                            </a>
                        </h2>
                        <p className={`${parrafo_normal} text-white font-medium text-[34px]! leading-9 max-w-md sm:ml-26 mt-6`}>
                            {descripcion_tema_destacado}
                        </p>
                        <a
                            href={`${enlace_tema_destacado}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${BlueButton} w-fit sm:ml-26 mt-6`}
                        >
                            Ver más
                            <span className="sr-only">{descripcion_tema_destacado}</span>
                        </a>
                    </article>
                </div>
            </div>
        </section>
    )
}
export default TemaDestacado
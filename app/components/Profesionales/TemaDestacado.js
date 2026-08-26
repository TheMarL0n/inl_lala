import { BlueButton, encabezado_h3, parrafo_normal } from "@/app/utils/CSS_clases"

const TemaDestacado = ({
    imagen_tema_destacado,
    titulo_tema_destacado,
    subtitulo_tema_destacado,
    descripcion_tema_destacado,
    enlace_tema_destacado,
}) => {
    return (
        <section
            style={{ backgroundImage: `url(${imagen_tema_destacado})` }}
            className={`mt-20 relative sm:min-h-screen bg-no-repeat bg-cover bg-center flex flex-col sm:justify-center`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="relative z-3 max-w-7xl sm:w-7xl mx-auto py-4 px-4">
                    <div>
                        <h3 className={`${encabezado_h3} bg-[#164190] sm:text-[46px]!`}>{titulo_tema_destacado}</h3>
                        <h3 className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-18!`}>{subtitulo_tema_destacado}</h3>
                        <p className={`${parrafo_normal} text-white font-medium text-[34px]! leading-9 max-w-md sm:ml-26 mt-6`}>
                            {descripcion_tema_destacado}
                        </p>
                        <a
                            href={`${enlace_tema_destacado}`}
                            target="_blank"
                            className={`${BlueButton} w-fit sm:ml-26 mt-6`}
                        >
                            Ver más
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default TemaDestacado
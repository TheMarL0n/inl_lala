import Image from "next/image"

const FooterDudas = ({ imagen_footer }) => {
    return (
        <section className="relative h-screen min-h-150 max-h-225 flex flex-col sm:justify-center overflow-hidden">
            {imagen_footer && (
                <Image
                    src={imagen_footer}
                    alt="Imagen de fondo del footer"
                    fill
                    priority
                    sizes="100vw"
                    className="absolute inset-0 object-cover object-center z-0"
                />
            )}
            
           <div className="relative z-10 w-full h-full flex flex-col justify-center">
                {/* Aquí iría el contenido interno */}
            </div>
        </section>
    )
}

export default FooterDudas
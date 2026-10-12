import Image from "next/image"

const PagesSmallJumbotron = ({ background, breadcrumb }) => {
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
        </section>
    )
}

export default PagesSmallJumbotron
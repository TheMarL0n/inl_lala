import ReactMarkdown from "react-markdown";
import Image from "next/image";

const SingleEtapaMain = ({ contenido, float }) => {
    return (
        <section className="px-4 py-10 relative overflow-hidden">
            <div className={`max-w-5xl mx-auto clearfix transition-all ${
                float ? "sm:pr-[260px]" : ""
            }`}>
                <div className="prose max-w-none">
                    <ReactMarkdown
                        components={{
                            // Usamos un span con display block para evitar que el navegador rompa la regla de hidratación del <p>
                            img: ({ src, alt }) => {
                                const containerClasses = float
                                    ? "relative sm:absolute right-0 w-full md:w-[420px] lg:w-[462px] h-[350px] md:h-[420px] lg:h-[500px] top-10 md:top-20 pointer-events-none block" 
                                    : "my-6 relative w-full h-[400px] block";

                                return (
                                    <span className={containerClasses}>
                                        <Image
                                            src={src}
                                            alt={alt || 'Imagen del artículo'}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 500px"
                                            className="object-contain"
                                            priority={false}
                                        />
                                    </span>
                                );
                            }
                        }}
                    >
                        {contenido}
                    </ReactMarkdown>
                </div>
            </div>
        </section>
    );
};

export default SingleEtapaMain;
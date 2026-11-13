import { encabezado_h3 } from "@/app/utils/CSS_clases";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const TituloDestacado = ({ title_linea_1, title_linea_2, color_fondo_1, color_fondo_2, background, contenido }) => {
    const fondosOscuros = {
        azul: "bg-[#15428C]",
        rojo: "bg-[#FF0000]",
        verde: "bg-[#009638]",
        celeste: "bg-[#0B75B9]",
    };

    // Si la URL viene de Strapi y no empieza con http, le agregamos el host
    const getStrapiMedia = (url) => {
        if (!url) return null;
        if (url.startsWith("http") || url.startsWith("//")) {
            return url;
        }
        return `${process.env.NEXT_PUBLIC_STRAPI_HOST}${url}`;
    };
    return (
        <section className="text-destacado relative overflow-hidden my-20">
            <div className="relative h-screen min-h-150 max-h-225 2xl:max-h-200 flex flex-col sm:justify-center w-full">
                {background.url ?
                    <Image
                        src={getStrapiMedia(background.url)}
                        alt={
                            title_linea_1 && title_linea_2
                                ? `Imagen de fondo para ${title_linea_1} ${title_linea_2}`
                                : "Imagen de fondo del call to action"
                        }
                        fill
                        priority // Prioritario al ser el banner principal (mejora el LCP)
                        sizes="100vw"
                        className="object-cover object-center -z-10"
                    />
                    :
                    ""
                }
                <div className="w-full sm:w-7xl max-w-7xl px-4 sm:px-0 mx-auto mt-20 mb-10">
                    {title_linea_1 || title_linea_2 ? (
                        <h1 className="block">
                            {title_linea_1 ? (
                                <span
                                    className={`${encabezado_h3} ${fondosOscuros[color_fondo_1] || fondosOscuros.celeste} block sm:text-[46px]! sm:leading-16!`}
                                >
                                    {title_linea_1}
                                </span>
                            ) : (
                                ""
                            )}
                            {title_linea_2 ? (
                                <span
                                    className={`${encabezado_h3} ${fondosOscuros[color_fondo_2] || fondosOscuros.azul} sm:ml-26 sm:text-[46px]! sm:leading-16!`}
                                >
                                    {title_linea_2}
                                </span>
                            ) : (
                                ""
                            )}
                        </h1>
                    ) : (
                        ""
                    )}

                    <div className="text-white! cuerpo w-full sm:max-w-xl">
                        <ReactMarkdown>
                            {contenido}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default TituloDestacado
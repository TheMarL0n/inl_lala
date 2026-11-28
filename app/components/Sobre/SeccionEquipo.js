import Image from "next/image";
import { encabezado_h2, encabezado_h3 } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const SeccionEquipo = ({ contenido }) => {
  if (!Array.isArray(contenido) || contenido.length === 0) {
    return null;
  }

  const contenidoOrdenado = [...contenido].sort(
      (a, b) => a.orden - b.orden,
    );

  return (
    <>
      <div className="w-full sm:w-5xl mx-auto pt-20">
        <h2>
          <span
            className={`${encabezado_h3} text-white bg-[#164190] text-[46px]`}
          >
            Nuestro
          </span>
          <br />
          <span
            className={`${encabezado_h3} ml-20 text-white bg-[#164190] text-[70px]!`}
          >
            Equipo
          </span>
        </h2>
      </div>
      {contenidoOrdenado.map((item, idx) => {
        const mediaUrl = item?.imagen_principal?.url
          ? getStrapiMedia(item.imagen_principal.url)
          : null;

        return (
          <section
            key={item?.id ?? idx}
            className="contenido_destacado-alternativo py-20"
          >
            <div className="relative grid grid-cols-1 sm:grid-cols-3 items-start">
              {mediaUrl && (
                <div className="sm:sticky sm:top-0 h-fit w-full">
                  <div className="relative w-full h-[300px] sm:h-[400px]">
                    <Image
                      src={mediaUrl}
                      alt={
                        item?.imagen_principal?.alternativeText ||
                        item?.nombre ||
                        "Ilustración representativa"
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain object-left"
                    />
                  </div>
                </div>
              )}

              <div className="sm:col-span-2 px-8 space-y-8 flex flex-col justify-center">
                {(item?.nombre || item?.puesto) && (
                  <h2 className="mt-0! mb-6">
                    {item?.nombre && (
                      <>
                        <span
                          className={`${encabezado_h3} text-[#164190]! text-[40px]`}
                        >
                          {item.nombre}
                        </span>
                        <br />
                      </>
                    )}

                    {item?.puesto && (
                      <span
                        className={`${encabezado_h2} ml-12! block text-white text-[30px]! font-light bg-[#FF0000] leading-6!`}
                      >
                        {item.puesto}
                      </span>
                    )}
                  </h2>
                )}
                {item?.biografia && (
                  <div className="sm:max-w-xl cuerpo-oscuro text-[30px]! leading-[1.1]">
                    <ReactMarkdown>{item.biografia}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default SeccionEquipo;
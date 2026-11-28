import Image from "next/image";
import { encabezado_h3 } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const SeccionEvolucion = ({
  titulo_1,
  titulo_2,
  descripcion,
  imagen_principal
}) => {
  return (
    <section
      className={`contenido_destacado bg-[#15428C] relative grid grid-cols-1 sm:grid-cols-2`}
    >
      {imagen_principal ? (
        <div className="sm:sticky sm:top-0 h-fit w-full">
          <div className="relative w-full h-[500px] sm:h-screen">
            <Image
              src={getStrapiMedia(imagen_principal.url)}
              alt="Ilustración representativa derecha"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={`sm:min-h-[650px] px-8 py-16 space-y-8 flex flex-col justify-center`}
      >
        {titulo_1 || titulo_2 ? (
          <h2>
            {titulo_1
              ?
              <>
                <span
                  className={`${encabezado_h3} text-white bg-[#0B75B9] text-[46px]`}
                >
                  {titulo_1}
                </span>
                <br />
              </>
              :
              ""
            }

            {
              titulo_2
                ?
                <span
                  className={`${encabezado_h3} ml-20 text-white bg-[#0B75B9] text-[70px]!`}
                >
                  {titulo_2}
                </span>
                :
                ""
            }

          </h2>
        ) : (
          ""
        )}
        <div className={`mt-4 sm:max-w-xl cuerpo-oscuro text-white! text-[30px] leading-1.1`}>
          <ReactMarkdown>{descripcion}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};
export default SeccionEvolucion;

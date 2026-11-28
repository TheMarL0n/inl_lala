import Image from "next/image";
import { encabezado_h2, encabezado_h3 } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";
import { getStrapiMedia } from "@/app/lib/strapi-media";

const SeccionIntroductoria = ({
  titulo_1,
  titulo_2,
  descripcion,
  imagen_principal
}) => {
  return (
    <section
      className={`contenido_destacado bg-[#15428C] py-20`}
    >
      <div className="max-w-5xl mx-auto">
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
                <br />
              </>
              :
              ""
            }

            {
              titulo_2
                ?
                <span
                  className={`${encabezado_h2} text-white text-[40px] sm:text-[150px]`}
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
      </div>

      <div className={`max-w-5xl mx-auto relative grid grid-cols-1 sm:grid-cols-3 items-center`}>

        {imagen_principal ? (
          <div className="h-fit w-full">
            <div className="relative w-full h-[300px] sm:h-[400px]">
              <Image
                src={getStrapiMedia(imagen_principal.url)}
                alt="Ilustración representativa derecha"
                fill
                sizes="(max-width: 400px) 400px, 400px"
                className="object-contain object-center"
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={`sm:col-span-2 px-8 py-16 space-y-8 flex flex-col justify-center`}
        >
          <div className={`cuerpo-oscuro text-white text-[30px]! leading-1.1`}>
            <ReactMarkdown>{descripcion}</ReactMarkdown>
          </div>
        </div>

      </div>
    </section>
  );
};
export default SeccionIntroductoria;

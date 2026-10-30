import Image from "next/image";
import { encabezado_h3 } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";

// Si la URL viene de Strapi y no empieza con http, le agregamos el host
const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST;
  return `${host}${url}`;
};

// Función auxiliar para extraer el texto del primer H6 (##) en el Markdown
const extraerH6Markdown = (markdownText) => {
  if (!markdownText) return "";
  const match = markdownText.match(/^######\s+(.+)$/m);
  return match ? match[1] : "";
};

// Función auxiliar para extraer el texto excluyendo el primer H6 (##) en el Markdown
const extraerRestoDeMarkdown = (markdownText) => {
  if (!markdownText) return "";
  const textoSinH6 = markdownText.replace(/^######\s+.+$/m, "");
  return textoSinH6.trim();
};

const ContenidoDestacado = ({ contenido }) => {
  if (contenido.tipo === "alternativo") {
    const tituloH6 = extraerH6Markdown(contenido.html);
    const restoMarkdown = extraerRestoDeMarkdown(contenido.html);

    return (
      <section>
        <div
          className={`contenido_destacado-alternativo w-full sm:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 overflow-hidden`}
        >
          {/* Contenedor de la imagen optimizada */}
          <div className="relative overflow-hidden h-72 sm:h-full">
            <h6 className="absolute top-0 left-0 z-2">{tituloH6}.</h6>

            {contenido.imagen_destacada ? (
              <Image
                src={getStrapiMedia(contenido.imagen_destacada.url)}
                alt="Profesional de la salud revisando información científica y nutricional"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain object-top"
              />
            ) : (
              ""
            )}
          </div>

          <div
            className={`${contenido.tipo === "oscuro" ? "bg-[#15428C]" : ""} sm:min-h-[650px] px-8 py-16 space-y-8 flex flex-col justify-center`}
          >
            {contenido.titulo_linea_1 || contenido.titulo_linea_2 ? (
              <h2>
                <span
                  className={`${encabezado_h3} bg-[#0B75B9] text-[#15428C]! text-[46px]`}
                >
                  {contenido.titulo_linea_1}
                </span>
                <br />
                <span className="text-[#0B75B9] text-[40px] sm:text-[100px]">
                  {contenido.titulo_linea_2}
                </span>
              </h2>
            ) : (
              ""
            )}
            <div className="sm:max-w-113">
              <ReactMarkdown>{restoMarkdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (contenido.tipo === "doble_foto") {
    return (
      <section
        className={`grid grid-cols-1 sm:grid-cols-4 mx-auto relative z-2 w-full items-start px-4 py-10`}
      >
        {/* IMAGEN IZQUIERDA: Fija (sticky) al hacer scroll */}
        <div className="sm:sticky sm:top-0 h-fit w-full">
          <div className="relative w-full h-[400px] sm:h-[650px]">
            {contenido.imagen_izquierda ? (
              <Image
                src={getStrapiMedia(contenido.imagen_izquierda.url)}
                alt="Ilustración representativa izquierda"
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover object-top"
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* TEXTO CENTRAL: Fluye de manera natural y hace scroll libremente */}
        <div className={`w-full sm:col-span-2 flex flex-col items-start p-8 sm:min-h-[650px]`}>
          <ReactMarkdown>{contenido.html}</ReactMarkdown>
        </div>

        {/* IMAGEN DERECHA: Fija (sticky) al hacer scroll */}
        <div className="sm:sticky sm:top-0 h-fit w-full">
          <div className="relative w-full h-[400px] sm:h-[650px]">
            {contenido.imagen_derecha ? (
              <Image
                src={getStrapiMedia(contenido.imagen_derecha.url)}
                alt="Ilustración representativa derecha"
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover object-top"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${contenido.tipo === "oscuro" ? "contenido_destacado" : ""} relative grid grid-cols-1 sm:grid-cols-2 items-start`}
    >
      {contenido.imagen_destacada ? (
        <div className="sm:sticky sm:top-0 h-fit w-full">
          <div className="relative w-full h-[400px] sm:h-[650px]">
            <Image
              src={getStrapiMedia(contenido.imagen_destacada.url)}
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

      <div
        className={`${contenido.tipo === "oscuro" ? "bg-[#15428C]" : ""} sm:min-h-[650px] px-8 py-16 space-y-8 flex flex-col justify-center`}
      >
        {contenido.titulo_linea_1 || contenido.titulo_linea_2 ? (
          <h2>
            <span
              className={`${encabezado_h3} bg-[#0B75B9] text-[#15428C]! text-[46px]`}
            >
              {contenido.titulo_linea_1}
            </span>
            <br />
            <span className="text-[#0B75B9] text-[40px] sm:text-[100px]">
              {contenido.titulo_linea_2}
            </span>
          </h2>
        ) : (
          ""
        )}
        <div className="sm:max-w-113">
          <ReactMarkdown>{contenido.html}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};
export default ContenidoDestacado;

import ReactMarkdown from "react-markdown";
import Image from "next/image";

// Si la URL viene de Strapi y no empieza con http, le agregamos el host
const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST;
  return `${host}${url}`;
};

const BlueGrid = ({
  contenido,
  tipo,
  titulo_columna_1,
  titulo_columna_2,
  titulo_columna_3,
}) => {
  // Si el tipo es "masonry", renderizamos la cuadrícula asimétrica estilo collage
  if (tipo === "masonry") {
    return (
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="cuadricula_azul grid grid-cols-1 sm:grid-cols-4 gap-4 auto-rows-[220px]">
          {contenido.map((item, idx) => {
            // Usamos el operador módulo (%) basado en la longitud de un bloque de patrón (por ejemplo, cada 8 elementos)
            // Esto hace que la secuencia de formas se repita cíclicamente para cualquier cantidad de elementos.
            const posicionEnPatron = idx % 8;

            let spanClasses = "col-span-1 row-span-1";

            if (posicionEnPatron === 5) {
              spanClasses = "sm:col-span-1 sm:row-span-2"; // Tarjetas más altas
            } else if (
              posicionEnPatron === 2 ||
              posicionEnPatron === 3 ||
              posicionEnPatron === 7
            ) {
              spanClasses = "sm:col-span-2 sm:row-span-1"; // Tarjetas más anchas
            }

            return (
              <div
                key={idx}
                className={`relative overflow-hidden flex flex-col justify-center items-start ${spanClasses} ${
                  item.imagen ? "bg-gray-100" : "bg-[#15428C] text-white p-6"
                }`}
              >
                {item.imagen ? (
                  <Image
                    src={getStrapiMedia(item.imagen.url)}
                    alt={item.alt || "Imagen de cuadrícula masonry"}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <ReactMarkdown>{item.contenido}</ReactMarkdown>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  //En caso de que el tipo sea tabla, extraer los indices
  const filas = [];
  for (let i = 0; i < contenido.length; i += 3) {
    filas.push({
      titulo: contenido[i], // El objeto del título
      descripcion: contenido[i + 1], // El objeto del texto
      imagenObj: contenido[i + 2], // El objeto de la imagen
    });
  }

 if (tipo === "tabla") {
    return (
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="cuadricula_azul flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch overflow-hidden bg-white">
            <div className="flex flex-col justify-center sm:col-span-3">
              {titulo_columna_1 ? (
                <h4 className="mb-0!">
                  <strong>{titulo_columna_1}</strong>
                </h4>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col justify-center sm:col-span-6">
              {titulo_columna_2 ? (
                <h4 className="mb-0!">
                  <strong>{titulo_columna_2}</strong>
                </h4>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col justify-center sm:col-span-3">
              {titulo_columna_3 ? (
                <h4 className="mb-0!">
                  <strong>{titulo_columna_3}</strong>
                </h4>
              ) : (
                ""
              )}
            </div>
          </div>

          {filas.map((fila, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch overflow-hidden bg-white"
            >
              {/* 1. CAJA 1 (Ocupa 3 columnas) - Con soporte opcional para imagen */}
              <div className="bg-[#15428C] p-8 min-h-[226px] flex flex-col justify-center sm:col-span-3 relative">
                {fila.titulo?.imagen ? (
                  <Image
                    src={getStrapiMedia(fila.titulo.imagen.url)}
                    alt={fila.titulo.imagen.alternativeText || "Imagen ilustrativa"}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <p className="text-[34px]! text-white! font-bold">
                    {fila.titulo?.contenido || ""}
                  </p>
                )}
              </div>

              {/* 2. CAJA 2 (Ocupa 6 columnas) - Con soporte opcional para imagen */}
              <div className="bg-[#15428C] p-8 min-h-[226px] flex flex-col justify-center sm:col-span-6 relative">
                {fila.descripcion?.imagen ? (
                  <Image
                    src={getStrapiMedia(fila.descripcion.imagen.url)}
                    alt={fila.descripcion.imagen.alternativeText || "Imagen ilustrativa"}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <ReactMarkdown>
                    {fila.descripcion?.contenido || ""}
                  </ReactMarkdown>
                )}
              </div>

              {/* 3. CAJA 3 (Ocupa 3 columnas) - Mantiene su imagen por defecto */}
              <div className="relative h-[220px] sm:h-auto sm:col-span-3 bg-gray-100">
                {fila.imagenObj?.imagen && (
                  <Image
                    src={getStrapiMedia(fila.imagenObj.imagen.url)}
                    alt={
                      fila.imagenObj.imagen.alternativeText ||
                      "Imagen ilustrativa"
                    }
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Diseño regular original
  return (
    <section className="px-4">
      <div
        className={`cuadricula_azul max-w-5xl mx-auto grid grid-cols-2 ${tipo === "dos_columnas" ? "sm:grid-cols-2" : "sm:grid-cols-4"} gap-4`}
      >
        {contenido.map((item, idx) => (
          <div
            key={idx}
            className={`bg-[#15428C] text-white relative h-[226px] overflow-hidden flex flex-col justify-center items-start ${
              item.imagen ? "" : "p-4"
            }`}
          >
            {item.imagen ? (
              <Image
                src={getStrapiMedia(item.imagen.url)}
                alt={item.alt || "Imagen de cuadrícula LALA"}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            ) : (
              <ReactMarkdown>{item.contenido}</ReactMarkdown>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlueGrid;

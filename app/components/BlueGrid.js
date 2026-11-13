import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { stroke_text } from "../utils/CSS_clases";

// Si la URL viene de Strapi y no empieza con http, le agregamos el host
const getStrapiMedia = (url) => {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  const host = process.env.NEXT_PUBLIC_STRAPI_HOST;
  return `${host}${url}`;
};

// Función auxiliar para extraer el texto del primer H2 (##) en el Markdown
const extraerH2Markdown = (markdownText) => {
  if (!markdownText) return "";
  const match = markdownText.match(/^##\s+(.+)$/m);
  return match ? match[1] : "";
};

// Función auxiliar para extraer el texto excluyendo el primer H2 (##) en el Markdown
const extraerRestoDeMarkdown = (markdownText) => {
  if (!markdownText) return "";
  // Remueve todas las líneas que comiencen con 2 o 3 numerales en todo el texto
  const textoSinTitulos = markdownText.replace(/^#{2,3}\s+.+$/gm, "");
  return textoSinTitulos.trim();
};

// Función auxiliar para verificar si el markdown contiene un H6 (######)
const tieneH6Markdown = (markdownText) => {
  if (!markdownText) return false;
  return /^######\s+(.+)$/m.test(markdownText);
};

const BlueGrid = ({
  contenido,
  tipo,
  titulo_columna_1,
  titulo_columna_2,
  titulo_columna_3,
}) => {
  const fondosOscuros = {
    blanco: "bg-transparent",
    azul: "bg-[#15428C]",
    rojo: "bg-[#FF0000]",
    verde: "bg-[#009638]",
    celeste: "bg-[#0B75B9]",
  };

  //En caso de que el tipo sea tabla, extraer los indices
  const filas = [];
  for (let i = 0; i < contenido.length; i += 3) {
    filas.push({
      titulo: contenido[i], // El objeto del título
      descripcion: contenido[i + 1], // El objeto del texto
      imagenObj: contenido[i + 2], // El objeto de la imagen
    });
  }

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
                className={`relative overflow-hidden flex flex-col justify-center items-start ${spanClasses} ${item.imagen ? "bg-gray-100" : "bg-[#15428C] text-white p-6"
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

          {filas.map((fila, idx) => {
            const tituloH2 = extraerH2Markdown(fila.titulo?.contenido);
            const restoContenido = extraerRestoDeMarkdown(fila.titulo?.contenido);
            return (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch overflow-hidden bg-white"
              >
                {/* 1. CAJA 1 (Ocupa 3 columnas) - Con soporte opcional para imagen */}
                <div
                  className={`${fondosOscuros[fila.titulo.color_fondo] || fondosOscuros.azul} p-4 min-h-[226px] flex flex-col justify-center sm:col-span-3 relative`}
                >
                  {fila.titulo?.imagen ? (
                    <Image
                      src={getStrapiMedia(fila.titulo.imagen.url)}
                      alt={
                        fila.titulo.imagen.alternativeText || "Imagen ilustrativa"
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div>
                      <ReactMarkdown>
                        {restoContenido || ""}
                      </ReactMarkdown>
                      <span
                        className={`${stroke_text} [-webkit-text-stroke-color:#ffffff] text-[90px]! sm:text-[210px]! sm:leading-[180px] uppercase`}
                      >
                        {tituloH2}
                      </span>
                    </div>

                  )}
                </div>

                {/* 2. CAJA 2 (Ocupa 6 columnas) - Con soporte opcional para imagen */}
                <div
                  className={`${fondosOscuros[fila.descripcion.color_fondo] || fondosOscuros.azul} p-8 min-h-[226px] flex flex-col justify-center sm:col-span-6 relative`}
                >
                  {fila.descripcion?.imagen ? (
                    <Image
                      src={getStrapiMedia(fila.descripcion.imagen.url)}
                      alt={
                        fila.descripcion.imagen.alternativeText ||
                        "Imagen ilustrativa"
                      }
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
                <div
                  className={`${fondosOscuros[fila.imagenObj.color_fondo] || fondosOscuros.azul} p-8 min-h-[226px] flex flex-col justify-center sm:col-span-3 relative`}
                >
                  {fila.imagenObj?.imagen ? (
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
                  ) : (
                    <ReactMarkdown>
                      {fila.imagenObj?.contenido || ""}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    );
  }

  if (tipo === "irregular") {
    return (
      <section className="px-4 py-2">
        <div
          className={`cuadricula_azul ${contenido.length > 4 ? "max-w-7xl" : "max-w-5xl"} mx-auto grid grid-cols-2 sm:grid-cols-[repeat(var(--total-cols),minmax(0,1fr))] gap-4`}
          style={{
            "--total-cols": contenido.length,
          }}
        >
          {
            contenido.map((item, idx) => {
              const tieneImagen = item.contenido && item.contenido.includes("![");
              return (
                <div
                  key={idx}
                  className={`${fondosOscuros[item.color_fondo] || fondosOscuros.blanco} ${tieneImagen ? "grid grid-cols-2 items-end" : ""} min-h-[226px] ${item.color_fondo === null ? "text-[#15428C]! border border-[#15428C]" : "text-white!"} relative overflow-hidden flex flex-col justify-center items-start ${item.imagen ? "" : "p-4"
                    }`}
                >
                  {item.imagen ? (
                    <Image
                      src={getStrapiMedia(item.imagen.url)}
                      alt={item.alt || "Imagen de cuadrícula LALA"}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-contain"
                    />
                  ) : (
                    <ReactMarkdown
                      components={{
                        img: ({ src, alt }) => {
                          const containerClasses = "relative sm:absolute right-0 w-full sm:w-[220px] sm:h-[200px] sm:bottom-0 pointer-events-none block";

                          return (
                            <span className={containerClasses}>
                              <Image
                                src={src}
                                alt={alt || 'Imagen del artículo'}
                                fill
                                sizes="(max-width: 1024px) 100vw, 500px"
                                className="object-contain object-top"
                                priority={false}
                              />
                            </span>
                          );
                        }
                      }}>
                      {item.contenido}
                    </ReactMarkdown>
                  )}
                </div>
              )
            })}
        </div>
      </section>
    );
  }

  if (tipo === "texto_gigante") {
    return (
      <section className="px-4 py-2">
        <div
          className={`relative cuadricula_azul max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4`}
        >
          <div className="absolute w-full sm:top-0 sm:left-0 flex flex-col">
            <span
              className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-[90px]! sm:text-[210px]! sm:leading-[160px] uppercase ml-36`}
            >
              Antes
            </span>
            <span
              className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-[90px]! sm:text-[210px]! sm:leading-[160px] uppercase text-center`}
            >
              VS
            </span>
            <span
              className={`${stroke_text} [-webkit-text-stroke-color:#009638] text-[90px]! sm:text-[210px]! sm:leading-[160px] uppercase text-right`}
            >
              Ahora
            </span>
          </div>
          {
            contenido.map((item, idx) => {
              const tieneImagen = item.contenido && item.contenido.includes("![");
              return (
                <div
                  key={idx}
                  className={`${fondosOscuros[item.color_fondo] || fondosOscuros.blanco} ${tieneImagen ? "grid grid-cols-2 items-end" : ""} min-h-[226px] relative overflow-hidden flex flex-col justify-center items-start ${item.imagen ? "" : "p-4"
                    }`}
                >
                  {item.imagen ? (
                    <Image
                      src={getStrapiMedia(item.imagen.url)}
                      alt={item.alt || "Imagen de cuadrícula LALA"}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-contain"
                    />
                  ) : (
                    <ReactMarkdown
                      components={{
                        img: ({ src, alt }) => {
                          const containerClasses = "relative sm:absolute right-0 w-full sm:w-[220px] sm:h-[200px] sm:bottom-0 pointer-events-none block";

                          return (
                            <span className={containerClasses}>
                              <Image
                                src={src}
                                alt={alt || 'Imagen del artículo'}
                                fill
                                sizes="(max-width: 1024px) 100vw, 500px"
                                className="object-contain object-top"
                                priority={false}
                              />
                            </span>
                          );
                        }
                      }}>
                      {item.contenido}
                    </ReactMarkdown>
                  )}
                </div>
              )
            })}
        </div>
      </section>
    );
  }

  if (tipo === "doble_fila") {
    return (
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="cuadricula_azul grid grid-cols-1 sm:grid-cols-4 gap-4 sm:grid-rows-2 auto-rows-[220px]">
          {contenido.map((item, idx) => {
            const tieneImagen = item.contenido && item.contenido.includes("![");
            
            let spanClasses = "col-span-1 row-span-1";
            if (idx === 0) {
              spanClasses = "sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3"; // Izquierda alto
            } else if (idx === 1) {
              spanClasses = "sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2"; // Centro arriba
            } else if (idx === 2) {
              spanClasses = "sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3"; // Centro abajo
            } else if (idx === 3) {
              spanClasses = "sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-3"; // Derecha grande (ocupa 2 columnas de ancho y 2 de alto)
            }

            return (
              <div
                key={idx}
                className={`relative overflow-hidden flex flex-col justify-center items-start ${spanClasses} ${
                  tieneImagen ? "grid grid-cols-2 items-end" : ""
                } ${item.imagen ? "bg-gray-100" : "bg-[#15428C] text-white p-6"}`}
              >
                {item.imagen ? (
                  <Image
                    src={getStrapiMedia(item.imagen.url)}
                    alt={item.alt || "Imagen de cuadrícula doble fila"}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <ReactMarkdown
                    components={{
                      img: ({ src, alt }) => {
                        const containerClasses = "relative sm:absolute right-0 w-full sm:w-[220px] sm:h-[200px] sm:bottom-0 pointer-events-none block";

                        return (
                          <span className={containerClasses}>
                            <Image
                              src={src}
                              alt={alt || 'Imagen del artículo'}
                              fill
                              sizes="(max-width: 1024px) 100vw, 500px"
                              className="object-contain object-top"
                              priority={false}
                            />
                          </span>
                        );
                      }
                    }}>
                    {item.contenido}
                  </ReactMarkdown>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (tipo === "desbordada") {
    return (
      <section className="py-20 px-4 max-w-7xl mx-auto overflow-visible">
        <div className="cuadricula_azul grid grid-cols-1 sm:grid-cols-5 gap-6 items-center">
          {contenido.map((item, idx) => {
            const tieneImagen = item.contenido && item.contenido.includes("![");
            const esAnchoDoble = tieneH6Markdown(item.contenido); // Mantenemos la lógica del H6

            return (
              <div
                key={idx}
                className={`
                  relative flex flex-col justify-center items-start min-h-[220px] text-white
                  ${fondosOscuros[item.color_fondo] || fondosOscuros.azul}
                  ${esAnchoDoble ? "col-span-1 sm:col-span-2 bg-transparent p-0" : "col-span-1 p-6"}
                  ${tieneImagen ? "grid grid-cols-2 items-end" : ""}
                `}
              >
                {item.imagen ? (
                  <Image
                    src={getStrapiMedia(item.imagen.url)}
                    alt={item.alt || "Imagen de cuadrícula desbordada"}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <ReactMarkdown
                    components={{
                      img: ({ src, alt }) => {
                        const containerClasses = "absolute -bottom-12 -right-6 sm:-right-4 w-[140px] sm:w-[160px] h-[140px] sm:h-[160px] pointer-events-none block z-10";

                        return (
                          <span className={containerClasses}>
                            <Image
                              src={src}
                              alt={alt || 'Imagen desbordada'}
                              fill
                              sizes="(max-width: 1024px) 100vw, 300px"
                              className="object-contain drop-shadow-lg"
                              priority={false}
                            />
                          </span>
                        );
                      }
                    }}>
                    {item.contenido}
                  </ReactMarkdown>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (tipo === "desbordada_simple") {
    return (
      <section className="py-20 px-4 max-w-5xl mx-auto overflow-visible">
        <div className="cuadricula_azul grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {contenido.map((item, idx) => {
            const tieneImagen = item.contenido && item.contenido.includes("![");
            const esAnchoDoble = tieneH6Markdown(item.contenido); // Mantenemos la compatibilidad con H6

            let spanClasses = "col-span-1 row-span-1";
            if (idx === 0) {
              spanClasses = "sm:col-start-1 sm:col-end-2 flex justify-center sm:-ml-12 z-10";
            } else if (idx === 1) {
              spanClasses = `sm:col-start-2 sm:col-end-3 ${esAnchoDoble ? "sm:col-span-2" : ""}`;
            } else if (idx === 2) {
              spanClasses = "sm:col-start-3 sm:col-end-4 flex justify-center sm:-mr-12 z-10";
            }

            return (
              <div
                key={idx}
                className={`
                  relative flex flex-col justify-center items-center min-h-[260px] p-6 text-white
                  ${spanClasses}
                  ${idx === 1 ? fondosOscuros[item.color_fondo] || fondosOscuros.azul : ""}
                  ${tieneImagen ? "grid grid-cols-2 items-end" : ""}
                `}
              >
                {item.imagen ? (
                  <Image
                    src={getStrapiMedia(item.imagen.url)}
                    alt={item.alt || "Imagen de cuadrícula desbordada simple"}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <ReactMarkdown
                    components={{
                      img: ({ src, alt }) => {
                        // Las imágenes laterales se renderizan con tamaño prominente para lograr el efecto desbordado
                        const containerClasses = "relative w-[220px] sm:w-[260px] h-[220px] sm:h-[260px] pointer-events-none block";

                        return (
                          <span className={containerClasses}>
                            <Image
                              src={src}
                              alt={alt || 'Imagen lateral'}
                              fill
                              sizes="(max-width: 1024px) 100vw, 400px"
                              className="object-contain drop-shadow-xl"
                              priority={false}
                            />
                          </span>
                        );
                      }
                    }}>
                    {item.contenido}
                  </ReactMarkdown>
                )}
              </div>
            );
          })}
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
        {
          contenido.map((item, idx) => {
            const tieneImagen = item.contenido && item.contenido.includes("![");
            const esAnchoDoble = tieneH6Markdown(item.contenido); // Verificamos si tiene h6

            return (
              <div
                key={idx}
                className={`
                  ${fondosOscuros[item.color_fondo] || fondosOscuros.azul} 
                  ${tieneImagen ? "grid grid-cols-2 items-end" : ""} 
                  ${esAnchoDoble ? "col-span-2 sm:col-span-2 bg-transparent" : "col-span-1"} 
                  min-h-[226px] text-white relative overflow-hidden flex flex-col justify-center items-start 
                  ${item.imagen ? "" : "p-4"}
                `}
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
                  <ReactMarkdown
                    components={{
                      img: ({ src, alt }) => {
                        const containerClasses = "relative sm:absolute right-0 w-full sm:w-[220px] sm:h-[200px] sm:bottom-0 pointer-events-none block";

                        return (
                          <span className={containerClasses}>
                            <Image
                              src={src}
                              alt={alt || 'Imagen del artículo'}
                              fill
                              sizes="(max-width: 1024px) 100vw, 500px"
                              className="object-contain object-top"
                              priority={false}
                            />
                          </span>
                        );
                      }
                    }}>
                    {item.contenido}
                  </ReactMarkdown>
                )}
              </div>
            )
          })}
      </div>
    </section>
  );
};

export default BlueGrid;

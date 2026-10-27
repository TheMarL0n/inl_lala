"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BlueButton,
  encabezado_h2,
  parrafo_normal,
} from "@/app/utils/CSS_clases";

// Función para limpiar acentos, mayúsculas y signos de puntuación
const normalizarTexto = (texto) => {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
    .replace(/[¿?.,!¡]/g, ""); // Elimina signos de interrogación y puntuación
};

const BuscadorMitos = ({ themes = [] }) => {
  const [criterio, setCriterio] = useState("");
  const [busquedaActiva, setBusquedaActiva] = useState(false);

  // Manejar el envío del formulario
  const handleSearch = (e) => {
    e.preventDefault();
    setBusquedaActiva(true);
  };

  // Filtrado inteligente por palabras clave
  const resultadosMitos =
    criterio.trim() === ""
      ? []
      : themes.filter((item) => {
          const textoMito = normalizarTexto(item.mito || "");
          const textoRealidad = normalizarTexto(item.realidad || "");

          // 1. Normalizamos la búsqueda y la separamos en palabras (tokens)
          const palabrasBusqueda = normalizarTexto(criterio)
            .split(/\s+/)
            .filter((palabra) => palabra.length > 2); // Ignoramos palabras muy cortas (ej: "de", "la", "da")

          if (palabrasBusqueda.length === 0) return false;

          // 2. Verificamos si al menos las palabras clave principales (como "leche" y "cancer") coinciden
          // Puedes usar .every() si quieres que todas coincidan, o .some() si con una basta.
          // Usar .some() permite que si buscan "cancer", encuentre el artículo.
          return palabrasBusqueda.some(
            (palabra) =>
              textoMito.includes(palabra) || textoRealidad.includes(palabra),
          );
        });

  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto pb-20 px-4 space-y-12">
        <div className="text-center flex flex-col items-center space-y-4">
          <h3 className={`${encabezado_h2} text-[#15428C]! text-[40px]! m-0!`}>
            ¿No encontraste la respuesta que buscabas?
          </h3>
          <p
            className={`${parrafo_normal} text-[#15428C] text-[40px]! leading-11.5!`}
          >
            Déjanos tu pregunta sobre nutrición y lácteos. Revisaremos las dudas
            más frecuentes para responder las dudas más frecuentes con
            información clara y basada en evidencia.
          </p>
        </div>

        {/* Formulario de Buscador */}
        <form
          onSubmit={handleSearch}
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 mx-auto`}
        >
          <input
            type="text"
            name="criteria"
            value={criterio}
            onChange={(e) => {
              setCriterio(e.target.value);
              if (e.target.value === "") setBusquedaActiva(false);
            }}
            placeholder="¿Qué estás buscando?"
            className="border-[#164190] bg-white/70 border-2 p-2 h-11.5 w-full sm:w-86.25 focus:outline-0 text-[#164190] text-[18px] font-bold placeholder:text-[#164190] placeholder:text-[18px] placeholder:italic placeholder:font-bold text-center sm:text-left"
          />
          <button type="submit" className={BlueButton}>
            Buscar
          </button>
        </form>

        {/* Resultados de la Búsqueda */}
        {busquedaActiva && (
          <div className="mt-10 space-y-6 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-[#15428C] border-b pb-2">
              Resultados de búsqueda ({resultadosMitos.length}):
            </h4>

            {resultadosMitos.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {resultadosMitos.map((item, idx) => {
                  // Determinamos la imagen (puede venir como 'imagen' o 'imagen_principal')
                  const imgUrl = item.imagen?.url || item.imagen_principal?.url;

                  return (
                    <div
                      key={idx}
                      className="border-b border-[#164190] py-8 gap-4 grid grid-cols-3 sm:grid-cols-4 items-center"
                    >
                      <div className="space-y-4 col-span-2 sm:col-span-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0B75B9]">
                          Mito y Realidad
                        </span>
                        <h5 className={`${parrafo_normal} font-bold text-[#15428C]`}>
                          {item.mito}
                        </h5>
                        <p className={`${parrafo_normal} text-[#164190]`}>
                          {item.realidad}
                        </p>
                      </div>

                      {/* Enlace para ir al detalle del mito */}
                      <Link
                        href={`/paginas/mitos-y-realidades/${item.slug}`}
                        className={`${BlueButton} whitespace-nowrap w-fit ml-auto`}
                      >
                        Ver más
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-[#15428C] text-lg italic">
                  No se encontraron resultados para "{criterio}". Intenta con
                  otra palabra clave.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BuscadorMitos;

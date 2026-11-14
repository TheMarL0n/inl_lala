"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const StoryLine = ({contenido}) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(() => {
    if (contenido.length === 0) return null;
    return contenido.length > 0 ? contenido[0].id : null;
  });

  const handleStoryClick = (id) => {
    setCategoriaSeleccionada(id);
    const elemento = document.getElementById("storyline_at_top");
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="storyline_at_top" className="py-10 px-4">
      <div
        className="relative max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-[repeat(var(--total-cols),minmax(0,1fr))]"
        style={{
          "--total-cols": contenido.length,
        }}
      >
        {contenido.map((item, idx) => {
          const isActive = categoriaSeleccionada === item.id;

          return (
            <div
              key={idx}
              onClick={() => handleStoryClick(item.id)}
              className="relative space-y-4 group cursor-pointer"
            >
              <div className="relative min-h-57 max-h-57 mx-2">
                <div
                  className={`bg-[#164190] sm:bg-white absolute z-2 h-full w-full object-cover left-0 top-0 duration-400 ${
                    isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"
                  }`}
                ></div>

                <div className="absolute z-1 top-0 left-0 object-cover w-full h-full bg-[#0B75B9] p-4 text-[24px] leading-[1.1]">
                  <ReactMarkdown>{item.contenido}</ReactMarkdown>
                </div>
              </div>
              <div className="absolute sm:relative top-4 sm:top-0 left-4 sm:left-0 z-3">
                <div className="hidden sm:block relative z-2 w-7 h-7 rounded-full bg-[#0B75B9] group-hover:bg-[#15428C] mx-auto border-2 border-[#15428C] duration-400"></div>
                <div className="hidden sm:block absolute border-dashed border-2 border-[#164190] w-full top-3"></div>
                <h3
                  className={`uppercase text-[18px]! leading-5 ${isActive ? "sm:text-[30px]!" : "sm:text-[24px]!" } sm:leading-7 font-bold! text-white sm:text-[#15428C]! sm:text-center ${isActive ? "opacity-0 sm:opacity-100" : "opacity-100 group-hover:opacity-0 sm:group-hover:opacity-100"}`}
                >
                  {item.titulo}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default StoryLine;

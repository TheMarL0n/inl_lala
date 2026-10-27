"use client";
import { useState } from "react";
import { encabezado_h2 } from "@/app/utils/CSS_clases";
import { ChevronDown } from "@/app/utils/SVG_Icons";
import ReactMarkdown from "react-markdown";

const Referencias = ({ contenido }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="seccion-referencias px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 cursor-pointer text-left focus:outline-none w-full group"
        >
          <h2
            className={`${encabezado_h2} text-[#15428C]! text-[24px]! m-0! capitalize!`}
          >
            Referencias:
          </h2>
          <ChevronDown
            className={`transition-transform duration-300 ${isOpen ? "" : "rotate-180"}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <ReactMarkdown>
                {contenido}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Referencias;

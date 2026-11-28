import { encabezado_h3 } from "@/app/utils/CSS_clases";
import SomosSwiper from "../Swipers/SomosSwiper";

const SeccionEspacios = ({ contenido }) => {
  if (!Array.isArray(contenido) || contenido.length === 0) {
    return null;
  }

  return (
    <div className="py-20">
      <div className="w-full sm:w-5xl mx-auto pb-20">
        <h2>
          <span
            className={`${encabezado_h3} text-white bg-[#164190] text-[46px]`}
          >
            Tres espacios
          </span>
          <br />
          <span
            className={`${encabezado_h3} ml-20 text-white bg-[#164190] text-[70px]!`}
          >
            de impacto
          </span>
        </h2>
      </div>

      <SomosSwiper contenido={contenido} tipo={"destacado"} />
      
    </div>
  );
};

export default SeccionEspacios;
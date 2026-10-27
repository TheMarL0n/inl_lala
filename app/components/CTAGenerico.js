import { BlueButton, parrafo_normal } from "../utils/CSS_clases";

const CTAGenerico = ({ array, parent }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {array.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-[#164190] py-8 gap-4 grid grid-cols-3 sm:grid-cols-4 items-center"
              >
                <div className="col-span-2 sm:col-span-3">
                  <h3>
                    <a
                      href={`/paginas/${parent}/${item.slug}`}
                      className={`${parrafo_normal} text-[#164190] font-bold`}
                    >
                      {item.titulo_linea_1} {item.titulo_linea_2}
                    </a>
                  </h3>
                  <p className={`${parrafo_normal} text-[#164190]`}>
                    {item.descripcion}
                  </p>
                </div>
                <a
                  href={`/paginas/${parent}/${item.slug}`}
                  className={`${BlueButton} w-fit ml-auto`}
                >
                  Ver más
                  <span className="sr-only">{item.descripcion}</span>
                </a>
              </div>
            ))
        }
    </div>
  );
};
export default CTAGenerico

import { encabezado_h3 } from "@/app/utils/CSS_clases";
import ReactMarkdown from "react-markdown";

const SeccionProposito = ({
  titulo_1,
  titulo_2,
  descripcion
}) => {

  // Función auxiliar para extraer el texto del primer H3
  const extraerH3Markdown = (markdownText) => {
    if (!markdownText) return "";
    const match = markdownText.match(/^###\s+(.+)$/m);
    return match ? match[1] : "";
  };

  // Función auxiliar para extraer el texto excluyendo el primer H2 (##) en el Markdown
  const extraerRestoDeMarkdown = (markdownText) => {
    if (!markdownText) return "";
    // Remueve todas las líneas que comiencen con 2 o 3 numerales en todo el texto
    const textoSinTitulos = markdownText.replace(/^#{2,3}\s+.+$/gm, "");
    return textoSinTitulos.trim();
  };

  return (
    <section
      className={`contenido_destacado-alternativo py-20`}
    >
      <div className="max-w-5xl mx-auto">
        {titulo_1 || titulo_2 ? (
          <h2>
            {titulo_1
              ?
              <>
                <span
                  className={`${encabezado_h3} text-white bg-[#164190] text-[46px]`}
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
                  className={`${encabezado_h3} ml-20 text-white bg-[#164190] text-[70px]!`}
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

      <div className={`max-w-5xl mx-auto relative grid grid-cols-1 items-center`}>
        <div className={`sm:col-span-2 px-8 py-16 space-y-8 flex flex-col justify-center`}
        >
          <h3 className="font-bold! text-[90px]! leading-22!">{extraerH3Markdown(descripcion)}</h3>
          <ReactMarkdown>{extraerRestoDeMarkdown(descripcion)}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};
export default SeccionProposito;

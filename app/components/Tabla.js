import ReactMarkdown from "react-markdown";

const Tabla = ({ primera_columna, segunda_columna, contenido }) => {
    return (
        <section className="seccion-tabla py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="grid-cols-1 sm:grid-cols-2 hidden sm:grid">
                    <div className="py-4">
                        <p className="uppercase text-[#15428C] text-[24px]">{primera_columna}</p>
                    </div>
                    <div className="py-4">
                        <p className="uppercase text-[#15428C] text-[24px]">{segunda_columna}</p>
                    </div>
                </div>
                {
                    contenido.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#15428C] items-center">
                            <div className="py-4 flex flex-col justify-center">
                                <p className="uppercase text-[#15428C] text-[24px] block sm:hidden pb-2">{primera_columna}</p>
                                <span className="text-[#15428C]">
                                    <ReactMarkdown>
                                        {item.contenido_primera_columna}
                                    </ReactMarkdown>
                                </span>
                            </div>
                            <div className="py-4 flex flex-col justify-center">
                                <p className="uppercase text-[#15428C] text-[24px] block sm:hidden pb-2">{segunda_columna}</p>
                                <span className="text-[#15428C]">
                                    <ReactMarkdown>
                                        {item.contenido_segunda_columna}
                                    </ReactMarkdown>
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
export default Tabla
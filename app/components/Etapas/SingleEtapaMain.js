import parse, { domToReact, Element } from 'html-react-parser';
import Image from 'next/image';

const SingleEtapaMain = ({ contenido }) => {

    const options = {
        replace: (domNode) => {
            // Verificamos si el nodo es una etiqueta img
            if (domNode instanceof Element && domNode.name === 'img') {
                const { src, alt } = domNode.attribs;

                return (
                    <div className="my-6 relative w-full h-100"> {/* Ajusta el contenedor según tu diseño */}
                        <Image
                            src={src}
                            alt={alt || 'Imagen del artículo'}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-cover rounded-lg"
                            priority={false}
                        />
                    </div>
                );
            }
        },
    };

    return (
        <section className="px-4 py-10">

            <div className="max-w-5xl mx-auto">
                {parse(contenido, options)}
            </div>

        </section>
    )
}
export default SingleEtapaMain
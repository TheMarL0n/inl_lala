import Image from "next/image"
import { parrafo_normal, stroke_text } from "@/app/utils/CSS_clases"
import { Comillas } from "@/app/utils/SVG_Icons"
import parse from 'html-react-parser';

const SingleMitoMain = ({ image, title, reality }) => {
    return (
        <section className="pb-20">
            <div className="relative overflow-hidden z-2 flex flex-col sm:flex-row w-full">
                <div className="w-full sm:w-1/2 flex flex-col items-end">
                    <div className="space-y-12 max-w-155 sm:bg-white p-8 sm:mt-10">
                        <span><Comillas className="rotate-180 sm:-mt-12 sm:-ml-12" /></span>
                        <h4 className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-[120px] sm:text-[130px] sm:leading-32 uppercase m-0`}>Mito</h4>
                        <h1 className="text-[#15428C] font-black text-[32px] leading-9 m-0">
                            {title}
                        </h1>
                        <h4 className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-[120px] sm:text-[130px] sm:leading-32 uppercase m-0`}>Realidad</h4>
                        <div className={`${parrafo_normal} text-[#15428C] m-0`}>{parse(reality)}</div>
                        <span><Comillas className="ml-auto block" /></span>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 relative overflow-hidden min-h-[300px] sm:min-h-[500px] max-h-129">
                    {/* Imagen optimizada con Next.js Image */}
                    {image && (
                        <Image 
                            src={image} 
                            alt={`Imagen sobre el mito: ${title || "y realidad"}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            priority
                            className="object-cover absolute bottom-0 left-0 w-full h-full" 
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default SingleMitoMain
import { parrafo_normal, stroke_text } from "@/app/utils/CSS_clases"
import { Comillas } from "@/app/utils/SVG_Icons"
import parse from 'html-react-parser';

const SingleMitoMain = ({ image, title, reality }) => {
    return (
        <section className="pb-20">
            <div className="relative overflow-hidden z-2 flex flex-col sm:flex-row w-full">
                <div className="w-full sm:w-1/2 flex flex-col items-end">
                    <div className="space-y-12  max-w-155 sm:bg-white p-8 sm:mt-10">
                        <span><Comillas className="rotate-180 sm:-mt-12 sm:-ml-12" /></span>
                        <h2 className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-[120px] sm:text-[130px] sm:leading-32 uppercase m-0`}>Mito</h2>
                        <h1 className="text-[#15428C] font-black text-[32px] leading-9 m-0">
                            {title}
                        </h1>
                        <h2 className={`${stroke_text} [-webkit-text-stroke-color:#15428C] text-[120px] sm:text-[130px] sm:leading-32 uppercase m-0`}>Realidad</h2>
                        <div className={`${parrafo_normal} text-[#15428C] m-0`}>{parse(reality)}</div>
                        <span><Comillas className="ml-auto block" /></span>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 relative overflow-hidden">
                    <img src={image} className="w-full object-cover absolute max-h-129 bottom-0 left-0" alt="Foto de mito o realidad" />
                </div>
            </div>
        </section>
    )
}
export default SingleMitoMain
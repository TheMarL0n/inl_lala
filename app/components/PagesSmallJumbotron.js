import { parrafo_normal } from "../utils/CSS_clases"

const PagesSmallJumbotron = ({ background }) => {
    return (
        <section className="relative">
            <div
                style={{ backgroundImage: `url(${background})` }}
                className={`relative h-screen min-h-150 max-h-117 bg-no-repeat bg-cover bg-center flex flex-col sm:justify-center`}>
            </div>
            <div className="page_descripcion max-w-7xl mx-4 sm:mx-auto bg-white -mt-10 sm:-mt-30 p-4 sm:p-10 relative z-2 sm:min-h-37.5">
                <a href="/pages/mitos-y-realidades" className={`${parrafo_normal} text-[#164190] uppercase`}>Más ciencia. Menos mitos.</a>
            </div>
        </section>
    )
}
export default PagesSmallJumbotron
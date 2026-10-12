import { parrafo_normal } from "../utils/CSS_clases"

const Breadcrumbs = ({ title, parent, url }) => {
    return (
        <div className="page_descripcion max-w-7xl mx-4 sm:mx-auto bg-white -mt-10 sm:-mt-30 p-4 sm:p-10 relative z-2 sm:min-h-37.5">
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    <li>
                        <a href="/" className={`${parrafo_normal} text-[#164190] uppercase`}>
                            Inicio
                        </a>
                    </li>
                    <li><span className={`${parrafo_normal} text-[#164190] uppercase`}>|</span></li>
                    <li>
                        <a href={url} className={`${parrafo_normal} text-[#164190] uppercase`}>
                            {parent}
                        </a>
                    </li>
                    <li><span className={`${parrafo_normal} text-[#164190] uppercase`}>|</span></li>
                    <li>
                        <span className={`${parrafo_normal} text-[#164190] uppercase`} title={title}>
                            {title}
                        </span>
                    </li>
                </ol>
            </nav>
        </div>
    )
}
export default Breadcrumbs
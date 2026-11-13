import { parrafo_normal } from "../utils/CSS_clases"
import CustomLink from "./Auxiliares/CustomLinks"

const Breadcrumbs = ({ title, parent, url }) => {
    return (
        <div className="page_descripcion max-w-7xl mx-4 sm:mx-auto bg-white -mt-10 sm:-mt-15 py-4 px-6 relative z-2 sm:min-h-37.5">
            <nav aria-label="Breadcrumb">
                <ol className="flex flex-col sm:flex-row sm:items-center space-x-2">
                    <li>
                        <CustomLink href="/" className={`${parrafo_normal} text-[16px]! text-[#164190] uppercase`}>
                            Inicio
                        </CustomLink>
                    </li>
                    <li><span className={`${parrafo_normal} text-[16px]! text-[#164190] hidden sm:block`}>|</span></li>
                    <li>
                        <CustomLink href={url} className={`${parrafo_normal} text-[16px]! text-[#164190] uppercase`}>
                            {parent}
                        </CustomLink>
                    </li>
                    <li><span className={`${parrafo_normal} text-[16px]! text-[#164190] hidden sm:block`}>|</span></li>
                    <li>
                        <span className={`${parrafo_normal} text-[16px]! text-[#164190] uppercase`} title={title}>
                            {title}
                        </span>
                    </li>
                </ol>
            </nav>
        </div>
    )
}
export default Breadcrumbs
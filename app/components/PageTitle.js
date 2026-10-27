import { encabezado_h3 } from "@/app/utils/CSS_clases"

const PageTitle = ({title_linea_1, title_linea_2}) => {
    return (
        <div className="max-w-7xl px-4 sm:px-0 mx-auto mt-20 mb-10">
            {
                title_linea_1 || title_linea_2 ?
                    <h1 className="block">
                        <span className={`${encabezado_h3} bg-[#0B75B9] block sm:text-[46px]! sm:leading-10!`}>{title_linea_1}</span>
                        <span className={`${encabezado_h3} bg-[#164190] sm:ml-26 sm:text-[70px]! sm:leading-21!`}>{title_linea_2}</span>
                    </h1>
                    :
                    ""
            }

        </div>
    )
}
export default PageTitle
'use client'
import { useState } from "react"
import { BlueButton } from "../utils/CSS_clases"

const SearchForm = () => {
    const [showOnMobile, setShowOnMobile] = useState(false);

    const handleShow =()=>{
        setShowOnMobile(prev => !prev)
    }

    return (
        <div>
            <form className={`${showOnMobile ? "flex absolute left-0 top-20 w-full px-6" : "sm:flex hidden" } items-center gap-6`}>
                <input type="text" name="criteria" placeholder="¿Qué estás buscando?" className="border-[#164190] bg-white/70 border py-2 px-4 h-11.5 w-full sm:w-86.25 focus:outline-0 text-[#164190] text-[18px] font-[500] placeholder:text-[#164190] placeholder:text-[18px] placeholder:italic placeholder:font-[500]" />
                <button className={BlueButton}>Buscar</button>
            </form>
            <button onClick={handleShow} className={`sm:hidden block ${BlueButton}`}>Buscar</button>
        </div>
    )
}
export default SearchForm
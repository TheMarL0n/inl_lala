'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BlueButton } from "../utils/CSS_clases"

const SearchForm = () => {
    const [showOnMobile, setShowOnMobile] = useState(false);
    const [criteria, setCriteria] = useState("");
    const router = useRouter();

    const handleShow = () => {
        setShowOnMobile(prev => !prev)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        
        // Limpiamos espacios en blanco extra y validamos que no esté vacío
        const trimmedCriteria = criteria.trim();
        if (!trimmedCriteria) return;

        // Codificamos la oración/palabras clave para que la URL sea segura
        const encodedCriteria = encodeURIComponent(trimmedCriteria);

        // Redirigimos a la página de resultados pasando el criterio como parámetro de búsqueda (Query Param)
        router.push(`/buscar?criteria=${encodedCriteria}`);

        // Opcional: Cerrar el input en mobile tras buscar
        setShowOnMobile(false);
    }

    return (
        <div>
            <form 
                onSubmit={handleSearch}
                className={`${showOnMobile ? "flex absolute left-0 top-20 w-full px-6 bg-white/90 backdrop-blur-md py-4 shadow-md" : "sm:flex hidden" } items-center gap-6`}
            >
                <input 
                    type="text" 
                    name="criteria" 
                    value={criteria}
                    onChange={(e) => setCriteria(e.target.value)}
                    placeholder="¿Qué estás buscando?" 
                    className="border-[#164190] bg-white/70 border py-2 px-4 h-11.5 w-full sm:w-86.25 focus:outline-0 text-[#164190] text-[18px] font-[500] placeholder:text-[#164190] placeholder:text-[18px] placeholder:italic placeholder:font-[500]" 
                />
                <button type="submit" className={BlueButton}>Buscar</button>
            </form>
            <button type="button" onClick={handleShow} className={`sm:hidden block ${BlueButton}`}>Buscar</button>
        </div>
    )
}
export default SearchForm
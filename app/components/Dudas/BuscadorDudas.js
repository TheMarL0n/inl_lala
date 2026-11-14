'use client'
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BlueButton } from "@/app/utils/CSS_clases";

const BuscadorDudas = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Mantenemos el estado sincronizado con la URL
    const [criteria, setCriteria] = useState(searchParams.get("criteria") || "");

    // Actualiza el input si los parámetros de la URL cambian externamente
    useEffect(() => {
        setCriteria(searchParams.get("criteria") || "");
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        
        if (criteria.trim()) {
            params.set("criteria", criteria.trim());
        } else {
            params.delete("criteria");
        }
        
        router.push(`?${params.toString()}`, { scroll: false });
    };

    // Función para limpiar la búsqueda y remover el parámetro de la URL
    const handleClear = () => {
        setCriteria("");
        const params = new URLSearchParams(searchParams);
        params.delete("criteria");
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 px-4">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center justify-center gap-6 mx-auto">
                <div className="relative w-full sm:w-[620px]">
                    <input 
                        type="text" 
                        name="criteria" 
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                        placeholder="¿Qué estás buscando?" 
                        className="border-[#164190] bg-white/70 border p-3 w-full focus:outline-0 text-[#164190] text-[28px] font-medium placeholder:text-[#164190] placeholder:text-[28px] placeholder:italic placeholder:font-medium text-center sm:text-left pr-12" 
                    />
                    
                    {/* Botón "X" para limpiar que aparece solo si hay texto escrito */}
                    {criteria && (
                        <button 
                            type="button" 
                            onClick={handleClear}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#164190] text-2xl font-bold transition-colors"
                            title="Limpiar búsqueda"
                        >
                            &times;
                        </button>
                    )}
                </div>
                
                <button type="submit" className={`${BlueButton} py-5 px-12 h-auto`}>
                    Buscar
                </button>
            </form>
        </div>
    );
};

export default BuscadorDudas;
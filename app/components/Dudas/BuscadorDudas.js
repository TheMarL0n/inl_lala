'use client'
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BlueButton } from "@/app/utils/CSS_clases";

const BuscadorDudas = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlCriteria = searchParams.get("criteria") || "";

    const [criteria, setCriteria] = useState(urlCriteria);
    const [prevUrlCriteria, setPrevUrlCriteria] = useState(urlCriteria);

    // Sincroniza el input si el parámetro de la URL cambia externamente
    if (urlCriteria !== prevUrlCriteria) {
        setPrevUrlCriteria(urlCriteria);
        setCriteria(urlCriteria);
    }

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
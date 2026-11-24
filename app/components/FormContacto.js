"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { BlueButton, encabezado_h3 } from "../utils/CSS_clases";
import { sendContacto } from "@/app/utils/actions"; // Ajusta al nombre/ruta de tu Server Action

const initialState = {
    success: "",
    timestamp: null,
    errors: {
        nombre: "",
        apellido: "",
        telefono: "",
        empresa: "",
    },
};

const FormContacto = ({ imagen_footer }) => {
    const [state, formAction] = useActionState(sendContacto, initialState);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        empresa: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (state?.success) {
            setFormData({
                nombre: "",
                apellido: "",
                telefono: "",
                empresa: "",
            });
        }
    }, [state?.success, state?.timestamp]);

    const getError = (field) => {
        const err = state?.errors?.[field];
        if (!err) return "";
        return Array.isArray(err) ? err[0] : err;
    };

    // Si la URL viene de Strapi y no empieza con http, le agregamos el host
    const getStrapiMedia = (url) => {
        if (!url) return null;
        if (url.startsWith("http") || url.startsWith("//")) {
            return url;
        }
        const host = process.env.NEXT_PUBLIC_STRAPI_HOST || "";
        return `${host}${url}`;
    };

    const mediaSrc = imagen_footer?.url ? getStrapiMedia(imagen_footer.url) : null;

    return (
        <section className="relative min-h-screen flex flex-col sm:justify-center py-20 px-4 overflow-hidden">
            {/* Imagen de fondo optimizada con Next.js Image */}
            {mediaSrc && (
                <Image
                    src={mediaSrc}
                    alt="Imagen de fondo de contacto"
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover object-center absolute inset-0 -z-10"
                />
            )}

            <div className="max-w-7xl sm:w-7xl mx-auto w-full relative z-10">
                <h2 className={`${encabezado_h3} bg-[#164190] sm:text-[70px]! sm:leading-18!`}>Contacto</h2>
                <form action={formAction} noValidate className="w-full mt-20 sm:w-1/2 sm:ml-auto space-y-6 bg-[#164190]/90 py-12 px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                maxLength={100}
                                autoComplete="given-name"
                                placeholder="Nombre"
                                className="border-b border-b-white placeholder:text-white text-[30px] text-[#164190] bg-transparent outline-none"
                            />
                            {getError("nombre") && (
                                <p className="text-red-300 text-sm mt-1">{getError("nombre")}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                maxLength={100}
                                autoComplete="family-name"
                                placeholder="Apellido"
                                className="border-b border-b-white placeholder:text-white text-[30px] text-[#164190] bg-transparent outline-none"
                            />
                            {getError("apellido") && (
                                <p className="text-red-300 text-sm mt-1">{getError("apellido")}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                maxLength={25}
                                autoComplete="tel"
                                placeholder="Teléfono"
                                className="border-b border-b-white placeholder:text-white text-[30px] text-[#164190] bg-transparent outline-none"
                            />
                            {getError("telefono") && (
                                <p className="text-red-300 text-sm mt-1">{getError("telefono")}</p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <input
                                type="text"
                                id="empresa"
                                name="empresa"
                                value={formData.empresa}
                                onChange={handleChange}
                                maxLength={150}
                                autoComplete="organization"
                                placeholder="Empresa"
                                className="border-b border-b-white placeholder:text-white text-[30px] text-[#164190] bg-transparent outline-none"
                            />
                            {getError("empresa") && (
                                <p className="text-red-300 text-sm mt-1">{getError("empresa")}</p>
                            )}
                        </div>
                    </div>

                    <SubmitButton />

                    {state?.success && (
                        <p className="text-green-200 text-sm font-medium">{state.success}</p>
                    )}
                </form>
            </div>
        </section>
    );
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className={`${BlueButton} ml-auto cursor-pointer bg-[#FF0000]! disabled:opacity-50`}
        >
            {pending ? "ENVIANDO..." : "ENVIAR"}
        </button>
    );
}

export default FormContacto;
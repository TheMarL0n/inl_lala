"use server";

import { z } from "zod";

const contactoSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(2, "El nombre es obligatorio")
        .max(100, "Máximo 100 caracteres"),
    apellido: z
        .string()
        .trim()
        .min(2, "El apellido es obligatorio")
        .max(100, "Máximo 100 caracteres"),
    telefono: z
        .string()
        .trim()
        .min(7, "Ingresa un teléfono válido")
        .max(25, "Máximo 25 caracteres")
        .regex(/^[+\d\s()-]+$/, "Formato de teléfono no válido"),
    empresa: z
        .string()
        .trim()
        .min(2, "La empresa es obligatoria")
        .max(150, "Máximo 150 caracteres"),
});

export async function sendContacto(prevState, formData) {
    const rawData = {
        nombre: String(formData.get("nombre") ?? ""),
        apellido: String(formData.get("apellido") ?? ""),
        telefono: String(formData.get("telefono") ?? ""),
        empresa: String(formData.get("empresa") ?? ""),
    };

    const parsed = contactoSchema.safeParse(rawData);

    if (!parsed.success) {
        return {
            success: "",
            timestamp: Date.now(),
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/sendContacto`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...parsed.data,
                tipo: "contacto",
            }),
            cache: "no-store",
        });

        if (!res.ok) {
            return {
                success: "",
                timestamp: Date.now(),
                errors: {
                    nombre: "",
                    apellido: "",
                    telefono: "",
                    empresa: "No se pudo enviar tu solicitud. Intenta de nuevo.",
                },
            };
        }

        return {
            success: "Mensaje enviado correctamente.",
            timestamp: Date.now(),
            errors: {
                nombre: "",
                apellido: "",
                telefono: "",
                empresa: "",
            },
        };
    } catch {
        return {
            success: "",
            timestamp: Date.now(),
            errors: {
                nombre: "",
                apellido: "",
                telefono: "",
                empresa: "Ocurrió un error de conexión al enviar.",
            },
        };
    }
}
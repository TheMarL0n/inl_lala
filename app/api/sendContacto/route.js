import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactoPayloadSchema = z.object({
    nombre: z.string().trim().min(2).max(100),
    apellido: z.string().trim().min(2).max(100),
    telefono: z.string().trim().min(7).max(25).regex(/^[+\d\s()-]+$/),
    empresa: z.string().trim().min(2).max(150),
    tipo: z.string().trim().max(50).optional(),
});

function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function stripLineBreaks(value = "") {
    return String(value).replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request) {
    try {
        const host = process.env.SMTP_HOST;
        const port = Number(process.env.SMTP_PORT || 587);
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        const fromEmail = process.env.SMTP_FROM_EMAIL || user;
        const toEmail = process.env.CONTACTO_TO_EMAIL || fromEmail;

        if (!host || !user || !pass || !fromEmail || !toEmail) {
            console.error("Faltan variables de entorno SMTP o de correo destino.");
            return NextResponse.json(
                { error: "Configuración de correo incompleta en el servidor." },
                { status: 500 }
            );
        }

        const rawBody = await request.text();
        if (rawBody.length > 10_000) {
            return NextResponse.json(
                { error: "Solicitud demasiado grande." },
                { status: 413 }
            );
        }

        let jsonBody;
        try {
            jsonBody = JSON.parse(rawBody);
        } catch {
            return NextResponse.json(
                { error: "Formato JSON inválido." },
                { status: 400 }
            );
        }

        const parsed = contactoPayloadSchema.safeParse(jsonBody);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Datos de contacto inválidos.", details: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { nombre, apellido, telefono, empresa, tipo } = parsed.data;

        const safeNombre = escapeHtml(nombre);
        const safeApellido = escapeHtml(apellido);
        const safeTelefono = escapeHtml(telefono);
        const safeEmpresa = escapeHtml(empresa);
        const safeTipo = escapeHtml(tipo || "contacto");
        const safeSubjectEmpresa = stripLineBreaks(empresa);

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            requireTLS: port !== 465,
            connectionTimeout: 10_000,
            greetingTimeout: 10_000,
            auth: {
                user,
                pass,
            },
        });

        await transporter.sendMail({
            from: fromEmail,
            to: toEmail,
            subject: `Nuevo contacto web (${safeSubjectEmpresa})`,
            text: [
                `Tipo: ${tipo || "contacto"}`,
                `Nombre: ${nombre} ${apellido}`,
                `Teléfono: ${telefono}`,
                `Empresa: ${empresa}`,
            ].join("\n"),
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
                    <h2>Nuevo mensaje de contacto</h2>
                    <p><strong>Origen:</strong> ${safeTipo}</p>
                    <p><strong>Nombre:</strong> ${safeNombre} ${safeApellido}</p>
                    <p><strong>Teléfono:</strong> ${safeTelefono}</p>
                    <p><strong>Empresa:</strong> ${safeEmpresa}</p>
                </div>
            `,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        console.error("Error enviando correo en /api/sendContacto:", error);
        return NextResponse.json(
            { error: "No fue posible procesar el envío." },
            { status: 500 }
        );
    }
}
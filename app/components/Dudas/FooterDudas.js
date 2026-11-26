"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getStrapiMedia } from "@/app/lib/strapi-media";
import Image from "next/image";

const FooterDudas = ({ imagen_footer }) => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    // Soporta tanto respuesta plana (Strapi v5) como anidada (Strapi v4)
    const mediaUrl =
        imagen_footer?.url ?? imagen_footer?.data?.attributes?.url ?? null;

    return (
        <section
            ref={containerRef}
            className="relative h-screen min-h-150 max-h-225 flex flex-col sm:justify-center overflow-hidden"
        >
            {mediaUrl && (
                <motion.div
                    style={{ y }}
                    className="absolute inset-x-0 -top-[15%] h-[130%] w-full z-0 pointer-events-none"
                >
                    <Image
                        src={getStrapiMedia(mediaUrl)}
                        alt="Imagen de fondo del footer"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                </motion.div>
            )}

            <div className="relative z-10 w-full h-full flex flex-col justify-center">
                {/* Contenido del footer */}
            </div>
        </section>
    );
};

export default FooterDudas;
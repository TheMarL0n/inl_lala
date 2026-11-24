"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BlueButton, encabezado_h3 } from "../utils/CSS_clases";
import { sendContacto } from "@/app/utils/actions"; // Ajusta al nombre/ruta de tu Server Action

const easeSmooth = [0.22, 1, 0.36, 1];

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeSmooth },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeSmooth,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeSmooth },
  },
};

const feedbackVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: easeSmooth },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.2 },
  },
};

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
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

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
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col sm:justify-center py-20 px-4 overflow-hidden"
    >
      {/* Imagen de fondo con efecto parallax */}
      {mediaSrc && (
        <motion.div
          style={{ y: yParallax, scale: 1.12 }}
          className="absolute inset-0 -z-10 w-full h-full will-change-transform"
        >
          <Image
            src={mediaSrc}
            alt="Imagen de fondo de contacto"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center w-full h-full"
          />
        </motion.div>
      )}

      <div className="max-w-7xl sm:w-7xl mx-auto w-full relative z-10">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`${encabezado_h3} bg-[#164190] sm:text-[70px]! sm:leading-18!`}
        >
          Contacto
        </motion.h2>

        <motion.form
          action={formAction}
          noValidate
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full mt-20 sm:w-1/2 sm:ml-auto space-y-6 bg-[#164190]/90 py-12 px-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div variants={fieldVariants} className="flex flex-col">
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
              <AnimatePresence mode="wait">
                {getError("nombre") && (
                  <motion.p
                    key="err-nombre"
                    variants={feedbackVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-red-300 text-sm mt-1"
                  >
                    {getError("nombre")}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fieldVariants} className="flex flex-col">
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
              <AnimatePresence mode="wait">
                {getError("apellido") && (
                  <motion.p
                    key="err-apellido"
                    variants={feedbackVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-red-300 text-sm mt-1"
                  >
                    {getError("apellido")}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fieldVariants} className="flex flex-col">
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
              <AnimatePresence mode="wait">
                {getError("telefono") && (
                  <motion.p
                    key="err-telefono"
                    variants={feedbackVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-red-300 text-sm mt-1"
                  >
                    {getError("telefono")}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={fieldVariants} className="flex flex-col">
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
              <AnimatePresence mode="wait">
                {getError("empresa") && (
                  <motion.p
                    key="err-empresa"
                    variants={feedbackVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-red-300 text-sm mt-1"
                  >
                    {getError("empresa")}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div variants={fieldVariants} className="w-fit ml-auto">
            <SubmitButton />
          </motion.div>

          <AnimatePresence mode="wait">
            {state?.success && (
              <motion.p
                key={state.timestamp || "success-msg"}
                variants={feedbackVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-green-200 text-sm font-medium"
              >
                {state.success}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={pending ? undefined : { scale: 1.03 }}
      whileTap={pending ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`${BlueButton} cursor-pointer bg-[#FF0000]! disabled:opacity-50`}
    >
      {pending ? "ENVIANDO..." : "ENVIAR"}
    </motion.button>
  );
}

export default FormContacto;
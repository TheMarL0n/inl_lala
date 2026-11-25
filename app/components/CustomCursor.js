"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorVariant, setCursorVariant] = useState("default");
    const [cursorText, setCursorText] = useState("");

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 480, mass: 0.35 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
    const mediaQueryReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyReducedMotionState = () => {
        if (mediaQueryReduced.matches) {
            document.body.classList.remove("has-custom-cursor");
        }
    };

    applyReducedMotionState();

    const handleChange = () => {
        if (mediaQueryReduced.matches) {
            document.body.classList.remove("has-custom-cursor");
            setIsVisible(false);
        }
    };

    const disableForTouch = () => {
        document.body.classList.remove("has-custom-cursor");
        setIsVisible(false);
    };

    const handleMouseMove = (e) => {
        if (mediaQueryReduced.matches) return;

        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        const target = e.target instanceof Element ? e.target : null;

        // En campos de texto dejamos el cursor nativo
        const isTextField = target?.closest(
            "input, textarea, select, [contenteditable='true']"
        );
        if (isTextField) {
            document.body.classList.remove("has-custom-cursor");
            setIsVisible(false);
            return;
        }

        document.body.classList.add("has-custom-cursor");
        setIsVisible(true);

        const customLabelEl = target?.closest("[data-cursor]");
        const interactiveEl = target?.closest(
            "a, button, [role='button'], [data-cursor-hover]"
        );

        if (customLabelEl) {
            setCursorText(customLabelEl.getAttribute("data-cursor") || "");
            setCursorVariant("pointer");
        } else if (interactiveEl) {
            setCursorText("");
            setCursorVariant("pointer");
        } else {
            setCursorText("");
            setCursorVariant("default");
        }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => {
        if (!mediaQueryReduced.matches) {
            setIsVisible(true);
        }
    };

    mediaQueryReduced.addEventListener("change", handleChange);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", disableForTouch, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
        document.body.classList.remove("has-custom-cursor");
        mediaQueryReduced.removeEventListener("change", handleChange);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchstart", disableForTouch);
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("mouseenter", handleMouseEnter);
    };
}, [mouseX, mouseY]);

    if (!isVisible) return null;

    const isPointer = cursorVariant === "pointer";
    const size = cursorText ? 68 : isPointer ? 40 : 28;

    return (
        <motion.div
            aria-hidden="true"
            suppressHydrationWarning
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 99999,
                pointerEvents: "none",
            }}
            animate={{
                width: size,
                height: size,
                opacity: 1,
            }}
            transition={{
                width: { type: "spring", stiffness: 380, damping: 28 },
                height: { type: "spring", stiffness: 380, damping: 28 },
                opacity: { duration: 0.12 },
            }}
            className="flex items-center justify-center rounded-full border-2 border-[#15428C] bg-white/95 shadow-[0_0_0_1px_rgba(255,255,255,0.95),0_2px_8px_rgba(0,0,0,0.28)] will-change-transform"
        >
            {cursorText ? (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#15428C] select-none px-1 text-center leading-tight">
                    {cursorText}
                </span>
            ) : (
                <motion.span
                    animate={{
                        scale: isPointer ? 1.15 : 1,
                        rotate: isPointer ? [0, -6, 6, 0] : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center justify-center leading-none"
                >
                    <svg
                        viewBox="0 0 29 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-all duration-150 ${
                            isPointer ? "w-5 h-5" : "w-3.5 h-4"
                        }`}
                    >
                        <path d="M24.0554 25.1602C20.0599 30.6107 16.5209 30.3928 13.186 29.9016C11.2564 29.6125 9.38679 29.2401 7.5332 29.8105C9.71908 26.0871 12.4694 25.5128 15.3239 25.5999C16.0165 25.6157 16.7131 25.6752 17.4097 25.7346C17.4137 25.7346 17.4137 25.7385 17.4137 25.7385C17.79 25.7702 18.1583 25.8019 18.5306 25.8296H18.5346C20.4563 25.9841 22.3459 26.0079 24.0554 25.1562" fill="#009638" />
                        <path d="M27.8757 7.70379C27.7196 7.56911 27.5314 7.48989 27.3313 7.4582C27.1952 7.43047 27.051 7.43047 26.8949 7.44632C25.4336 7.6008 23.2598 9.39517 21.4783 10.7023C20.7296 11.2529 20.049 11.7203 19.5206 11.9421C19.0402 12.1442 18.4797 11.9857 18.1914 11.55C17.7831 10.9281 17.1546 10.0052 16.4019 8.97926C15.8054 8.16724 15.1328 7.29976 14.4242 6.46793C12.8789 4.64187 10.8171 2.82373 8.71531 1.57599C6.32126 0.161879 3.86315 -0.503581 2.00957 0.439157C1.30897 0.791694 0.820551 1.2591 0.500277 1.81365C0.340139 2.09093 0.224034 2.38405 0.143965 2.70094C0.0638968 3.02179 0.0158532 3.35056 0.00384291 3.69517C-0.032188 4.6894 0.188003 5.80247 0.544309 6.94326C1.18085 8.96737 2.23776 11.0786 3.01042 12.7819C3.09049 12.9522 3.16256 13.1146 3.23062 13.2731C3.26265 13.3404 3.28666 13.4038 3.31469 13.4672C3.683 14.3346 3.94323 15.0635 3.96725 15.5626C3.97526 15.6537 3.97125 15.7369 3.96324 15.8161C3.63096 18.2482 -0.912941 21.3537 1.56919 24.9028C2.95437 26.8794 6.34128 25.8297 9.73219 24.8236C12.1903 24.0948 14.6484 23.3897 16.3459 23.8809C16.7182 23.9878 17.0465 24.1502 17.3347 24.3839C17.4628 24.4909 17.5829 24.5741 17.691 24.6335H17.695C17.8591 24.7246 18.0113 24.7681 18.1714 24.7563C18.2515 24.7523 18.3356 24.7325 18.4236 24.6968H18.4276C18.5598 24.6454 18.6999 24.5582 18.86 24.4394C18.9481 24.3681 19.0442 24.2928 19.1443 24.2017C19.5286 23.865 19.9289 23.457 20.3453 22.9936C21.5103 21.6983 22.7553 19.9554 23.9043 18.1214C25.0613 16.2637 26.1222 14.303 26.8909 12.5759C26.979 12.3739 27.063 12.1719 27.1471 11.9818C27.5555 11.0073 27.8557 10.1319 28.0079 9.42686C28.196 8.57523 28.168 7.96126 27.8757 7.70379ZM0.528304 3.54861C0.588355 1.47696 3.15055 -1.12151 8.29496 1.85722C8.5792 2.01963 8.87545 2.2058 9.17571 2.40386C9.34385 2.51873 9.512 2.62964 9.68014 2.75639C9.85229 2.87919 10.0244 3.00198 10.2006 3.13269C10.4608 3.33471 10.729 3.54465 11.0053 3.77043C10.8051 3.63179 10.5809 3.47731 10.3287 3.3149C10.2526 3.26341 10.1726 3.21192 10.0925 3.16042C9.73219 2.93464 9.32784 2.69697 8.89947 2.46723C8.75935 2.39197 8.61923 2.31671 8.4671 2.24541C8.32298 2.17015 8.17084 2.10281 8.02272 2.03151C5.42049 0.839226 2.16571 0.256946 0.528304 3.54465M17.691 22.7361C17.691 22.7361 17.679 22.7638 17.679 22.7836C17.655 22.8708 17.6189 22.946 17.5509 22.9896C17.4388 23.0728 17.2506 23.0728 17.0224 22.9659C17.0144 22.9619 16.9984 22.9579 16.9904 22.954C16.1377 22.5697 15.2129 22.4271 14.2761 22.4153C13.6435 22.4153 12.999 22.4747 12.3624 22.5737C12.1743 22.6014 11.9821 22.6331 11.798 22.6648C11.5417 22.7123 11.2895 22.7599 11.0373 22.8153C10.9733 22.8312 10.9052 22.8431 10.8411 22.8589C9.82026 23.0807 8.84743 23.3303 7.98269 23.4808C7.93865 23.4887 7.89461 23.4966 7.85057 23.5046C6.58148 23.7145 5.56862 23.6868 5.02415 22.9817C4.91205 22.8391 4.82398 22.6688 4.75593 22.4628C3.41878 18.5611 13.6916 14.6476 17.5269 22.0746C17.5469 22.1142 17.5669 22.1538 17.5829 22.1895C17.6149 22.2608 17.635 22.3242 17.651 22.3836C17.675 22.443 17.683 22.5024 17.691 22.5499C17.699 22.6212 17.699 22.6886 17.691 22.744M17.8071 20.4387C15.8815 17.2064 11.2295 15.1784 8.36301 13.7246C7.59035 13.3285 6.91377 12.8492 6.33727 12.3145C6.23319 12.2155 6.1291 12.1204 6.03302 12.0214C5.94495 11.9303 5.85686 11.8352 5.7768 11.7401C5.4285 11.348 5.12824 10.936 4.89204 10.5241C4.848 10.4607 4.81197 10.3934 4.77995 10.3339C4.77594 10.33 4.77193 10.3221 4.77193 10.3141C4.74791 10.2706 4.7239 10.227 4.70388 10.1795C4.66785 10.1121 4.63181 10.0488 4.60779 9.97745C4.55174 9.87446 4.50371 9.76355 4.46768 9.66056C4.42364 9.54965 4.3836 9.44271 4.34757 9.33972C4.17142 8.79705 4.09135 8.27023 4.11537 7.77509C4.12338 7.54931 4.15941 7.33144 4.21145 7.12151C4.22346 7.0819 4.23547 7.04229 4.24748 7.00268C4.33155 6.72936 4.45967 6.47981 4.62381 6.25007C4.66784 6.19065 4.71589 6.1352 4.76794 6.07578H4.77193C5.88489 4.85973 8.18686 5.1172 10.6009 6.59469C10.7851 6.70956 10.9733 6.83235 11.1614 6.95514C11.3256 7.07001 11.4897 7.18489 11.6538 7.31164C11.798 7.41859 11.9501 7.53346 12.0942 7.65229C12.2543 7.78301 12.4145 7.91769 12.5706 8.05632C12.7268 8.191 12.8829 8.3336 13.035 8.48412C13.039 8.48412 13.039 8.48808 13.043 8.49205C13.1511 8.59503 13.2512 8.69406 13.3513 8.79704C13.4073 8.84854 13.4594 8.90796 13.5114 8.95945C13.5715 9.01887 13.6355 9.08224 13.6876 9.14562C13.8437 9.30803 13.9878 9.47043 14.132 9.6368C15.6453 11.3718 16.9824 13.5939 17.8311 16.2201C17.9272 16.5251 18.0193 16.8341 18.1034 17.151C18.2755 17.7808 18.4156 18.4383 18.5237 19.1117C18.5798 19.4484 18.6278 19.793 18.6638 20.1416C18.7799 21.215 18.3236 21.3022 17.8031 20.4308" fill="#EA0029" />
                    </svg>
                </motion.span>
            )}
        </motion.div>
    );
}
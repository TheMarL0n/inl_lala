'use client'

import { useState, useEffect } from 'react'
import { menuI_tems } from '../utils/Copies'
import {
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { MenuBarIcon } from '../utils/SVG_Icons'
import SearchForm from './SearchForm'
import { motion, AnimatePresence } from 'framer-motion'
import CustomLink from './Auxiliares/CustomLinks'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isAtTop, setIsAtTop] = useState(true)

    // Efecto para bloquear/desbloquear el scroll del body cuando el menú esté abierto
    useEffect(() => {        
        // Limpieza por si el componente se desamonta con el menú abierto
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [mobileMenuOpen])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsAtTop(currentScrollY === 0)

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShowNavbar(false)
            } else {
                setShowNavbar(true)
            }
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <header
            className={`fixed z-40 w-full transition-all duration-300 ${
                showNavbar ? 'translate-y-0' : '-translate-y-full'
            } ${
                isAtTop
                    ? 'bg-transparent shadow-none'
                    : 'bg-white/70 backdrop-blur-md shadow-sm'
            }`}
        >
            <nav 
                aria-label="Global" 
                className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 px-6 lg:px-8 ${
                    isAtTop ? 'py-6' : 'py-3'
                }`}
            >
                <div className="flex lg:flex-1">
                    <CustomLink href="/" className="ml-3 p-1.5">
                        <span className="sr-only">INL Lala</span>
                        <img
                            alt="logo"
                            src="/logo.svg"
                            className={`w-auto transition-all duration-300 ${
                                isAtTop ? 'h-11.5 sm:h-20' : 'h-8 sm:h-12'
                            }`}
                        />
                    </CustomLink>
                </div>
                <div className="flex items-center gap-8 sm:gap-16">
                    <SearchForm />
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 cursor-pointer"
                    >
                        <span className="sr-only">Open main menu</span>
                        <MenuBarIcon className="w-auto h-full!" />
                    </button>
                </div>
            </nav>

            {/* Menú móvil controlado con Framer Motion */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        {/* Backdrop animado que cubre toda la pantalla */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 w-full h-full bg-black/40 backdrop-blur-xs"
                            aria-hidden="true"
                        />

                        {/* Contenedor principal abarcando absolutamente todo el alto */}
                        <div className="fixed inset-0 w-full h-full flex justify-end pointer-events-none">
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="pointer-events-auto w-full h-full min-h-screen overflow-y-auto bg-[#15428C] p-6 shadow-2xl flex flex-col"
                            >
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-white mx-auto cursor-pointer"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="size-16" />
                                    </button>
                                </div>
                                <div className="mt-6 flow-root flex-grow flex items-center justify-center">
                                    <div className="-my-6 divide-y divide-gray-500/15 w-full">
                                        <div className="py-6 text-center space-y-4">
                                            {menuI_tems.map((item, idx) => (
                                                <CustomLink
                                                    key={idx}
                                                    href={item.url}
                                                    className="nav-item relative group block mx-auto w-fit rounded-lg px-3 py-2 uppercase text-[30px] leading-12 font-medium text-white duration-400"
                                                >
                                                    <span>{item.name}</span>
                                                    <span className="absolute bottom-2 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
                                                </CustomLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </header>
    )
}
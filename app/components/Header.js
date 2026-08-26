'use client'

import { useState, useEffect } from 'react'
import { menuI_tems } from '../utils/Copies'
import {
    Dialog,
    DialogPanel,
} from '@headlessui/react'
import {
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { MenuBarIcon } from '../utils/SVG_Icons'
import SearchForm from './SearchForm'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showNavbar, setShowNavbar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isAtTop, setIsAtTop] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            setIsAtTop(currentScrollY === 0)

            // Si scrolleamos hacia abajo y ya pasamos los 80px (para evitar que se oculte al mínimo roce arriba)
            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShowNavbar(false)
            } else {
                // Si scrolleamos hacia arriba
                setShowNavbar(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return (
        <header
            className={`fixed z-3 w-full transition-all duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                } ${
                isAtTop
                    ? 'bg-transparent shadow-none'
                    : 'bg-white/70 backdrop-blur-md shadow-sm'
                }`}
        >
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">INL Lala</span>
                        <img
                            alt="logo"
                            src="/logo.svg"
                            className="h-11.5 sm:h-20 w-auto"
                        />
                    </a>
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
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#15428C] p-6 sm:ring-1 sm:ring-gray-900/10">
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
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="py-6 text-center space-y-3 max-w-85 mx-auto">
                                {
                                    menuI_tems.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={item.url}
                                            className="nav-item relative block rounded-lg px-3 py-2 uppercase text-[40px] leading-12 font-medium text-white duration-400"
                                        >
                                            {item.name}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

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
            className={`bg-transparent fixed z-3 w-full transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
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
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {
                                    menuI_tems.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={item.url}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
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
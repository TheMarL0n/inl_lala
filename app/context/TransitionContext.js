// context/TransitionContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Cada vez que cambia la ruta (pathname), sabemos que la nueva página ya cargó
  // Así que podemos desactivar la cortina de salida (animación de entrada)
  useEffect(() => {
    setIsExiting(false);
  }, [pathname]);

  const navigate = (href) => {
    if (isExiting) return;

    // Si hacen clic en un enlace que es la misma ruta actual, ignoramos la transición
    if (href === window.location.pathname) return;

    setIsExiting(true);

    // Damos tiempo a que la cortina suba/cierre antes de hacer el router.push
    setTimeout(() => {
      router.push(href);
    }, 600); // Sincronizado con la duración de la animación de la cortina
  };

  return (
    <TransitionContext.Provider value={{ isExiting, navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(TransitionContext);
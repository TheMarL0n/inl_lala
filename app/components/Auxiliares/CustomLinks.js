'use client';

import { usePageTransition } from "@/app/context/TransitionContext";

export default function CustomLink({ href, children, className, ...props }) {
  const { navigate } = usePageTransition();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(href); // Le avisa al contexto global que inicie la cortina y el cambio
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
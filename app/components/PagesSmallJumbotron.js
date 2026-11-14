import Image from "next/image";

const PagesSmallJumbotron = ({ background, title }) => {
  // Si la URL viene de Strapi y no empieza con http, le agregamos el host
  const getStrapiMedia = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }
    return `${process.env.NEXT_PUBLIC_STRAPI_HOST}${url}`;
  };

  return (
    <section className="relative">
      <div className="relative h-screen min-h-126 max-h-126 flex flex-col sm:justify-center overflow-hidden">
        <Image
          src={getStrapiMedia(background.url)}
          alt={`Imagen que describe el tema de ${title}`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-center z-0"
        />
      </div>
    </section>
  );
};

export default PagesSmallJumbotron;

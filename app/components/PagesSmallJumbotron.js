import Image from "next/image";
import { getStrapiMedia } from "../lib/strapi-media";

const PagesSmallJumbotron = ({ background, title }) => {
  return (
    <section className="relative">
      <div className="relative h-screen min-h-126 max-h-126 flex flex-col sm:justify-center overflow-hidden">
        <Image
          src={getStrapiMedia(background.url)}
          alt={`Imagen que describe el tema de ${title}`}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="absolute inset-0 object-cover object-center z-0"
        />
      </div>
    </section>
  );
};

export default PagesSmallJumbotron;

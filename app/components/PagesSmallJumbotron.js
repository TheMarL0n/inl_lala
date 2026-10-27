import Image from "next/image";

const PagesSmallJumbotron = ({ background, title }) => {
  return (
    <section className="relative">
      <div className="relative h-screen min-h-150 max-h-117 flex flex-col sm:justify-center overflow-hidden">
        {background &&
        typeof background === "string" &&
        background.trim() !== "" ? (
          <Image
            src={background}
            alt={`Imagen que describe el tema de ${title}`}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover object-center z-0"
          />
        ) : null}
      </div>
    </section>
  );
};

export default PagesSmallJumbotron;

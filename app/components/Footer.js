import Image from "next/image";
import CustomLink from "./Auxiliares/CustomLinks";

const Footer = ({ menuI_tems = [], socialesI_tems = [] }) => {
    return (
        <footer className="py-20 px-4 bg-[#15428C]">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
                <CustomLink href="/">
                    <Image
                        src="/logo_footer.svg"
                        width={224}
                        height={125}
                        loading="eager"
                        alt="Instituto de Nutrición Lala"
                        className="w-[80%] sm:w-56 h-auto"
                        style={{ height: "auto" }}
                    />
                </CustomLink>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 space-y-1">
                        {menuI_tems.map((item, idx) => (
                            <CustomLink
                                key={idx}
                                href={`/paginas/${item.url}`}
                                className="text-white text-[16px] sm:text-[18px] font-medium"
                            >
                                {item.nombre}
                            </CustomLink>
                        ))}
                    </div>
                    {socialesI_tems.length > 0 ? (
                        <div className="flex flex-wrap mt-8 gap-4">
                            {socialesI_tems.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.nombre || "Red social"}
                                    className={`w-14 h-10 bg-[url(/images/socials.svg)] bg-no-repeat
                                        ${item.nombre === "youtube" ? "bg-position-[0px]" :
                                            item.nombre === "instagram" ? "bg-position-[-84px_center]" :
                                                item.nombre === "facebook" ? "bg-position-[-167px_center]" :
                                                    item.nombre === "linkedin" ? "bg-position-[-242px_center]" : ""
                                        }`}
                                />
                            ))}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
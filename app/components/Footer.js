import Image from "next/image";
import CustomLink from "./Auxiliares/CustomLinks";
import Sociales from "./Sociales";

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
                        <Sociales socialesI_tems={socialesI_tems} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
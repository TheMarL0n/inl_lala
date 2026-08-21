import { menuI_tems } from "../utils/Copies"

const Footer = () => {
    return (
        <footer className="py-20 px-4 bg-[#15428C]">
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
                <a href="/"><img width={224} height={125} src="/logo_footer.svg" className="w-[80%] sm:w-56" alt="logo" /></a>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 space-y-1">
                        {menuI_tems.map((item, idx) => (
                            <a key={idx} href={item.url} className="text-white text-[16px] sm:text-[18px] font-medium">{item.name}</a>
                        ))}
                    </div>
                    <div className="flex flex-wrap mt-8 gap-4">
                        <a href="#" target="_blank" className="w-14 h-10 bg-[url(/images/socials.svg)] bg-no-repeat bg-position-[0px]"></a>
                        <a href="#" target="_blank" className="w-10 h-10 bg-[url(/images/socials.svg)] bg-no-repeat bg-position-[-84px_center]"></a>
                        <a href="#" target="_blank" className="w-10 h-10 bg-[url(/images/socials.svg)] bg-no-repeat bg-position-[-167px_center]"></a>
                        <a href="#" target="_blank" className="w-9 h-10 bg-[url(/images/socials.svg)] bg-no-repeat  bg-position-[-242px_center]"></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
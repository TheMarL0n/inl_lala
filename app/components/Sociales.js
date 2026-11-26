const Sociales = ({ socialesI_tems }) => {
    return (
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
                                item.nombre === "tiktok" ? "bg-position-[-167px_center]" :
                                    item.nombre === "linkedin" ? "bg-position-[-242px_center]" : ""
                        }`}
                />
            ))}
        </div>
    )
}
export default Sociales
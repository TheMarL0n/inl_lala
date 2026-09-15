const PagesJumbotron = ({ titulo, subtitulo, background, titulo_descripcion, descripcion }) => {
    return (
        <section className="relative">
            <div
                style={{ backgroundImage: `url(${background})` }}
                className={`relative h-screen min-h-150 max-h-225 2xl:max-h-200 bg-no-repeat bg-cover bg-center flex flex-col sm:justify-center`}>
                <div className="max-w-7xl sm:w-7xl mx-auto space-y-20 sm:space-y-4 mt-40 sm:mt-20">
                    <h1 className="text-white text-[30px] sm:text-[70px] font-black uppercase flex flex-col sm:gap-2 items-start">
                        <span className="bg-[#15428C] px-3">{titulo}</span>
                        <span className="text-[50px] sm:text-[135px] sm:leading-33.75 ml-10 sm:ml-40 bg-[#15428C] px-3">{subtitulo}</span>
                    </h1>
                </div>
            </div>
            <div className="page_descripcion max-w-4xl mx-4 sm:mx-auto bg-white -mt-30 p-4 sm:p-20 relative z-2 min-h-37.5">
                <h3 className="text-[#15428C] text-center font-medium sm:text-[40px] sm:leading-11 text-[26px]">
                    {
                        titulo_descripcion ?
                            <>
                                <strong>{titulo_descripcion}</strong><br />
                            </>
                            :
                            ""
                    }
                    {descripcion}
                </h3>
            </div>
        </section>
    )
}
export default PagesJumbotron
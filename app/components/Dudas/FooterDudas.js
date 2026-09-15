const FooterDudas = ({ imagen_footer }) => {
    return (
        <section
            style={{ backgroundImage: `url(${imagen_footer})` }}
            className={`relative h-screen min-h-150 max-h-225 bg-no-repeat bg-cover bg-center flex flex-col sm:justify-center`}
        >
        </section>
    )
}
export default FooterDudas
const FechaCalendario = ({ fechaStr }) => {
    // 1. Separamos el string "24/07/2026"
    const [dia, mes, anio] = fechaStr.split('/')
    const fechaObj = new Date(`${anio}-${mes}-${dia}`)

    // 2. Extraemos el número del día (ej. "24")
    const numeroDia = fechaObj.getDate()

    // 3. Extraemos el mes en texto completo (ej. "julio")
    const nombreMes = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaObj)

    return (
        <div className="flex flex-col items-start leading-none">
            {/* Número del día grande */}
            <span className="text-[80px] sm:text-[120px] font-bold text-[#0B75B9]">
                {numeroDia}
            </span>
            {/* Mes en mayúsculas y más pequeño */}
            <span className="text-[18px] sm:text-[30px] uppercase tracking-widest text-[#0B75B9]">
                {nombreMes}
            </span>
        </div>
    )
}

export default FechaCalendario
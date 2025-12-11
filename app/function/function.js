// formatação de datas >>>>>>>>>
export const formatar_data = (dataAtual) => {
    const data = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    })
    return data.format(dataAtual)
}
export const set_diaDaSemana = (dataAtual) => {
    const data = new Intl.DateTimeFormat('pt-BR', {
        weekday: "long"
    })
    return data.format(dataAtual)
}
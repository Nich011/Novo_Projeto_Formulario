export async function logSusepCode(employer_num: string) {
    const response = await fetch(`https://www2.susep.gov.br/safe/corretoresapig/dadospublicos/pesquisar?tipoPessoa=PJ&cnpj=${employer_num}&cpfCnpj=${employer_num}&page=1`)
    const body = await response.json();

    if (body.retorno.totalRegistros == 0) {
        console.log("não há registros")
        return false
    }

    const codigo = body.retorno.registros[0].protocolo;
     codigo
}
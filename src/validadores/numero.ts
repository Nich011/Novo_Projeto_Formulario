export function validadorNumero(number : string) : boolean {
    // Verificação do número de caracteres do Telefone
    if (number.length != 11) {
        return false
    }
    return true
}
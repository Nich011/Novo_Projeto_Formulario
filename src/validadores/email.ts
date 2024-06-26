export function validadorEmail (email : string) : boolean {
    // Expressão regular para validação do email
    let regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

    // Validação do Email
    if (regexEmail.test(email) != true){
        return false
    }
    return true
}
export function validadorCNPJ (employer_num: number[]) : boolean {

    if (employer_num.length != 14){
        return false
    }

    let mult = [
        employer_num[0] * 5,
        employer_num[1] * 4,
        employer_num[2] * 3,
        employer_num[3] * 2,
        employer_num[4] * 9,
        employer_num[5] * 8,
        employer_num[6] * 7,
        employer_num[7] * 6,
        employer_num[8] * 5,
        employer_num[9] * 4,
        employer_num[10] * 3,
        employer_num[11] * 2
    ] // cada um dos algarismos antes do primeiro digito verificador multiplicados pelo valor correspondente

    let mult2 = [
        employer_num[0] * 6,
        employer_num[1] * 5,
        employer_num[2] * 4,
        employer_num[3] * 3,
        employer_num[4] * 2,
        employer_num[5] * 9,
        employer_num[6] * 8,
        employer_num[7] * 7,
        employer_num[8] * 6,
        employer_num[9] * 5,
        employer_num[10] * 4,
        employer_num[11] * 3,
        employer_num[12] * 2
    ] // cada um dos algarismos antes do primeiro digito verificador multiplicados pelo valor correspondente

    let soma = 0;
    for (let i in mult){ // i se refere aos elementos dentro do array de algarismos multiplicados.
        soma += mult[i] // O loop funciona adicionando à variável soma os valores dos elementos no array.
    } // Com isso conseguimos o valor total da soma dos algarismos multiplicados.
    
    let mod = soma % 11 
    let resultado = mod < 2 ? 0 : 11 - soma % 11;

    let soma2 = 0;
    for (let i in mult2){ // i se refere aos elementos dentro do array de algarismos multiplicados.
        soma2 += mult2[i] // O loop funciona adicionando à variável soma os valores dos elementos no array.
    } // Com isso conseguimos o valor total da soma dos algarismos multiplicados.
    
    let mod2 = soma2 % 11 
    let resultado2 = mod2 < 2 ? 0 : 11 - soma2 % 11;

    if (employer_num[12] != resultado || employer_num[13] != resultado2){ // caso o primeiro dígito verificador for diferente do resto da divisão da soma por 11,
        console.log("Somas: " + soma + " " + soma2) // No caso de erro do CNPJ, é retornado no terminal as somas e os restos
        console.log("Mods: " + mod + " " + mod2) // usados no processo de validação.
        return false
    }
    return true
}
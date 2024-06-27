// API conectada a um banco de dados MySQL
// A API recebe uma requisição POST com dados que enviará para o banco de dados.

import express, { Request, Response } from 'express'; // O Express é o framework mais comumente utilizado para criação de APIs no Node
import cors from "cors";
import { validadorCNPJ } from './validadores/cnpj';
import { validadorEmail } from './validadores/email';
import * as configMySQL from './configs/configMySQL.json'

// Definindo a constante da API (Aplicação Express)
const api = express(); // A constante API se refere à função do express para controle do funcionamento da aplicação

// A API recebe o corpo em formato JSON
api.use(express.json());

// A API utiliza o CORS para conseguir se comunicar com o front-end
api.use(cors());

// É preciso definir uma porta no servidor local para o funcionamento da API
const PORT = 3000; // O domínio localhost:3000 é onde a API estará funcionando.

// Requerir o módulo do MySQL para acesso ao Banco de Dados
var mysql = require('mysql'); // O módulo do MySQL permite se conectar ao sistema de gerenciamento usando usuário e senha

var conexao = mysql.createConnection(configMySQL);

// Requisição GET de teste para verificar se a API foi inicializada
api.get('/teste', (req: Request, res: Response) => { // Requisição GET que retorna uma mensagem de teste usando parâmetros query quando acessam "localhost:3000/teste"
    res.send(`Mensagem de Teste. Esta mensagem está sendo retornada após uma requisição GET`); // Retorna uma resposta.
});

// Requisição POST
api.post('/enviar', (req: Request, res: Response) => {

    // Os dados que serão enviados ao banco de dados devem ter sido recebidos no JSON da requisição post
    let employer_num = req.body.employer_num;
    let name = req.body.name;
    let company_name = req.body.company_name;
    let email = req.body.email;
    let number = req.body.number;
    let consultancy = req.body.consultancy;

    // Deve haver uma verificação de se todos os valores foram recebidos no corpo da requisição
    if (!employer_num || !name || !company_name || !email || !number || !consultancy) {
        return res.status(400).send('Existem campos vazios. Por favor envie todos os dados necessários'); // encerra o processo e retorna 400
    }

    // Remove os caracteres especiais que podem estar presentes nos campos onde os valores são números.
    employer_num = employer_num.replace(/[^\d]+/g, '');
    number = number.replace(/[^\d]+/g, '');

    // Validação do Email
    if (validadorEmail(email) == false) {
        return res.status(400).send("O email fornecido não segue os padrões esperados. Por favor insira um email válido.")
    }

    // Verificação do número de caracteres do Telefone
    if (number.length != 11) {
        return res.status(400).send("O Número de telefone tem menos/mais caracteres do que o necessário (12)") // encerra o processo e retorna 400
    }

    // Caso qualquer um dos campos que possui um limite de 60 caracteres ultrapassar esse valor, o processo é encerrado e é retornado um erro.
    if (name.length > 60) return res.status(400).send("O campo de nome possui mais caracteres do que o limite permitido (60)");
    if (company_name.length > 60) return res.status(400).send("O campo de razão social possui mais caracteres do que o limite permitido (60)");
    if (email.length > 60) return res.status(400).send("O campo de email possui mais caracteres do que o limite permitido (60)");
    if (consultancy.length > 60) return res.status(400).send("O campo de assessoria possui mais caracteres do que o limite permitido (60)")

    // Validação do CNPJ
    if (validadorCNPJ(employer_num) == false) {
        return res.status(400).send("Houve um problema com a validação do CNPJ, por favor insira um CNPJ válido.")
    }

    // O comando SQL que envia os dados para a tabela corretores
    var sql = `INSERT INTO corretores (employer_num, name, company_name, email, number, consultancy) VALUES ('${employer_num}','${name}','${company_name}','${email}','${number}','${consultancy}')`;

    // É lançada a query para envio dos dados à tabela corretores
    conexao.query(sql, function (err: Error) {
        if (err) throw err;
        console.log("O cadastro foi um sucesso")
    });

    // Mensagem de resposta ao usuário avisando que o cadastro foi bem sucedido
    res.send(`Foi adicionado um novo cadastro à tabela corretores com o CNPJ ${employer_num}`)
});

// "Escutar" chamadas na porta 3000 (Inicialização da API)
api.listen(PORT, () => {
    console.log("teste");
})
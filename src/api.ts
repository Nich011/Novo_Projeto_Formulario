// API conectada a um banco de dados MySQL
// A API recebe uma requisição POST com dados que enviará para o banco de dados.

import express, {Request, Response} from 'express'; // O Express é o framework mais comumente utilizado para criação de APIs no Node

// Definindo a constante da API (Aplicação Express)
const api = express(); // A constante API se refere à função do express para controle do funcionamento da aplicação

// É preciso definir uma porta no servidor local para o funcionamento da API
const PORT = 3000; // O domínio localhost:3000 é onde a API estará funcionando.

// Requerir o módulo do MySQL para acesso ao Banco de Dados
var mysql = require('mysql'); // O módulo do MySQL permite se conectar ao sistema de gerenciamento usando usuário e senha

var conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nicholas01**",
    database: "projeto_formulario" // O banco de dados específico deste projeto
});

// Requisição GET de teste para verificar se a API foi inicializada
api.get('/teste', (req: Request, res: Response) => { // Requisição GET que retorna uma mensagem de teste usando parâmetros query quando acessam "localhost:3000/teste"
    res.send(`Mensagem de Teste. Esta mensagem está sendo retornada após uma requisição GET`); // Retorna uma resposta.
});

// A API recebe o corpo em formato JSON
api.use(express.json());

// Requisição POST
api.post('/enviar', (req: Request, res: Response) => {
    conexao.connect(function(err: Error) {
        if (err) throw err;
        console.log("Conectado ao banco de dados.")
    })

    // Os dados que serão enviados ao banco de dados devem ter sido recebidos no JSON da requisição post
    let employer_num = req.body.employer_num;
    let name = req.body.name;
    let corporate_reason = req.body.corporate_reason;
    let email = req.body.email;
    let number = req.body.number;
    let consultancy = req.body.consultancy;

    // Deve haver uma verificação de se todos os valores foram recebidos no corpo da requisição
    if (!employer_num || !name || !corporate_reason || !email || !number || !consultancy) {
        throw Error;
    }

    // O comando SQL que envia os dados para a tabela corretores
    var sql = `INSERT INTO corretores (employer_num, name, corporate_reason, email, number, consultancy) VALUES ('${employer_num}','${name}','${corporate_reason}','${email}','${number}','${consultancy}')`;

    conexao.query(sql, function (err: Error) {
        if (err) throw err;
        console.log("Cadastro foi um sucesso")
    });

    res.send(`Foi adicionado um novo cadastro à tabela corretores com o CNPJ ${employer_num}`)
});

// "Escutar" chamadas na porta 3000 (Inicialização da API)
api.listen(PORT, () => {
    console.log("http://localhost:3000/teste");
})
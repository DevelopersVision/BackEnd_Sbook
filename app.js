/**************************************************************************************
 *  Objetivo: API para integração entre back e banco de dados (GET, POST, PUT, DELETE)
 *  Autor: Luiz Gustavo e Felipe Graciano
 *  Data: 31/08/2023
 *  Versão: 1.0
 **************************************************************************************/

// (Para termos a conexão do projeto com o banco de dados, devemos utilizar a biblioteca prisma, sempre utilizar os comandos)
// npm install prisma --save
//npx prisma
//npx prisma init
//npm install @prisma/client --save
//npx prisma migrate dev

//import das bibliotecas para API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


//Cria o objeto app conforme a classe do express
const app = express();


//Permissões do cors
app.use((request, response, next) => {
    //Define quem poderá acessar a Api - '*' = Todos
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE, OPTIONS');

    app.use(cors());
    next();
});

//Define que os dados que irão chegar no body da requisição será no padrao json
const bodyParserJSON = bodyParser.json();

var message = require('./controller/modulo/config.js')


/*****************************************************************************************************************
* Objetivo: API de controle de Endereco
* Data: 04/09/2023
* Autor: Luiz e Felipe
* Versão: 1.0
******************************************************************************************************************/

//Import do arquivo controller que irá solicitar a model os dados do Banco
let controllerEndereco = require('./controller/controller_endereco.js')

app.get('/v1/sbook/endereco', cors(), async function (request, response) {

    let enderecoData = await controllerEndereco.ctlGetEnderecos()

    response.status(enderecoData.status)
    response.json(enderecoData)
})




/*****************************************************************************************************************
* Objetivo: API de controle de Usuario
* Data: 04/09/2023
* Autor: Luiz e Felipe
* Versão: 1.0
******************************************************************************************************************/

//Import da biblioteca para validação do token
const jwt = require('./middleware/middlewareJWT.js')

//Recebe o token encaminhado nas requisições e valida a solicitação
const verifyJWT = async function (request, response, next) {

    //recebe o token encaminhado no header da requisição
    let token = request.headers['x-acccess-token']

    //valida a autenticidade do token
    const authencitToken = await jwt.validateJWT(token)

    //Verifica se a requisição poderá continuar ou ses será encerrada
    if (authencitToken) {
        next()
    } else {
        return response.status(401).end();
    }
}

//Import do arquivo controller que irá solicitar a model os dados do Banco
let controllerUsuario = require('./controller/controller_usuario.js')

let controllerLogin = require('./controller/controller_login.js')

app.get('/v1/sbook/usuario', bodyParserJSON, cors(), async function (request, response) {
    let dadosUsuario = await controllerUsuario.ctlGetUsuario()

    console.log(dadosUsuario)

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

app.get('/v1/sbook/usuario/:id', bodyParserJSON, cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosUsuario = await controllerUsuario.ctlGetUsuarioByID(idUsuario)

    console.log(dadosUsuario)

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

app.post('/v1/sbook/login', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let body = request.body

        let resultDadosUsuario = await controllerLogin.ctlAutenticarUsuarioByEmailAndSenha(body.email, body.senha)

        response.status(resultDadosUsuario.status)
        response.json(resultDadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.post('/v1/sbook/registro-usuario', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosUsuario = await controllerUsuario.ctlInserirEnderecoUsuario(dadosBody)

        response.status(resultDadosUsuario.status)
        response.json(resultDadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/sbook/atualizar-usuario', verifyJWT, cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do aluno pelo parametro

        //Recebe os dados dos aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultDadosUsuarioEndereco = await controllerUsuario.ctlAtalizarEnderecoUsuario(dadosBody)

        response.status(resultDadosUsuarioEndereco.status)
        response.json(resultDadosUsuarioEndereco)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

/*****************************************************************************************************************
* Objetivo: API de controle de Email
* Data: 04/09/2023
* Autor: Luiz e Felipe
* Versão: 1.0
******************************************************************************************************************/
const controllerEmail = require('./controller/controller_email.js')

app.get('/v1/sbook/esqueci-senha/:email', cors(), async function (request, response) {
    let email = request.params.email

    let dadosUsuario = await controllerEmail.ctlEsqueciSenha(email)

    response.status(200)
    response.json(dadosUsuario)
})

app.get('/v1/sbook/validar-token', cors(), bodyParserJSON, async function (request, response) {
    let body = request.body

    let dadosUsuario = await controllerEmail.ctlValidarToken(body)

    response.status(200)
    response.json(dadosUsuario)
})

app.get('/v1/sbook/recuperar-conta', cors(), bodyParserJSON, async function (request, response) {
    let body = request.body

    let dadosUsuario = await controllerUsuario.ctlAterarSenha(body)

    response.status(200)
    response.json(dadosUsuario)
})

/*****************************************************************************************************************
* Objetivo: API de escolhe de gêneros preferidos
* Data: 08/09/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/

const controllerUsuarioGenero = require('./controller/controller_usuario-genero.js')

app.get('/v1/sbook/generos/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    if(idUsuario){
        let dadosGeneros = await controllerUsuarioGenero.ctlGetGenerosPreferidosByIdUsuario(idUsuario)

        response.status(dadosGeneros.status)
        response.json(dadosGeneros)
    }else{
        let dadosGeneros = await controllerUsuarioGenero.ctlGetGeneros()

        response.status(dadosGeneros.status)
        response.json(dadosGeneros)
    }
})

app.post('/v1/sbook/generos-preferidos', cors(), bodyParserJSON,async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let generosPreferidos = await controllerUsuarioGenero.ctlInserirUsuarioGenero(dadosBody)

        response.status(generosPreferidos.status)
        response.json(generosPreferidos)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/sbook/generos-preferidos', cors(), bodyParserJSON,async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let generosPreferidos = await controllerUsuarioGenero.ctlAtualizarGenerosPreferidosByIdUsuario(dadosBody)

        response.status(generosPreferidos.status)
        response.json(generosPreferidos)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})


/*****************************************************************************************************************
* Objetivo: API de dados estáticos
* Data: 08/09/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/

//Import do arquivo controller que irá solicitar a model os dados do Banco
const modelIdioma = require('./model/model_idiomas.js')

const idiomas = require('./controller/modulo/idiomas.js')

app.post('/v1/sbook/inserir-idiomas', cors(), async function (request, response) {

    let dadosIdioma = await modelIdioma.adicionarIdiomas(idiomas.languagesList)

    response.status(dadosIdioma.status)
    response.json(dadosIdioma)
})

//Import do arquivo controller que irá solicitar a model os dados do Banco
const modelGenero = require('./model/model_generos.js')

const generos = require('./controller/modulo/generos.js')

app.post('/v1/sbook/inserir-generos', cors(), async function (request, response) {

    let dadosGenero = await modelGenero.adicionarGeneros(generos.generosList)

    response.status(dadosGenero.status)
    response.json(dadosGenero)
})

app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080');
})

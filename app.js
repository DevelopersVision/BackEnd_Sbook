/**************************************************************************************
 *  Objetivo: API para integração entre back e banco de dados (GET, POST, PUT, DELETE)
 *  Autor: Luiz Gustavo e Felipe Graciano
 *  Data: 31/08/2023
 *  Versão: 1.0
 **************************************************************************************/

/**
 * MongoDB:
 * 
 * Username: sbook_root
 * Password: mXYEFk0a6E8GBJBj
 * 
 * StringConnection: mongodb+srv://LuizSilva:58bkPCPOaYKGIYhF@apicluster.dnx6rti.mongodb.net/ApiRest-NodeJs?retryWrites=true&w=majority
 **/

/************************************************************************************
 * Configurações Node:
 * 
 * Express - dependencia para realizar requisições de API pelo protocolo HTTP 
 *      npm install express --save
 * 
 * Nodemon - dependencia para atualizar o servidor sempre que houver alteração nos arquivos
 *      npm install nodemonn --save-dev
 * 
 * Cors - dependencia para gerenciar permissões de requisição da API
 *      npm install cors --save
 * 
 * Body-Parser - dependencia que gerencia o corpo das resquisições 
 *      npm install body-parser --save
 * 
 * ************************************************************************************
 * Configurações de recuperar conta:
 * 
 * NodeMailer - dependencia para enviar email com o código
 *      npm install nodemailer --save
 * 
 * Moment - dependencia que manipula data facilmente
 *      npm install moment --save
 * 
 * NodeMailer Express Handlebars - dependencia que consegue utlizar templates html para o email
 *      npm install nodemailer-express-handlebars --save
 * 
 * ************************************************************************************
 * Configuração do token JWT:
 * 
 * JSON Web Tokens - dependencia que gera o token e pede nas requisições
 *      npm install jsonwebtoken --save
 * 
 * ************************************************************************************
 * Configurações Prisma:
 * 
 * npm install prisma --save
 * npx prisma init
 * npm install @prisma/client --save
 * npx prisma migrate dev
 * 
 * ************************************************************************************
 * Configurações Mongo:
 * 
 * Mongoose - dependencia para realizar a conexão o monngoDB
 *      npm install mongoose --save
 * 
 ************************************************************************************/

//import das bibliotecas para API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//Cria o objeto app conforme a classe do express
const app = express();

//Constantes MongoDB
const DB_USER = 'sbook_root'
const DB_PASSWORD = 'mXYEFk0a6E8GBJBj'
const STRING_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@sbookcluster.1itflnh.mongodb.net/Sbook-Chat?retryWrites=true&w=majority`

const chatRoutes = require('./routes/chatRoutes')
app.use('/v1/sbook/chat', chatRoutes)

const messageRoutes = require('./routes/mensagemRoutes')
app.use('/v1/sbook/message', messageRoutes)
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

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

app.get('/v1/sbook/usuario/:id', bodyParserJSON, cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosUsuario = await controllerUsuario.ctlGetUsuarioByID(idUsuario)

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

app.get('/v1/sbook/login', cors(), bodyParserJSON, async function (request, response) {

    //Recebe os dados encaminhados na requisição
    let body = request.body

    let resultDadosUsuario = await controllerLogin.ctlAutenticarUsuarioByEmailAndSenha(body.email, body.senha)

    response.status(resultDadosUsuario.status)
    response.json(resultDadosUsuario)

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

app.put('/v1/sbook/atualizar-usuario', cors(), bodyParserJSON, async function (request, response) {
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

app.post('/v1/sbook/esqueci-senha', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let body = request.body

        let dadosUsuario = await controllerEmail.ctlEsqueciSenha(body.email)

        response.status(200)
        response.json(dadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

app.post('/v1/sbook/validar-token', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let body = request.body

        let dadosUsuario = await controllerEmail.ctlValidarToken(body)

        response.status(dadosUsuario.status)
        response.json(dadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.put('/v1/sbook/recuperar-conta', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let body = request.body

        let dadosUsuario = await controllerUsuario.ctlAterarSenha(body)

        response.status(200)
        response.json(dadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

/*****************************************************************************************************************
* Objetivo: API de escolhe de gêneros preferidos
* Data: 08/09/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/

const controllerUsuarioGenero = require('./controller/controller_usuario-genero.js')

app.get('/v1/sbook/generos', cors(), async function (request, response) {
    let dadosGeneros = await controllerUsuarioGenero.ctlGetGeneros()

    response.status(dadosGeneros.status)
    response.json(dadosGeneros)
})

app.get('/v1/sbook/generos-preferidos/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosGeneros = await controllerUsuarioGenero.ctlGetGenerosPreferidosByIdUsuario(idUsuario)

    response.status(dadosGeneros.status)
    response.json(dadosGeneros)
})

app.post('/v1/sbook/generos-preferidos', cors(), bodyParserJSON, async function (request, response) {
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

app.put('/v1/sbook/generos-preferidos', cors(), bodyParserJSON, async function (request, response) {
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
* Objetivo: API de escolhe de gêneros preferidos
* Data: 08/09/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/

const controllerEstadoLivro = require('./controller/controller_estado-livro')

app.get('/v1/sbook/estado-livro', cors(), async function (request, response) {
    let dadosEstadoLivro = await controllerEstadoLivro.ctlGetEstadoLivro()

    response.status(dadosEstadoLivro.status)
    response.json(dadosEstadoLivro)
})

app.get('/v1/sbook/estado-livro/:id', cors(), async function (request, response) {
    let idEstadoLivro = request.params.id

    let dadosEstadoLivro = await controllerEstadoLivro.ctlGetEstadoLivroByID(idEstadoLivro)

    response.status(dadosEstadoLivro.status)
    response.json(dadosEstadoLivro)
})


/*****************************************************************************************************************
* Objetivo: API de controle de Usuario Temporario
* Data: 04/09/2023
* Autor: Luiz e Felipe
* Versão: 1.0
******************************************************************************************************************/

app.get('/v1/sbook/validar-email-temp/:email', cors(), async function (request, response) {
    let email = request.params.email

    let dadosUsuario = await controllerEmail.ctlValidarEmail(email)

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

app.post('/v1/sbook/validar-token-temp', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let body = request.body

        let dadosUsuario = await controllerEmail.ctlValidarTokenEmailTemp(body)

        response.status(dadosUsuario.status)
        response.json(dadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})


/*****************************************************************************************************************
* Objetivo: API de manipulação de dados do anuncio com o tipo anuncio
* Data: 15/09/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/

const controllerAnuncioTipoAnuncio = require('./controller/controller_anuncio-tipo-anuncio.js')

app.get('/v1/sbook/tipo-anuncio', cors(), async function (request, response) {
    let dadosTipoAnuncio = await controllerAnuncioTipoAnuncio.ctlGetTipoAnuncio()

    response.status(dadosTipoAnuncio.status)
    response.json(dadosTipoAnuncio)
})

app.get('/v1/sbook/anuncio-tipo-anuncio/:idAnuncio', cors(), async function (request, response) {
    let idAnuncio = request.params.idAnuncio

    let dadosTipoAnuncio = await controllerAnuncioTipoAnuncio.ctlGetTipoAnuncioByIdAnuncio(idAnuncio)

    response.status(dadosTipoAnuncio.status)
    response.json(dadosTipoAnuncio)
})

/*****************************************************************************************************************
* Objetivo: API de manipulação de dados do anuncio
* Data: 15/09/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/

const controllerAnuncio = require('./controller/controller_anuncio.js')

app.get('/v1/sbook/anuncio', cors(), async function (request, response) {

    let page = request.query.page

    if (page) {
        let dadosAnuncio = await controllerAnuncio.ctlGetAnuncioPage(page)

        response.status(dadosAnuncio.status)
        response.json(dadosAnuncio)
    } else {
        let dadosAnuncio = await controllerAnuncio.ctlGetAnuncios()

        response.status(dadosAnuncio.status)
        response.json(dadosAnuncio)
    }
})

app.post('/v1/sbook/anuncio-proximos', cors(), bodyParserJSON, async function (request, response) {

    let page = request.query.page
    let dadosBody = request.body

    let dadosAnuncio = await controllerAnuncio.ctlGetAnuncioByLocalizacao(dadosBody.bairro, dadosBody.cidade, dadosBody.estado, page)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})
app.get('/v1/sbook/anuncios-filtros', cors(), async function (request, response) {
    const array_estado_livro = request.query.array_estado_livro;
    const array_generos = request.query.array_generos;

    if (array_estado_livro != null && array_estado_livro != "" && array_generos != null && array_generos != "") {
        let dadosAnunciosFiltrados = await controllerAnuncio.ctlGetAnunciosThenFilterByEstadoAndGenero(array_estado_livro, array_generos);
        response.status(dadosAnunciosFiltrados.status);
        response.json(dadosAnunciosFiltrados);
    } else if (array_estado_livro != null && array_estado_livro != "") {
        let dadosAnunciosFiltrados = await controllerAnuncio.ctlGetAnunciosThenFilterByEstadoOnly(array_estado_livro);
        response.status(dadosAnunciosFiltrados.status);
        response.json(dadosAnunciosFiltrados);
    } else if (array_generos != null && array_generos != "") {
        let dadosAnunciosFiltrados = await controllerAnuncio.ctlGetAnunciosThenFilterByGenerosOnly(array_generos);
        response.status(dadosAnunciosFiltrados.status);
        response.json(dadosAnunciosFiltrados);
    } else {
        response.status(400); // Status de Bad Request
        response.json({ mensagem: 'Parâmetros inválidos' });
    }
});

app.get('/v1/sbook/todos-anuncios-for-search', cors(), async function (request, response) {

    let dadosAnuncio = await controllerAnuncio.ctlGetALLAnunciosForSearchPage()
    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})


app.get('/v1/sbook/anuncio/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosAnuncio = await controllerAnuncio.ctlGetAnuncioByID(id)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.get('/v1/sbook/anuncio-usuario/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosAnuncio = await controllerAnuncio.ctlGetAnuncioByIdUsuario(id)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.post('/v1/sbook/publicar-anuncio', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let body = request.body

        let dadosAnuncio = await controllerAnuncio.ctlInserirAnuncio(body)

        response.status(dadosAnuncio.status)
        response.json(dadosAnuncio)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.delete('/v1/sbook/anuncio/:idAnuncio', cors(), bodyParserJSON, async function (request, response) {
    let idAnuncio = request.params.idAnuncio

    let dadosAnuncio = await controllerAnuncio.ctlExcluirAnuncio(idAnuncio)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.put('/v1/sbook/encerrar-anuncio/:idAnuncio', cors(), bodyParserJSON, async function (request, response) {
    let idAnuncio = request.params.idAnuncio

    let dadosAnuncio = await controllerAnuncio.ctlEncerrarAnuncio(idAnuncio)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

/*****************************************************************************************************************
* Objetivo: API de manipulação de anuncios favoritados
* Data: 15/09/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/
const controllerAnunciosFavoritos = require('./controller/controller_anuncio_favoritados.js')

app.get('/v1/sbook/anuncios-favoritados/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosAnunciosFavoritos = await controllerAnunciosFavoritos.ctlGetAnunciosFavoritosDoUsuario(idUsuario)

    response.status(dadosAnunciosFavoritos.status)
    response.json(dadosAnunciosFavoritos)
})

app.get('/v1/sbook/verificar-favorito/:user/:anuncio', cors(), bodyParserJSON, async function (request, response) {
    let idUsuario = request.params.user
    let idAnuncio = request.params.anuncio

    let dadosAnuncio = await controllerAnunciosFavoritos.verificarSeOAnuncioEstaFavoritado(idUsuario, idAnuncio)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.post('/v1/sbook/favoritar-anuncio', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let favoritarAnuncio = await controllerAnunciosFavoritos.ctlInserirAnuncioAosFavoritos(dadosBody)

        response.status(favoritarAnuncio.status)
        response.json(favoritarAnuncio)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.delete('/v1/sbook/remover-favorito/:user/:anuncio', cors(), bodyParserJSON, async function (request, response) {
    let idUsuario = request.params.user
    let idAnuncio = request.params.anuncio

    let dadosAnuncio = await controllerAnunciosFavoritos.ctlDeletarAnuncioDosFavoritos(idUsuario, idAnuncio)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})



/*****************************************************************************************************************
* Objetivo: API de dados estáticos
* Data: 08/09/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/

//Import do arquivo controller que irá solicitar a model os dados do Banco
const modelEstaticos = require('./model/estatico/model_estaticos.js')
const controllerAutor = require('./controller/controller_autor.js')
const controllerIdioma = require('./controller/controller_idioma.js')
const controllerEditora = require('./controller/controller_editora.js')

app.get('/v1/sbook/idiomas', cors(), async function (request, response) {

    let dadosIdioma = await controllerIdioma.ctlGetIdiomas()

    response.status(dadosIdioma.status)
    response.json(dadosIdioma)
})

app.get('/v1/sbook/autores', cors(), async function (request, response) {

    let dadosAutores = await controllerAutor.ctlGetAutor()

    response.status(dadosAutores.status)
    response.json(dadosAutores)
})

app.get('/v1/sbook/editoras', cors(), async function (request, response) {

    let dadosEditora = await controllerEditora.ctlgetEditora()

    response.status(dadosEditora.status)
    response.json(dadosEditora)
})


const idiomas = require('./controller/modulo/idiomas.js')
app.post('/v1/sbook/inserir-idiomas', cors(), async function (request, response) {

    let dadosIdioma = await modelEstaticos.adicionarIdiomas(idiomas.languagesList)

    response.status(dadosIdioma.status)
    response.json(dadosIdioma)
})

const generos = require('./controller/modulo/generos.js')
app.post('/v1/sbook/inserir-generos', cors(), async function (request, response) {

    let dadosGenero = await modelEstaticos.adicionarGeneros(generos.generosList)

    response.status(dadosGenero.status)
    response.json(dadosGenero)
})

const estadosLivros = require('./controller/modulo/estados-livros.js')
app.post('/v1/sbook/inserir-estados-livros', cors(), async function (request, response) {

    let dadosEstadoLivro = await modelEstaticos.adicionarEstadosLivros(estadosLivros.estadoLivrosList)

    response.status(dadosEstadoLivro.status)
    response.json(dadosEstadoLivro)
})

const tiposAnuncios = require('./controller/modulo/tipos-anuncios.js')
app.post('/v1/sbook/inserir-tipos-anuncios', cors(), async function (request, response) {

    let dadosTiposAnuncios = await modelEstaticos.adicionarTiposAnuncios(tiposAnuncios.tiposAnunciosList)

    response.status(dadosTiposAnuncios.status)
    response.json(dadosTiposAnuncios)
})

//Conexão com o banco
mongoose
    .connect(
        STRING_CONNECTION
    )
    .then(() => {
        app.listen(8080, function () {
            console.log('Servidor aguardando requisições na porta 8080');
        })        
    })
    .catch((err) => console.log(err))
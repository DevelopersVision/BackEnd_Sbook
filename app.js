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
const bodyParserJSON = bodyParser.json();
const message = require('./controller/modulo/config.js')
const mongoose = require('mongoose')

//Cria o objeto app conforme a classe do express
const app = express();
require('dotenv').config();

//Constantes MongoDB
const DB_USER = 'sbook_root'
const DB_PASSWORD = 'mXYEFk0a6E8GBJBj'
const STRING_CONNECTION = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@sbookcluster.1itflnh.mongodb.net/Sbook-Chat?retryWrites=true&w=majority`

const chatRoutes = require('./routes/mongoDB/chatRoutes.js')
app.use('/v1/sbook/chat', chatRoutes.router)

const messageRoutes = require('./routes/mongoDB/mensagemRoutes.js')
app.use('/v1/sbook/message', messageRoutes.router)

//Permissões do cors
app.use((request, response, next) => {
    //Define quem poderá acessar a Api - '*' = Todos
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE, OPTIONS');

    app.use(cors());
    next();
});

const anuncioRoutes = require('./routes/anuncioRoutes.js')
app.use('/v1/sbook/anuncio', anuncioRoutes)

const estaticosRoutes = require('./routes/estaticosRoutes.js')
app.use('/v1/sbook/inserir', estaticosRoutes)

const estadoLivroRoutes = require('./routes/estadoLivroRoutes.js')
app.use('/v1/sbook/estado-livro', estadoLivroRoutes)

const usuarioRoutes = require('./routes/usuarioRoutes.js')
app.use('/v1/sbook/usuario', usuarioRoutes)

const enderecoRoutes = require('./routes/enderecoRoutes.js')
app.use('/v1/sbook/endereco', enderecoRoutes)

const generoRoutes = require('./routes/generoRoutes.js')
app.use('/v1/sbook/generos', generoRoutes)

// const generosPreferidos = require('./routes/generosPreferidos.js')
// app.use('/v1/sbook/generos-preferidos', generosPreferidos)

const appV2 = require('./routes/appV2Routes.js')
app.use('/v2/sbook', appV2)

/*****************************************************************************************************************
* Objetivo: Chat com Socket.IO
* Data: 01/11/2023
* Autor: Luiz
* Versão: 1.0
******************************************************************************************************************/
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
const chatFunctions = require('./routes/mongoDB/chatFuction.js')
const mensagemFunctions = require('./routes/mongoDB/mensagemFunction.js')
var lista = []

// const { useAzureSocketIO } = require("@azure/web-pubsub-socket.io");

// useAzureSocketIO(io, {
//     hub: "Hub", // The hub name can be any valid string.
//     connectionString: "Endpoint=https://testewebsocketsbook.webpubsub.azure.com;AccessKey=4kDlWvCJ0T31Y/f5KOpgEBVjt8S4aL8jwpiyhXmhKgc=;Version=1.0;"
// });

io.on('connection', socket => {
    console.log('Usuario Conectado', socket.id);

    socket.on('createRooom', async listUsers => {
        const list = JSON.parse(listUsers)

        let newChat = await chatFunctions.insertChat(list)

        io.emit('newChat', newChat)
    })

    socket.on('listMessages', async chat => {
        const listMessages = await chatFunctions.getChat(chat)

        lista = listMessages
        
        io.emit('receive_message', listMessages)
    })

    socket.on('listContacts', async user => {
        const listContacts = await chatFunctions.getListContacts(user)

        listContacts.id_user = parseInt(user)

        console.log(listContacts);

        io.emit('receive_contacts', listContacts)
    })

    socket.on('message', async text => {
        console.log("Mensagem: " + text); 

        let retornoMensagem = await mensagemFunctions.createMessage(text.messageBy, text.messageTo, text.message, text.image, text.chatId)

        lista.mensagens.push(retornoMensagem)
        
        io.emit('receive_message', lista)
    })

    socket.on('deleteMessage', async message => {
        const messageDeleted = await mensagemFunctions.deleteMessage(message)

        let newList = lista.mensagens.filter(mensagem => mensagem._id != message)

        lista.mensagens = newList

        io.emit('receive_message', lista)
    })

    socket.on('disconnect', reason => {
        console.log('Usuário desconectado');
    })
})

server.listen(3001, () => console.log('SERVER SOCKEET.IO LIGADO: 3001'))


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
const controllerUsuario = require('./controller/controller_usuario.js')

const controllerLogin = require('./controller/controller_login.js')

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


app.get('/v1/sbook/anunciante/:id', cors(), bodyParserJSON, async function (request, response) {
    let id = request.params.id

    let resultDadosUsuario = await controllerUsuario.ctlGetUsuarioAnunciante(id)

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

        let resultDadosUsuarioEndereco = await controllerUsuario.ctlAtualizarEnderecoUsuario(dadosBody)

        response.status(resultDadosUsuarioEndereco.status)
        response.json(resultDadosUsuarioEndereco)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE.message)
    }
})

app.put('/v1/sbook/atualizar-foto-usuario', cors(), bodyParserJSON, async function (request, response) {
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do aluno pelo parametro

        //Recebe os dados dos aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultDadosUsuarioEndereco = await controllerUsuario.ctlAlterarFoto(dadosBody)

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

        console.log(dadosUsuario);

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

        let dadosUsuario = await controllerUsuario.ctlAlterarSenha(body)

        response.status(200)
        response.json(dadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

const controllerUsuarioGenero = require('./controller/controller_usuario-genero.js')

app.get('/v1/sbook/generos-preferidos/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosGeneros = await controllerUsuarioGenero.ctlGetGenerosPreferidosByIdUsuario(idUsuario)

    response.status(dadosGeneros.status)
    response.json(dadosGeneros)
})

app.post('/v1/sbook/generos-preferidos/', cors(), bodyParserJSON, async function (request, response) {
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

app.put('/v1/sbook/generos-preferidos/', cors(), bodyParserJSON, async function (request, response) {
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

app.get('/v1/sbook/paginacao', cors(), async function (request, response) {
    const modelAnucio = require('./model/model_anuncio.js')

    let selectPage = await modelAnucio.mdlSelectPages()

    let retornoJSON = {
        status: message.SUCCESS_REQUEST.status,
        message: message.SUCCESS_REQUEST.message,
        pages: parseInt(selectPage[0].f0)
    }

    response.status(retornoJSON.status).json(retornoJSON)
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


    console.log('Parâmetros de consulta - array_estado_livro:', array_estado_livro);
    console.log('Parâmetros de consulta - array_generos:', array_generos);

    if (array_estado_livro != null && array_estado_livro != "" && array_estado_livro != undefined && array_generos != null && array_generos != "" && array_generos != undefined) {
        let dadosAnunciosFiltrados = await controllerAnuncio.ctlGetAnunciosThenFilterByEstadoAndGenero(array_estado_livro, array_generos);
        response.status(dadosAnunciosFiltrados.status);
        response.json(dadosAnunciosFiltrados);


    } else if (array_estado_livro != null && array_estado_livro != "" && array_estado_livro != undefined) {
        let dadosAnunciosFiltrados = await controllerAnuncio.ctlGetAnunciosThenFilterByEstadoOnly(array_estado_livro);
        response.status(dadosAnunciosFiltrados.status);
        response.json(dadosAnunciosFiltrados);


    } else if (array_generos != null && array_generos != "" && array_generos != undefined) {
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

app.get('/v1/sbook/anuncio-usuario/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosAnuncio = await controllerAnuncio.ctlGetAnuncioByIdUsuario(id)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.get('/v1/sbook/anuncio-feed', cors(), async function (request, response) {

    let page = request.query.page

    let dadosAnuncio = await controllerAnuncio.ctlGetAnunciosParaFeed(page)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.get('/v1/sbook/anuncio-doacao', cors(), async function (request, response) {

    let page = request.query.page

    let dadosAnuncio = await controllerAnuncio.ctlGetAnunciosParaDoacao(page)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.get('/v1/sbook/anuncio-doacao-web', cors(), async function (request, response) {

    let page = request.query.page

    let dadosAnuncio = await controllerAnuncio.ctlGetAnunciosParaDoacaoWeb(page)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.put('/v1/sbook/encerrar-anuncio/:idAnuncio', cors(), bodyParserJSON, async function (request, response) {
    console.log('Entrou 2');

    let idAnuncio = request.params.idAnuncio

    let dadosAnuncio = await controllerAnuncio.ctlEncerrarAnuncio(idAnuncio)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

app.post('/v1/sbook/anuncio-post', cors(), bodyParserJSON, async function (request, response) {
    console.log('entrou post');
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

app.put('/v1/sbook/anuncio-put', cors(), bodyParserJSON, async function (request, response) {
    console.log('entrou');
    
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        let body = request.body

        let dadosAnuncio = await controllerAnuncio.ctlAtualizarAnuncios(body)

        response.status(dadosAnuncio.status)
        response.json(dadosAnuncio)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

app.delete('/v1/sbook/anuncio-delete/:idAnuncio', cors(), bodyParserJSON, async function (request, response) {
    let idAnuncio = request.params.idAnuncio

    let dadosAnuncio = await controllerAnuncio.ctlExcluirAnuncio(idAnuncio)

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
const controllerAutor = require('./controller/controller_autor.js')
const controllerIdioma = require('./controller/controller_idioma.js')
const controllerEditora = require('./controller/controller_editora.js');
const { log } = require('console');

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
/**************************************************************************************
 *  Objetivo: ROTAS DE ENDPOINTS DE SEGUNDA VERSÃO
 *  Autor: Luiz Gustavo
 *  Data: 14/11/2023
 *  Versão: 1.0
 **************************************************************************************/


const router = require('express').Router()
const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const message = require('../controller/modulo/config.js')

//Import do arquivo controller que irá solicitar a model os dados do Banco
const controllerAnuncio = require('../controller/controller_anuncio.js')
const controllerLogin = require('../controller/controller_login.js')
const controllerUsuario = require('../controller/controller_usuario.js')

//Login Usuário
router.post('/login', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let body = request.body

        let resultDadosUsuario = await controllerLogin.ctlLoginV2(body.email, body.senha)

        response.status(resultDadosUsuario.status)
        response.json(resultDadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Get usuário para o profile
router.get('/usuario/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosUsuario = await controllerUsuario.ctlGetUseByIdWithGenero(idUsuario)

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

//Anúncios FEED
router.post('/anuncio', cors(), bodyParserJSON, async function (request, response) {
    let page = request.query.page

    let dadosAnuncio = await controllerAnuncio.ctlGetAnunciosParaFeed(page)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

module.exports = router
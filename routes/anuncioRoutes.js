/**************************************************************************************
 *  Objetivo: ROTAS DA TABELA ANUNCIO
 *  Autor: Luiz Gustavo
 *  Data: 02/11/2023
 *  Versão: 1.0
 **************************************************************************************/

const router = require('express').Router()
const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const message = require('../controller/modulo/config.js')

const controllerAnuncio = require('../controller/controller_anuncio.js')

router.get('/', cors(), async (request, response) => {

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

router.get('/:id', cors(), async function (request, response) {
    let id = request.params.id

    let dadosAnuncio = await controllerAnuncio.ctlGetAnuncioByID(id)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

router.post('/', cors(), bodyParserJSON, async function (request, response) {
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

router.put('/', cors(), bodyParserJSON, async function (request, response) {
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


router.delete('/:idAnuncio', cors(), bodyParserJSON, async function (request, response) {
    let idAnuncio = request.params.idAnuncio

    let dadosAnuncio = await controllerAnuncio.ctlExcluirAnuncio(idAnuncio)

    response.status(dadosAnuncio.status)
    response.json(dadosAnuncio)
})

module.exports = router
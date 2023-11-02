/**************************************************************************************
 *  Objetivo: ROTAS DO CRUD DE GENERO PREFERIDO DO USUARIO
 *  Autor: Luiz Gustavo
 *  Data: 02/11/2023
 *  Versão: 1.0
 **************************************************************************************/

const router = require('express').Router()
const cors = require('cors');
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const message = require('../controller/modulo/config.js')

const controllerUsuarioGenero = require('../controller/controller_usuario-genero.js')

router.get('/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosGeneros = await controllerUsuarioGenero.ctlGetGenerosPreferidosByIdUsuario(idUsuario)

    response.status(dadosGeneros.status)
    response.json(dadosGeneros)
})

router.post('/', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'routerlication/json') {
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

router.put('/', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'routerlication/json') {
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


module.exports = router
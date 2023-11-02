/**************************************************************************************
 *  Objetivo: ROTAS DO CRUD DE ESTADO_LIVRO
 *  Autor: Luiz Gustavo
 *  Data: 02/11/2023
 *  Versão: 1.0
 **************************************************************************************/

const router = require('express').Router()
const cors = require('cors');

const controllerEstadoLivro = require('../controller/controller_estado-livro')

router.get('/', cors(), async function (request, response) {
    let dadosEstadoLivro = await controllerEstadoLivro.ctlGetEstadoLivro()

    response.status(dadosEstadoLivro.status)
    response.json(dadosEstadoLivro)
})

router.get('/:id', cors(), async function (request, response) {
    let idEstadoLivro = request.params.id

    let dadosEstadoLivro = await controllerEstadoLivro.ctlGetEstadoLivroByID(idEstadoLivro)

    response.status(dadosEstadoLivro.status)
    response.json(dadosEstadoLivro)
})

module.exports = router
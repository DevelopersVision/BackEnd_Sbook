/**************************************************************************************
 *  Objetivo: ROTAS DO CRUD DE USUÁRIO
 *  Autor: Luiz Gustavo
 *  Data: 02/11/2023
 *  Versão: 1.0
 **************************************************************************************/

const router = require('express').Router()
const cors = require('cors');

const controllerUsuario = require('../controller/controller_usuario.js')

router.get('/', cors(), async function (request, response) {
    let dadosUsuario = await controllerUsuario.ctlGetUsuario()

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

router.get('/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosUsuario = await controllerUsuario.ctlGetUsuarioByID(idUsuario)

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

module.exports = router
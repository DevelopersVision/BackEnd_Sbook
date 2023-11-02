/**************************************************************************************
 *  Objetivo: ROTAS DO CRUD DE GENERO
 *  Autor: Luiz Gustavo
 *  Data: 02/11/2023
 *  Versão: 1.0
 **************************************************************************************/

const router = require('express').Router()
const cors = require('cors');

const controllerUsuarioGenero = require('../controller/controller_usuario-genero.js')

router.get('/', cors(), async function (request, response) {
    let dadosGeneros = await controllerUsuarioGenero.ctlGetGeneros()

    response.status(dadosGeneros.status)
    response.json(dadosGeneros)
})


module.exports = router
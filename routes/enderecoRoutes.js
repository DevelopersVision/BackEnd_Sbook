/**************************************************************************************
 *  Objetivo: ROTAS DO CRUD DE ENDERECO
 *  Autor: Luiz Gustavo
 *  Data: 02/11/2023
 *  Versão: 1.0
 **************************************************************************************/

const router = require('express').Router()
const cors = require('cors');

let controllerEndereco = require('../controller/controller_endereco.js')

router.get('/', cors(), async function (request, response) {

    let enderecoData = await controllerEndereco.ctlGetEnderecos()

    response.status(enderecoData.status)
    response.json(enderecoData)
})

module.exports = router
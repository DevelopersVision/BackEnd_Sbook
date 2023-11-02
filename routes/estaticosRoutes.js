/**************************************************************************************
 *  Objetivo: ROTAS DE DADOS ESTÁTICOS
 *  Autor: Luiz Gustavo
 *  Data: 02/11/2023
 *  Versão: 1.0
 **************************************************************************************/

const router = require('express').Router()
const cors = require('cors');

//Import do arquivo controller que irá solicitar a model os dados do Banco
const modelEstaticos = require('../model/estatico/model_estaticos.js')

const idiomas = require('../controller/modulo/idiomas.js')
router.post('/idiomas', cors(), async function (request, response) {

    let dadosIdioma = await modelEstaticos.adicionarIdiomas(idiomas.languagesList)

    response.status(dadosIdioma.status)
    response.json(dadosIdioma)
})

const generos = require('../controller/modulo/generos.js')
router.post('/generos', cors(), async function (request, response) {

    let dadosGenero = await modelEstaticos.adicionarGeneros(generos.generosList)

    response.status(dadosGenero.status)
    response.json(dadosGenero)
})

const estadosLivros = require('../controller/modulo/estados-livros.js')
router.post('/estados-livros', cors(), async function (request, response) {

    let dadosEstadoLivro = await modelEstaticos.adicionarEstadosLivros(estadosLivros.estadoLivrosList)

    response.status(dadosEstadoLivro.status)
    response.json(dadosEstadoLivro)
})

const tiposAnuncios = require('../controller/modulo/tipos-anuncios.js')
router.post('/tipos-anuncios', cors(), async function (request, response) {

    let dadosTiposAnuncios = await modelEstaticos.adicionarTiposAnuncios(tiposAnuncios.tiposAnunciosList)

    response.status(dadosTiposAnuncios.status)
    response.json(dadosTiposAnuncios)
})

module.exports = router
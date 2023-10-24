/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud de autor
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js')

const autoresDAO = require('../model/model_autor.js')

const ctlGetAutor = async function () {
    let dadosAutorJSON = {};

    //chama a funçao que ira retornar todos os registros do banco de dados
    let dadosAutor = await autoresDAO.mdlSelectAutroes()

    if (dadosAutor) {
        //criando um JSon com o atributo enderecos, para encaminhar um array de alunos
        dadosAutorJSON.status = message.SUCCESS_REQUEST.status
        dadosAutorJSON.quantidade = dadosAutor.length
        dadosAutorJSON.enderecos = dadosAutor
        return dadosAutorJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}


module.exports = {
    ctlGetAutor
}
/**************************************************************************************
 *  Objetivo: Responsável por controlar estados dos livros
 *  Autor: Luiz Gustavo e Felipe Graciano
 *  Data: 13/09/2023
 *  Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js')
const estadoLivroDAO = require('../model/model_estado-livro.js')

const ctlGetEstadoLivro = async () => {
    let dadosEstadoLivro = await estadoLivroDAO.mdlSelectAllEstadoLivro()

    if (dadosEstadoLivro) {
        let dadosEstadoLivroJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosEstadoLivro.length,
            estados: dadosEstadoLivro
        }

        return dadosEstadoLivroJSON
    } else {
        return message.ERROR_INTERNAL_SERVER
    }
}

const ctlGetEstadoLivroByID = async (id) => {
    if (id == null || id == undefined || id == '' || isNaN(id)) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosEstadoLivro = await estadoLivroDAO.mdlSelectAllEstadoLivro()

        if (dadosEstadoLivro) {

            let dadosEstadoLivroJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                quantidade: dadosEstadoLivro.length,
                estados: dadosEstadoLivro
            }

            return dadosEstadoLivroJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    ctlGetEstadoLivro,
    ctlGetEstadoLivroByID
}
/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud de usuário
 *  Autor: Luiz Gustavo
 *  Data: 15/09/2023
 *  Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js')

var anuncioTipoAnuncioDAO = require('../model/model_anuncio-tipo-anuncio.js')

const ctlGetTipoAnuncio = async () => {
    let dadosTipoAnuncio = await anuncioTipoAnuncioDAO.mdlSelectAllTipoAnuncio()

    if (dadosTipoAnuncio) {

        let dadosTipoAnuncioJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosTipoAnuncio.length,
            tipos: dadosTipoAnuncio
        }

        return dadosTipoAnuncioJSON
    } else {
        return message.ERROR_INTERNAL_SERVER
    }
}

const ctlGetTipoAnuncioByIdAnuncio = async (id) => {
    if (id == null || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosTipoAnuncio = await anuncioTipoAnuncioDAO.mdlSelectTipoAnuncioByIdAnuncio(id)

        if (dadosTipoAnuncio) {

            let dadosTipoAnuncioJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                tipos: dadosTipoAnuncio[0]
            }

            return dadosTipoAnuncioJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    ctlGetTipoAnuncio,
    ctlGetTipoAnuncioByIdAnuncio
}

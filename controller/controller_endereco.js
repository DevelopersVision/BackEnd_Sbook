//Modelo MVC (Model View controller)
/*****
 * Objetivo: Responsável pela regra de negócios referente ao crud de endereco
 * Data : 31/08/2023
 * Autor: Felipe Graciano and Luiz Gustavo
 * Versão : 1.0
 * ******************************************************************************************* */

var message = require('./modulo/config.js')

var enderecoDAO = require('../model/model_endereco.js')

const ctlInserirEndereco = async function (dadosEndereco) {
    if (dadosEndereco.cep == '' || dadosEndereco.cep == null || dadosEndereco.cep == undefined || dadosEndereco.cep.length > 10 ||
        dadosEndereco.cidade == '' || dadosEndereco.cidade == null || dadosEndereco.cidade == undefined || dadosEndereco.cidade.length > 100 ||
        dadosEndereco.logradouro == '' || dadosEndereco.logradouro == null || dadosEndereco.logradouro == undefined || dadosEndereco.logradouro.length > 250 ||
        dadosEndereco.estado == '' || dadosEndereco.estado == null || dadosEndereco.estado == undefined || dadosEndereco.estado.length > 50 ||
        dadosEndereco.bairro == '' || dadosEndereco.bairro == null || dadosEndereco.bairro == undefined || dadosEndereco.bairro.length > 100
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultDadosEndereco = await enderecoDAO.mdlInsertEndereco(dadosEndereco)

        if (resultDadosEndereco) {
            let newEndereco = await enderecoDAO.mdlSelectLastEnderecoID()

            let dadosEnderecoJSON = {}
            dadosEnderecoJSON.status = message.SUCCESS_CREATED_ITEM.status
            dadosEnderecoJSON.endereco = newEndereco

            return dadosEnderecoJSON
        } else {
            return message.ERROR_INTERNAL_SYSTEM
        }
    }
}

const ctlAtualizarEndereco = async function (dadosEndereco, id) {
    if (dadosEndereco.cep == '' || dadosEndereco.cep == null || dadosEndereco.cep == undefined || dadosEndereco.cep.length > 10 ||
        dadosEndereco.cidade == '' || dadosEndereco.cidade == null || dadosEndereco.cidade == undefined || dadosEndereco.cidade.length > 100 ||
        dadosEndereco.logradouro == '' || dadosEndereco.logradouro == null || dadosEndereco.logradouro == undefined || dadosEndereco.logradouro.length > 250 ||
        dadosEndereco.estado == '' || dadosEndereco.estado == null || dadosEndereco.estado == undefined || dadosEndereco.estado.length > 50 ||
        dadosEndereco.bairro == '' || dadosEndereco.bairro == null || dadosEndereco.bairro == undefined || dadosEndereco.bairro.length > 100
    ) {
        return message.ERROR_REQUIRE_FIELDS

    } else if (id == null || id == undefined || id == '' || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        dadosEndereco.id = id

        let atualizarEndereco = enderecoDAO.mdlSelectEnderecoByID(id)

        if (atualizarEndereco) {
            let resultDadosEndereco = await enderecoDAO.mdlUpdateEndereco(dadosEndereco)

            if (resultDadosEndereco) {
                let dadosEnderecoJSON = {}
                dadosEnderecoJSON.status = message.SUCCESS_UPDATED_ITEM.status
                dadosEnderecoJSON.message = message.SUCCESS_UPDATED_ITEM.message
                dadosEnderecoJSON.endereco = dadosEndereco

                return dadosEnderecoJSON
            } else {
                return message.ERROR_INTERNAL_SYSTEM
            }
        } else {
            return message.ERROR_INVALID_ID
        }
    }
}

const ctlGetEnderecos = async function () {

    let dadosEnderecoJSON = {};


    //chama a funçao que ira retornar todos os registros do banco de dados
    let dadosEndereco = await enderecoDAO.mdlSelectAllEnderecos();

    if (dadosEndereco) {
        //criando um JSon com o atributo enderecos, para encaminhar um array de alunos
        dadosEnderecoJSON.status = message.SUCCESS_REQUEST.status
        dadosEnderecoJSON.quantidade = dadosEndereco.length
        dadosEnderecoJSON.enderecos = dadosEndereco
        return dadosEnderecoJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

const ctlGetEnderecoByID = async function (id) {
    if (id == '' || isNaN(id) || id == undefined) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosEnderecoJSON = {};

        let dadosEndereco = await enderecoDAO.mdlSelectEnderecoByID(id)

        if (dadosEndereco) {
            //criando um JSon com o atributo alunos, para encaminhar um array de alunos
            dadosEnderecoJSON.status = message.SUCCESS_REQUEST.status
            dadosEnderecoJSON.aluno = dadosEndereco
            return dadosEnderecoJSON
        } else {
            return message.ERROR_INVALID_ID
        }
    }
}

const ctlDeletarEndereco = async function (id) {
    if (id == null || id == undefined || id == '' || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {

        let searchIdEndereco = await enderecoDAO.mdlSelectEnderecoByID(id)

        if (searchIdEndereco) {
            let dadosEndereco = await enderecoDAO.mdlDeleteEndereco(id)

            if (dadosEndereco) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_SYSTEM_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_INVALID_ID
        }


    }
}


module.exports = {
    ctlInserirEndereco,
    ctlAtualizarEndereco,
    ctlGetEnderecos,
    ctlGetEnderecoByID,
    ctlDeletarEndereco
}

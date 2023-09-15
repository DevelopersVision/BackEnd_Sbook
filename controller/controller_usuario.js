/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud de usuário
 *  Autor: Luiz Gustavo
 *  Data: 04/09/2023
 *  Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js')

var usuarioDAO = require('../model/model_usuario.js');

const ctlGetUsuario = async () => {
    let dadosUsuarios = await usuarioDAO.mdlSelectAllUsuario()

    if (dadosUsuarios) {

        let dadosUsuariosJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosUsuarios.length,
            dados: dadosUsuarios
        }

        return dadosUsuariosJSON
    } else {
        return message.ERROR_INTERNAL_SERVER
    }
}

const ctlGetUsuarioByID = async function (id) {
    if (id == null || id == undefined || isNaN(id)) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosUsuario = await usuarioDAO.mdlSelectUsuarioByID(id)

        if (dadosUsuario) {

            let dadosUsuarioJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                dados: dadosUsuario
            }

            return dadosUsuarioJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const ctlInserirEnderecoUsuario = async (dadosEnderecoUsuario) => {
    if (
        dadosEnderecoUsuario.logradouro_endereco == '' || dadosEnderecoUsuario.logradouro_endereco == null || dadosEnderecoUsuario.logradouro_endereco == undefined || dadosEnderecoUsuario.logradouro_endereco.lenth > 250 ||
        dadosEnderecoUsuario.bairro_endereco == '' || dadosEnderecoUsuario.bairro_endereco == null || dadosEnderecoUsuario.bairro_endereco == undefined || dadosEnderecoUsuario.bairro_endereco.lenth > 100 ||
        dadosEnderecoUsuario.cidade_endereco == '' || dadosEnderecoUsuario.cidade_endereco == null || dadosEnderecoUsuario.cidade_endereco == undefined || dadosEnderecoUsuario.cidade_endereco.lenth > 100 ||
        dadosEnderecoUsuario.estado_endereco == '' || dadosEnderecoUsuario.estado_endereco == null || dadosEnderecoUsuario.estado_endereco == undefined || dadosEnderecoUsuario.estado_endereco.lenth > 50 ||
        dadosEnderecoUsuario.nome_usuario == '' || dadosEnderecoUsuario.nome_usuario == null || dadosEnderecoUsuario.nome_usuario == undefined || dadosEnderecoUsuario.nome_usuario.lenth > 60 ||
        dadosEnderecoUsuario.cpf_usuario == '' || dadosEnderecoUsuario.cpf_usuario == null || dadosEnderecoUsuario.cpf_usuario == undefined || dadosEnderecoUsuario.nome_usuario.lenth > 18 ||
        dadosEnderecoUsuario.data_nascimento_usuario == '' || dadosEnderecoUsuario.data_nascimento_usuario == null || dadosEnderecoUsuario.data_nascimento_usuario == undefined ||
        dadosEnderecoUsuario.email_usuario == '' || dadosEnderecoUsuario.email_usuario == null || dadosEnderecoUsuario.email_usuario == undefined || dadosEnderecoUsuario.email_usuario.lenth > 255 ||
        dadosEnderecoUsuario.senha_usuario == '' || dadosEnderecoUsuario.senha_usuario == null || dadosEnderecoUsuario.senha_usuario == undefined || dadosEnderecoUsuario.senha_usuario.lenth > 255 ||
        dadosEnderecoUsuario.cep_endereco == undefined || dadosEnderecoUsuario.cep_endereco.lenth > 10
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let checkEmail = await usuarioDAO.checkEmail(dadosEnderecoUsuario.email_usuario)
        let checkCPF = await usuarioDAO.checkCPF(dadosEnderecoUsuario.cpf_usuario)

        if (!checkEmail) {
            return message.ERROR_EXISTING_EMAIL
        } else if (!checkCPF) {
            return message.ERROR_INVALID_CPF
        } else {
            let resultStatus = await usuarioDAO.mdlInsertEnderecoUsuario(dadosEnderecoUsuario)

            if (resultStatus) {
                let novoUsuario = await usuarioDAO.mdlSelectLastEnderecoUsuarioID()

                let dadosEnderecoUsuarioJSON = {
                    status: message.SUCCESS_CREATED_ITEM.status,
                    message: message.SUCCESS_CREATED_ITEM.message,
                    usuario: novoUsuario
                }

                return dadosEnderecoUsuarioJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const ctlAtalizarEnderecoUsuario = async function (dadosEnderecoUsuario) {
    if (
        dadosEnderecoUsuario.id_usuario == null || dadosEnderecoUsuario.id_usuario == undefined || isNaN(dadosEnderecoUsuario.id_usuario) ||
        dadosEnderecoUsuario.id_endereco == null || dadosEnderecoUsuario.id_endereco == undefined || isNaN(dadosEnderecoUsuario.id_endereco) ||
        dadosEnderecoUsuario.logradouro_endereco == '' || dadosEnderecoUsuario.logradouro_endereco == null || dadosEnderecoUsuario.logradouro_endereco == undefined || dadosEnderecoUsuario.logradouro_endereco.lenth > 250 ||
        dadosEnderecoUsuario.bairro_endereco == '' || dadosEnderecoUsuario.bairro_endereco == null || dadosEnderecoUsuario.bairro_endereco == undefined || dadosEnderecoUsuario.bairro_endereco.lenth > 100 ||
        dadosEnderecoUsuario.cidade_endereco == '' || dadosEnderecoUsuario.cidade_endereco == null || dadosEnderecoUsuario.cidade_endereco == undefined || dadosEnderecoUsuario.cidade_endereco.lenth > 100 ||
        dadosEnderecoUsuario.estado_endereco == '' || dadosEnderecoUsuario.estado_endereco == null || dadosEnderecoUsuario.estado_endereco == undefined || dadosEnderecoUsuario.estado_endereco.lenth > 50 ||
        dadosEnderecoUsuario.nome_usuario == '' || dadosEnderecoUsuario.nome_usuario == null || dadosEnderecoUsuario.nome_usuario == undefined || dadosEnderecoUsuario.nome_usuario.lenth > 60 ||
        dadosEnderecoUsuario.data_nascimento_usuario == '' || dadosEnderecoUsuario.data_nascimento_usuario == null || dadosEnderecoUsuario.data_nascimento_usuario == undefined ||
        dadosEnderecoUsuario.senha_usuario == '' || dadosEnderecoUsuario.senha_usuario == null || dadosEnderecoUsuario.senha_usuario == undefined || dadosEnderecoUsuario.senha_usuario.lenth > 255 ||
        dadosEnderecoUsuario.cep_endereco == undefined || dadosEnderecoUsuario.cep_endereco.lenth > 10
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultStatus = await usuarioDAO.mdlupdateUsuario(dadosEnderecoUsuario)

        if (resultStatus) {

            let dadosEnderecoUsuarioJSON = {
                status: message.SUCCESS_UPDATED_ITEM.status,
                message: message.SUCCESS_UPDATED_ITEM.message,
                usuario: dadosEnderecoUsuario
            }

            return dadosEnderecoUsuarioJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }

}

const ctlAterarSenha = async (dados) => {

    if (
        dados.id == null || dados.id == undefined || isNaN(dados.id) ||
        dados.password == null || dados.password == undefined || dados.password > 256
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultStatus = await usuarioDAO.mdlAlterPassword(dados.id, dados.password)

        if (resultStatus) {

            let dadosUsuario = await usuarioDAO.mdlSelectUsuarioByID(dados.id)

            let dadosEnderecoUsuarioJSON = {
                status: message.SUCCESS_UPDATED_ITEM.status,
                message: message.SUCCESS_UPDATED_ITEM.message,
                usuario: dadosUsuario
            }

            return dadosEnderecoUsuarioJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }

}

module.exports = {
    ctlGetUsuario,
    ctlInserirEnderecoUsuario,
    ctlGetUsuarioByID,
    ctlAtalizarEnderecoUsuario,
    ctlAterarSenha
}
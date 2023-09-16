/**************************************************************************************
 *  Objetivo: Responsável por controlar generos preferidos do usuario
 *  Autor: Luiz Gustavo e Felipe Graciano
 *  Data: 13/09/2023
 *  Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js')

var usuarioGeneroDAO = require('../model/model_usuario-genero.js')
var usuarioDAO = require('../model/model_usuario.js')
var generoDAO = require('../model/model_genero.js')

const ctlGetGeneros = async () => {
    let dadosGeneros = await generoDAO.mdlSelectAllGenero()

    if (dadosGeneros) {

        let dadosGenerosJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosGeneros.length,
            dados: dadosGeneros
        }

        return dadosGenerosJSON
    } else {
        return message.ERROR_INTERNAL_SERVER
    }
}

const ctlGetGenerosPreferidosByIdUsuario = async (idUsuario) => {
    if (idUsuario == '' || isNaN(idUsuario) || idUsuario == undefined) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosGenerosPreferidos = await usuarioGeneroDAO.mdlSelectGeneroPreferidoByIdUsuario(idUsuario)

        if (dadosGenerosPreferidos) {

            let dadosGenerosJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                quantidade: dadosGenerosPreferidos.length,
                generos_preferidos: dadosGenerosPreferidos
            }

            return dadosGenerosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const ctlInserirUsuarioGenero = async (dadosGenerosPreferidos) => {
    if (
        dadosGenerosPreferidos.id_usuario == '' || dadosGenerosPreferidos.id_usuario == null || dadosGenerosPreferidos.id_usuario == undefined ||
        isNaN(dadosGenerosPreferidos.id_usuario) || dadosGenerosPreferidos.generos_preferidos == '' || dadosGenerosPreferidos.generos_preferidos == null ||
        dadosGenerosPreferidos.generos_preferidos == undefined || typeof (dadosGenerosPreferidos.generos_preferidos) != 'object'
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let listaGenerosAdicionados = []

        for (let index = 0; index < dadosGenerosPreferidos.generos_preferidos.length; index++) {
            const element = dadosGenerosPreferidos.generos_preferidos[index];

            await usuarioGeneroDAO.mdlInsertUsuarioGenero(dadosGenerosPreferidos.id_usuario, element.id)

            let generoAdicionado = await usuarioGeneroDAO.mdlSelectGeneroPreferidoLastID(dadosGenerosPreferidos.id_usuario)

            listaGenerosAdicionados.push(generoAdicionado[0])
        }

        let dadosUsuario = await usuarioDAO.mdlSelectUsuarioByID(dadosGenerosPreferidos.id_usuario)

        if (listaGenerosAdicionados.length > 0) {
            let dadosJSON = {
                status: message.SUCCESS_CREATED_ITEM.status,
                message: message.SUCCESS_CREATED_ITEM.message,
                usuario: {
                    id: dadosUsuario[0].id,
                    nome: dadosUsuario[0].nome,
                    cpf: dadosUsuario[0].cpf,
                    data_nascimento: dadosUsuario[0].data_nascimento,
                    data_criacao: dadosUsuario[0].data_criacao,
                    email: dadosUsuario[0].email,
                    foto: dadosUsuario[0].foto
                },
                generos_preferidos_adicionados: listaGenerosAdicionados
            }

            return dadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const ctlAtualizarGenerosPreferidosByIdUsuario = async (dadosGenerosPreferidos) => {
    if (
        dadosGenerosPreferidos.id_usuario == '' || dadosGenerosPreferidos.id_usuario == null || dadosGenerosPreferidos.id_usuario == undefined || isNaN(dadosGenerosPreferidos.id_usuario) ||
        isNaN(dadosGenerosPreferidos.id_usuario) || dadosGenerosPreferidos.generos_preferidos == '' || dadosGenerosPreferidos.generos_preferidos == null ||
        dadosGenerosPreferidos.generos_preferidos == undefined || typeof (dadosGenerosPreferidos.generos_preferidos) != 'object'
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (dadosGenerosPreferidos.length == 0) {
        let excluirGenerosPreferidos = await usuarioGeneroDAO.mdlDelteGenerosPreferidosByIdUsuario(dadosGenerosPreferidos.id_usuario)

        if (excluirGenerosPreferidos) {
            return message.SUCCESS_UPDATED_ITEM
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    } else {
        let excluirGenerosPreferidos = await usuarioGeneroDAO.mdlDelteGenerosPreferidosByIdUsuario(dadosGenerosPreferidos.id_usuario)

        if (excluirGenerosPreferidos) {
            let listaGenerosAdicionados = []

            for (let index = 0; index < dadosGenerosPreferidos.generos_preferidos.length; index++) {
                const element = dadosGenerosPreferidos.generos_preferidos[index];

                await usuarioGeneroDAO.mdlInsertUsuarioGenero(dadosGenerosPreferidos.id_usuario, element.id)

                let generoAdicionado = await usuarioGeneroDAO.mdlSelectGeneroPreferidoLastID(dadosGenerosPreferidos.id_usuario)

                listaGenerosAdicionados.push(generoAdicionado[0])
            }
            let dadosUsuario = await usuarioDAO.mdlSelectUsuarioByID(dadosGenerosPreferidos.id_usuario)

            if (listaGenerosAdicionados.length > 0) {
                let dadosJSON = {
                    status: message.SUCCESS_UPDATED_ITEM.status,
                    message: message.SUCCESS_UPDATED_ITEM.message,
                    usuario: {
                        id: dadosUsuario[0].id,
                        nome: dadosUsuario[0].nome,
                        cpf: dadosUsuario[0].cpf,
                        data_nascimento: dadosUsuario[0].data_nascimento,
                        data_criacao: dadosUsuario[0].data_criacao,
                        email: dadosUsuario[0].email,
                        foto: dadosUsuario[0].foto
                    },
                    generos_preferidos_adicionados: listaGenerosAdicionados
                }
    
                return dadosJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }

        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    ctlGetGeneros,
    ctlGetGenerosPreferidosByIdUsuario,
    ctlInserirUsuarioGenero,
    ctlAtualizarGenerosPreferidosByIdUsuario
}

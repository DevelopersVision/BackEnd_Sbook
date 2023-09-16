//Modelo MVC (Model View controller)
/*****
 * Objetivo: Responsável pela regra de negócios referente ao crud de endereco
 * Data : 31/08/2023
 * Autor: Felipe Graciano and Luiz Gustavo
 * Versão : 1.0
 * ******************************************************************************************* */

var message = require('./modulo/config.js')

//imports para as funções de esqueci senha e recuperar conta
const usuarioDAO = require('../model/model_usuario.js')
const crypto = require('crypto')
const mailer = require('./modulo/mailer')
const moment = require('moment')
const usuarioTemporarioDAO = require('../model/model.usuario-temporario.js')

const ctlEsqueciSenha = async (email) => {
    const user = await usuarioDAO.selectByEmail(email)

    let id = user[0].id

    if (!user) {
        return message.ERROR_INVALID_EMAIL
    } else {
        const token = crypto.randomInt(1000, 9999)

        const now = moment().add(10, 'minutes').format("YYYY-MM-DD HH:mm:ss")

        await usuarioDAO.mdlUpdateForgotPasswordUsuario(token, now, id)

        let returnFunction = mailer.transport.sendMail({
            to: email,
            from: 'developersvision2023@gmail.com',
            replyTo: 'developersvision2023@gmail.com',
            subject: 'Recuperação de conta',
            template: 'forgotPassword',
            context: { token }
        }).then(info => {
            info.status = 200;
            return info
        }).catch(error => {
            return error
        })

        return returnFunction
    }
}

const ctlValidarToken = async (dados) => {
    let returnFunction;

    if (
        dados.email == null || dados.email == undefined || dados.email.lenth > 255 ||
        dados.token == null || dados.token == undefined || isNaN(dados.token)
    ) {
        returnFunction = message.ERROR_REQUIRE_FIELDS
    } else {
        let checkEmail = await usuarioDAO.selectByEmail(dados.email)

        const now = moment().format("HH:mm")
        const token_expiress = moment(checkEmail[0].senha_reset_expiracao).add(3, 'hours').format("HH:mm:ss")

        if (!checkEmail) {
            returnFunction = message.ERROR_INVALID_EMAIL
        } else if (checkEmail[0].senha_reset_token != dados.token) {
            returnFunction = message.ERROR_INVALID_TOKEN
        } else if (checkEmail[0].senha_reset_token == dados.token && now < token_expiress) {
            message.SUCCESS_VALID_TOKEN.id = checkEmail[0].id
            returnFunction = message.SUCCESS_VALID_TOKEN
        } else if (now > token_expiress) {
            returnFunction = message.ERROR_TOKEN_EXPIRADO
        } else {
            returnFunction = message.ERROR_INTERNAL_SERVER
        }
    }
    return returnFunction
}

const ctlValidarEmail = async (email) => {
    const token = crypto.randomInt(1000, 9999)
    const now = moment().add(10, 'minutes').format("YYYY-MM-DD HH:mm:ss")

    const existingEmail = await usuarioTemporarioDAO.mdlSelectUsuarioTemporarioByEmail(email)

    if(existingEmail){
        await usuarioTemporarioDAO.mdlDeleteUsuarioTemporarioById(existingEmail[0].id)
    }

    let insertUserTemp = await usuarioTemporarioDAO.mdlInsertUsuarioTemporario(email, token, now)

    if(insertUserTemp){
        let dados = await usuarioTemporarioDAO.mdlSelectLastID()

        let returnFunction = mailer.transport.sendMail({
            to: email,
            from: 'developersvision2023@gmail.com',
            replyTo: 'developersvision2023@gmail.com',
            subject: 'Verificação de e-mail da nova Conta Sbook',
            template: 'verifyAccount',
            context: { token }
        }).then(info => {
            info.status = 200;
            return info
        }).catch(error => {
            return error
        })

        let returnJSON = {
            status: message.SUCCESS_REQUEST.status,
            id: dados[0].id,
            email: dados[0].email,
            dadosEnvioEmal: await returnFunction
        }
    
        return returnJSON
    }
}

const ctlValidarTokenEmailTemp = async (dados) => {
    let returnFunction;

    if (
        dados.id == null || dados.id == undefined || isNaN(dados.id) ||
        dados.token == null || dados.token == undefined || isNaN(dados.token)
    ) {
        returnFunction = message.ERROR_REQUIRE_FIELDS
    } else {
        let checkEmail = await usuarioDAO.selectByEmail(dados.email)

        let checkToken = await usuarioTemporarioDAO.mdlSelectUsuarioTemporarioByIdAndToken(dados.id, dados.token)

        const now = moment().format("HH:mm")
        const token_expiress = moment(checkToken[0].token_expiress).add(3, 'hours').format("HH:mm:ss")

        if (checkEmail) {
            await usuarioTemporarioDAO.mdlDeleteUsuarioTemporarioById(dados.id)

            returnFunction = message.ERROR_EXISTING_EMAIL
        } else if (checkToken[0].token != dados.token) {
            returnFunction = message.ERROR_INVALID_TOKEN
        } else if (checkToken[0].token == dados.token && now < token_expiress) {
            await usuarioTemporarioDAO.mdlDeleteUsuarioTemporarioById(dados.id)

            returnFunction = message.SUCCESS_VALID_TOKEN
        } else if (now > token_expiress) {
            returnFunction = message.ERROR_TOKEN_EXPIRADO
        } else {
            returnFunction = message.ERROR_INTERNAL_SERVER
        }
    }
    return returnFunction
}


module.exports = {
    ctlEsqueciSenha,
    ctlValidarToken,

    ctlValidarEmail,
    ctlValidarTokenEmailTemp
}
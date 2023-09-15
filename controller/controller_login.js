//Modelo MVC (Model View controller)
/*****
 * Objetivo: Responsável pela regra de negócios referente ao crud de endereco
 * Data : 31/08/2023
 * Autor: Felipe Graciano and Luiz Gustavo
 * Versão : 1.0
 * ******************************************************************************************* */

var message = require('./modulo/config.js')

var loginDAO = require('../model/model_login.js')

//Import biblioteca que gera e valida autenticidade do jwt
var jwt = require('../middleware/middlewareJWT.js')

const ctlAutenticarUsuarioByEmailAndSenha = async function (email, senha) {
    if (email == null || email == undefined || email == '' || email.length > 255 ||
        senha == null || senha == undefined || senha == ''
    ) {
        return message.ERROR_INVALID_EMAIL_SENHA
    } else {
        let dadosUsuarioJSON = {}

        let dadosUsuario = await loginDAO.mdlSelectUsuarioByEmailAndSenha(email, senha)

        if (dadosUsuario) {

            //Gera o token pelo jwt
            let tokenUser = await jwt.createJWT(dadosUsuario.id);
            //Adiciona uma chave np json com o token do usuario
            dadosUsuarioJSON.token = tokenUser;

            dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
            dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
            dadosUsuarioJSON.usuario = dadosUsuario[0]

            return dadosUsuarioJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

module.exports = {
    ctlAutenticarUsuarioByEmailAndSenha
}
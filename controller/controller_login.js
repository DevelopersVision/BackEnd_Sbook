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
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosUsuarioJSON = {}

        let dadosUsuario = await loginDAO.mdlSelectUsuarioByEmailAndSenha(email, senha)
        console.log(dadosUsuario);

        if (dadosUsuario && dadosUsuario[0].status_usuario == true) {
            //Gera o token pelo jwt
            let tokenUser = await jwt.createJWT(dadosUsuario.id);
            //Adiciona uma chave np json com o token do usuario
            dadosUsuarioJSON.token = tokenUser;

            dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
            dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
            dadosUsuarioJSON.usuario = dadosUsuario

            return dadosUsuarioJSON
        } else if(dadosUsuario && dadosUsuario[0].status_usuario == false) {
            return message.ERROR_USUARIO_DESATIVADO
        } else {
            return message.ERROR_INVALID_EMAIL_SENHA
        }
    }
}

module.exports = {
    ctlAutenticarUsuarioByEmailAndSenha
}
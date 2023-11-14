//Modelo MVC (Model View controller)
/*****
 * Objetivo: Responsável pela regra de negócios referente ao crud de endereco
 * Data : 31/08/2023
 * Autor: Felipe Graciano and Luiz Gustavo
 * Versão : 1.0
 * ******************************************************************************************* */

var message = require('./modulo/config.js')

var loginDAO = require('../model/model_login.js')
var controllerUsuarioGenero = require('./controller_usuario-genero.js')
var controllerAnuncios = require('./controller_anuncio.js')

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

        if (dadosUsuario && dadosUsuario[0].status_usuario == true) {
            //Gera o token pelo jwt
            let tokenUser = await jwt.createJWT(dadosUsuario.id);

            //Adiciona uma chave np json com o token do usuario
            dadosUsuarioJSON.token = tokenUser;

            let dados = dadosUsuario[0]

            let generos = await controllerUsuarioGenero.ctlGetGenerosPreferidosByIdUsuario(dados.id_usuario)

            let jsonUsuario = {
                usuario: {
                    id: dados.id_usuario,
                    nome: dados.nome,
                    telefone: dados.telefone,
                    cpf: dados.cpf,
                    data_nascimento: dados.data_nascimento,
                    data_criacao: dados.data_criacao,
                    email: dados.email,
                    status_usuario: dados.status_usuario,
                    foto: dados.foto
                },
                endereco: {
                    id: dados.id_endereco,
                    cep: dados.cep,
                    logradouro: dados.logradouro,
                    bairro:dados.bairro,
                    cidade: dados.cidade,
                    estado: dados.estado
                },
                generos: generos.generos_preferidos
            }

            dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
            dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
            dadosUsuarioJSON.usuario = jsonUsuario

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
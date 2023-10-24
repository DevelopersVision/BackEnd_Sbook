/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud de idioma
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

 var message = require('./modulo/config.js')

 const idiomasDAO = require('../model/estatico/model_estaticos.js')
 
 const ctlGetIdiomas = async function () {
     let dadosIdiomaJSON = {};
 
     //chama a funçao que ira retornar todos os registros do banco de dados
     let dadosIdioma = await idiomasDAO.mdlSelectAllIdiomas()
 
     if (dadosIdioma) {
         //criando um JSon com o atributo enderecos, para encaminhar um array de alunos
         dadosIdiomaJSON.status = message.SUCCESS_REQUEST.status
         dadosIdiomaJSON.quantidade = dadosIdioma.length
         dadosIdiomaJSON.idiomas = dadosIdioma
         return dadosIdiomaJSON
     } else {
         return message.ERROR_REGISTER_NOT_FOUND
     }
 }
 
 
 module.exports = {
     ctlGetIdiomas
 }
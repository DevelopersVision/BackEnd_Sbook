/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud de editora
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

 var message = require('./modulo/config.js')

 const editorasDAO = require('../model/model_editora.js')
 
 const ctlgetEditora = async function () {
     let dadosEditoraJSON = {};
 
     //chama a funçao que ira retornar todos os registros do banco de dados
     let dadosEditora = await editorasDAO.mdlSelectAllEditora()
 
     if (dadosEditora) {
         //criando um JSon com o atributo enderecos, para encaminhar um array de alunos
         dadosEditoraJSON.status = message.SUCCESS_REQUEST.status
         dadosEditoraJSON.quantidade = dadosEditora.length
         dadosEditoraJSON.editoras = dadosEditora
         return dadosEditoraJSON
     } else {
         return message.ERROR_REGISTER_NOT_FOUND
     }
 }
 
 
 module.exports = {
     ctlgetEditora
 }
/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud dos anúncios favoritados do usuário
 *  Autor: Felipe Graciano
 *  Data: 25/09/2023
 *  Versão: 1.0
 **************************************************************************************/

 var message = require('./modulo/config.js')

 var anunciosFavoritadosDAO = require('../model/model_anuncio_favoritados.js')

 const ctlGetAnunciosFavoritosDoUsuario = async (idUsuario) => {
    if(idUsuario == ''|| idUsuario == null || idUsuario == undefined || isNaN(idUsuario)){
        return message.ERROR_INVALID_ID
    } else {
        let dadosAnunciosFavoritados = await anunciosFavoritadosDAO.mdlSelectAnunciosFavoritosDoUsuario(idUsuario)

        if (dadosAnunciosFavoritados) {

            let anunciosFavotitadosJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                quantidade: dadosAnunciosFavoritados.length,
                anuncios_favoritados: dadosAnunciosFavoritados
            }

            return anunciosFavotitadosJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
 }


 const ctlInserirAnuncioAosFavoritos = async (dadosBody) =>{
    if(dadosBody.id_usuario == null || dadosBody.id_usuario == undefined || dadosBody.id_usuario == '' || isNaN(dadosBody.id_usuario) ||
    dadosBody.id_anuncio == null || dadosBody.id_anuncio == undefined || dadosBody.id_anuncio == ''|| isNaN(dadosBody.id_anuncio)
    ){
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultDadosAnuncio = await anunciosFavoritadosDAO.mdlInsertAnuncioParaFavoritos(dadosBody)

        if(resultDadosAnuncio){
            let dadosAnuncioJSON = {}
            dadosAnuncioJSON.status = message.SUCCESS_CREATED_ITEM.status
            dadosAnuncioJSON.message = message.SUCCESS_CREATED_ITEM.message

            return dadosAnuncioJSON
        } else {
            return message.ERROR_INTERNAL_SYSTEM
        }
    }

 }

 const ctlDeletarAnuncioDosFavoritos = async (dadosBody) =>{
    if(dadosBody.id_usuario == null || dadosBody.id_usuario == undefined || dadosBody.id_usuario == '' || isNaN(dadosBody.id_usuario) ||
    dadosBody.id_anuncio == null || dadosBody.id_anuncio == undefined || dadosBody.id_anuncio == ''|| isNaN(dadosBody.id_anuncio)
    ){
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultDadosAnuncio = await anunciosFavoritadosDAO.mdlDeleteAnuncioDosFavoritos(dadosBody)

        if(resultDadosAnuncio){
            let dadosAnuncioJSON = {}
            dadosAnuncioJSON.status = message.SUCCESS_DELETED_ITEM.status
            dadosAnuncioJSON.message = message.SUCCESS_DELETED_ITEM.message

            return dadosAnuncioJSON
        } else {
            return message.ERROR_INTERNAL_SYSTEM
        }
    }

 }

 module.exports = {
    ctlGetAnunciosFavoritosDoUsuario,
    ctlInserirAnuncioAosFavoritos,
    ctlDeletarAnuncioDosFavoritos
 }
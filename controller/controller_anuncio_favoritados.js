/**************************************************************************************
*  Objetivo: Responsável pela regra de negócios referente ao crud dos anúncios favoritados do usuário
*  Autor: Felipe Graciano
*  Data: 25/09/2023
*  Versão: 1.0
**************************************************************************************/

var message = require('./modulo/config.js')

var anunciosFavoritadosDAO = require('../model/model_anuncio_favoritados.js')
var anuncioGeneroDAO = require('../model/model_anuncio-genero.js')
var anuncioTipoAnuncio = require('../model/model_anuncio-tipo-anuncio.js')
var anuncioAutor = require('../model/model_anuncio_autor.js')
var anuncioFotoDAO = require('../model/model_foto.js')

 const ctlGetAnunciosFavoritosDoUsuario = async (idUsuario) => {
    if(idUsuario == ''|| idUsuario == null || idUsuario == undefined || isNaN(idUsuario)){
        return message.ERROR_INVALID_ID
    } else {
        let dadosAnunciosFavoritados = await anunciosFavoritadosDAO.mdlSelectAnunciosFavoritosDoUsuario(idUsuario)

        if (dadosAnunciosFavoritados) {

            let listaAnuncios = []

            for (let index = 0; index < dadosAnunciosFavoritados.length; index++) {
                const anuncio = dadosAnunciosFavoritados[index];

    
                let generosAnuncio = await anuncioGeneroDAO.mdlSelectGeneroByIdAnuncio(anuncio.id_anuncio)
                let tiposAnuncio = await anuncioTipoAnuncio.mdlSelectTipoAnuncioByIdAnuncio(anuncio.id_anuncio)
                let autoresAnuncio = await anuncioAutor.mdlSelectAutorByIdAnuncio(anuncio.id_anuncio)
                let fotosAnuncio = await anuncioFotoDAO.mdlSelectFotoByIdAnuncio(anuncio.id_anuncio)
    
                let anuncioJSON = {
                    anuncio: {
                        id: anuncio.id_anuncio,
                        nome: anuncio.nome_livro,
                        ano_lancamento: anuncio.ano_lancamento,
                        data_criacao: anuncio.data_criacao,
                        status_anuncio: anuncio.status_anuncio,
                        edicao: anuncio.edicao,
                        preco: anuncio.preco,
                        descricao: anuncio.descricao,
                        numero_paginas: anuncio.numero_paginas,
                        anunciante: anuncio.anunciante
                    },
                    idioma: {
                        id: anuncio.id_idioma,
                        nome: anuncio.nome_idioma
                    },
                    endereco: {
                        estado: anuncio.estado,
                        cidade: anuncio.cidade,
                        bairro: anuncio.bairro
                    },
                    estado_livro: {
                        id: anuncio.id_estado_livro,
                        estado: anuncio.estado_livro
                    },
                    editora: {
                        id: anuncio.id_editora,
                        nome: anuncio.nome_editora
                    },
                    foto: fotosAnuncio,
                    generos: generosAnuncio,
                    tipo_anuncio: tiposAnuncio,
                    autores: autoresAnuncio
                }
    
                listaAnuncios.push(anuncioJSON)
            }
    
            let dadosAnuncioJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                quantidae: listaAnuncios.length,
                anuncios: listaAnuncios
            }
    
            return dadosAnuncioJSON
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
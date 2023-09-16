/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud de anuncio
 *  Autor: Luiz Gustavo
 *  Data: 15/09/2023
 *  Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js')
var anuncioDAO = require('../model/model_anuncio.js')

const ctlGetAnuncios = async () => {
    let dadosAnuncio = await anuncioDAO.mdlSelectAllAnuncio()

    if(dadosAnuncio){
        let listaAnuncios = []

        dadosAnuncio.forEach(anuncio => {
            let anuncioJSON = {
                anuncio: {
                    id: anuncio.id,
                    nome: anuncio.nome,
                    ano_lancamento: anuncio.ano_lancamento,
                    data_criacao: anuncio.data_criacao,
                    status_anuncio: anuncio.status_anuncio,
                    edicao: anuncio.edicao,
                    preco: anuncio.preco,
                    descricao: anuncio.descricao,
                    numero_paginas: anuncio.numero_paginas,
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
                }
            }

            listaAnuncios.push(anuncioJSON)
        });

        let dadosAnuncioJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidae: listaAnuncios.length,
            anuncios: listaAnuncios
        }

        return dadosAnuncioJSON
    }else{
        return message.ERROR_INTERNAL_SERVER
    }   
}


module.exports = {
    ctlGetAnuncios
}
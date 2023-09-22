/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud de anuncio
 *  Autor: Luiz Gustavo
 *  Data: 15/09/2023
 *  Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js')
var anuncioDAO = require('../model/model_anuncio.js')
var anuncioGeneroDAO = require('../model/model_anuncio-genero.js')
var anuncioTipoAnuncio = require('../model/model_anuncio-tipo-anuncio.js')
var anuncioAutor = require('../model/model_anuncio_autor.js')
var anuncioFotoDAO = require('../model/model_foto.js')

const ctlGetAnuncios = async () => {
    let dadosAnuncio = await anuncioDAO.mdlSelectAllAnuncio()

    if (dadosAnuncio) {
        let listaAnuncios = []

        for (let index = 0; index < dadosAnuncio.length; index++) {
            const anuncio = dadosAnuncio[index];

            let generosAnuncio = await anuncioGeneroDAO.mdlSelectGeneroByIdAnuncio(anuncio.id)
            let tiposAnuncio = await anuncioTipoAnuncio.mdlSelectTipoAnuncioByIdAnuncio(anuncio.id)
            let autoresAnuncio = await anuncioAutor.mdlSelectAutorByIdAnuncio(anuncio.id)
            let fotosAnuncio = await anuncioFotoDAO.mdlSelectFotoByIdAnuncio(anuncio.id)

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
                    numero_paginas: anuncio.numero_paginas
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

const ctlGetAnuncioByID = async (idAnuncio) => {

    if (
        idAnuncio == "" || idAnuncio == null || idAnuncio == undefined || isNaN(idAnuncio)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosAnuncio = await anuncioDAO.mdlSelectAnuncioById(idAnuncio)

        if (dadosAnuncio) {
            const anuncio = dadosAnuncio[0];

            let generosAnuncio = await anuncioGeneroDAO.mdlSelectGeneroByIdAnuncio(anuncio.id)
            let tiposAnuncio = await anuncioTipoAnuncio.mdlSelectTipoAnuncioByIdAnuncio(anuncio.id)
            let autoresAnuncio = await anuncioAutor.mdlSelectAutorByIdAnuncio(anuncio.id)
            let fotosAnuncio = await anuncioFotoDAO.mdlSelectFotoByIdAnuncio(anuncio.id)

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
                    numero_paginas: anuncio.numero_paginas
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


            let dadosAnuncioJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                anuncios: anuncioJSON
            }

            return dadosAnuncioJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    ctlGetAnuncios,
    ctlGetAnuncioByID
}
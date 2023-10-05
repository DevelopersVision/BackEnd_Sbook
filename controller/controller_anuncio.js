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
var usuarioDAO = require('../model/model_usuario.js')

const ctlGetAnuncios = async (page) => {
    let dadosAnuncio = await anuncioDAO.mdlSelectAllAnuncio(page)

    if(page == null || page == undefined){
        return message.ERROR_REQUIRE_FIELDS
    }else{
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
                        numero_paginas: anuncio.numero_paginas,
                        anunciante: anuncio.id_anunciante
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
                    quantidade: listaAnuncios.length,
                    anuncios: listaAnuncios
                }   
    
    
            return dadosAnuncioJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
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
                    numero_paginas: anuncio.numero_paginas,
                    anunciante: anuncio.id_anunciante
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

const ctlGetAnuncioByIdUsuario = async (idUsuario, page) => {

    if (idUsuario == "" || idUsuario == null || idUsuario == undefined) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificarUsuario = await usuarioDAO.mdlSelectUsuarioByID(idUsuario)

        console.log(verificarUsuario);
        if (!verificarUsuario) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosAnuncio = await anuncioDAO.mdlSelectAnuncioByIdUsuario(idUsuario, page)

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
                    quantidade: listaAnuncios.length,
                    anuncios: listaAnuncios
                }

                return dadosAnuncioJSON
            } else if (dadosAnuncio == false) {
                return message.ERROR_INTERNAL_SERVER
            } else {
                let listaAnuncios = []

                let dadosAnuncioJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    quantidade: listaAnuncios.length,
                    anuncios: []
                }

                return dadosAnuncioJSON
            }
        }
    }
}

const ctlGetAnuncioByLocalizacao = async (bairro, cidade, estado, page ) => {

    if(
        bairro == "" || bairro == null || bairro == undefined ||
        cidade == "" || cidade == null || cidade == undefined ||
        estado == "" || estado == null || estado == undefined ||
        page == undefined || page == null
    ){

        let dadosAnuncio = await anuncioDAO.mdlSelectAnuncioByLocalização(bairro, cidade, estado, page)

        if(!dadosAnuncio){
            return message.ERROR_REGISTER_NOT_FOUND
        }else{


            
        }
    }
}

const ctlInserirAnuncio = async (dadosAnuncio) => {
    if (
        dadosAnuncio.nome == "" || dadosAnuncio.nome == null || dadosAnuncio.nome == undefined || dadosAnuncio.nome.length > 200 ||
        dadosAnuncio.numero_paginas == "" ||
        dadosAnuncio.ano_lancamento == "" || dadosAnuncio.ano_lancamento == null || dadosAnuncio.ano_lancamento == undefined ||
        dadosAnuncio.descricao == "" || dadosAnuncio.descricao == null || dadosAnuncio.descricao == undefined ||
        dadosAnuncio.edicao == "" ||
        dadosAnuncio.isbn == "" ||
        dadosAnuncio.preco == "" ||
        dadosAnuncio.id_usuario == "" || dadosAnuncio.id_usuario == null || dadosAnuncio.id_usuario == undefined || isNaN(dadosAnuncio.id_usuario) ||
        dadosAnuncio.id_estado_livro == "" || dadosAnuncio.id_estado_livro == null || dadosAnuncio.id_estado_livro == undefined || isNaN(dadosAnuncio.id_estado_livro) ||
        dadosAnuncio.id_idioma == "" || dadosAnuncio.id_idioma == null || dadosAnuncio.id_idioma == undefined || isNaN(dadosAnuncio.id_idioma) ||
        dadosAnuncio.id_editora == "" || dadosAnuncio.id_editora == null || dadosAnuncio.id_editora == undefined || isNaN(dadosAnuncio.id_editora)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let


    }


}

/*
    nome,
    numero_paginas null,
    ano_lancamento,
    descricao,
    data_criacao,
    edicao null,
    isbn null,
    preco null,
    id_usuario,
    id_estado_livro,
    id_idioma,
    id_editora

    id_anuncio
    id_autor

    id_anuncio
    id_genero

    id_anuncio
    id_tipo_anuncio
*/

module.exports = {
    ctlGetAnuncios,
    ctlGetAnuncioByID,
    ctlGetAnuncioByIdUsuario
}
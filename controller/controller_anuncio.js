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
var anuncioEditoraDAO = require('../model/model_anuncio_editora.js')

const ctlGetAnunciosParaFeed = async (page) => {
    let dadosAnuncio = await anuncioDAO.mdlSelectAnuncioForTheFeed(page)

    if (dadosAnuncio) {
        let listaAnuncios = []

        for (let i = 0; i < dadosAnuncio.length; i++) {
            const anuncio = dadosAnuncio[i];

            let autoresAnuncio = await anuncioAutor.mdlSelectAutorByIdAnuncio(anuncio.id)
            let fotosAnuncio = await anuncioFotoDAO.mdlSelectFotoByIdAnuncio(anuncio.id)

            let anuncioJSON = {
                anuncio: {
                    id: anuncio.id,
                    nome: anuncio.nome,
                    id: anuncio.id,
                    nome: anuncio.nome,
                    ano_lancamento: anuncio.ano_lancamento,
                    data_criacao: anuncio.data_criacao,
                    status_anuncio: anuncio.status_anuncio,
                    preco: anuncio.preco,
                    anunciante: anuncio.id_usuario
                },
                estado_livro: {
                    id: anuncio.id_estado_livro,
                    estado: anuncio.estado_livro
                },
                foto: fotosAnuncio,
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

const ctlGetAnuncioPage = async (page) => {
    let dadosAnuncio = await anuncioDAO.mdlSelectAnuncioPage(page)

    if (page == null || page == undefined) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
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
                page: parseInt(page),
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

const ctlGetAnuncioByIdUsuario = async (idUsuario) => {

    if (idUsuario == "" || idUsuario == null || idUsuario == undefined) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let verificarUsuario = await usuarioDAO.mdlSelectUsuarioByID(idUsuario)

        if (!verificarUsuario) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosAnuncio = await anuncioDAO.mdlSelectAnuncioByIdUsuario(idUsuario)

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

const ctlGetAnuncioByLocalizacao = async (bairro, cidade, estado, page) => {

    if (
        bairro == "" || bairro == null || bairro == undefined ||
        cidade == "" || cidade == null || cidade == undefined ||
        estado == "" || estado == null || estado == undefined ||
        page == undefined || page == null
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let dadosAnuncio = await anuncioDAO.mdlSelectAnuncioByLocalização(bairro, cidade, estado, page)

        if (!dadosAnuncio) {
            return message.ERROR_REGISTER_NOT_FOUND
        } else {
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
                        anunciante: anuncio.id_anunciantes
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
        }
    }
}

const ctlInserirAnuncio = async (dadosAnuncio) => {
    if (
        dadosAnuncio.nome == "" || dadosAnuncio.nome == null || dadosAnuncio.nome == undefined || dadosAnuncio.nome.length > 200 ||
        dadosAnuncio.numero_paginas == "" ||
        dadosAnuncio.ano_lancamento == "" || dadosAnuncio.ano_lancamento == null || dadosAnuncio.ano_lancamento == undefined ||
        dadosAnuncio.descricao == "" || dadosAnuncio.descricao == null || dadosAnuncio.descricao == undefined ||
        dadosAnuncio.id_usuario == "" || dadosAnuncio.id_usuario == null || dadosAnuncio.id_usuario == undefined || isNaN(dadosAnuncio.id_usuario) ||
        dadosAnuncio.id_estado_livro == "" || dadosAnuncio.id_estado_livro == null || dadosAnuncio.id_estado_livro == undefined || isNaN(dadosAnuncio.id_estado_livro) ||
        dadosAnuncio.id_idioma == "" || dadosAnuncio.id_idioma == null || dadosAnuncio.id_idioma == undefined || isNaN(dadosAnuncio.id_idioma) ||
        dadosAnuncio.id_editora == "" || dadosAnuncio.id_editora == null || dadosAnuncio.id_editora == undefined ||
        dadosAnuncio.fotos == "" || dadosAnuncio.fotos == null || dadosAnuncio.fotos == undefined || dadosAnuncio.fotos.length == 0 ||
        dadosAnuncio.tipos_anuncio == null || dadosAnuncio.tipos_anuncio == "" || dadosAnuncio.tipos_anuncio.length == 0 || dadosAnuncio.tipos_anuncio == undefined ||
        dadosAnuncio.generos == null || dadosAnuncio.generos == undefined || dadosAnuncio.generos == "" || dadosAnuncio.generos.length == 0 ||
        dadosAnuncio.autores == null || dadosAnuncio.autores == undefined || dadosAnuncio.autores == "" || dadosAnuncio.autores.length == 0
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else if (dadosAnuncio.tipos_anuncio.length > 2) {
        return message.ERRO_INVALID_LENGTH_TIPO
    } else {
        let idEditora = await anuncioEditoraDAO.checkAnuncioEditora(dadosAnuncio.id_editora)

        dadosAnuncio.id_editora = idEditora
        let dadosAnuncioPrincipal = await anuncioDAO.mdlInsertAnuncio(dadosAnuncio)

        if (dadosAnuncioPrincipal) {
            let novoAnuncio = await anuncioDAO.mdlSelectAnuncioFromLastId()

            await anuncioAutor.mdlInsertAnuncioAutorScale(novoAnuncio[0].id, dadosAnuncio.autores)
            await anuncioFotoDAO.mdlInsertFotoScale(novoAnuncio[0].id, dadosAnuncio.fotos)
            await anuncioGeneroDAO.mdlInsertIdAnuncioIdGeneroScale(novoAnuncio[0].id, dadosAnuncio.generos)
            await anuncioTipoAnuncio.mdlInsertIdAnuncioIdTipoAnuncioScale(novoAnuncio[0].id, dadosAnuncio.tipos_anuncio)

            let dadosNovoAnuncio = await ctlGetAnuncioByID(novoAnuncio[0].id)

            let dadosAnuncioJSON = {
                status: message.SUCCESS_CREATED_ITEM.status,
                message: message.SUCCESS_CREATED_ITEM.message,
                anuncio_novo: dadosNovoAnuncio.anuncios
            }

            return dadosAnuncioJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}


const ctlGetAnunciosThenFilterByEstadoAndGenero = async (array_estado_livro, arrayGeneros) => {

    if (array_estado_livro == null || array_estado_livro == undefined || array_estado_livro == "" ||
        arrayGeneros == null || arrayGeneros == undefined || arrayGeneros == ""
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {


        let dadosAnuncio = await anuncioDAO.mdlSelectsAlAnunciosThenFilter();

        if (dadosAnuncio) {
            let listaAnuncios = [];

            for (let index = 0; index < dadosAnuncio.length; index++) {
                const anuncio = dadosAnuncio[index];

                let generosAnuncio = await anuncioGeneroDAO.mdlSelectGeneroByIdAnuncio(anuncio.id);
                let tiposAnuncio = await anuncioTipoAnuncio.mdlSelectTipoAnuncioByIdAnuncio(anuncio.id);
                let autoresAnuncio = await anuncioAutor.mdlSelectAutorByIdAnuncio(anuncio.id);
                let fotosAnuncio = await anuncioFotoDAO.mdlSelectFotoByIdAnuncio(anuncio.id);

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
                        anunciante: anuncio.id_anunciante,
                    },
                    idioma: {
                        id: anuncio.id_idioma,
                        nome: anuncio.nome_idioma,
                    },
                    endereco: {
                        estado: anuncio.estado,
                        cidade: anuncio.cidade,
                        bairro: anuncio.bairro,
                    },
                    estado_livro: {
                        id: anuncio.id_estado_livro,
                        estado: anuncio.estado_livro,
                    },
                    editora: {
                        id: anuncio.id_editora,
                        nome: anuncio.nome_editora,
                    },
                    foto: fotosAnuncio,
                    generos: generosAnuncio,
                    tipo_anuncio: tiposAnuncio,
                    autores: autoresAnuncio,
                };



                if (
                    array_estado_livro.includes(anuncio.estado_livro) &&
                    Array.from(generosAnuncio).some((genero) => arrayGeneros.includes(genero.nome))
                ) {
                    listaAnuncios.push(anuncioJSON);
                }
            }

            if (listaAnuncios.length > 0) {
                let dadosAnuncioJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    quantidade: listaAnuncios.length,
                    anuncios: listaAnuncios,
                };
                return dadosAnuncioJSON;
            } else {
                return message.ERROR_REGISTER_NOT_FOUND;
            }
        } else {
            return message.ERROR_INVALID_CPF;
        }
    }


};


const ctlGetAnunciosThenFilterByEstadoOnly = async (array_estado_livro) => {

    if (array_estado_livro == null || array_estado_livro == undefined || array_estado_livro == "") {
        return message.ERROR_REQUIRE_FIELDS
    } else {


        let dadosAnuncio = await anuncioDAO.mdlSelectsAlAnunciosThenFilter();

        if (dadosAnuncio) {
            let listaAnuncios = [];

            for (let index = 0; index < dadosAnuncio.length; index++) {
                const anuncio = dadosAnuncio[index];

                let generosAnuncio = await anuncioGeneroDAO.mdlSelectGeneroByIdAnuncio(anuncio.id);
                let tiposAnuncio = await anuncioTipoAnuncio.mdlSelectTipoAnuncioByIdAnuncio(anuncio.id);
                let autoresAnuncio = await anuncioAutor.mdlSelectAutorByIdAnuncio(anuncio.id);
                let fotosAnuncio = await anuncioFotoDAO.mdlSelectFotoByIdAnuncio(anuncio.id);

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
                        anunciante: anuncio.id_anunciante,
                    },
                    idioma: {
                        id: anuncio.id_idioma,
                        nome: anuncio.nome_idioma,
                    },
                    endereco: {
                        estado: anuncio.estado,
                        cidade: anuncio.cidade,
                        bairro: anuncio.bairro,
                    },
                    estado_livro: {
                        id: anuncio.id_estado_livro,
                        estado: anuncio.estado_livro,
                    },
                    editora: {
                        id: anuncio.id_editora,
                        nome: anuncio.nome_editora,
                    },
                    foto: fotosAnuncio,
                    generos: generosAnuncio,
                    tipo_anuncio: tiposAnuncio,
                    autores: autoresAnuncio,
                };



                if (
                    array_estado_livro.includes(anuncio.estado_livro)
                ) {
                    listaAnuncios.push(anuncioJSON);
                }
            }

            if (listaAnuncios.length > 0) {
                let dadosAnuncioJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    quantidade: listaAnuncios.length,
                    anuncios: listaAnuncios,
                };
                return dadosAnuncioJSON;
            } else {
                return message.ERROR_REGISTER_NOT_FOUND;
            }
        } else {
            return message.ERROR_INVALID_CPF;
        }
    }


};

const ctlGetAnunciosThenFilterByGenerosOnly = async (arrayGeneros) => {

    if (arrayGeneros == null || arrayGeneros == undefined || arrayGeneros == "") {
        return message.ERROR_REQUIRE_FIELDS
    } else {


        let dadosAnuncio = await anuncioDAO.mdlSelectsAlAnunciosThenFilter();

        if (dadosAnuncio) {
            let listaAnuncios = [];

            for (let index = 0; index < dadosAnuncio.length; index++) {
                const anuncio = dadosAnuncio[index];

                let generosAnuncio = await anuncioGeneroDAO.mdlSelectGeneroByIdAnuncio(anuncio.id);
                let tiposAnuncio = await anuncioTipoAnuncio.mdlSelectTipoAnuncioByIdAnuncio(anuncio.id);
                let autoresAnuncio = await anuncioAutor.mdlSelectAutorByIdAnuncio(anuncio.id);
                let fotosAnuncio = await anuncioFotoDAO.mdlSelectFotoByIdAnuncio(anuncio.id);

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
                        anunciante: anuncio.id_anunciante,
                    },
                    idioma: {
                        id: anuncio.id_idioma,
                        nome: anuncio.nome_idioma,
                    },
                    endereco: {
                        estado: anuncio.estado,
                        cidade: anuncio.cidade,
                        bairro: anuncio.bairro,
                    },
                    estado_livro: {
                        id: anuncio.id_estado_livro,
                        estado: anuncio.estado_livro,
                    },
                    editora: {
                        id: anuncio.id_editora,
                        nome: anuncio.nome_editora,
                    },
                    foto: fotosAnuncio,
                    generos: generosAnuncio,
                    tipo_anuncio: tiposAnuncio,
                    autores: autoresAnuncio,
                };



                if (
                    Array.from(generosAnuncio).some((genero) => arrayGeneros.includes(genero.nome))
                ) {
                    listaAnuncios.push(anuncioJSON);
                }
            }

            if (listaAnuncios.length > 0) {
                let dadosAnuncioJSON = {
                    status: message.SUCCESS_REQUEST.status,
                    message: message.SUCCESS_REQUEST.message,
                    quantidade: listaAnuncios.length,
                    anuncios: listaAnuncios,
                };
                return dadosAnuncioJSON;
            } else {
                return message.ERROR_REGISTER_NOT_FOUND;
            }
        } else {
            return message.ERROR_INVALID_CPF;
        }
    }


};

const ctlExcluirAnuncio = async (idAnuncio) => {

    if (idAnuncio == "" || idAnuncio == undefined || !idAnuncio || isNaN(idAnuncio)) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        const checkID = await anuncioDAO.mdlSelectAnuncioById(idAnuncio)

        if (checkID) {
            const deleteAnuncio = await anuncioDAO.mdlDeleteAnuncio(idAnuncio)

            if (deleteAnuncio) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlEncerrarAnuncio = async (idAnuncio) => {

    if (idAnuncio == "" || idAnuncio == undefined || !idAnuncio || isNaN(idAnuncio)) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        const checkID = await anuncioDAO.mdlSelectAnuncioById(idAnuncio)

        if (checkID) {
            const encerrarAnuncio = await anuncioDAO.mdlEncerrarAnuncio

            if (encerrarAnuncio) {
                return message.SUCCESS_UPDATED_ITEM
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlAtualizarAnuncios = async (dadosAnuncio) => {
    if (
        dadosAnuncio.id_anuncio == "" || dadosAnuncio.id_anuncio == null || dadosAnuncio.id_anuncio == undefined ||
        dadosAnuncio.nome == "" || dadosAnuncio.nome == null || dadosAnuncio.nome == undefined || dadosAnuncio.nome.length > 200 ||
        dadosAnuncio.numero_paginas == "" ||
        dadosAnuncio.ano_lancamento == "" || dadosAnuncio.ano_lancamento == null || dadosAnuncio.ano_lancamento == undefined ||
        dadosAnuncio.descricao == "" || dadosAnuncio.descricao == null || dadosAnuncio.descricao == undefined ||
        dadosAnuncio.id_estado_livro == "" || dadosAnuncio.id_estado_livro == null || dadosAnuncio.id_estado_livro == undefined || isNaN(dadosAnuncio.id_estado_livro) ||
        dadosAnuncio.id_idioma == "" || dadosAnuncio.id_idioma == null || dadosAnuncio.id_idioma == undefined || isNaN(dadosAnuncio.id_idioma) ||
        dadosAnuncio.id_editora == "" || dadosAnuncio.id_editora == null || dadosAnuncio.id_editora == undefined ||
        dadosAnuncio.fotos == "" || dadosAnuncio.fotos == null || dadosAnuncio.fotos == undefined || dadosAnuncio.fotos.length == 0 ||
        dadosAnuncio.tipos_anuncio == null || dadosAnuncio.tipos_anuncio == "" || dadosAnuncio.tipos_anuncio.length == 0 || dadosAnuncio.tipos_anuncio == undefined ||
        dadosAnuncio.generos == null || dadosAnuncio.generos == undefined || dadosAnuncio.generos == "" || dadosAnuncio.generos.length == 0 ||
        dadosAnuncio.autores == null || dadosAnuncio.autores == undefined || dadosAnuncio.autores == "" || dadosAnuncio.autores.length == 0
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        const checkIDAnuncio = anuncioDAO.mdlSelectAnuncioById(dadosAnuncio.id_anuncio)

        if (checkIDAnuncio) {
            const atualizarAnuncioPrincipal = await anuncioDAO.mdlUpdateAnuncio(dadosAnuncio)

            if (atualizarAnuncioPrincipal) {
                await anuncioFotoDAO.mdlAtualizarFotos(dadosAnuncio.id_anuncio, dadosAnuncio.fotos)
                await anuncioTipoAnuncio.mdlAtualizarIDAnuncioTipoAnuncio(dadosAnuncio.id_anuncio, dadosAnuncio.tipos_anuncio)
                await anuncioGeneroDAO.mdlAtualizarIDAnuncioGenero(dadosAnuncio.id_anuncio, dadosAnuncio.generos)
                await anuncioAutor.mdlAtualizarIDAnuncioAutor(dadosAnuncio.id_anuncio, dadosAnuncio.autores)

                const novoAnuncio = await ctlGetAnuncioByID(dadosAnuncio.id_anuncio)

                let dadosAnuncioAtualizadoJSON = {
                    status: message.SUCCESS_UPDATED_ITEM.status,
                    message: message.SUCCESS_UPDATED_ITEM.message,
                    anuncio_atualizado: novoAnuncio.anuncios
                }

                return dadosAnuncioAtualizadoJSON

            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlGetALLAnunciosForSearchPage = async () => {
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


const array_estado_livro = ["Usado", "Seminovo"]; // Inclua estados válidos
const arrayGeneros = ["Coleção", "Biografia"]; // Inclua gêneros válidos

ctlGetAnunciosThenFilterByGenerosOnly(arrayGeneros)
    .then((result) => {
        if (result) {
            console.log("Anúncios filtrados:");
            // console.log(result.anuncios);
        } else {
            console.log("Nenhum anúncio atende aos critérios de filtro.");
        }
    })
    .catch((error) => {
        console.error("Erro ao chamar a função ctlGetAnunciosThenFilter:", error);
    });


module.exports = {
    ctlGetAnuncios,
    ctlGetAnuncioByID,
    ctlGetAnuncioByIdUsuario,
    ctlGetAnuncioByLocalizacao,
    ctlInserirAnuncio,
    ctlGetAnuncioPage,
    ctlGetAnunciosThenFilterByEstadoAndGenero,
    ctlGetAnunciosThenFilterByEstadoOnly,
    ctlGetAnunciosThenFilterByGenerosOnly,
    ctlGetALLAnunciosForSearchPage,
    ctlExcluirAnuncio,
    ctlEncerrarAnuncio,
    ctlAtualizarAnuncios,
    ctlGetAnunciosParaFeed
}
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

        console.log(verificarUsuario);
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
        dadosAnuncio.edicao == "" ||
        dadosAnuncio.isbn == "" ||
        dadosAnuncio.preco == "" ||
        dadosAnuncio.id_usuario == "" || dadosAnuncio.id_usuario == null || dadosAnuncio.id_usuario == undefined || isNaN(dadosAnuncio.id_usuario) ||
        dadosAnuncio.id_estado_livro == "" || dadosAnuncio.id_estado_livro == null || dadosAnuncio.id_estado_livro == undefined || isNaN(dadosAnuncio.id_estado_livro) ||
        dadosAnuncio.id_idioma == "" || dadosAnuncio.id_idioma == null || dadosAnuncio.id_idioma == undefined || isNaN(dadosAnuncio.id_idioma) ||
        dadosAnuncio.editora == "" || dadosAnuncio.id_editora == null || dadosAnuncio.id_editora == undefined ||
        dadosAnuncio.fotos == "" || dadosAnuncio.fotos == null || dadosAnuncio.fotos == undefined || dadosAnuncio.fotos.length == 0 ||
        dadosAnuncio.tipos_anuncio == null || dadosAnuncio.tipos_anuncio == "" || dadosAnuncio.tipos_anuncio.length == 0 || dadosAnuncio.tipos_anuncio == undefined ||
        dadosAnuncio.generos == null || dadosAnuncio.generos == undefined || dadosAnuncio.generos == "" || dadosAnuncio.generos.length == 0 ||
        dadosAnuncio.autores == null || dadosAnuncio.autores == undefined || dadosAnuncio.autores == "" || dadosAnuncio.autores.length == 0
    ) {
        return message.ERROR_REQUIRE_FIELDS
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

const ctlGetAnunciosThenFilter = async(array_estado_livro, arrayGeneros)=>{

    let dadosAnuncio = await anuncioDAO.mdlSelectsAlAnunciosThenFilter(array_estado_livro, arrayGeneros)


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
                    

                    if((array_estado_livro.includes(anuncio.estado_livro.estado)) && generosAnuncio.some((genero) => arrayGeneros.includes(genero.nome))){
                        listaAnuncios.push(anuncioJSON)
                        let dadosAnuncioJSON = {
                            status: message.SUCCESS_REQUEST.status,
                            message: message.SUCCESS_REQUEST.message,
                            quantidade: listaAnuncios.length,
                            anuncios: listaAnuncios
                        }
                        return dadosAnuncioJSON
                    } else{
                        return false
                    }
    
                
                
            }

            console.log("Estado");
            console.log(array_estado_livro);

            console.log("Generos");
            console.log(arrayGeneros);
            
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }

    // if(anuncios){
    //     if(array_estado_livro != null || array_estado_livro != "" || array_estado_livro != undefined ){
    //         let anunciosFiltrados = anuncios.filter(anuncios => anuncios.estado_livro == array_estado_livro[0] || anuncios.estado_livro == array_estado_livro[1])

    //         return anunciosFiltrados
    //     } else {
    //         return anuncios
    //     }
    // } else {
    //     return false
    // }
}





const array_estado_livro = ["Novo"];
const arrayGeneros = ["Ficção Infantil"];

ctlGetAnunciosThenFilter(array_estado_livro, arrayGeneros)
    .then((result) => {
        console.log("Resultado da função:");
        console.log("Anuncios que vieram: ");
        console.log(result.anuncios);
        
        //console.log("Generos que vieram: " + result.anuncios.generos);

        // result.anuncios.forEach((anuncio) => {
        //     console.log(`Anúncio ID: ${anuncio.anuncio.id}`);
        //     console.log(`Anúncio: ${anuncio.anuncio.nome}`);
        //     console.log("Gêneros:");

            // Iterar pelos gêneros do anúncio
            // anuncio.generos.forEach((genero) => {
            //     console.log(`- ${genero.nome}`);
            // });
    //})
})
    .catch((error) => {
        console.error("Erro ao chamar a função:", error);
});

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
    ctlGetAnuncioByIdUsuario,
    ctlGetAnuncioByLocalizacao,
    ctlInserirAnuncio,
    ctlGetAnuncioPage,
    ctlGetAnunciosThenFilter
}
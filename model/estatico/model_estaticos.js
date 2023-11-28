/**************************************************************************************
 *  Objetivo: Responsável por gerenciar funções de dados estáticos
 *  Autor: Luiz Gustavo e Felipe Graciano
 *  Data: 14/09/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const adicionarIdiomas = async (listaIdiomas) => {
    let lista = []

    for (let index = 0; index < listaIdiomas.length; index++) {
        const idioma = listaIdiomas[index];
        
        let sql = `insert into tbl_idioma(nome) values ('${idioma}')`

        let insertIdiomas = await prisma.$executeRawUnsafe(sql)

        if(insertIdiomas){
            lista.push(idioma)
        }
    }


    return {
        status: 200,
        idiomas: lista
    }
}

const mdlSelectAllIdiomas = async () => {
    let sql = `select * from tbl_idioma`

    let rsIdioma = await prisma.$queryRawUnsafe(sql)

    if (rsIdioma.length > 0) {
        return rsIdioma
    }else{
        return false
    }
}


const adicionarGeneros = async (listaGeneros) => {
    let lista = []

    for (let index = 0; index < listaGeneros.length; index++) {
        const genero = listaGeneros[index];
        
        let sql = `insert into tbl_genero(nome) values ('${genero}')`

        let insertGenero = await prisma.$executeRawUnsafe(sql)

        if(insertGenero){
            lista.push(genero)
        }
    }


    return {
        status: 200,
        generos: lista
    }
}

const adicionarEstadosLivros = async (listaEstados) => {
    let lista = []

    for (let index = 0; index < listaEstados.length; index++) {
        const estadoLivro = listaEstados[index];
        
        let sql = `insert into tbl_estado_livro(estado) values ('${estadoLivro}')`

        let insertEstadoLivro = await prisma.$executeRawUnsafe(sql)

        if(insertEstadoLivro){
            lista.push(estadoLivro)
        }
    }


    return {
        status: 200,
        estados_livros: lista
    }
}

const adicionarTiposAnuncios = async (listaTiposAnuncios) => {
    let lista = []

    for (let index = 0; index < listaTiposAnuncios.length; index++) {
        const tipoAnuncio = listaTiposAnuncios[index];
        
        let sql = `insert into tbl_tipo_anuncio(tipo) values ('${tipoAnuncio}')`

        let insertTipoAnuncio = await prisma.$executeRawUnsafe(sql)

        if(insertTipoAnuncio){
            lista.push(tipoAnuncio)
        }
    }


    return {
        status: 200,
        tipos_anuncios: lista
    }
}

const adicionarEditoras = async (listaEditoras) => {
    let lista = []

    for (let index = 0; index < listaEditoras.length; index++) {
        const editora = listaEditoras[index];
        
        let sql = `insert into tbl_editora(nome) values ('${editora}')`

        let insertEditora = await prisma.$executeRawUnsafe(sql)

        if(insertEditora){
            lista.push(editora)
        }
    }


    return {
        status: 200,
        tipos_anuncios: lista
    }
}

module.exports = {
    adicionarIdiomas,
    adicionarGeneros,
    adicionarEstadosLivros,
    adicionarTiposAnuncios,
    adicionarEditoras,

    mdlSelectAllIdiomas
}

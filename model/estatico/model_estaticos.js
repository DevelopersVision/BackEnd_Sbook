/**************************************************************************************
 *  Objetivo: Responsável por gerenciar funções de dados estáticos
 *  Autor: Luiz Gustavo
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

module.exports = {
    adicionarIdiomas,
    adicionarGeneros,
    adicionarEstadosLivros
}

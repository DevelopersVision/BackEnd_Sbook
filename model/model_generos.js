/**************************************************************************************
 *  Objetivo: Responsável por listar os generos no banco
 *  Autor: Bianca
 *  Data: 12/09/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

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

const mdlSelectAllGenero = async () => {
    //script para buscar todos os itens no banco de dados
    let sql = 'select genero.id, genero.nome from tbl_genero as genero';

    let rsGenero = await prisma.$queryRawUnsafe(sql);

    //Valida se o banco de dados retornou algum registro
    if (rsGenero.length > 0) {
        return rsGenero
    } else {
        return false
    }
}

module.exports = {
    mdlSelectAllGenero,
    adicionarGeneros
}
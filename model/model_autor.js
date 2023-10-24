/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados do anuncio com o tipo anuncio
*  Autor: Luiz Gustavo e Felipe Graciano
*  Data: 16/10/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllAutroes = async (page) => {
    let sql = `select 
        tbl_autor.id, 
        tbl_autor.nome 
    from tbl_autor
    order by id asc limit 10 offset ${page}0`

    let rsAnuncioAutor = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioAutor.length > 0) {
        return rsAnuncioAutor
    } else {
        return false
    }
}

const mdlSelectAutroes = async () => {
    let sql = `select 
        tbl_autor.id, 
        tbl_autor.nome 
    from tbl_autor`

    let rsAnuncioAutor = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioAutor.length > 0) {
        return rsAnuncioAutor
    } else {
        return false
    }
}

module.exports = {
    mdlSelectAllAutroes,
    mdlSelectAutroes
}
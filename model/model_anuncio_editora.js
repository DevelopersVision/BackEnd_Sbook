/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados do anuncio com editora
*  Autor: Luiz Gustavo e Felipe Graciano
*  Data: 15/09/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const checkAnuncioEditora = async (anuncioEditora) => {
    if(anuncioEditora.status_editora){
        let sql = `insert into tbl_editora (nome) values (${anuncioEditora.nome_editora})`

        await prisma.$executeRawUnsafe(sql)

        let sqlLastId = `select tbl_editora.id, tbl_editora.nome from tbl_editora order by tbl_editora.id desc limit 1`

        let lastEditora = await prisma.$executeRawUnsafe(sqlLastId)

        return lastEditora[0].id
    }else{
        return anuncioEditora.id_editora
    }
}

module.exports = {
    checkAnuncioEditora
}
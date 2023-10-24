/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados da editora
*  Autor: Luiz Gustavo e Felipe Graciano
*  Data: 16/10/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllEditora = async () => {
    let sql = `select * from tbl_editora`

    let rsEditora = await prisma.$queryRawUnsafe(sql)

    if (rsEditora.length > 0) {
        return rsEditora
    } else {
        return false
    }
}

module.exports = {
    mdlSelectAllEditora
}
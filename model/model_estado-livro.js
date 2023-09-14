/**************************************************************************************
 *  Objetivo: Responsável pela manipulação de dados dos Estados dos livros que serão registrados na nossa plataforma
 *  Autor: Luiz Gustavo e Felipe Graciano
 *  Data: 14/09/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mdlSelectAllEstadoLivro = async () => {
    let sql = `select estado.id, estado.estado from tbl_estado_livro as estado`

    let rsEstadoLivro = await prisma.$queryRawUnsafe(sql)

    if(rsEstadoLivro.length > 0){
        return rsEstadoLivro
    }else{
        return false
    }
}

const mdlSelectEstadoLivroByID = async (id) => {
    let sql = `select estado.id, estado.estado from tbl_estado_livro as estado where estado.id = ${id}`

    let rsEstadoLivro = await prisma.$queryRawUnsafe(sql)

    if(rsEstadoLivro.length > 0){
        return rsEstadoLivro
    }else{
        return false
    }
}


module.exports = {
    mdlSelectAllEstadoLivro,
    mdlSelectEstadoLivroByID
}
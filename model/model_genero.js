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
}
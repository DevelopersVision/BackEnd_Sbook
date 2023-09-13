/**************************************************************************************
 *  Objetivo: Responsável por adicionar os idiomas no banco
 *  Autor: Luiz Gustavo
 *  Data: 04/09/2023
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

module.exports = {
    adicionarIdiomas
}



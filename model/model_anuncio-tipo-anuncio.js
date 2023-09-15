/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados do anuncio com o tipo anuncio
*  Autor: Luiz Gustavo e Felipe Graciano
*  Data: 15/09/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllTipoAnuncio = async () => {
    let sql = `select * from tbl_tipo_anuncio`

    let rsTipoAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsTipoAnuncio.length > 0) {
        return rsTipoAnuncio
    } else {
        return false
    }
}

const mdlSelectTipoAnuncioByIdAnuncio = async (idAnuncio) => {
    let sql = `select tipo.id, tipo.tipo from tbl_tipo_anuncio as tipo
	    inner join tbl_anuncio_tipo_anuncio
		    on tbl_anuncio_tipo_anuncio.id_tipo_anuncio = tipo.id
	    inner join tbl_anuncio 
		    on tbl_anuncio.id = tbl_anuncio_tipo_anuncio.id_anuncio
    where tbl_anuncio.id = ${idAnuncio}`

    let rsTipoAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsTipoAnuncio.length > 0) {
        return rsTipoAnuncio
    } else {
        return false
    }
}

module.exports = {
    mdlSelectAllTipoAnuncio, 
    mdlSelectTipoAnuncioByIdAnuncio
}
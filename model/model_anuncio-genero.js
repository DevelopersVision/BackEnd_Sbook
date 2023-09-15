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

const mdlSelectAnuncioByIdGenero = async () => {
    let sql = `select tipo.id, tipo.tipo from tbl_tipo_anuncio as tipo
	    inner join tbl_anuncio_tipo_anuncio
		    on tbl_anuncio_tipo_anuncio.id_tipo_anuncio = tipo.id
	    inner join tbl_anuncio 
		    on tbl_anuncio.id = tbl_anuncio_tipo_anuncio.id_anuncio
    where tbl_anuncio.id = ${idAnuncio}`

    let rsAnuncioGenero = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioGenero.length > 0) {
        return rsAnuncioGenero
    } else {
        return false
    }
}
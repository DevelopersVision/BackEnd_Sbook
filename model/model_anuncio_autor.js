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

const mdlSelectAutorByIdAnuncio = async (idAnuncio) => {
    let sql = `select
	    autor.id, 
        autor.nome
    from tbl_autor as autor 
	    inner join tbl_anuncio_autor
		    on tbl_anuncio_autor.id_autor = autor.id
	    inner join tbl_anuncio as anuncio
		    on tbl_anuncio_autor.id_anuncio = anuncio.id
    where tbl_anuncio_autor.id_anuncio = ${idAnuncio}`

    let rsAnuncioAutor = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioAutor.length > 0) {
        return rsAnuncioAutor
    } else {
        return false
    }
}


module.exports = {
    mdlSelectAutorByIdAnuncio
}
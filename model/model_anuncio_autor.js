/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados do anuncio com o autor
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

// const mdlInserirAutorByIdAnuncio = async (id)

const mdlInsertAnuncioAutorScale = async (arrayAnuncioAutores) => {
    for (let i = 0; i < arrayAnuncioAutores.length; i++) {
        const autor = array[i];

        let sql = `insert into tbl_autor(nome) values ("${autor.nome_autor}")`

        await prisma.$executeRawUnsafe(sql)

        let sqlLastId = `select tbl_autor.id, tbl_autor.nome from tbl_autor order by usuario.id desc limit 1`

        let lastAutor = await prisma.$queryRawUnsafe(sqlLastId)

        let sqlInsert = `insert into tbl_anuncio_autor(id_autor, id_anuncio) values (${lastAutor.id},${autor.id_anuncio})`

        await prisma.$executeRawUnsafe(sqlInsert)
    }
}

module.exports = {
    mdlSelectAutorByIdAnuncio,
    mdlInsertAnuncioAutorScale
}
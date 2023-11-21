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


const mdlInsertAnuncioAutorScale = async (idAnuncio, arrayAnuncioAutores) => {
    for (let i = 0; i < arrayAnuncioAutores.length; i++) {
        const autor = arrayAnuncioAutores[i];

        if (!autor.status_autor) {
            let sql = `insert into tbl_autor(nome) values ('${autor.id_autor}')`

            await prisma.$executeRawUnsafe(sql)

            let sqlLastId = `select tbl_autor.id, tbl_autor.nome from tbl_autor order by tbl_autor.id desc limit 1`

            let lastAutor = await prisma.$queryRawUnsafe(sqlLastId)

            let sqlInsert = `insert into tbl_anuncio_autor(id_autor, id_anuncio) values (${lastAutor[0].id},${idAnuncio})`

            await prisma.$executeRawUnsafe(sqlInsert)
        } else {
            let sql = `insert into tbl_anuncio_autor(id_autor, id_anuncio) values (${autor.id_autor}, ${idAnuncio})`

            await prisma.$executeRawUnsafe(sql)
        }
    }
}

const mdlAtualizarIDAnuncioAutor = async (idAnuncio, arrayIdAutores) => {
    const sql = `delete from tbl_anuncio_autor where id_anuncio = ${idAnuncio}`

    await prisma.$executeRawUnsafe(sql)
    
    for (let i = 0; i < arrayIdAutores.length; i++) {
        const idAutor = arrayIdAutores[i];

        let sql = `insert into tbl_anuncio_autor(id_autor, id_anuncio) values (${idAutor}, ${idAnuncio})`

        await prisma.$executeRawUnsafe(sql)
    }

}

module.exports = {
    mdlSelectAutorByIdAnuncio,
    mdlInsertAnuncioAutorScale,
    mdlAtualizarIDAnuncioAutor
}
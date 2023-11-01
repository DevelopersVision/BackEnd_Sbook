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

const mdlSelectAnuncioByIdTipoAnuncio = async (idTipoAnuncio) => {
    let sql = `select 
    anuncio.id, 
    anuncio.nome, 
    anuncio.ano_lancamento,
    date_format(anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    anuncio.status_anuncio,
    anuncio.edicao,
    anuncio.preco,
    anuncio.descricao,
    anuncio.status_anuncio,
    anuncio.numero_paginas,
    anuncio.id_usuario,
    endereco.estado,
    endereco.cidade,
    endereco.bairro,
    anuncio.id_estado_livro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    foto.foto,
    editora.nome as nome_editora
    from tbl_anuncio as anuncio
    inner join tbl_foto as foto
            on foto.id_anuncio = anuncio.id
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
		    on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
		    on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora
	    inner join tbl_anuncio_tipo_anuncio
		    on tbl_anuncio_tipo_anuncio.id_anuncio = anuncio.id
	    inner join tbl_tipo_anuncio
		    on tbl_tipo_anuncio.id = tbl_anuncio_tipo_anuncio.id_tipo_anuncio
    where tbl_anuncio_tipo_anuncio.id_tipo_anuncio = ${idTipoAnuncio}`

    let rsAnuncioTipoAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioTipoAnuncio.length > 0) {
        return rsAnuncioTipoAnuncio
    } else {
        return false
    }
}

const mdlInsertIdAnuncioIdTipoAnuncioScale = async (idAnuncio, arrayIdTipoAnuncio) => {

    for (let i = 0; i < arrayIdTipoAnuncio.length; i++) {
        const idTipoAnuncio = arrayIdTipoAnuncio[i];

        let sql = `insert into tbl_anuncio_tipo_anuncio(id_anuncio, id_tipo_anuncio) values (${idAnuncio}, ${idTipoAnuncio})`

        await prisma.$executeRawUnsafe(sql)
    }

}

const mdlAtualizarIDAnuncioTipoAnuncio = async (idAnuncio, arrayIdTipoAnuncio) => {
    const sql = `delete from tbl_anuncio_tipo_anuncio where id_anuncio = ${idAnuncio}`

    await prisma.$executeRawUnsafe(sql)

    await mdlInsertIdAnuncioIdTipoAnuncioScale(idAnuncio, arrayIdTipoAnuncio)

}


module.exports = {
    mdlSelectAllTipoAnuncio,
    mdlSelectTipoAnuncioByIdAnuncio,
    mdlInsertIdAnuncioIdTipoAnuncioScale,
    mdlAtualizarIDAnuncioTipoAnuncio
}
/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados do anuncio
*  Autor: Luiz Gustavo 
*  Data: 15/09/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllAnuncio = async () => {
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
    editora.nome as nome_editora
    from tbl_anuncio as anuncio
    	inner join tbl_usuario as usuario
	    	on usuario.id = anuncio.id_usuario
	    inner join tbl_endereco as endereco 
    		on endereco.id = usuario.id_endereco
	    inner join tbl_estado_livro as estado_livro
		    on estado_livro.id = anuncio.id_estado_livro
	    inner join tbl_idioma as idioma
    		on anuncio.id_idioma = idioma.id
	    inner join tbl_editora as editora
		    on editora.id = anuncio.id_editora`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else {
        return false
    }
}

const mdlSelectAnuncioById = async (id) => {
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
    editora.nome as nome_editora,
    foto.foto
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
    where anuncio.id = ${id}`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else {
        return false
    }
}

const mdlSelectAnuncioByIdUsuario = async (idUsuario) => {
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
    anuncio.id_estado_livro,
    estado_livro.estado as estado_livro,
    anuncio.id_idioma,
    idioma.nome as nome_idioma,
    anuncio.id_editora,
    editora.nome as nome_editora,
    foto.foto
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
    where anuncio.id = ${id}`

    let rsAnuncio = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncio.length > 0) {
        return rsAnuncio
    } else {
        return false
    }
}

module.exports = {
    mdlSelectAllAnuncio,
    mdlSelectAnuncioById
}
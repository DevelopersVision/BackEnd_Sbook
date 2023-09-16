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

const mdlSelectAnuncioByIdGenero = async (idGenero) => {
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
    estado_livro.estado,
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
		on editora.id = anuncio.id_editora
	inner join tbl_anuncio_genero 
		on tbl_anuncio_genero.id_anuncio = anuncio.id
	inner join tbl_genero as genero
		on genero.id = tbl_anuncio_genero.id_genero
where genero.id = ${idGenero}`

    let rsAnuncioGenero = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioGenero.length > 0) {
        return rsAnuncioGenero
    } else {
        return false
    }
}

const mdlSelectGeneroByIdAnuncio = async () => {
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
    estado_livro.estado,
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
		on editora.id = anuncio.id_editora
	inner join tbl_anuncio_genero 
		on tbl_anuncio_genero.id_anuncio = anuncio.id
	inner join tbl_genero as genero
		on genero.id = tbl_anuncio_genero.id_genero
where genero.id = ${idGenero}`

    let rsAnuncioGenero = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioGenero.length > 0) {
        return rsAnuncioGenero
    } else {
        return false
    }
}
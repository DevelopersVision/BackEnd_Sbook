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
	inner join tbl_anuncio_genero 
		on tbl_anuncio_genero.id_anuncio = anuncio.id
	inner join tbl_genero as genero
		on genero.id = tbl_anuncio_genero.id_genero
where tbl_anuncio_genero.id_genero = ${idGenero}`

    let rsAnuncioGenero = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioGenero.length > 0) {
        return rsAnuncioGenero
    } else {
        return false
    }
}

const mdlSelectGeneroByIdAnuncio = async (idAnuncio) => {
    let sql = `select 
	genero.id, 
    genero.nome 
from tbl_genero as genero
	inner join tbl_anuncio_genero as anuncio_genero
		on anuncio_genero.id_genero = genero.id
	inner join tbl_anuncio as anuncio
		on anuncio_genero.id_anuncio = anuncio.id
where anuncio_genero.id_anuncio = ${idAnuncio}`

    let rsAnuncioGenero = await prisma.$queryRawUnsafe(sql)

    if (rsAnuncioGenero.length > 0) {
        return rsAnuncioGenero
    } else {
        return false
    }
}

const mdlInsertIdAnuncioIdGeneroScale = async (arrayIdsAnuncioGenero) => {
 
    for (let i = 0; i < arrayIdsAnuncioGenero.length; i++) {
        const idsAnuncioGenero = array[i];

        let sql = `insert into tbl_anuncio_genero (id_anuncio, id_genero) values (${idsAnuncioGenero.id_anuncio}, ${idsAnuncioGenero.id_genero})`

        await prisma.$executeRawUnsafe(sql)
    }

}

module.exports = {
    mdlSelectGeneroByIdAnuncio,
    mdlInsertIdAnuncioIdGeneroScale
}
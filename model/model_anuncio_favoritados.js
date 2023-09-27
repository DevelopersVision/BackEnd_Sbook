/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções dos anuncios favoritados do usuário
*  Autor: Luiz Gustavo e Felipe Graciano
*  Data: 25/09/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAnunciosFavoritosDoUsuario = async (idUsuario) => {

    let sql = `select  tbl_anuncio.id as id_anuncio, tbl_anuncio.nome as nome_livro,
    tbl_anuncio.ano_lancamento,
    date_format(tbl_anuncio.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    tbl_anuncio.status_anuncio, tbl_anuncio.edicao, tbl_anuncio.preco,
    tbl_anuncio.descricao, tbl_anuncio.numero_paginas, tbl_anuncio.id_usuario as anunciante,
    tbl_endereco.estado, tbl_endereco.cidade, tbl_endereco.bairro,
     tbl_estado_livro.estado as estado_livro, tbl_idioma.nome as idioma,
    tbl_anuncio.id_editora, tbl_editora.nome as editora,
    tbl_foto.foto as foto
        from tbl_usuario
        inner join tbl_usuario_anuncio_favoritados
            on tbl_usuario_anuncio_favoritados.id_usuario = tbl_usuario.id
        inner join tbl_anuncio
            on tbl_usuario_anuncio_favoritados.id_anuncio = tbl_anuncio.id
         inner join tbl_foto
                on tbl_foto.id_anuncio = tbl_anuncio.id
            inner join tbl_endereco 
                on tbl_endereco.id = tbl_usuario.id_endereco
            inner join tbl_estado_livro
                on tbl_estado_livro.id = tbl_anuncio.id_estado_livro
            inner join tbl_idioma
                on tbl_anuncio.id_idioma = tbl_idioma.id
            inner join tbl_editora
                on tbl_editora.id = tbl_anuncio.id_editora   
            where tbl_usuario_anuncio_favoritados.id_usuario = ${idUsuario};`


    let rsAnunciosFavoritos = await prisma.$queryRawUnsafe(sql)

    return rsAnunciosFavoritos
}

const mdlInsertAnuncioParaFavoritos = async (dadosBody) =>{

    let sql = `insert into tbl_usuario_anuncio_favoritados(
        id_usuario,
        id_anuncio
    ) values (
        ${dadosBody.id_usuario},
        ${dadosBody.id_anuncio}
    )
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }

}

const mdlDeleteAnuncioDosFavoritos = async (dadosBody) =>{
    let sql = `delete from tbl_usuario_anuncio_favoritados where tbl_usuario_anuncio_favoritados.id_usuario = ${dadosBody.id_usuario} and tbl_usuario_anuncio_favoritados.id_anuncio = ${dadosBody.id_anuncio}`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}

module.exports = {
    mdlSelectAnunciosFavoritosDoUsuario,
    mdlInsertAnuncioParaFavoritos,
    mdlDeleteAnuncioDosFavoritos
}
/**************************************************************************************
 *  Objetivo: Responsável por inserir no banco generos preferidos do usuario
 *  Autor: Luiz gustavo
 *  Data: 13/09/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectGeneroPreferidoByIdUsuario = async (idUsuario) => {
    let sql = `select usuario_genero.id as id_genero_preferido_usuario ,genero.id as id_genero ,genero.nome as nome_genero from tbl_genero as genero
	    inner join tbl_usuario_genero as usuario_genero
		    on usuario_genero.id_genero = genero.id
	    inner join tbl_usuario as usuario
		    on usuario.id = usuario_genero.id_usuario
    where usuario.id = ${idUsuario};
    `

    let rsGeneroPreferido = await prisma.$queryRawUnsafe(sql)

    if (rsGeneroPreferido.length > 0) {
        return rsGeneroPreferido;
    } else {
        return false
    }
}

const mdlSelectGeneroPreferidoLastID = async (idUsuario) => {
    let sql = `select usuario_genero.id as id_genero_preferido_usuario ,genero.id as id_genero ,genero.nome as nome_genero from tbl_genero as genero
	    inner join tbl_usuario_genero as usuario_genero
		    on usuario_genero.id_genero = genero.id
	    inner join tbl_usuario as usuario
		    on usuario.id = usuario_genero.id_usuario
    where usuario.id = ${idUsuario} order by usuario_genero.id desc limit 1;
    `

    let rsGeneroPreferido = await prisma.$queryRawUnsafe(sql)

    if (rsGeneroPreferido.length > 0) {
        return rsGeneroPreferido;
    } else {
        return false
    }
}

const mdlInsertUsuarioGenero = async (id_usuario, id_generoPreferido) => {
    let sql = `insert into tbl_usuario_genero(id_usuario, id_genero) values (${id_usuario}, ${id_generoPreferido})`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}

module.exports = {
    mdlSelectGeneroPreferidoByIdUsuario,
    mdlSelectGeneroPreferidoLastID,
    mdlInsertUsuarioGenero
}
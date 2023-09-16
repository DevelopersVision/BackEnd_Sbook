/**************************************************************************************
*  Objetivo: Responsável por gerenciar funções de dados do usuário temporário
*  Autor: Luiz Gustavo 
*  Data: 15/09/2023
*  Versão: 1.0
**************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectLastID = async () => {
    let sql = `select 
        tbl_usuario_temporario.id,
        tbl_usuario_temporario.email,
        tbl_usuario_temporario.token,
        tbl_usuario_temporario.token_expiress
    from tbl_usuario_temporario order by id desc limit 1;`
    
    let rsUsuarioTemporario = await prisma.$queryRawUnsafe(sql)

    if (rsUsuarioTemporario.length > 0) {
        return rsUsuarioTemporario
    }else{
        return false
    }
}

const mdlSelectUsuarioTemporarioByEmail = async (email) => {
    let sql = `select 
        tbl_usuario_temporario.id,
        tbl_usuario_temporario.email,
        tbl_usuario_temporario.token,
        tbl_usuario_temporario.token_expiress
    from tbl_usuario_temporario where tbl_usuario_temporario.email = '${email}'`
    
    let rsUsuarioTemporario = await prisma.$queryRawUnsafe(sql)

    if (rsUsuarioTemporario.length > 0) {
        return rsUsuarioTemporario
    }else{
        return false
    }
}


const mdlSelectUsuarioTemporarioByIdAndToken = async (id, token) => {
    let sql = `select 
        tbl_usuario_temporario.id,
        tbl_usuario_temporario.email,
        tbl_usuario_temporario.token,
        tbl_usuario_temporario.token_expiress
    from tbl_usuario_temporario where tbl_usuario_temporario.id = ${id} and tbl_usuario_temporario.token = ${token};`
    
    let rsUsuarioTemporario = await prisma.$queryRawUnsafe(sql)

    if (rsUsuarioTemporario.length > 0) {
        return rsUsuarioTemporario
    }else{
        return false
    }
}

const mdlInsertUsuarioTemporario = async (email, token, token_expiress) => {
    //Script SQL para inserir dados
    let sql = `insert into tbl_usuario_temporario (
        email,
        token,
        token_expiress
    ) values (
        '${email}',
        '${token}',
        '${token_expiress}'
    )`;

    //Sempre que não formos utilizar um select, devemos usar o metodo executeRawUnsafe                        
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

const mdlDeleteUsuarioTemporarioById = async (id) => {
    let sql = `delete from tbl_usuario_temporario where tbl_usuario_temporario.id = ${id}` 
    
    let rsUsuarioTemporario = await prisma.$executeRawUnsafe(sql)

    if (rsUsuarioTemporario) {
        return true;
    } else {
        return false
    }

}

module.exports = {
    mdlSelectLastID,
    mdlSelectUsuarioTemporarioByIdAndToken,
    mdlSelectUsuarioTemporarioByEmail,
    mdlInsertUsuarioTemporario,
    mdlDeleteUsuarioTemporarioById
}
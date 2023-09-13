/**************************************************************************************
 *  Objetivo: Responsável pela manipulação de dados dos Usuários que serão registrados na nossa plataforma
 *  Autor: Luiz Gustavo
 *  Data: 04/09/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllUsuario = async () => {
    let sql = `select 
	usuario.id as id_usuario,
	usuario.nome, 
    usuario.cpf,
    date_format(usuario.data_nascimento, '%d-%m-%Y') as data_nascimento,
    date_format(usuario.data_criacao, '%d-%m-%Y %H:%i') as data_criacao, 
    usuario.email,
    usuario.senha,
    usuario.foto,
    usuario.status_usuario,
    endereco.logradouro,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
    endereco.cep
from tbl_usuario as usuario
	inner join tbl_endereco as endereco 
    on usuario.id_endereco = endereco.id;`

    let rsEnderecoUsuario = await prisma.$queryRawUnsafe(sql)

    if (rsEnderecoUsuario.length > 0) {
        console.log("Model");
        return rsEnderecoUsuario
    } else {
        return false
    }
}

const mdlSelectLastEnderecoUsuarioID = async () => {
    let sql = `select 
	usuario.id as id_usuario,
	usuario.nome, 
    usuario.cpf,
    date_format(usuario.data_nascimento, '%d-%m-%Y') as data_nascimento,
    date_format(usuario.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    usuario.email,
    usuario.foto,
    usuario.status_usuario,
    endereco.logradouro,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
    endereco.cep
from tbl_usuario as usuario
	inner join tbl_endereco as endereco 
    on usuario.id_endereco = endereco.id order by usuario.id desc limit 1;`

    let rsEnderecoUsuario = await prisma.$queryRawUnsafe(sql)

    if (rsEnderecoUsuario.length > 0) {
        return rsEnderecoUsuario
    } else {
        return false
    }
}

const mdlSelectUsuarioByID = async function (id) {
    let sql = `select 
	usuario.id as id_usuario,
	usuario.nome, 
    usuario.cpf,
    date_format(usuario.data_nascimento, '%d-%m-%Y') as data_nascimento,
    date_format(usuario.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    usuario.email,
    usuario.foto,
    usuario.status_usuario,
    endereco.logradouro,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
    endereco.cep
from tbl_usuario as usuario
	inner join tbl_endereco as endereco 
    on usuario.id_endereco = endereco.id
    
    where usuario.id = ${id};`

    let rsEnderecoUsuario = await prisma.$queryRawUnsafe(sql)

    if (rsEnderecoUsuario.length > 0) {
        return rsEnderecoUsuario
    } else {
        return false
    }
}

const selectByEmail = async function (email_usuario) {
    let sqlEmail = `SELECT tbl_usuario.id, tbl_usuario.senha_reset_token, tbl_usuario.senha_reset_expiracao FROM tbl_usuario WHERE tbl_usuario.email = '${email_usuario}'`

    let resultCheck = await prisma.$queryRawUnsafe(sqlEmail)

    if (resultCheck[0].result == 1n) {
        return false
    } else {
        return resultCheck
    }
}

const checkEmail = async function (email_usuario) {
    let sqlCheckEmail = `SELECT EXISTS(SELECT * FROM tbl_usuario WHERE tbl_usuario.email = '${email_usuario}') as result;`

    let resultCheck = await prisma.$queryRawUnsafe(sqlCheckEmail)

    if (resultCheck[0].result == 1n) {
        return false
    } else {
        return true
    }
}

const checkCPF = async function (cpf) {
    let sqlCheckCPF = `SELECT EXISTS(SELECT * FROM tbl_usuario WHERE tbl_usuario.cpf = '${cpf}') as result;`

    let resultCheck = await prisma.$queryRawUnsafe(sqlCheckCPF)

    if (resultCheck[0].result == 1n) {
        return false
    } else {
        return true
    }
}

const mdlInsertEnderecoUsuario = async function (dadosEnderecoUsuario) {
    let sql = `call sp_inserir_endereco_usuario(
            "${dadosEnderecoUsuario.logradouro_endereco}",
            "${dadosEnderecoUsuario.bairro_endereco}",
            "${dadosEnderecoUsuario.cidade_endereco}",
            "${dadosEnderecoUsuario.estado_endereco}",
            "${dadosEnderecoUsuario.cep_endereco}",
            "${dadosEnderecoUsuario.nome_usuario}",
            "${dadosEnderecoUsuario.cpf_usuario}",
            "${dadosEnderecoUsuario.data_nascimento_usuario}",
            "${dadosEnderecoUsuario.email_usuario}",
            "${dadosEnderecoUsuario.senha_usuario}"
        );`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}

const mdlupdateUsuario = async function (dadosEnderecoUsuario) {
    let sql = `call sp_update_endereco_usuario(
        ${dadosEnderecoUsuario.id_usuario},
        ${dadosEnderecoUsuario.id_endereco},
        "${dadosEnderecoUsuario.logradouro_endereco}",
        "${dadosEnderecoUsuario.bairro_endereco}",
        "${dadosEnderecoUsuario.cidade_endereco}",
        "${dadosEnderecoUsuario.estado_endereco}",
        "${dadosEnderecoUsuario.cep_endereco}",
        "${dadosEnderecoUsuario.nome_usuario}",
        "${dadosEnderecoUsuario.data_nascimento_usuario}",
        "${dadosEnderecoUsuario.senha_usuario}"
    );`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}

const mdlUpdateForgotPasswordUsuario = async (passwordResetToken, passwordResetExpiress, id) => {
    let sql = `update tbl_usuario set 
            tbl_usuario.senha_reset_token = ${passwordResetToken},
            tbl_usuario.senha_reset_expiracao = '${passwordResetExpiress}'
        where tbl_usuario.id = ${id}
        `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}


const mdlAlterPassword = async (id, password) => {
    let sql = `update tbl_usuario set 
            tbl_usuario.senha = '${password}'
        where tbl_usuario.id = ${id}
        `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}


module.exports = {
    mdlSelectAllUsuario,
    mdlSelectLastEnderecoUsuarioID,
    mdlInsertEnderecoUsuario,
    checkEmail,
    mdlSelectUsuarioByID,
    mdlupdateUsuario,
    checkCPF,
    selectByEmail,
    mdlAlterPassword,
    mdlUpdateForgotPasswordUsuario,
}
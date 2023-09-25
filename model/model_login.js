/**************************************************************************************
 *  Objetivo: Responsável pela manipulação de dados dos Usuários que serão utilizados para realização do login
 *  Autor: Luiz Gustavo e Felipe Graciano
 *  Data: 05/09/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()


const mdlSelectUsuarioByEmailAndSenha = async function(email, senha){
    let sql = `select 
	usuario.id as id_usuario,
	usuario.nome, 
    date_format(usuario.data_nascimento, '%d-%m-%Y') as data_nascimento,
    date_format(usuario.data_criacao, '%d-%m-%Y %H:%i') as data_criacao,
    usuario.email,
    usuario.cpf,
    usuario.status_usuario,
    usuario.foto,
    usuario.id_endereco,
    endereco.logradouro,
    endereco.bairro,
    endereco.cidade,
    endereco.estado,
    endereco.cep
from tbl_usuario as usuario
	inner join tbl_endereco as endereco 
    on usuario.id_endereco = endereco.id where usuario.email = '${email}' and usuario.senha = '${senha}'`

    let rsUsuario = await prisma.$queryRawUnsafe(sql)

    if (rsUsuario.length > 0) {
        return rsUsuario;
    } else {
        return false
    }
}

module.exports = {
    mdlSelectUsuarioByEmailAndSenha
}
//Modelo MVC (Model View controller)
/*****
 * Objetivo: Responsável pela manipulação de dados dos Endereços que serão registrados na nossa plataforma
 * Data : 31/08/2023
 * Autor: Felipe Graciano
 * Versão : 1.0
 * ******************************************************************************************* */

//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mdlInsertEndereco = async function (dadosEndereco) {

    //Script SQL para inserir dados
    let sql = `insert into tbl_endereco (
                            logradouro, 
                            cidade,
                            bairro,
                            cep,
                            estado
                        ) values (
                            '${dadosEndereco.logradouro}',
                            '${dadosEndereco.cidade}',
                            '${dadosEndereco.bairro}',
                            '${dadosEndereco.cep}',
                            '${dadosEndereco.estado}'
                        )`;

    //Sempre que não formos utilizar um select, devemos usar o metodo executeRawUnsafe                        
    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

const mdlUpdateEndereco = async function(dadosEndereco){
    let sql = `update tbl_endereco set
    logradouro = '${dadosEndereco.logradouro}',
    cidade = '${dadosEndereco.cidade}',
    bairro = '${dadosEndereco.bairro}',
    cep = '${dadosEndereco.cep}',
    estado = '${dadosEndereco.estado}'
    where id = ${dadosEndereco.id}
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true
    }else{
        return false
    }
}

const mdlSelectAllEnderecos = async function(){
    //script para buscar todos os itens no banco de dados
    let sql = 'select * from tbl_endereco';

    let rsEndereco = await prisma.$queryRawUnsafe(sql);

    //Valida se o banco de dados retornou algum registro
    if (rsEndereco.length > 0) {
        return rsEndereco;
    } else {
        return false
    }
}

const mdlSelectEnderecoByID = async function(id){
    let sql = `select * from tbl_endereco where id = ${id}`

    let rsEndereco = await prisma.$queryRawUnsafe(sql)

    if (rsEndereco.length > 0) {
        return rsEndereco;
    } else {
        return false
    }

}

const mdlDeleteEndereco = async function(id){
    let sql = `delete from tbl_endereco where id = ${id}`

    let rsEndereco = await prisma.$executeRawUnsafe(sql)

    if (rsEndereco) {
        return true;
    } else {
        return false
    }
}

const mdlSelectLastEnderecoID = async function(){
    let sql = 'select * from tbl_endereco order by id desc limit 1;'

    let rsEndereco = await prisma.$queryRawUnsafe(sql)

    if(rsEndereco.length > 0){
        return rsEndereco
    } else{
        return false
    }
}

module.exports = {
    mdlInsertEndereco,
    mdlUpdateEndereco,
    mdlSelectAllEnderecos,
    mdlSelectEnderecoByID,
    mdlDeleteEndereco,
    mdlSelectLastEnderecoID
}

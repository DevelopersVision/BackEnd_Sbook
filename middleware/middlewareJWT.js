/**
 * Objetivo: Implementação do JWT no projeto
 * Data: 06/09/2023
 * Autor: Felipe Graciano e Luiz Gustavo
 * Versão : 1.0
 */

//import da biblioteca
const jwt = require('jsonwebtoken') //npm i jsonwebtoken --save

//Chave secreta para a criação do JWt
const SECRET = 'flbjt2023';

//tempo de expiração da chave em segundos
const EXPIRE = '90d';

//Criação do JWT 
const createJWT = async function(payload){

    //Gera o token : Payload é a identificação do usuário autenticado
    const token = jwt.sign({userID: payload}, SECRET, {expiresIn: EXPIRE});

    return token;
}


//Validação de autenticidade do JWT
const validateJWT = async function(token){

    let status;

    //valida a autenticidade do token
    jwt.verify(token, SECRET, async function(err, decode){
        if(err != null){
            status = false;
        } else{
            status = true;
        } 
    }) 
    return status;
}

module.exports = {
    createJWT,
    validateJWT
}
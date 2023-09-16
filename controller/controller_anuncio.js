/**************************************************************************************
 *  Objetivo: Responsável pela regra de negócios referente ao crud de anuncio
 *  Autor: Luiz Gustavo
 *  Data: 15/09/2023
 *  Versão: 1.0
 **************************************************************************************/

var message = require('./modulo/config.js')
var anuncioDAO = require('../model/model_anuncio.js')

const ctlGetAnuncios = async () => {
    let dadosAnuncio = await anuncioDAO.mdlSelectAllAnuncio()

    if(dadosAnuncio){
        let listaAnuncios = []

        dadosAnuncio.forEach(anuncio => {
            
            console.log(anuncio);


        });
    }   
}


module.exports = {
    ctlGetAnuncios
}
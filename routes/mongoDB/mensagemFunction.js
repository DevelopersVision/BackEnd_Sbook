/**************************************************************************************
 *  Objetivo: FUNÇÕES DE CONTROLE DE DADOS DA ENTIDADE CHAT
 *  Autor: Luiz Gustavo
 *  Data: 14/11/2023
 *  Versão: 1.0
 **************************************************************************************/

 const Message = require('../../models_mongoDB/message.js')
 const config = require('../../controller/modulo/config.js')
 const moment = require('moment')

 const createMessage = async ( messageBy, messageTo, message, image, chatId) => {

    if (
        messageBy == null || messageBy == undefined || isNaN(messageBy) ||
        messageTo == null  || messageTo == undefined || isNaN(messageTo) ||
        message == undefined ||
        chatId == null  || chatId == undefined
    ) {
        return config.ERROR_REQUIRE_FIELDS
    } else {
        const data_criacao = moment().format("YYYY-MM-DD")
        const hora_criacao = moment().format("HH:mm:ss")

        const mensagem = {
            messageBy,
            messageTo,
            message,
            image,
            data_criacao,
            hora_criacao,
            chatId
        }

        try {
            let newMessage = await Message.create(mensagem)

            return newMessage
        } catch (error) {
            return error
        }
    }
}

const daleteMessage = async () => {

}

module.exports = {
    createMessage,
    updateMessage
}
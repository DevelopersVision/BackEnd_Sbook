/**************************************************************************************
 *  Objetivo: ROTAS DA ENTIDADE MENSAGEM
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

const Message = require('../../models_mongoDB/message.js')
const router = require('express').Router()
const config = require('../../controller/modulo/config.js')
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const { getChat } = require('./chatFuction.js');
const bodyParserJSON = bodyParser.json();

router.post('/', bodyParserJSON, cors(), async (request, response) => {

    const { messageBy, messageTo, message, image, chatId } = request.body

    if (
        !messageBy || messageBy == undefined || isNaN(messageBy) ||
        !messageTo || messageTo == undefined || isNaN(messageTo) ||
        message == undefined ||
        !chatId || chatId == undefined ||
        image == undefined
    ) {
        response.status(404).json(`Morreu, mBy: ${messageBy}, mTo: ${messageTo}, m: ${message}, chat: ${chatId}`)
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
            await Message.create(mensagem)

            response.status(config.SUCCESS_CREATED_ITEM.status).json(config.SUCCESS_CREATED_ITEM)
        } catch (error) {
            response.status(500).json(error)
        }
    }
})

router.get('/:idChat', cors(), async (request, response) => {
    const idChat = request.params.idChat;

    try {
        const result = await Message.find({ chatId: idChat });

        if (result) {
            let listMessages = []

            for (let i = 0; i < result.length; i++) {

                const mensagem = result[i];

                const newMessage = {
                    id_message: mensagem._id.toString(),
                    messageBy: mensagem.messageBy,
                    messageTo: mensagem.messageTo,
                    message: mensagem.message,
                    data_criacao: mensagem.date,
                    hora_criacao: mensagem.hour,
                    chatId: mensagem.chatId
                }

                listMessages.push(newMessage)
            }

            const dadosJSON = {
                status: config.SUCCESS_REQUEST.status,
                message: config.SUCCESS_REQUEST.message,
                mensagens: listMessages
            }

            response.status(200).json(dadosJSON);
        } else {
            response.status(404).json({ config: 'Nenhum chat encontrado para o usuário fornecido' });
        }
    } catch (err) {
        response.status(500).json({ error: err });
    }
});

router.put('/:idMensagem', bodyParserJSON, cors(), async (request, response) => {

    const idMessage = request.params.idMensagem;

    if(
        idMessage == null || idMessage == undefined || idMessage == ''
    ){
        response.status(config.ERROR_REQUIRE_FIELDS.status).json(config.ERROR_REQUIRE_FIELDS)
    }else{

        const message = await Message.findOne({_id: idMessage})

        if(!message){
            response.status(config.ERROR_REGISTER_NOT_FOUND.status).json(config.ERROR_REGISTER_NOT_FOUND)
        }else{
            message.status = false
            await Message.updateOne({_id: idMessage}, message)

            const lista = await getChat(message.chatId)

            response.status(200).json(lista)
        }
    }
})

module.exports = {
    router
}
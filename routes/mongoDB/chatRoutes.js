/**************************************************************************************
 *  Objetivo: ROTAS DA ENTIDADE CHAT
 *  Autor: Luiz Gustavo
 *  Data: 24/10/2023
 *  Versão: 1.0
 **************************************************************************************/

const router = require('express').Router()
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment')
const bodyParserJSON = bodyParser.json();

const Message = require('../../models_mongoDB/message.js')
const Chat = require('../../models_mongoDB/chat.js')
const config = require('../../models_mongoDB/modulo/config.js')
const chatFunctions = require('./chatFuction.js')

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

router.post('/', bodyParserJSON, cors(), async (request, response) => {

    const { users } = request.body

    if (
        !users || users.length == 0 || users == undefined
    ) {
        response.status(config.ERROR_REQUIRE_FIELDS.status).json(config.ERROR_REQUIRE_FIELDS)
    } else {
        const data_criacao = moment().format("YYYY-MM-DD")
        const hora_criacao = moment().format("HH:mm:ss")

        const chat = {
            users,
            data_criacao,
            hora_criacao
        }

        try {
            const verificarChat = await Chat.find({ 'users.id': users[0].id && users[1].id })

            if (verificarChat.length > 0) {
                const chatOld = await chatFunctions.getChat(verificarChat[0]._id.toString())

                response.status(200).json(chatOld)
            } else {
                await Chat.create(chat)

                const lastChat = await Chat.find({}).sort({ _id: -1 }).limit(1)

                const lastId = lastChat[0]._id.toString()

                //const insertSQL = await createChat(users, lastId)

                const newChat = await chatFunctions.getChat(lastChat)

                response.status(200).json(newChat)
            }
        } catch (error) {
            response.status(config.ERROR_INTERNAL_SERVER.status).json(config.ERROR_INTERNAL_SERVER)
        }
    }
})

const createChat = async (users, chatId) => {

    if (
        !users || users.length == 0 || users == undefined || users == "" ||
        !chatId || chatId == ""
    ) {
        return config.ERROR_REQUIRE_FIELDS
    } else {
        const verificarChat = await Chat.find({'users.id': users[0].id && users[1].id})

        console.log(verificarChat);

        // for (let i = 0; i < users.length; i++) {
        //     const idUser = users[i].id;

        //     const sql = `insert into tbl_chat(id_mongo, id_usuario) values ("${chatId}", ${idUser})`

        //     const resultStatus = await prisma.$executeRawUnsafe(sql)

        //     if (!resultStatus)
        //         return config.ERROR_INTERNAL_SERVER
        // }

        // const lastIds = `select * from tbl_chat order by id desc limit 2`

        // const rsChat = await prisma.$queryRawUnsafe(lastIds)

        // const newChat = await chatFunctions.getChat(chatId)

        // if (lastIds.length > 0) {
            return verificarChat
        // } else {
        //     return config.ERROR_INTERNAL_SERVER.status
        // }
    }
}

router.get('/:idChat', cors(), async (request, response) => {
    const idChat = request.params.idChat;

    try {
        const resultChat = await Chat.findOne({ _id: idChat});

        if(resultChat){
            const listMessages = await Message.find({chatId: idChat})

            const dadosJSON = {
                status: config.SUCCESS_REQUEST.status,
                message: config.SUCCESS_REQUEST.message,
                id_chat: resultChat._id,
                usuarios: resultChat.users,
                data_criacao: resultChat.data_criacao,
                hora_criacao: resultChat.hora_criacao,
                mensagens: listMessages
            }

            response.status(dadosJSON.status).json(dadosJSON)
        }else{
            response.status(config.ERROR_CHAT_NOT_FOUND.status).json(config.ERROR_CHAT_NOT_FOUND)
        }
    } catch (err) {
        response.status(config.ERROR_INTERNAL_SERVER.status).json(config.ERROR_INTERNAL_SERVER);
    }
});

router.get('/user/:idUsuario', cors(), async (request, response) => {
    const idUsuario = request.params.idUsuario;

    try {
        const result = await Chat.find({ 'users.id': parseInt(idUsuario)});

        if (result) {
            let listUsers = []

            for (let i = 0; i < result.length; i++) {

                const user = result[i];

                const newUser = {
                    id_chat: user._id.toString(),
                    users: user.users,
                    isGroup: user.isGroup,
                    data_criacao: user.data_criacao,
                    hora_criacao: user.hora_criacao
                }

                listUsers.push(newUser)
            }

            const dadosJSON = {
                status: config.SUCCESS_REQUEST.status,
                message: config.SUCCESS_REQUEST.message,
                usuarios: listUsers
            }

            response.status(dadosJSON.status).json(dadosJSON);
        } else {
            response.status(config.ERROR_CHAT_NOT_FOUND.status).json(config.ERROR_CHAT_NOT_FOUND);
        }
    } catch (err) {
        response.status(config.ERROR_INTERNAL_SERVER.status).json(config.ERROR_INTERNAL_SERVER);
    }
});


module.exports = {
    router
}
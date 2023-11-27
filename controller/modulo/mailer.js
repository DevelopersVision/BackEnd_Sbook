/**************************************************************************************
 *  Objetivo: NodeMailer
 *  Autor: Luiz Gustavo e Felipe Graciano
 *  Data: 31/08/2023
 *  Versão: 1.0
 **************************************************************************************/
const path = require('path')

const nodemailer = require('nodemailer')

const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: false,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
        user: 'developersvision2023@gmail.com',
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

transport.use('compile', hbs({
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve('./views'),
        defaultLayout: false
      },
      viewPath: path.resolve('./views'),
      extName: ".html"
}))

module.exports = {
    transport
}
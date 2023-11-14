/*****************************************************************************
 * Objetivo: Arquivo feito para fazer os testes da controller de usuário
 * Data: 02/11/2023
 * Autor: Luiz Gustavo
 * Versão: 1.0
 *****************************************************************************/

const {
    ctlGetUsuario,
    ctlAlterarFoto,
    ctlAlterarSenha,
    ctlInserirEnderecoUsuario,
    ctlAtualizarEnderecoUsuario,
    ctlGetUsuarioByID
} = require('../../controller/controller_usuario.js')

describe(`Teste de pegar todos usuários`, () => {

    test('Deve pegar todos os usuários salvos no sistema || SUCESSO - 200', async () => {
        const res = await ctlGetUsuario()

        expect(res.status).toBe(200)
    })
})

describe(`Teste de pegar um usuário pelo ID`, () => {

    test('Deve pegar todos os dados do usuário || SUCESSO - 200', async () => {
        const res = await ctlGetUsuarioByID(3)

        expect(res.status).toBe(200)
    })

    test('Deve pegar todos os dados do usuário || ERRO - 404, REGISTRO NÃO ENCONTRADO', async () => {
        const res = await ctlGetUsuarioByID(80)

        expect(res.status).toBe(404)
    })
})

describe(`Teste de cadastro usuário`, () => {

    test('Deve inserir usuário || ERRO - 400, FALTA DE VALORES PRA PREENCHER', async () => {
        const usuario = {
            "nome_usuario": "", 
            "cpf_usuario": "", 
            "data_nascimento_usuario": "2005/10/10", 
            "email_usuario": "luizgustavo.sp2020@gmail.com",
            "senha_usuario": "temporaria2",
            "cep_endereco": "06420-340",
            "logradouro_endereco": "Rua Gentulio",
            "bairro_endereco": "",
            "cidade_endereco": "Barueri",
            "estado_endereco": "SP"
        }
        const res = await ctlInserirEnderecoUsuario(usuario)

        expect(res.status).toBe(400)
    })

    test('Deve inserir usuário || SUCESSO - 422, EMAIL JÁ EXISTENTE', async () => {
        const usuario = {
            "nome_usuario": "Millena", 
            "cpf_usuario": "128-403-234-80", 
            "data_nascimento_usuario": "2003/10/29", 
            "email_usuario": "luizgustavo.sp2020@gmail.com",
            "senha_usuario": "temporaria2",
            "cep_endereco": "06420-340",
            "logradouro_endereco": "Rua Elton",
            "bairro_endereco": "Centro",
            "cidade_endereco": "Jandira",
            "estado_endereco": "SP"
        }
        const res = await ctlInserirEnderecoUsuario(usuario)

        expect(res.status).toBe(422)
    })

    test('Deve inserir usuário || SUCESSO - 201', async () => {
        const usuario = {
            "nome_usuario": "Millena", 
            "cpf_usuario": "123-605-493-80", 
            "data_nascimento_usuario": "2003/10/29", 
            "email_usuario": "millenamills19@gmail.com",
            "senha_usuario": "temporaria2",
            "cep_endereco": "06420-340",
            "logradouro_endereco": "Rua Elton",
            "bairro_endereco": "Centro",
            "cidade_endereco": "Jandira",
            "estado_endereco": "SP"
        }
        const res = await ctlInserirEnderecoUsuario(usuario)

        expect(res.status).toBe(201)
    })
})


describe(`Teste de trocar senha do usuário pelo ID`, () => {

    test('Deve trocar a senha || SUCESSO - 200', async () => {
        const usuario = {"id": 20, "password": "12345678jest"}
        const res = await ctlAlterarSenha(usuario)

        expect(res.status).toBe(200)
    })

    test('Deve trocar a senha || ERRO 400, FALTA VALORES A SER ENVIADOS', async () => {
        const usuario = {"id": 20, "password": ""}
        const res = await ctlAlterarSenha(usuario)

        expect(res.status).toBe(400)
    })
})

describe(`Teste de trocar foto de perfil do usuário pelo ID`, () => {

    test('Deve trocar a foto de perfil || SUCESSO - 200', async () => {
        const usuario = {"id": 20, "foto": "https://i.pinimg.com/originals/b1/85/54/b1855492768711416e253cc496bae52a.png"}
        const res = await ctlAlterarFoto(usuario)

        expect(res.status).toBe(200)
    })

    test('Deve trocar a foto de perfil || ERRO 400, FALTA VALORES A SER ENVIADOS', async () => {
        const usuario = {"id": 3, "foto": ""}
        const res = await ctlAlterarFoto(usuario)

        expect(res.status).toBe(400)
    })
})

describe(`Teste de atualizar usuário pelo ID`, () => {

    test('Deve atualizar os dados do usuário || ERRO - 400, FALTA DE VALORES PRA PREENCHER', async () => {
        const usuario = {
            "id_usuario": 20,
            "nome_usuario": "Millena", 
            "cpf_usuario": "128-403-234-80", 
            "data_nascimento_usuario": "2003/10/29", 
            "email_usuario": "millenamills@gmail.com",
            "senha_usuario": "",
            "cep_endereco": "",
            "logradouro_endereco": "Rua Elton",
            "bairro_endereco": "Centro",
            "cidade_endereco": "Jandira",
            "estado_endereco": "SP"
        }
        const res = await ctlAtualizarEnderecoUsuario(usuario)

        expect(res.status).toBe(400)
    })

    test('Deve atualizar os dados do usuário || SUCESSO - 200', async () => {
        const usuario = {
            "id_usuario": 20,
            "id_endereco": 20,
            "nome_usuario": "Millena Mills", 
            "cpf_usuario": "128-403-234-80", 
            "data_nascimento_usuario": "2003/10/29", 
            "email_usuario": "millenamills@gmail.com",
            "senha_usuario": "temporaria2",
            "cep_endereco": "06420-340",
            "logradouro_endereco": "Rua Elton",
            "bairro_endereco": "Centro",
            "cidade_endereco": "Jandira",
            "estado_endereco": "SP"
        }
        const res = await ctlAtualizarEnderecoUsuario(usuario)

        expect(res.status).toBe(200)
    })
})


/*****************************************************************************
 * Objetivo: Arquivo feito para fazer os testes dos endpoints da api de usuáruio
 * Data: 14/11/2023
 * Autor: Luiz Gustavo
 * Versão: 1.0
 *****************************************************************************/

const request = require("supertest");
const app = request("http://localhost:8080");

describe(`Teste de integração com controller de usuário`, () => {

    test('Deve pegar todos os usuários salvos no sistema', async () => {
        
        const response = await app
            .get('/v1/sbook/usuario')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.dados).toBeInstanceOf(Array)
    })

    test('Deve pegar todos os usuários salvos no sistema', async () => {
        
        const response = await app
            .get('/v1/sbook/usuario')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body.dados).toBeInstanceOf(Array)
    })


})

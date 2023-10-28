/*********************************************************************************************************
 * Objetivo: Arquivo responsavel por padronizar as mensagens de ERRO, SUCESSO, FUNÇÕES, VARIAVEIS
 * Autor: Luiz Gustavo e Felipe Graciano
 * Data: 31/08/2023
 * Versão: 1.0
*********************************************************************************************************/

/*************************************** MENSAGENS DE ERRO ***************************************/
const ERROR_REQUIRE_FIELDS = {status: 400, message: 'NÃO FORAM PREENCHIDO TODOS OS CAMPOS OBRIGATÓRIOS'}

const ERROR_INTERNAL_SYSTEM = {status: 500, message: 'Devido a um erro interno no servidor, não foi possível processar a requisição.'}

const ERROR_INVALID_CONTENT_TYPE = {status: 415, message: 'O TIPO DE MÍDIA CONTENT-TYPE DA SOLICITAÇÃO NÃO É COMPATÍVEL COM O SERVIDOR. TIPO ACEITÁVEL: [application/json]'}

const ERROR_INVALID_ID = {status: 400, message: 'O ID INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_PARAMS = {status: 400, message: 'O PARAMETRO INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_EMAIL = {status: 400, message: 'O EMAIL INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_CPF = {status: 400, message: 'O CPF INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_EMAIL_SENHA = {status: 400, message: 'A SENHA INFORMADA NÃO É VALIDADA'}

const ERROR_INVALID_NOME = {status: 400, message: 'O NOME INFORMADO NA REQUISIÇÃO NÃO É VALIDO, OU NÃO FOI ENCAMINHADO'}

const ERROR_INVALID_VALORES = {status: 400, message: 'O PRECO ORIGINAL ESTÁ MENOR DO QUE COM DESCONTO'}

const ERROR_INVALID_TELEFONE = {status: 400, message: 'O TELEFONE INFORMADO NA REQUISIÇÃO NÃO É VALIDO'}

const ERROR_REGISTER_NOT_FOUND= {status: 404, message: 'O SERVIDOR NÃO ENCONTROU O RECURSO SOLICITADO.'}

const ERROR_INTERNAL_SERVER = {status: 500, message: 'DEVIDO A UM ERRO INTERNO NO SERVIDOR, NÃO FOI POSSIVEL PROCESSAR A REQUISIÇÃO'}

const ERROR_EXISTING_EMAIL = {status: 400, message: 'O EMAIL INFORMADO JÁ EXISTE NO SISTEMA'}

const ERROR_INVALID_TOKEN = {status: 400, message: 'O TOKEN É INVÁLIDO, OU SEJA, NÃO É COMPÁTIVEL'}

const ERROR_TOKEN_EXPIRADO = {status: 400, message: 'INTERVALO DE TEMPO ACABOU, TOKEN EXPIRADO'}

const ERROR_USUARIO_DESATIVADO = {status: 403, message: 'O USUARIO ESTÁ CADASTRADO NO SISTEMA, MAS NÃO PODE REALIZAR O LOGIN, POIS A CONTA ESTÁ DESATIVADA'}

const ERROR_INVALID_JSON = {status: 400, message: 'O JSON ENVIADO ESTÁ INVÁLIDA'}

const ERRO_PRECO_DOACOAO = {status: 422, message: 'QUANDO FOR DOACAO O PRECO TEM QUE SER VAZIO ( OU SEJA = "" )'}

const ERRO_INVALID_LENGTH_TIPO = {status: 422, message: 'OS TIPOS DE ANUNCIO NÃO PODE SER DOAÇÃO, TROCA E VENDA'}

/*************************************** MENSAGENS DE SUCESSO ***************************************/
const SUCCESS_CREATED_ITEM = {status: 201, message: 'ITEM CRIADO COM SUCESSO'}

const SUCCESS_UPDATED_ITEM = {status: 200, message: 'ITEM ATUALIZADO COM SUCESSO'}

const SUCCESS_DELETED_ITEM = {status: 200, message: 'ITEM DELETADO COM SUCESSO'}

const SUCCESS_REQUEST = {status: 200, message: 'REQUISIÇÃO BEM SUCEDIDA'}

const SUCCESS_VALID_TOKEN = {status: 200, message: 'TOKEN VÁLIDO'}

/*************************************** MENSAGENS DE ALERTA ***************************************/
const ALERT_PAGE = "ESTE ENDPOINT RETORNA INÚMEROS DADOS E VOCÊ ESTÁ USANDO SEM PAGINAÇÃO"


module.exports = {
    //Exportes de erro
    ERROR_REGISTER_NOT_FOUND,
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_ID,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_REQUIRE_FIELDS,
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_NOME,
    ERROR_INVALID_VALORES,
    ERROR_INVALID_EMAIL_SENHA,
    ERROR_EXISTING_EMAIL,
    ERROR_INTERNAL_SYSTEM,
    ERROR_INVALID_TOKEN,
    ERROR_INVALID_CPF,
    ERROR_TOKEN_EXPIRADO,
    ERROR_USUARIO_DESATIVADO,
    ERRO_PRECO_DOACOAO,
    ERRO_INVALID_LENGTH_TIPO,

    //Exportes de sucesso
    SUCCESS_CREATED_ITEM,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETED_ITEM,
    SUCCESS_REQUEST,
    SUCCESS_VALID_TOKEN,

    //Exportes de alert
    ALERT_PAGE
}
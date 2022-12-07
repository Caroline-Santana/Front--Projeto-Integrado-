/********************************************************************************************************
 * Objetivo: Arquivo responsável pela configuração de variaveis, constantes e mensagens  do sistema.    *
 * Data criação: 28/11/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *                                                                                          *
 ********************************************************************************************************/

 const MESSAGE_ERROR ={
    REQUIRED_FIELDS     : 'Existe(m) campo(s) obrigatório(s) que deve(m) ser enviado(s)!',
    INVALID_EMAIL       : 'O e-mail informado não é válido!',
    CONTENT_TYPE        : 'O cabeçalho da requisição não possui um Content-Type válido!',
    EMPTY_BODY          : 'O body da requisição não pode estar vazio!',
    NOT_FOUND_DB        : 'Não foram encontrados registros no Banco de Dados!',
    INTERNAL_ERROR_DB   : 'Não foi possível realizar a operação com o Banco de Dados',
    REQUIRED_ID         : 'O ID do registro é obrigatório neste tipo de requisição'
}

const MESSAGE_SUCESS = {
    INSERT_ITEM : 'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM : 'Item atualizado com sucesso no Banco de Dados',
    DELETE_ITEM : 'Item excluído com sucesso no Banco de Dados',
}

module.exports={
    MESSAGE_ERROR,
    MESSAGE_SUCESS
}
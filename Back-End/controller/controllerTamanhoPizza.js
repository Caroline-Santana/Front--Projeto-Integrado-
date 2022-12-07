/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 07/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

 const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')
//Função para gerar um novo tamanho
const novoTamanho = async function (tamanhoPizza){
    if(tamanhoPizza.tamanho == '' || tamanhoPizza.tamanho == undefined)
    {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
  
    }else{
        const novoTamanho = require('../model/DAO/tamanho.js')
        const result = await novoTamanho.insertTamanhoPizza(tamanhoPizza)
        if (result)
            return {status:201, message:MESSAGE_SUCESS.INSERT_ITEM}
        else 
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
 

}
//Função para atualizar um tamanho
const atualizarTamanho = async function(tamanhoPizza) {
    if(tamanhoPizza.id == '' || tamanhoPizza.id == undefined)
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

       else if(tamanhoPizza.tamanho == '' || tamanhoPizza.tamanho == undefined)
        {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        
        }else{
            const atualizarTamanho= require('../model/DAO/tamanho.js')
           
            const result = await atualizarTamanho.updateTamanhoPizza(tamanhoPizza)
        
            if (result)
                return {status:200, message:MESSAGE_SUCESS.UPDATE_ITEM}
            else 
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
}
//Função para retornar um tamanho baseado no ID
const buscarTamanho = async function(id) { 

    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else{

        const {selectByIdTamanho} = require('../model/DAO/tamanho.js')
        const dadosTamanho = await selectByIdTamanho(id)
        
        if(dadosTamanho){
            return dadosTamanho
        }
        else 
            return false
    }
 
    
}
//Função para retornar todos os tamanhos
const listarTamanhos = async function() { 
    const {selectAllTamanhos} = require('../model/DAO/tamanho.js')

    const dadosTamanho = await selectAllTamanhos()

    if(dadosTamanho){
        
        return dadosTamanho
    }
    else 
        return false
    
}
//Função para excluir um tamanho
const deletarTamanho = async function(id) {
     
    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

    }else{
            const tamanho = await buscarTamanho(id)
            if(tamanho){
                    const excluirTamanho = require('../model/DAO/tamanho.js')
                    const result = await excluirTamanho.deleteTamanhoPizza(id)
                if (result)
                    return {status:200, message:MESSAGE_SUCESS.DELETE_ITEM}
                else 
                    return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }else{
                return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
 
    }

}

module.exports= {
novoTamanho,
listarTamanhos,
deletarTamanho,
atualizarTamanho,
buscarTamanho
}
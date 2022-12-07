/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 01/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

 const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')
//Função para gerar um novo ingrediente
const novoIngrediente = async function (ingrediente){
    if(ingrediente.nome == '' || ingrediente.nome == undefined)
    {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
  
    }else{
        const novoIngrediente = require('../model/DAO/ingrediente.js')
        const result = await novoIngrediente.insertIngrediente(ingrediente)
        if (result)
            return {status:201, message:MESSAGE_SUCESS.INSERT_ITEM}
        else 
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
 

}
//Função para atualizar um ingrediente
const atualizarIngrediente = async function(ingrediente) {
    if(ingrediente.id == '' || ingrediente.id == undefined)
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

       else if(ingrediente.nome == '' || ingrediente.nome == undefined)
        {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        
        }else{
            const atualizarIngrediente = require('../model/DAO/ingrediente.js')
           
            const result = await atualizarIngrediente.updateIngrediente(ingrediente)

            if (result)
                return {status:200, message:MESSAGE_SUCESS.UPDATE_ITEM}
            else 
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
}
//Função para retornar um ingrediente baseado no ID
const buscarIngrediente = async function(id) { 

    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else{

        const {selectByIdIngrdt} = require('../model/DAO/ingrediente.js')
        const dadosIngrediente = await selectByIdIngrdt(id)
        
        if(dadosIngrediente){
            return dadosIngrediente
        }
        else 
            return false
    }
 
    
}
//Função para retornar todos os ingredientes
const listarIngredientes = async function() { 
    const {selectAllIngrdt} = require('../model/DAO/ingrediente.js')

    const dadosIngrediente = await selectAllIngrdt()

    if(dadosIngrediente){
        
        return dadosIngrediente
    }
    else 
        return false
    
}
//Função para excluir um ingrediente
const deletarIngrediente = async function(id) {
     
    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

    }else{
            const ingrediente = await buscarIngrediente(id)
            if(ingrediente){
                    const excluirIngrediente = require('../model/DAO/ingrediente.js')
                    const result = await excluirIngrediente.deleteIngrediente(id)
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
    novoIngrediente,
    atualizarIngrediente,
    buscarIngrediente,
    listarIngredientes,
    deletarIngrediente
}
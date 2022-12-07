/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de recebimento, tratamento                            *
 * e retorno de dados entre a API e a model.                                                             *
 * Data criação: 28/11/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

 const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('../modulo/config.js')
//Função para gerar uma nova pizza
const novaPizza = async function (pizza){
    if(pizza.nome == '' || pizza.nome == undefined || pizza.valor == '' || pizza.valor == undefined)
    {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
  
    }else{
        const novaPizza = require('../model/DAO/pizza.js')
        //import da model pizzaIngrediente (tabela de relação entre pizza e ingrediente)
        const { insertPizzaIngrediente } = require ('../model/DAO/pizza_ingrediente.js')
        const resultNovaPizza = await novaPizza.insertPizza(pizza)

        if(resultNovaPizza){
            let idNovaPizza = await novaPizza.selectLastId()
            
            if(idNovaPizza > 0){
                let pizzaIngrediente = {}
                pizzaIngrediente.id_pizza = idNovaPizza
                for(let i = 0; i < pizza.ingrediente.length; i++){
                    pizzaIngrediente.id_ingrediente = pizza.ingrediente[i].id_ingrediente
                    const response = await insertPizzaIngrediente(pizzaIngrediente)
                     if (response == false) {
                        await deletarPizza(idNovaPizza)
                        return{status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                     }
                }
                return {status:201, message:MESSAGE_SUCESS.INSERT_ITEM}
                
            }else{
                await deletarPizza(idNovaPizza)
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }
        else 
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }

}

//Função para atualizar uma pizza
const atualizarPizza = async function(pizza) {
    if(pizza.id == '' || pizza.id == undefined)
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

       else if(pizza.nome == '' || pizza.nome == undefined|| pizza.valor == '' || pizza.valor == undefined  )
        {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
        
        }else{
            const atualizarPizza = require('../model/DAO/pizza.js')
           
            const result = await atualizarPizza.updatePizza(pizza)
          
            if (result)
                return {status:200, message:MESSAGE_SUCESS.UPDATE_ITEM}
            else 
                return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
}

//Função para excluir uma pizza
const deletarPizza = async function(id) {
     
    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}

    }else{
            const pizza = await buscarPizza(id)
            if(pizza){
                    const excluirPizza = require('../model/DAO/pizza.js')
                    const result = await excluirPizza.deletePizza(id)
                    console.log(result)
                if (result)
                    return {status:200, message:MESSAGE_SUCESS.DELETE_ITEM}
                else 
                    return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }else{
                return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
 
    }

}
//Função para retornar todas as pizzas
const listarPizzas = async function() { 
    let ingredientesArray = []
    const{selectPizzaIngrediente} = require('../model/DAO/pizza_ingrediente.js')

    const dadosPizzas = await selectPizzaIngrediente()

    if(dadosPizzas){
        return dadosPizzas
    }
    else 
        return false
    
}
//Função para retornar uma pizza baseado no ID
const buscarPizza = async function(id) { 
    let dadosPizzaJson = {}
    if(id == '' || id == undefined){
        return {status : 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }else{

        const{selectPizzaIngredienteById} = require('../model/DAO/pizza_ingrediente.js')
        
        const dadosPizza = await selectPizzaIngredienteById(id)
        
        return dadosPizza
    }
 
    
}

module.exports = {
novaPizza,
atualizarPizza,
deletarPizza,
buscarPizza,
listarPizzas

}
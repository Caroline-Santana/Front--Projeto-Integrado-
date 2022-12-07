/********************************************************************************************************
 * Objetivo:API responsável pela manipulação de dados do Back-End                                       *
 *           (GET, POST, PUT, DELETE)                                                                   *
 * Data criação: 28/11/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 * Anotações:                                                                                           *                                                                 *
 ********************************************************************************************************/
 const express = require('express')
 const bodyParser = require ('body-parser')
 const cors = require('cors')

 //Arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCESS}= require('./modulo/config.js')
const {request, response} = require('express')
const app = express()

//Configuração de cors para liberar o acesso a API
app.use((request, response,next) => {
    response.header ('Access-Control-Allow-Origin', '*')
    response.header ('Access-Control-Allow-Methods',' GET, PUT, POST, DELETE, OPTIONS')
    app.use(cors())
    next()
})
//Criamos um objeto que permite receber um JSON no body das requisições
const jsonParser = bodyParser.json()

/****************************************************************
*    Rotas para CRUD (creat, read, update e delete) de pizzas   *
*    Data: 28/11/2022                                           *
*****************************************************************/

//EndPoint para inserir uma nova pizza
app.post('/v1/pizza', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            //import do arquivo da controller de pizza
            const controllerPizza = require('./controller/controllerPizza.js')

            //Chama a função novaPizza da controller e encaminha os dados do body
            const novaPizza = await controllerPizza.novaPizza(dadosBody)
           statusCode = novaPizza.status
           message = novaPizza.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para atualizar uma pizza existente
app.put('/v1/pizza/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
         headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            let id = request.params.id
            
            if(id != '' && id != undefined){
                dadosBody.id = id

                const controllerPizza = require('./controller/controllerPizza.js')
                const atualizarPizza = await controllerPizza.atualizarPizza(dadosBody)

               statusCode = atualizarPizza.status
               message = atualizarPizza.message
            }else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para listar todas as pizzas
app.get('/v1/pizzas', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerPizza= require('./controller/controllerPizza.js')
    
    
    const dadosPizza = await controllerPizza.listarPizzas()

 
    if(dadosPizza){
        statusCode = 200
        message = dadosPizza
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para deletar uma pizza existente
app.delete('/v1/pizza/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message 
    let id = request.params.id
        if(id != '' && id != undefined){
            const controllerPizza= require('./controller/controllerPizza.js')
            const deletarPizza = await controllerPizza.deletarPizza(id)
            statusCode = deletarPizza.status
            message = deletarPizza.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
    response.status(statusCode)
    response.json(message)
})
//EndPoint para buscar uma pizza pelo id
app.get('/v1/pizza/:id', cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerPizza = require('./controller/controllerPizza.js')
    const dadosPizza = await controllerPizza.buscarPizza(id)
        if(id != '' && id != undefined){
            if(dadosPizza){
                statusCode = 200
                message = dadosPizza
            }else{
                statusCode = 404
                message = MESSAGE_ERROR.NOT_FOUND_DB
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
    response.status(statusCode)
    response.json(message)
})

/****************************************************************
* Rotas para CRUD (creat, read, update e delete) de ingrediente *
* Data: 01/12/2022                                              *
*****************************************************************/
//EndPoint para inserir um novo ingrediente
app.post('/v1/ingrediente', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            const controllerIngrediente = require('./controller/controllerIngrediente.js')

            const novoIngrediente = await controllerIngrediente.novoIngrediente(dadosBody)
           statusCode = novoIngrediente.status
           message = novoIngrediente.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para atualizar um ingrediente existente
app.put('/v1/ingrediente/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
         headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            let id = request.params.id
            
            if(id != '' && id != undefined){
                dadosBody.id = id

                const controllerIngrediente = require('./controller/controllerIngrediente.js')
                const atualizarIngrediente = await controllerIngrediente.atualizarIngrediente(dadosBody)

               statusCode = atualizarIngrediente.status
               message = atualizarIngrediente.message
            }else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para buscar uma pizza pelo id
app.get('/v1/ingrediente/:id', cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerIngrediente = require('./controller/controllerIngrediente.js')
    const dadosIngrediente = await controllerIngrediente.buscarIngrediente(id)
        if(id != '' && id != undefined){
            if(dadosIngrediente){
                statusCode = 200
                message = dadosIngrediente
            }else{
                statusCode = 404
                message = MESSAGE_ERROR.NOT_FOUND_DB
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para listar todos os ingredientes
app.get('/v1/ingredientes', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerIngrediente= require('./controller/controllerIngrediente.js')
    
    
    const dadosIngrediente = await controllerIngrediente.listarIngredientes()

 
    if(dadosIngrediente){
        statusCode = 200
        message = dadosIngrediente
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para deletar um ingrediente existente
app.delete('/v1/ingrediente/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message 
    let id = request.params.id
        if(id != '' && id != undefined){
            const controllerIngrediente= require('./controller/controllerIngrediente.js')
            const deletarIngrediente = await controllerIngrediente.deletarIngrediente(id)
            statusCode = deletarIngrediente.status
            message = deletarIngrediente.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
    response.status(statusCode)
    response.json(message)
})

/****************************************************************
* Rotas para CRUD (creat, read, update e delete) de tamanhos    *
* Data: 07/12/2022                                              *
*****************************************************************/
//EndPoint para inserir um novo tamanho
app.post('/v1/tamanho', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
     headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body
        
        if (JSON.stringify(dadosBody) != '{}') {
            const controllerTamanho = require('./controller/controllerTamanhoPizza.js')

            const novoTamanho = await controllerTamanho.novoTamanho(dadosBody)
           statusCode = novoTamanho.status
           message = novoTamanho.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para atualizar um tamanho existente
app.put('/v1/tamanho/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message
    let headerContentType
         headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            let id = request.params.id
            
            if(id != '' && id != undefined){
                dadosBody.id = id

                const controllerTamanho = require('./controller/controllerTamanhoPizza.js')
                const atualizarTamanho = await controllerTamanho.atualizarTamanho(dadosBody)

               statusCode = atualizarTamanho.status
               message = atualizarTamanho.message
            }else{
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para buscar um tamanho pelo id
app.get('/v1/tamanho/:id', cors(), async function (request, response){
    
    let statusCode
    let message
    let id = request.params.id
    const controllerTamanho = require('./controller/controllerTamanhoPizza.js')
    const dadosTamanho = await controllerTamanho.buscarTamanho(id)
        if(id != '' && id != undefined){
            if(dadosTamanho){
                statusCode = 200
                message = dadosTamanho
            }else{
                statusCode = 404
                message = MESSAGE_ERROR.NOT_FOUND_DB
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para listar todos os tamanhos
app.get('/v1/tamanhos', cors(), async function (request, response){
    
    let statusCode
    let message

    
    const controllerTamanhos= require('./controller/controllerTamanhoPizza.js')
    
    
    const dadosTamanhos = await controllerTamanhos.listarTamanhos()

 
    if(dadosTamanhos){
        statusCode = 200
        message = dadosTamanhos
    }else{
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})
//EndPoint para deletar um tamanho existente
app.delete('/v1/tamanho/:id', cors(), jsonParser, async function (request, response){
    let statusCode
    let message 
    let id = request.params.id
        if(id != '' && id != undefined){
            const controllerTamanho = require('./controller/controllerTamanhoPizza.js')
            const deletarTamanho = await controllerTamanho.deletarTamanho(id)
            statusCode = deletarTamanho.status
            message = deletarTamanho.message
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
    response.status(statusCode)
    response.json(message)
})

app.listen(1313, function(){
    console.log('Servidor aguardando requisições')
})
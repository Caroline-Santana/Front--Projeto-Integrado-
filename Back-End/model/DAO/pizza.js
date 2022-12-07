/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 28/11/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

 const { MESSAGE_ERROR } = require('../../modulo/config.js')

 //Função para inserir uma nova pizza no BD
 const insertPizza = async function (pizza) {
 
     try {  
         const {PrismaClient} = require('@prisma/client')
         const prisma = new PrismaClient()
         let sql = `insert into tbl_pizza (nome, valor)
                            values ('${pizza.nome}', '${pizza.valor}')`


         const result = await prisma.$executeRawUnsafe(sql)
     
         if (result)
             return true
         else 
             return MESSAGE_ERROR.INTERNAL_ERROR_DB
     }
     catch (error) {
         return false
     }
 
 }

 //Função para atualizar uma pizza no BD
const updatePizza = async  function (pizza){
    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `update tbl_pizza set 
        nome         = '${pizza.nome}', 
        valor        = '${pizza.valor}'

        where id = '${pizza.id}'
        `
        const result = await prisma.$executeRawUnsafe(sql)
   
        if (result)
            return true
        else 
            return MESSAGE_ERROR.INTERNAL_ERROR_DB
    }
    catch (error) {
        return false
    }



}

//Função para retornar todos os registros do BD
const selectAllPizzas = async function (){

    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    const rsPizzas = await prisma.$queryRaw `select tbl_pizza.nome as nomePizza, tbl_pizza.valor as valorPizza, tbl_ingrediente.nome as nomeIngrediente 
    from tbl_pizza 
        inner join tbl_pizza_ingrediente
            on tbl_pizza_ingrediente.id_pizza = tbl_pizza.id
        inner join tbl_ingrediente
            on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente;
              order by id desc`
    
    if (rsPizzas.length > 0 )
        return rsPizzas
    else
        return false
}
//Função para excluir uma pizza no BD
const deletePizza = async function (id){
    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `delete from tbl_pizza
                        where id = '${id}'
                    `
 
        const result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else 
            return MESSAGE_ERROR.INTERNAL_ERROR_DB
    }
    catch (error) {
        return false
    }
}
//Função para retornar apenas o registro baseado no ID
const selectByIdPizza = async function (id){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select nome,round (valor,3) as valor from tbl_pizza 
    where id= ${id};`
    const rsPizza = await prisma.$queryRawUnsafe(sql) 
    
    if (rsPizza.length > 0 )
        return rsPizza
    else
        return false
}
// Função para retornar o último Id gerado no BD
const selectLastId = async function (){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select id 
              from tbl_pizza
               order by id desc 
               limit 1;`
    const rsPizza = await prisma.$queryRawUnsafe(sql)

    if(rsPizza)
        return rsPizza[0].id
    else
        return false
}
 module.exports = {
insertPizza,
updatePizza,
deletePizza,
selectByIdPizza,
selectAllPizzas,
selectLastId
  
}
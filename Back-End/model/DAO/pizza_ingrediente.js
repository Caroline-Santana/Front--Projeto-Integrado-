/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 01/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

//Função para inserir um novo registro no BD
const insertPizzaIngrediente = async function (pizzaIngrediente) {

    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_pizza_ingrediente (id_pizza, id_ingrediente)
                    values (${pizzaIngrediente.id_pizza},${pizzaIngrediente.id_ingrediente})`

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

//Função para buscar os dados de um ingrediente referente a uma pizza
const selectPizzaIngredienteById = async function(idPizza){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_pizza.nome as nomePizza, tbl_pizza.valor as valorPizza, 
    tbl_ingrediente.id as IdIngrediente, tbl_ingrediente.nome as nomeIngrediente
    from tbl_pizza 
        inner join tbl_pizza_ingrediente
            on tbl_pizza_ingrediente.id_pizza = tbl_pizza.id
        inner join tbl_ingrediente
            on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente
              where tbl_pizza.id = ${idPizza};`

        console.log(sql)
        const rsPizzaIngrediente = await prisma.$queryRawUnsafe(sql)

        console.log(rsPizzaIngrediente);
            if (rsPizzaIngrediente)
                return rsPizzaIngrediente
            else
                return false
} 

const selectPizzaIngrediente = async function(){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_pizza.nome as nomePizza, tbl_pizza.valor as valorPizza, 
    tbl_ingrediente.nome as nomeIngrediente, tbl_ingrediente.id as idIngrediente
    from tbl_pizza 
        inner join tbl_pizza_ingrediente
            on tbl_pizza_ingrediente.id_pizza = tbl_pizza.id
        inner join tbl_ingrediente
            on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente`

        
        const rsPizzaIngrediente = await prisma.$queryRawUnsafe(sql)
        
            if (rsPizzaIngrediente)
                return rsPizzaIngrediente
            else
                return false
} 





module.exports = {
    insertPizzaIngrediente,
    selectPizzaIngredienteById,
    selectPizzaIngrediente
}



// `select tbl_ingrediente.id as id_ingrediente, tbl_ingrediente.nome as nome_ingrediente, 
//     tbl_pizza.id as id_pizza
// from tbl_pizza
//   inner join tbl_pizza_ingrediente
//       on tbl_pizza.id = tbl_pizza_ingrediente.id_pizza
//   inner join tbl_ingrediente
//       on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente
// where id_pizza = ${idPizza} ;`
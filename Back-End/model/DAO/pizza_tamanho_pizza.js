/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 07/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

//Função para inserir um novo registro no BD
const insertPizzaTamanhoPizza = async function (pizzaTamanhoPizza) {

    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `insert into tbl_pizza_tamanho_pizza (id_pizza, id_tamanho_pizza)
                    values (${pizzaTamanhoPizza.id_pizza},${pizzaTamanhoPizza.id_tamanho_pizza})`

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

//Função para buscar os dados de tamanho referente a uma pizza
const selectPizzaTamanhoPizzaById = async function(idPizza){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_pizza.nome as nomePizza, tbl_pizza.valor as valorPizza, 
    tbl_tamanho_pizza.id as IdTamanhoPizza, tbl_tamanho_pizza.tamanho as tamanhoPizza
    from tbl_pizza 
        inner join tbl_pizza_tamanho_pizza
            on tbl_pizza_tamanho_pizza.id_pizza = tbl_pizza.id
        inner join tbl_tamanho_pizza
            on tbl_tamanho_pizza.id = tbl_pizza_tamanho_pizza.id_tamanho_pizza
              where tbl_pizza.id = ${idPizza};`

        console.log(sql)
        const rsPizzaTamanhoPizza = await prisma.$queryRawUnsafe(sql)

        console.log(rsPizzaTamanhoPizza);
            if (rsPizzaTamanhoPizza)
                return rsPizzaTamanhoPizza
            else
                return false
} 

const selectPizzaTamanhoPizza = async function(){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tbl_pizza.nome as nomePizza, tbl_pizza.valor as valorPizza, 
    tbl_tamanho_pizza.id as IdTamanhoPizza, tbl_tamanho_pizza.tamanho as tamanhoPizza
    from tbl_pizza 
        inner join tbl_pizza_tamanho_pizza
             on tbl_pizza_tamanho_pizza.id_pizza = tbl_pizza.id
        inner join tbl_tamanho_pizza
            on tbl_tamanho_pizza.id = tbl_pizza_tamanho_pizza.id_tamanho_pizza`

        
        const rsPizzaTamanhoPizza  = await prisma.$queryRawUnsafe(sql)
        
            if (rsPizzaTamanhoPizza)
                return rsPizzaTamanhoPizza
            else
                return false
} 





module.exports = {
    insertPizzaTamanhoPizza,
    selectPizzaTamanhoPizza,
    selectPizzaTamanhoPizzaById
}



// `select tbl_ingrediente.id as id_ingrediente, tbl_ingrediente.nome as nome_ingrediente, 
//     tbl_pizza.id as id_pizza
// from tbl_pizza
//   inner join tbl_pizza_ingrediente
//       on tbl_pizza.id = tbl_pizza_ingrediente.id_pizza
//   inner join tbl_ingrediente
//       on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente
// where id_pizza = ${idPizza} ;`
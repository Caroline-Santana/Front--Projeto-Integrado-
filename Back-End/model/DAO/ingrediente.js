/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 01/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

 const { MESSAGE_ERROR } = require('../../modulo/config.js')

 //Função para inserir um novo ingrediente no BD
 const insertIngrediente = async function (ingrediente) {
 
     try {  
         const {PrismaClient} = require('@prisma/client')
         const prisma = new PrismaClient()
         let sql = `insert into tbl_ingrediente (nome)
                            values ('${ingrediente.nome}')`
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
 //Função para atualizar um ingrediente
 const updateIngrediente = async  function (ingrediente){
    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `update tbl_ingrediente set 
                        nome            = '${ingrediente.nome}'

                        where id = '${ingrediente.id}'
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
const selectByIdIngrdt = async function (id){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select nome from tbl_ingrediente 
    where id= ${id};`
    const rsIngrediente = await prisma.$queryRawUnsafe(sql) 
    
    if (rsIngrediente.length > 0 )
        return rsIngrediente
    else
        return false
}
//Função para retornar todos os registros do BD
const selectAllIngrdt = async function (){

    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    const rsIngrediente = await prisma.$queryRaw `select nome, id from tbl_ingrediente order by id desc`
    
    if (rsIngrediente.length > 0 )
        return rsIngrediente
    else
        return false
}
//Função para excluir um ingrediente no BD
const deleteIngrediente = async function (id){
    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `delete from tbl_ingrediente
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

 module.exports = {
    insertIngrediente,
    updateIngrediente,
    selectByIdIngrdt,
    selectAllIngrdt,
    deleteIngrediente
 }
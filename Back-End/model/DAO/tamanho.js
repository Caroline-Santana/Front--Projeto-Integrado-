/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select).  *
 * Data criação: 07/12/2022                                                                             *
 * Autor: Caroline A.                                                                                   *
 * Versão: 1.0                                                                                          *
 ********************************************************************************************************/

 const { MESSAGE_ERROR } = require('../../modulo/config.js')

 //Função para inserir um novo tamanho de pizza no BD
 const insertTamanhoPizza = async function (tamanhoPizza) {
 
     try {  
         const {PrismaClient} = require('@prisma/client')
         const prisma = new PrismaClient()
         let sql = `insert into tbl_tamanho_pizza (tamanho)
                            values ('${tamanhoPizza.tamanho}')`
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
 //Função para atualizar um tamanho de pizza
 const updateTamanhoPizza = async  function (tamanhoPizza){
    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `update tbl_tamanho_pizza set 
                        tamanho            = '${tamanhoPizza.tamanho}'

                        where id = '${tamanhoPizza.id}'
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
const selectByIdTamanho = async function (id){
    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    let sql = `select tamanho from tbl_tamanho_pizza 
    where id= ${id};`
    const rsTamanho = await prisma.$queryRawUnsafe(sql) 
    
    if (rsTamanho.length > 0 )
        return rsTamanho
    else
        return false
}
//Função para retornar todos os registros do BD
const selectAllTamanhos = async function (){

    const {PrismaClient} = require('@prisma/client')
    const prisma = new PrismaClient()

    const rsTamanho = await prisma.$queryRaw `select tamanho, id from tbl_tamanho_pizza order by id desc`
    
    if (rsTamanho.length > 0 )
        return rsTamanho
    else
        return false
}
//Função para excluir um ingrediente no BD
const deleteTamanhoPizza = async function (id){
    try {  
        const {PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()
        let sql = `delete from tbl_tamanho_pizza
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
  insertTamanhoPizza,
  updateTamanhoPizza,
  selectByIdTamanho,
  selectAllTamanhos,
  deleteTamanhoPizza
 }
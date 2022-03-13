'use strict'
import {PrismaClient} from '@prisma/client';
exports.handler = async (event) => {
    const prisma = new PrismaClient()
    const states = await prisma.state.findMany()
                   .then(resp=>resp)
                   .catch(err=>{
                       return {
                           error:true
                       }
                   })
    if(states?.error){
        return {
            statusCode:500,
            body:JSON.stringify({
                error:'Something went wrong'
            }),
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
    }
    return {
        statusCode:200,
        body:JSON.stringify(states),
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }
}
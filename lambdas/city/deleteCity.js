'use strict'
import { PrismaClient } from '@prisma/client';
exports.handler = async(event) =>{
    const prisma = new PrismaClient();
    const {id} = event.pathParameters;
    const city = await prisma.city.delete({
        where:{
            id:Number(id)
        }
    }).then(resp=>true)
    .catch(err=>false);
    if(!city){
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
        body:JSON.stringify({
            message:'Successfully deleted'
        }),
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }
}
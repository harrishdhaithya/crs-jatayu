'use strict'
import { PrismaClient } from "@prisma/client"

exports.handler = async(event) => {
    const prisma = new PrismaClient();
    const {id} = event.pathParameters;
    const room = await prisma.room.delete({
        where:{
            id:Number(id)
        }
    }).then(resp=>true)
    .catch(err=>false);
    if(!room){
        return {
            statusCode:500,
            body:JSON.stringify({
                error:'Something went wrong'
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            }
        };
    }
    return {
        statusCode:200,
        body:JSON.stringify({
            message:'Successfully deleted'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
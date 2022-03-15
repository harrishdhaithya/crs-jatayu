'use strict'
import { PrismaClient } from "@prisma/client"

exports.handler = async(event) => {
    const prisma = new PrismaClient();
    const {id,roomId,quantity} = JSON.parse(event.body);
    const availablity = await prisma.availablity.update({
        where:{
            id:Number(id)
        },
        data:{
            roomId:Number(roomId),
            quantity:Number(quantity)
        }
    }).then(resp => true)
    .catch(err => false);
    if(!availablity){
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
            error:'Updated Successfully'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
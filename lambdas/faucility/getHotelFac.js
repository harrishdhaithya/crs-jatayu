'use strict'
import { PrismaClient } from "@prisma/client"

exports.handler = async(event) => {
    const {id} = event.pathParameter;
    const prisma = new PrismaClient();
    const facs = await prisma.facility.findMany({
        where:{
            roomId:Number(id)
        },
        include:{
            faucility:true,
            room:true
        }
    }).then(resp => resp)
    .catch(err=>false)
    if(!facs){
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
        body:JSON.stringify(facs),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}

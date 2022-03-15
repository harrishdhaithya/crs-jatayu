'use strict'
import { PrismaClient } from "@prisma/client";

exports.handler = async(event) => {
    const prisma = new PrismaClient();
    const rooms = await prisma.room.findMany()
    .then(resp=>resp)
    .catch(err=>false);
    if(!rooms){
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
        body:JSON.stringify(rooms),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
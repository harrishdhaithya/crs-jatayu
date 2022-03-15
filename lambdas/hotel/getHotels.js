'use strict'
import {PrismaClient} from "@prisma/client";
exports.handler = (event) => {
    const prisma = new PrismaClient();
    const hotels = prisma.hotel.findMany({
        include:{
            city:true,
            room:true
        }
    }).then(resp=>true)
    .catch(err=>false);
    if(!hotels){
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
            error:'Successfully Added'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };

}
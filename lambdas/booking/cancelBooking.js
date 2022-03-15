'use strict'

import {PrismaClient} from "@prisma/client";

exports.handler = async (event) => {
    const {id} = event.pathParameter;
    const prisma = new PrismaClient();
    const booking = await prisma.booking.delete({
        where:{
            id
        }
    }).then(resp=>true)
    .catch(err=>false);
    if(!booking){
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
            error:'Booking Successfull'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
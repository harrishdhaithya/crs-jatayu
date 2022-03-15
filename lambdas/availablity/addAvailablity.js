'use strict'
import {PrismaClient} from '@prisma/client';

exports.handler = async(event) => {
    const {roomId,quantity,date} = JSON.parse(event.body);
    const prisma = new PrismaClient();
    const availablity = await prisma.availablity.create({
        data:{
            roomId:Number(roomId),
            quantity,date
        }
    }).then(resp=>true)
    .catch(err=>false);
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
            message: 'Successfully Added'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
'use strict'
import { PrismaClient } from '@prisma/client';

exports.handler = async(event) => {
    const prisma = new PrismaClient();
    const {roomId,typeid} = JSON.parse(event.body);
    const facility = await prisma.facility.create({
        data:{
            roomId:Number(roomId),typeid:Number(typeid)
        }
    }).then(resp=>true)
    .catch(err=>false);
    if(!facility){
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
            message:'Added Successfully'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
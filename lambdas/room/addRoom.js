'use strict'
import { PrismaClient } from "@prisma/client";

exports.handler = async (event) => {
    const prisma = new PrismaClient();
    const {type,beds,description,hotelId,price,checkInTime} = JSON.parse(event.body);
    const room = await prisma.room.create({
        data:{
            type,beds,description,hotelId:Number(hotelId),price:parseFloat(price),checkInTime
        }
    }).then(resp=>true)
    .then(err=>false);
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
        statusCode:500,
        body:JSON.stringify({
            message:"Successfully Created"
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
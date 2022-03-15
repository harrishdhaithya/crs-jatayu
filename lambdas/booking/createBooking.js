'use strict'
import {  PrismaClient } from '@prisma/client';

exports.handler = async(event) => {
    const prisma = new PrismaClient();
    const {roomId,userid,date,Price} = JSON.parse(event.body);
    const room = await prisma.availablity.findFirst({
        select:{
            quantity:true
        },
        where:{
            roomId,date
        }
    }).then(res=>res)
    .catch(err=>0);
    if(room>0){
        const booking = await prisma.booking.create({
            data:{
                roomId,userid,date,Price
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
                error:'Booking Succesfull'
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
            error:'Not able to book the room'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
'use strict'
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

exports.handler = async(event) => {
    const {name,hotelId,price} = JSON.parse(event.body);
    const sellables = await prisma.sellables.create({
        data:{
            name,hotelId:Number(hotelId),price:parseFloat(price)
        }
    }).then(resp=>true)
    .catch(err=>false);
    if(!sellables){
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
            message:'Successfully Added'
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
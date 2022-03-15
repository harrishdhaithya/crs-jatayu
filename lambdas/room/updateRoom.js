'use strict'

const { PrismaClient } = require("@prisma/client");

exports.handler = async(event) => {
    const {type,beds,description,hotelId,price,checkInTime} = JSON.parse(event.body);
    const prisma = new PrismaClient();
    const {id} = event.pathParameters;
    const room = await prisma.room.update({
        where:{
            id:Number(id)
        },
        data:{
            type,beds,description,hotelId:Number(hotelId),price,checkInTime
        }
    }).then(resp => true)
    .catch(err => false);
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
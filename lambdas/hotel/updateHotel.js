'use strict'
import {PrismaClient} from '@prisma/client'

exports.handler = (event) => {
    const {name,address,email,phoneNumber,cityId} = JSON.parse(event.body);
    const {id} = event.pathParameters;
    const prisma = new PrismaClient();
    const hotel = prisma.hotel.update({
        where:{
            id:id
        },
        data:{
            name,address,email,phoneNumber,cityId
        }
    }).then(resp=>true)
    .catch(err=>false);
    if(!hotel){
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
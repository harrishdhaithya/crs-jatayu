'use strict'
import {PrismaClient} from '@prisma/client';

exports.handler = async(event) => {
    const prisma = new PrismaClient();
    const cities = await prisma.city.findMany()
    .then(resp=>resp)
    .catch(err=>false);
    if(!cities){
        return {
            statusCode:500,
            body:JSON.stringify({
                error:'Something went wrong'
            }),
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
    }
    return {
        statusCode:200,
        body:JSON.stringify(cities),
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }
}
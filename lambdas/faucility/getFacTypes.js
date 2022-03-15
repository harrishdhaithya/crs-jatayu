'use strict'
import { PrismaClient } from "@prisma/client";

exports.handler = async(event) => {
    const prisma = new PrismaClient();
    const fac = await prisma.facilityTypes.findMany()
    .then(resp=>resp)
    .catch(err=>false);
    if(!fac){
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
        body:JSON.stringify(fac),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
'use strict'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

exports.handler = async (event) => {
    const cities = await prisma.city.findMany()
        .then(resp => resp)
        .catch(err => null);

    if (!cities) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' }),
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(cities),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };
}

'use strict'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

exports.handler = async (event) => {
    const { name, stateId } = JSON.parse(event.body);

    const city = await prisma.city.create({ data: { name, stateId: Number(stateId) } })
        .then(resp => true)
        .catch(err => false);

    if (!city) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' }),
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Successfully Inserted' }),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };
}

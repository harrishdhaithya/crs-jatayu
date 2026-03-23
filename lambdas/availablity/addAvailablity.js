'use strict'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

exports.handler = async (event) => {
    const { roomId, quantity, date } = JSON.parse(event.body);

    const availability = await prisma.availablity.create({
        data: { roomId: Number(roomId), quantity: Number(quantity), date: new Date(date) }
    }).then(resp => true)
    .catch(err => false);

    if (!availability) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' }),
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Successfully Added' }),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };
}

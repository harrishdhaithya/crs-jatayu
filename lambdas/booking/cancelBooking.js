'use strict'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

exports.handler = async (event) => {
    const { id } = event.pathParameters;

    const booking = await prisma.booking.delete({
        where: { id: Number(id) }
    }).then(resp => true)
    .catch(err => false);

    if (!booking) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            }
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Booking Cancelled Successfully' }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}

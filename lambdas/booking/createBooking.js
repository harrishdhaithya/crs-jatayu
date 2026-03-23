'use strict'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

exports.handler = async (event) => {
    const { roomId, userid, date, Price } = JSON.parse(event.body);

    const availability = await prisma.availablity.findFirst({
        select: { quantity: true },
        where: { roomId: Number(roomId), date: new Date(date) }
    }).then(res => res)
    .catch(err => null);

    if (availability?.quantity > 0) {
        const booking = await prisma.booking.create({
            data: {
                roomId: Number(roomId), userid, date: new Date(date), Price: parseFloat(Price)
            }
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
            body: JSON.stringify({ message: 'Booking Successful' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            }
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Room not available for the selected date' }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}

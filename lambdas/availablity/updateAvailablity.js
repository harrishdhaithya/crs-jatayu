'use strict'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

exports.handler = async (event) => {
    const { id, roomId, quantity } = JSON.parse(event.body);

    const availability = await prisma.availablity.update({
        where: { id: Number(id) },
        data: { roomId: Number(roomId), quantity: Number(quantity) }
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
        body: JSON.stringify({ message: 'Updated Successfully' }),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };
}

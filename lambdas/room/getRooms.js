'use strict'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

exports.handler = async (event) => {
    const rooms = await prisma.room.findMany()
        .then(resp => resp)
        .catch(err => null);

    if (!rooms) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Something went wrong' }),
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(rooms),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };
}

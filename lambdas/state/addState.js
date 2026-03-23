'use strict'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

exports.handler = async (event) => {
    const { name } = JSON.parse(event.body);

    const record = await prisma.state.create({ data: { name } })
        .then(res => res)
        .catch(err => null);

    if (!record) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Something went wrong" }),
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        };
    }
    return {
        statusCode: 200,
        body: JSON.stringify(record),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    };
};

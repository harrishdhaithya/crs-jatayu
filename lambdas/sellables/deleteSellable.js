'use strict'

import { PrismaClient } from "@prisma/client"

exports.handler = async(event) => {
    const {id} = event.pathParameters;
    const prisma = new PrismaClient();
    
}
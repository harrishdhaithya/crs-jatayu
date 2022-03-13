'use strict'
import {PrismaClient} from "@prisma/client"
exports.handler = function (event) {
    const prisma = new PrismaClient();
    const id = 
    const deleted = prisma.state.delete({
        where:{
            id:id
        }
    }).then(resp=>true)
    .catch(err=>false);
    if(!deleted){
        return {
            statusCode:500,
            body:JSON.stringify({
                message:"Something went wrong"
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }
    }
    return {
        statusCode:200,
        body:JSON.stringify({
            message:"Successfully Deleted"
        }),
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }

}
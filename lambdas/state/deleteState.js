'use strict'
import {PrismaClient} from "@prisma/client"
exports.handler =  async(event) => {
    const prisma = new PrismaClient();
    const {id} =event.pathParameters;
    // console.log(id);
    const deleted = await prisma.state.delete({
        where:{
            id:Number(id)
        }
    }).then(resp=>true)
    .catch(err=>false);
    // console.log(deleted);
    if(!deleted){
        return {
            statusCode:500,
            body:JSON.stringify({
                message:"Something went wrong"
            }),
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
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
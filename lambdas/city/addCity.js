'use strict'
import {PrismaClient} from '@prisma/client';

exports.handler = async (event) => {
    const prisma = new PrismaClient();
    const {name} = JSON.parse(event.body);
    const {stateId} = JSON.parse(event.body);
    const city = await prisma.city.create({data:{
        name:name,stateId:Number(stateId)
    }}).then(resp=>true)
    .catch(err=>{
        console.log(err);
        return false;
    });
    if(!city){
        return {
            statusCode:500,
            body:JSON.stringify({
                error:'Something went wrong'
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
            message:'Successfully Inserted'
        }),
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }
}
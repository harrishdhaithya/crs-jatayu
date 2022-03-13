'use strict'
import {} from "aws-sdk";
import {PrismaClient} from "@prisma/client";

exports.handler = async function (event, context) {
    console.log(event.body);
    const {name} = JSON.parse(event.body);
    var prisma = new PrismaClient();
    var record = await prisma.state.create({data:{name}}).then(res=>{
        return res;
    }).catch(err=>{
        return {
            error:true,
        };
    });
    if(record?.error){
        return {
            statusCode:500,
            body:JSON.stringify({
                error:"Something went wrong"
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }
    }
    return {
        statusCode:200,
        body: JSON.stringify(record)
    }
};
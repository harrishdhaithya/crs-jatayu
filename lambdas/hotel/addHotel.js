import {PrismaClient} from "@prisma/client";

exports.handler = async(event) =>{
    const prisma = new PrismaClient();
    const {name,address,email,phoneNumber,cityId} = JSON.parse(event.body);
    const hotel = await prisma.hotel.create({data:{
        name,address,email,phoneNumber,cityId:Number(cityId)
    }}).then(resp=>true)
    .catch(err=>false);
    if(!hotel){
        return {
            statusCode:500,
            body:JSON.stringify({
                error:'Something went wrong'
            }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            }
        };
    }
    return {
        statusCode:200,
        body:JSON.stringify({
            message:"Successfully Added"
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        }
    };
}
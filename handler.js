import {PrismaClient,Prisma} from "@prisma/client";

export const hello = async (event, context) => {
  const prisma = new PrismaClient();
  const user = {
    email: 'elsa1@prisma.io',
    name: 'Elsa Prisma',
  };
  prisma.user.create({data:user}).catch(err=>console.log(err));
  prisma.post.create({data:{
    title:"jidgfhgabj",
    content:"jkbfdjhg",
    authorId:1
  }}).catch(err=>console.log(err));
  return {
    statusCode: 200,
    body: JSON.stringify([user]),
  };
};


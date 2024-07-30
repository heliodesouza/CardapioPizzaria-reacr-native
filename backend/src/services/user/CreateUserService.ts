import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'


interface UserRequest{
    name: string;
    email: string;
    password: string
}


class CreateUserService{
    async execute({name, email, password}: UserRequest){
        
        //verificar o email
        if(!email){
            throw new Error("email invalido")
        }

        //verifica se o email esta cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(userAlreadyExists){
            throw new Error("Esse email esta sendo usado!")
        } 
        const passwordhash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordhash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })
        
        return user;

    }
}

export { CreateUserService }
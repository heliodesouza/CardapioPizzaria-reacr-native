import prismaClient from "../../prisma";


interface OrderREquest{
    order_id: string;
}

class RemoveOrderService{
    async execute({ order_id }: OrderREquest){

        const order = await prismaClient.order.delete({
            where:{
                id: order_id,
            }
        })
        return order;

    }

}

export { RemoveOrderService}
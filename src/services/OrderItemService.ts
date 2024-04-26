import { PrismaClient } from '@prisma/client';

export class OrderItemService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getOrderItemsByOrderId(orderId: number) {
        return await this.prisma.orderItem.findMany({
            where: { orderId },
            include: { groceryItem: true }
        });
    }

    async getOrderItemById(id: number) {
        return await this.prisma.orderItem.findUnique({
            where: { id },
            include: { groceryItem: true }
        });
    }

    async createOrderItem(orderItemData: any) {
        return await this.prisma.orderItem.create({
            data: orderItemData
        });
    }

    async updateOrderItem(id: number, orderItemData: any) {
        return await this.prisma.orderItem.update({
            where: { id },
            data: orderItemData
        });
    }

    async deleteOrderItem(id: number) {
        return await this.prisma.orderItem.delete({
            where: { id }
        });
    }
}

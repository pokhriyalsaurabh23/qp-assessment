import { PrismaClient } from '@prisma/client';

export class OrderService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getOrdersByUserId(userId: number) {
        return await this.prisma.order.findMany({
            where: { userId },
            include: {
                items: { // Use 'items' as per your schema definition
                    include: {
                        groceryItem: true // Ensures that the groceryItem relation is included
                    }
                }
            }
        });
    }

    async getOrderById(id: number) {
        return await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: { // Use 'items', not 'orderItems'
                    include: {
                        groceryItem: true
                    }
                }
            }
        });
    }

    async createOrder(orderData: any) {
        return await this.prisma.order.create({
            data: orderData
        });
    }

    async updateOrder(id: number, orderData: any) {
        return await this.prisma.order.update({
            where: { id },
            data: orderData,
            include: {
                items: true // Include items to ensure the update is comprehensive
            }
        });
    }

    async deleteOrder(id: number) {
        return await this.prisma.order.delete({
            where: { id }
        });
    }
}

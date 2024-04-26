import { PrismaClient } from '@prisma/client';

export class GroceryItemService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllItems() {
        return await this.prisma.groceryItem.findMany();
    }

    async getItemById(id: number) {
        return await this.prisma.groceryItem.findUnique({
            where: { id }
        });
    }

    async createItem(itemData: any) {
        return await this.prisma.groceryItem.create({
            data: itemData
        });
    }

    async updateItem(id: number, itemData: any) {
        return await this.prisma.groceryItem.update({
            where: { id },
            data: itemData
        });
    }

    async deleteItem(id: number) {
        return await this.prisma.groceryItem.delete({
            where: { id }
        });
    }
}

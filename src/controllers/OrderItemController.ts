import { Request, Response } from 'express';
import { OrderItemService } from '../services/OrderItemService';

export class OrderItemController {
    private orderItemService: OrderItemService;

    constructor(orderItemService?: OrderItemService) {
        this.orderItemService = orderItemService ?? new OrderItemService();
    }

    getOrderItemsByOrderId = async (req: Request, res: Response) => {
        try {
            const items = await this.orderItemService.getOrderItemsByOrderId(+req.params.orderId);
            res.json(items);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to retrieve order items", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to retrieve order items", error: "An unknown error occurred" });
            }
        }
    }

    getOrderItemById = async (req: Request, res: Response) => {
        try {
            const item = await this.orderItemService.getOrderItemById(+req.params.id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).send('Order item not found');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to retrieve order item", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to retrieve order item", error: "An unknown error occurred" });
            }
        }
    }

    createOrderItem = async (req: Request, res: Response) => {
        try {
            const newItem = await this.orderItemService.createOrderItem(req.body);
            res.status(201).json(newItem);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to create order item", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to create order item", error: "An unknown error occurred" });
            }
        }
    }

    updateOrderItem = async (req: Request, res: Response) => {
        try {
            const updatedItem = await this.orderItemService.updateOrderItem(+req.params.id, req.body);
            res.json(updatedItem);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to update order item", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to update order item", error: "An unknown error occurred" });
            }
        }
    }

    deleteOrderItem = async (req: Request, res: Response) => {
        try {
            await this.orderItemService.deleteOrderItem(+req.params.id);
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to delete order item", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to delete order item", error: "An unknown error occurred" });
            }
        }
    }
}

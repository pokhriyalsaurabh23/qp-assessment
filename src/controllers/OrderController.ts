import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
    private orderService: OrderService;

    constructor(orderService?: OrderService) {
        this.orderService = orderService ?? new OrderService();
    }

    getOrdersByUserId = async (req: Request, res: Response) => {
        try {
            const orders = await this.orderService.getOrdersByUserId(+req.params.userId);
            res.json(orders);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to retrieve orders", error: "An unknown error occurred" });
            }
        }
    }

    getOrderById = async (req: Request, res: Response) => {
        try {
            const order = await this.orderService.getOrderById(+req.params.id);
            if (order) {
                res.json(order);
            } else {
                res.status(404).send('Order not found');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to retrieve order", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to retrieve order", error: "An unknown error occurred" });
            }
        }
    }

    createOrder = async (req: Request, res: Response) => {
        try {
            const newOrder = await this.orderService.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to create order", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to create order", error: "An unknown error occurred" });
            }
        }
    }

    updateOrder = async (req: Request, res: Response) => {
        try {
            const updatedOrder = await this.orderService.updateOrder(+req.params.id, req.body);
            res.json(updatedOrder);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to update order", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to update order", error: "An unknown error occurred" });
            }
        }
    }

    deleteOrder = async (req: Request, res: Response) => {
        try {
            await this.orderService.deleteOrder(+req.params.id);
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to delete order", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to delete order", error: "An unknown error occurred" });
            }
        }
    }
}

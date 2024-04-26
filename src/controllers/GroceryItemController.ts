import { Request, Response } from 'express';
import { GroceryItemService } from '../services/GroceryItemService';

export class GroceryItemController {
    private groceryItemService: GroceryItemService;

    // Directly instantiate the GroceryItemService or pass it through the constructor
    constructor(groceryItemService?: GroceryItemService) {
        this.groceryItemService = groceryItemService ?? new GroceryItemService();
    }

    getAllItems = async (req: Request, res: Response) => {
        try {
            const items = await this.groceryItemService.getAllItems();
            res.json(items);
        } catch (err) {
            res.status(500).json({ message: "Failed to retrieve items.", error: err });
        }
    }

    getItemById = async (req: Request, res: Response) => {
        try {
            const item = await this.groceryItemService.getItemById(+req.params.id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).send('Item not found');
            }
        } catch (err) {
            res.status(500).json({ message: "Failed to retrieve item.", error: err });
        }
    }

    createItem = async (req: Request, res: Response) => {
        try {
            const newItem = await this.groceryItemService.createItem(req.body);
            res.status(201).json(newItem);
        } catch (err) {
            res.status(500).json({ message: "Failed to create item.", error: err });
        }
    }

    updateItem = async (req: Request, res: Response) => {
        try {
            const updatedItem = await this.groceryItemService.updateItem(+req.params.id, req.body);
            if (updatedItem) {
                res.json(updatedItem);
            } else {
                res.status(404).send('Item not found');
            }
        } catch (err) {
            res.status(500).json({ message: "Failed to update item.", error: err });
        }
    }

    deleteItem = async (req: Request, res: Response) => {
        try {
            await this.groceryItemService.deleteItem(+req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ message: "Failed to delete item.", error: err });
        }
    }
}

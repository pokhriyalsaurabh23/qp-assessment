import { Router } from 'express';
import { GroceryItemController } from '../controllers/GroceryItemController';
import checkRole from '../middlewares/checkRole';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();
const groceryItemController = new GroceryItemController();  // Create an instance of the controller

// Correctly applying middleware to routes
router.get('/', authenticateToken, (req, res) => groceryItemController.getAllItems(req, res));
router.get('/:id', authenticateToken, (req, res) => groceryItemController.getItemById(req, res));

// Assuming you want to allow only admins to add new items
router.post('/', authenticateToken, checkRole(['admin']), (req, res) => groceryItemController.createItem(req, res));

router.put('/:id', authenticateToken, checkRole(['admin']), (req, res) => groceryItemController.updateItem(req, res));
router.delete('/:id', authenticateToken, checkRole(['admin']), (req, res) => groceryItemController.deleteItem(req, res));

export default router;

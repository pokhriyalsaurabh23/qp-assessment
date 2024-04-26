import { Router } from 'express';
import { OrderItemController } from '../controllers/OrderItemController';
import authenticateToken from '../middlewares/authenticateToken';
import checkRole from '../middlewares/checkRole';

const router = Router();
const orderItemController = new OrderItemController(); // Create an instance of the controller

// Routes that involve viewing data can be less restrictive but should still require authentication
router.get('/order/:orderId', authenticateToken, (req, res) => orderItemController.getOrderItemsByOrderId(req, res));
router.get('/:id', authenticateToken, (req, res) => orderItemController.getOrderItemById(req, res));

// Routes that modify data should be restricted to certain roles
router.post('/', authenticateToken, checkRole(['admin']), (req, res) => orderItemController.createOrderItem(req, res));
router.put('/:id', authenticateToken, checkRole(['admin']), (req, res) => orderItemController.updateOrderItem(req, res));
router.delete('/:id', authenticateToken, checkRole(['admin']), (req, res) => orderItemController.deleteOrderItem(req, res));

export default router;

import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import authenticateToken from '../middlewares/authenticateToken';
import checkRole from '../middlewares/checkRole';

const router = Router();
const orderController = new OrderController(); // Create an instance of the controller

// Apply the authenticateToken middleware to ensure all routes are protected
router.get('/user/:userId', authenticateToken, checkRole(['admin', 'user']), (req, res) => orderController.getOrdersByUserId(req, res));
router.get('/:id', authenticateToken, checkRole(['admin', 'user']), (req, res) => orderController.getOrderById(req, res));

// Restrict creation, updating, and deletion of orders to admins or specific roles
router.post('/', authenticateToken, checkRole(['admin']), (req, res) => orderController.createOrder(req, res));
router.put('/:id', authenticateToken, checkRole(['admin']), (req, res) => orderController.updateOrder(req, res));
router.delete('/:id', authenticateToken, checkRole(['admin']), (req, res) => orderController.deleteOrder(req, res));

export default router;

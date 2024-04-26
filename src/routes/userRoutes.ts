import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import authenticateToken from '../middlewares/authenticateToken';
import checkRole from '../middlewares/checkRole';

const router = Router();
const userController = new UserController(); // Create an instance of the controller


router.post('/login', (req, res) => userController.login(req, res));

// Only authenticated admins can retrieve all users
router.get('/', authenticateToken, checkRole(['admin']), (req, res) => userController.getAllUsers(req, res));

// Users can view their profile or admins can view any profile
router.get('/:id', authenticateToken, (req, res) => userController.getUserById(req, res));

// Only admins can create new users
router.post('/', (req, res) => userController.createUser(req, res));

// Users can update their own profile, or admins can update any profile
router.put('/:id', authenticateToken, (req, res) => userController.updateUser(req, res));

// Only admins can delete users
router.delete('/:id', authenticateToken, checkRole(['admin']), (req, res) => userController.deleteUser(req, res));

export default router;

import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService: UserService;

    constructor(userService?: UserService) {
        this.userService = userService ?? new UserService();
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to retrieve users", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to retrieve users", error: "An unknown error occurred" });
            }
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.getUserById(+req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to retrieve user", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to retrieve user", error: "An unknown error occurred" });
            }
        }
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const newUser = await this.userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to create user", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to create user", error: "An unknown error occurred" });
            }
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const updatedUser = await this.userService.updateUser(+req.params.id, req.body);
            res.json(updatedUser);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to update user", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to update user", error: "An unknown error occurred" });
            }
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            await this.userService.deleteUser(+req.params.id);
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Failed to delete user", error: error.message });
            } else {
                res.status(500).json({ message: "Failed to delete user", error: "An unknown error occurred" });
            }
        }
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const token = await this.userService.login(username, password);
            if (token) {
                res.json({ token });
            } else {
                res.status(401).send('Invalid username or password');
            }
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
}

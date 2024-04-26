import { Request, Response, NextFunction } from 'express';

// Define the middleware function
const checkRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send('Access denied.');
    }
    next();
};

// Export the function correctly using default export
export default checkRole;

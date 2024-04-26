import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Bearer TOKEN

  if (token == null) return res.sendStatus(401);  // No token, unauthorized
// @ts-ignore
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);  // Invalid token
    // @ts-ignore
    req.user = user;
    next();
  });
};

export default authenticateToken;

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllUsers() {
        return await this.prisma.user.findMany();
    }

    async getUserById(id: number) {
        return await this.prisma.user.findUnique({
            where: { id }
        });
    }

    async createUser(userData: any) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword 
            }
        });
        return newUser;
    }

    async updateUser(id: number, userData: any) {
        return await this.prisma.user.update({
            where: { id },
            data: userData
        });
    }

    async deleteUser(id: number) {
        return await this.prisma.user.delete({
            where: { id }
        });
    }

    async login(username: string, password: string): Promise<string | null> {
        const user = await this.prisma.user.findUnique({
            where: { username }
        });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: '24h' }
            );
            return token;
        } else {
            return null;
        }
    }
}

import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import groceryItemRoutes from './routes/groceryItemRoutes';
import orderRoutes from './routes/orderRoutes';
import orderItemRoutes from './routes/orderItemRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Define your routes here
app.use('/api/users', userRoutes);
app.use('/api/grocery-items', groceryItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

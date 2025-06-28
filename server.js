import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import productRouter from './src/Features/Product/product.router.js';
import userRouter from './src/Features/User/user.routes.js';
import jwtMiddleware from './src/Middlewares/jwt.middlewares.js';

import bodyParser from 'body-parser';
import cartItemRouter from './src/Features/Cart/cartitems.routes.js';
import cors from 'cors'; // Import cors library
import connectToMongoDB from './src/Config/mongodb.js';
import dotenv from 'dotenv';
import connectDB from './src/Config/mongooseconfig.js';

dotenv.config();

const apidocs = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

const server = express();

server.use(cors()); // Use cors middleware

server.use(bodyParser.json()); // Middleware to parse JSON bodies

server.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apidocs));
server.use('/api/products', jwtMiddleware, productRouter);
server.use('/api/cartitems', jwtMiddleware, cartItemRouter);
server.use('/api/users', userRouter);

server.use((req, res) => {
    res.status(404).send({ message: 'Route not found' });
});

server.get('/', (req, res) => {
    res.send('Hello, World!');
});

server.listen(3000, connectDB);
console.log('Server is running on http://localhost:3000');

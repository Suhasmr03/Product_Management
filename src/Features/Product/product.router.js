import express from 'express';
import ProductControllers from './productControllers.js';
import {upload} from '../../Middlewares/fileupload.js'; // Assuming you have a file upload middleware


const productRouter = express.Router();

const productControllers = new ProductControllers();

productRouter.post('/rate', (req, res) => productControllers.rateProduct(req, res)); // Endpoint to rate a product

productRouter.get('/', (req, res) => productControllers.getAllProducts(req, res)); // Endpoint to get all products
productRouter.post('/',upload.single('imageUrl'), (req, res) => productControllers.addProduct(req, res)); // Endpoint to add a new product with image upload
productRouter.get('/filter', (req, res) => productControllers.filterProducts(req, res)); // Endpoint to filter products by price and category
productRouter.get('/:id', (req, res) => productControllers.getOneProduct(req, res)); // Endpoint to get a single product by ID

// Note: This route might need to be adjusted based on your query parameter handling


export default productRouter;
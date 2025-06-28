import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js"; // Assuming you have a repository for product operations

export default class ProductControllers {

    async getAllProducts(req, res) {
        try {
            const products = await ProductRepository.getAll();
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ message: 'Failed to fetch products', error: error.message });
        }
    }

    async addProduct(req, res) {
        const { name, desc, category, price, sizes } = req.body;
        const imageUrl = req.file ? req.file.filename : req.body.imageUrl || null; // Assuming the file upload middleware sets req.file

        const newProduct = new ProductModel(  null,name, desc, imageUrl, category, price, sizes );

        try {
            // Use the repository to add the product (assuming async)
            const createdProduct = await ProductRepository.add(newProduct);
            res.status(201).send(createdProduct);
        } catch (error) {
            res.status(500).send({ message: 'Failed to add product', error: error.message });
        }
    }

    rateProduct(req, res) {
        console.log("Request Headers:", req.headers);
        console.log("Rating product with body:", req.body);
        const { userId, productId, rating } = req.body;

        // Validate input
        if (!userId || !productId || !rating) {
            return res.status(400).send({ message: 'Invalid input' });
        }

        // Call the model method to rate the product
        const result = ProductModel.rateProduct(userId, productId, rating);
        
        if (result) {
            return res.status(404).send({ message: result });
        }
        
        res.status(200).send({ message: 'Product rated successfully' });

    }

    async getOneProduct(req, res) {
        const id = req.params.id;
        try {
            const product = await ProductRepository.get(id);
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }
            res.status(200).send(product);
        } catch (error) {
            res.status(500).send({ message: 'Failed to fetch product', error: error.message });
        }
    }

    async filterProducts(req, res) {
        try {
            console.log("Filtering products with query parameters:");
            console.log(req.query);
            const { minPrice, maxPrice, category } = req.query;
            console.log('Received:', { minPrice, maxPrice, category });
            const filteredProducts = await ProductRepository.filter(minPrice, maxPrice, category);
            console.log(filteredProducts);
            res.status(201).send(filteredProducts);
        } catch (error) {
            res.status(500).send({ message: 'Failed to filter products', error: error.message });
        }
    }
    async rateProduct(req, res) {
        const { userId, productId, rating } = req.query;

        // Validate input
        if (!userId || !productId || !rating) {
            return res.status(400).send({ message: 'Invalid input' });
        }

        try {
            const result = await ProductRepository.rateProduct(userId, productId, rating);
            if (result.error) {
                return res.status(404).send({ message: result.error });
            }
            res.status(200).send({ message: 'Product rated successfully' });
        } catch (error) {
            res.status(500).send({ message: 'Failed to rate product', error: error.message });
        }
    }

}
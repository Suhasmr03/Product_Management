import { ObjectId } from 'mongodb';
import { connectToMongoDB } from '../../Config/mongodb.js';

class ProductRepository {

   async add(newProduct) {
        try {
            const db = await connectToMongoDB();
            const collections = db.collection('products');
            const result = await collections.insertOne(newProduct);
            if (result.acknowledged) {
                newProduct._id = result.insertedId;
                return newProduct;
            } else {
                throw new Error('Product creation failed');
            }
        } catch (error) {
            throw new Error(`Add product failed: ${error.message}`);
        }

    }

    async get(id) {
        try {
            const db = await connectToMongoDB();
            const collections = db.collection('products');
            const product = await collections.findOne({ _id: new ObjectId(id) });
            console.log('Looking for product with _id:', id, typeof id);

            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Get product failed: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const db = await connectToMongoDB();
            const collections = db.collection('products');
            const products = await collections.find().toArray();
            return products;
        } catch (error) {
            throw new Error(`Get all products failed: ${error.message}`);
        }
    }

    async filter(minPrice, maxPrice, category) {
        try {
            const db = await connectToMongoDB();
            const collections = db.collection('products');
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            let query = {};
            if (minPrice) {
                query.price = { $gte: min };
            }
            if (maxPrice) {
                query.price = {$lte: max };
            }
            if (category) {
                query.category = category;
            }
            const products = await collections.find(query).toArray();
            return products;
        } catch (error) {
            throw new Error(`Filter products failed: ${error.message}`);
        }
}
    async rateProduct(userId, productId, rating) {
        try {
            const db = await connectToMongoDB();
            const collections = db.collection('products');
            const product = await collections.findOne({ _id: new ObjectId(productId) });
            if (!product) {
                throw new Error('Product not found');
            }
            if (!product.ratings) {
                product.ratings = [];
            }
            const existingRatingIndex = product.ratings.findIndex(r => r.userId === userId);
            if (existingRatingIndex >= 0) {
                product.ratings[existingRatingIndex].rating = rating; // Update existing rating
            } else {
                product.ratings.push({ userId, rating }); // Add new rating
            }
            await collections.updateOne({ _id: new ObjectId(productId) }, { $set: { ratings: product.ratings } });
            return { message: 'Product rated successfully' };
        } catch (error) {
            throw new Error(`Rate product failed: ${error.message}`);
        }
    }
}
export default new ProductRepository();
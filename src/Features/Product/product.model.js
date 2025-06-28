

export default class ProductModel {
    constructor(id, name, desc, imageUrl, category, price, sizes) {
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.sizes = sizes;
    }

    /*
    static add(product) {
        product.id = products.length + 1; // Simple ID generation logic
        products.push(product);
        return product;
        }

        static get(id){
        const product = products.find(p => p.id === id);
        return product;
        }

        static getAll() {
        return products;
        }   
    */

    /* static filter(minPrice, maxPrice, category) {
        const min=parseFloat(minPrice);
        const max=parseFloat(maxPrice);
        // Decode and normalize the category to lowercase
        const cat = decodeURIComponent(category).toLowerCase();
        const result= products.filter((product) => {
            return (product.price >= min && product.price <= max && product.category.toLowerCase() === cat);
        });
        return result;
    } 
        */

    static rateProduct(userid, productId, rating) {
        const user = users.find(u => u.id === userid);
        if (!user) {
            return { error: 'User not found' };
        }
        const product = products.find(p => p.id === productId);
        if (!product) {
            return { error: 'Product not found' };
        }
        if (!product.ratings) {
            product.ratings = [];
           product.ratings.push({ userId: userid, rating: rating });
        }else{
            const existingRating = product.ratings.findIndex(r => r.userId === userid);
            if (existingRating>=0) {
                product.ratings[existingRating] = {userId: userid, rating: rating}; // Update existing rating
            } else {
                product.ratings.push({ userId: userid, rating: rating }); // Add new rating
            }
        }

}
}

var products = [
    new ProductModel(1, 'Product 1', 'Description for product 1', 'https://example.com/image1.jpg', 'Category 1', '100', ['M', 'L', 'XL']),
    new ProductModel(2, 'Product 2', 'Description for product 2', 'https://example.com/image2.jpg', 'Category 2', '200', ['S', 'M', 'L']),
    new ProductModel(3, 'Product 3', 'Description for product 3', 'https://example.com/image3.jpg', 'Category 3', '300', ['S', 'M']),
    new ProductModel(4, 'Product 4', 'Description for product 4', 'https://example.com/image4.jpg', 'Category 4', '400', ['L', 'XL']),
];
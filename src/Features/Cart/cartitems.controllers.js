import CartItemModel from "./cartitems.models.js";

export default class CartItemControllers {

    addCartItem(req, res) {

        const { productId, quantity } = req.body;
        const userId = req.user.id; // Get user ID from JWT token

        // Validate input
        if (!productId || !quantity) {
            return res.status(400).send({ message: 'Product ID and quantity are required' });
        }

        // Add cart item
        CartItemModel.addCartItem(productId, quantity, userId);
        res.status(201).send({ message: 'Cart item added successfully' });
    }

    getCartItems(req, res) {
        const userId = req.user.id; // Get user ID from JWT token
        const cartItems = CartItemModel.getCartItemsByUser(userId);
        res.status(200).send(cartItems);
    }

    removeCartItem(req, res) {
        const userId =  req.user.id; // Get user ID from JWT token
        // Validate user ID
        if (!userId) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        const { id } = req.params; // Get cart item ID from request parameters
        const success = CartItemModel.removeCartItem(id,userId);

        if (success) {
            res.status(200).send({ message: 'Cart item removed successfully' });
        } else {
            res.status(404).send({ message: 'Cart item not found' });
        }
    }

}
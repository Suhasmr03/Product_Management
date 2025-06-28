import express from 'express';
import CartItemControllers from './cartitems.controllers.js';

const cartItemRouter = express.Router();
const cartItemControllers = new CartItemControllers();

// Route to add a cart item
cartItemRouter.post('/', cartItemControllers.addCartItem);
// Route to get all cart items for the authenticated user
cartItemRouter.get('/', cartItemControllers.getCartItems);
// Route to remove a cart item by ID
cartItemRouter.delete('/:id', cartItemControllers.removeCartItem);


export default cartItemRouter;
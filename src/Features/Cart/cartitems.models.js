


export default class CartItemModel {
    constructor(productId, quantity, userId, id) {
        this.productId = productId;
        this.quantity = quantity;
        this.userId = userId;
        this.id = id; // Unique identifier for the cart item
    }

    static addCartItem(productId, quantity, userId) {
        const newCartItem = new CartItemModel(productId, quantity, userId);
        newCartItem.id = cartItems.length + 1; // Simple ID generation logic
        cartItems.push(newCartItem);
        return newCartItem; // Return the newly added cart item
    }

    static getCartItemsByUser(userId) {
        return cartItems.filter(item => item.userId === userId);
    }

    static removeCartItem(id, userId) {
        id=Number(id); // Ensure id is a number
        console.log('Trying to remove cart item:', { id, userId });
        const index = cartItems.findIndex(item => item.id === id && item.userId === userId);
        if (index !== -1) {
             console.log('Cart item found and removed:', cartItems[index]);
            cartItems.splice(index, 1);
            return true; // Item removed successfully
        }
        return false; // Item not found
    }
}

const cartItems = [
   new CartItemModel(1, 2, 1,1), // Example cart item
   new CartItemModel(2, 1, 1,2), // Another example cart item
];
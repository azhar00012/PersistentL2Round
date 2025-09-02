import { useCart } from '../../context/CartContext';
import './Cart.scss';

function Cart() {
    const { items, removeFromCart, updateQuantity } = useCart();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="container mt-4">
                <h2>Shopping Cart</h2>
                <p>Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            <div className="cart-items">
                {items.map(item => (
                    <div key={item.id} className="card mb-3 cart-item">
                        <div className="row g-0">
                            <div className="col-md-2">
                                <img src={item.image} alt={item.title} className="img-fluid rounded-start p-2" />
                            </div>
                            <div className="col-md-10">
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">
                                        <strong>Price:</strong> ${item.price}
                                    </p>
                                    <div className="quantity-controls">
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-3">{item.quantity}</span>
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="btn btn-danger ms-3"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="card mt-3">
                    <div className="card-body text-end">
                        <h4>Total: ${total.toFixed(2)}</h4>
                        <button className="btn btn-primary">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
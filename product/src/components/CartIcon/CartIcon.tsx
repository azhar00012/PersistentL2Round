import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CartIcon.scss';

function CartIcon() {
    const { items } = useCart();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Link to="/cart" className="cart-icon-wrapper">
            <i className="bi bi-cart3"></i>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
    );
}

export default CartIcon;
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import CartIcon from './components/CartIcon/CartIcon';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart/Cart';

function App() {
    return (
        <CartProvider>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/home">MyApp</Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/product-list">Product List</Link>
                                </li>
                            </ul>
                            <CartIcon />
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
import { useEffect, useState } from "react";
import axios from "axios";
import './ProductList.scss';
import { useCart } from '../../context/CartContext';

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [view, setView] = useState<'grid' | 'table'>('grid');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const sortedProducts = [...products].sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-4 product-list">
            <div className="d-flex flex-wrap justify-content-end align-items-center mb-3">
                <button
                    className={`btn btn-outline-primary mb-2 me-2 ${view === 'grid' ? 'active' : ''}`}
                    onClick={() => setView('grid')}
                >
                    Grid
                </button>
                <button
                    className={`btn btn-outline-primary mb-2 me-2 ${view === 'table' ? 'active' : ''}`}
                    onClick={() => setView('table')}
                >
                    Table
                </button>
                <button
                    className="btn btn-outline-secondary mb-2"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                    Sort by Price: {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
                </button>
            </div>

            {view === 'grid' ? (
                <div className="row grid-view">
                    {sortedProducts.map(product => (
                        <div key={product.id} className="col-xl-3 col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <img src={product.image} className="card-img-top p-3 product-image" alt={product.title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text text-truncate">{product.description}</p>
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <span className="badge bg-primary">${product.price}</span>
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => addToCart({
                                                id: product.id,
                                                title: product.title,
                                                price: product.price,
                                                image: product.image,
                                                quantity: 1
                                            })}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="table-responsive table-view">
                    <table className="table table-striped align-middle">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>
                                    Price
                                    <button
                                        className="btn btn-sm btn-link ms-2"
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    >
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt={product.title} className="product-image" />
                                    </td>
                                    <td>{product.title}</td>
                                    <td className="text-truncate product-description">{product.description}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => addToCart({
                                                id: product.id,
                                                title: product.title,
                                                price: product.price,
                                                image: product.image,
                                                quantity: 1
                                            })}
                                        >
                                            Add to Cart
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ProductList;
import {useEffect, useState} from "react";
import {useParams, Link} from "react-router";
import Cookies from "js-cookie";
import type {Cart, CartItem} from "../../types/Cart.tsx";
import type {Chocolate} from "../../types/Chocolate.tsx";

export default function Details() {
    const {id} = useParams();
    const [chocolate, setChocolate] = useState<Chocolate>();
    //controls "added to bag" success message
    const [showMessage, setShowMessage] = useState(false);
    const COOKIE_KEY = "shopping_cart";

    //fetches specific chocolate by ID from the API
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8080/chocolates/' + id);
            const data = await res.json();
            setChocolate(data);
        };
        fetchData().catch(console.error);
    }, [id]);

    //handles adding the current chocolate to the cart stored in the cookie
    //if item already is in cart, the quantity is added on
    const handleAddToCart = () => {
        const raw = Cookies.get(COOKIE_KEY);
        const cart: Cart = raw ? JSON.parse(raw) : {items: []};
        const existing = cart.items.find((item: CartItem) => item.id === chocolate?.chocolateId);
        const quantity = 1;

        const updatedItems = existing
            ? cart.items.map((item: CartItem) =>
                item.id === chocolate?.chocolateId
                    ? {...item, quantity: item.quantity + quantity}
                    : item
            )
            : [...cart.items, {id: chocolate?.chocolateId, price: chocolate?.price, quantity}];

        Cookies.set(COOKIE_KEY, JSON.stringify({items: updatedItems}), {expires: 1});
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <div className="page-wrapper">
            {/* Back button */}
            <Link to="/" className="btn-choc-outline mb-4 d-inline-flex align-items-center gap-2">
                <i className="bi bi-arrow-left"></i> Back to Collection
            </Link>

            {/* Success message when item is added to cart */}
            {showMessage && (
                <div className="alert-choc-success fade-up">
                    <i className="bi bi-check-circle-fill"></i>
                    Added to your bag successfully!
                </div>
            )}

            {/* Show product details once the API response has loaded, otherwise show a spinner */}

            {chocolate ? (
                <div className="row g-5 fade-up">
                    {/* Product image from azure */}
                    <div className="col-12 col-md-5">
                        <div style={{
                            borderRadius: '14px',
                            height: '360px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(59,35,24,0.08)'
                        }}>
                            <img
                                src={chocolate.imgFileName}
                                alt={chocolate.chocolateName}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Product information */}
                    <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
                        <span className="details-badge">
                            {chocolate.chocolateType} &bull; {chocolate.season}
                        </span>
                        <h1 className="section-heading">{chocolate.chocolateName}</h1>
                        <p className="details-price">${chocolate.price?.toFixed(2)} CAD</p>
                        <hr className="divider-choc" />
                        <p className="details-description">{chocolate.description}</p>

                        {/* Add to bag writes to the cookie */}
                        <div className="d-flex gap-3 flex-wrap">
                            <button className="btn-choc" onClick={handleAddToCart}>
                                <i className="bi bi-bag-plus me-2"></i>Add to Bag
                            </button>
                            {/* Navigates to checkout page */}
                            <Link to="/Checkout" className="btn-choc-outline">
                                <i className="bi bi-bag me-2"></i>View Bag
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-5" style={{color: 'var(--choc-light)'}}>
                    <i className="bi bi-hourglass-split fs-2 mb-3 d-block"></i>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
}
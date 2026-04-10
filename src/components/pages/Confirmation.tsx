import {useEffect, useState} from "react";
import {Navigate, Link} from "react-router";

export default function Confirmation() {
    const [status, setStatus] = useState<string | null>(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(`http://localhost:8080/checkout/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            })
            .catch(console.error);
    }, []);

    if (status === 'open') {
        return <Navigate to="/Checkout" />;
    }

    if (status === 'complete') {
        return (
            <div className="page-wrapper">
                <div className="confirmation-card fade-up">
                    <div className="confirmation-icon">
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <h2>Order Confirmed!</h2>
                    <hr className="divider-choc mx-auto" />
                    <p>
                        Thank you for your order! A confirmation email will be sent to{' '}
                        <strong>{customerEmail}</strong>.
                    </p>
                    <p className="mt-2" style={{fontSize: '0.9rem'}}>
                        Questions? Email us at{' '}
                        <a href="mailto:orders@cocoabycarleigh.com">orders@cocoabycarleigh.com</a>
                    </p>
                    <Link to="/" className="btn-choc mt-4 d-inline-block">
                        <i className="bi bi-arrow-left me-2"></i>Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper text-center py-5" style={{color: 'var(--choc-light)'}}>
            <i className="bi bi-hourglass-split fs-2 mb-3 d-block"></i>
            <p>Loading your order details...</p>
        </div>
    );
}
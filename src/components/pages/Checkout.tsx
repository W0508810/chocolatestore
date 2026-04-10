import {loadStripe} from "@stripe/stripe-js";
import {useCallback} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";
import Cookies from "js-cookie";

const stripePromise = loadStripe("pk_test_51T1oc5Ca8IMfqdn5EshpUBii8FaqIn5FLq8vpqnReOBAEHvLTb0zAYn1LTugHNMniQjd5HuK2RzVqkHKLFeHUKji00GxcX0GbL");

export default function Checkout() {
    const cartJSON = Cookies.get("shopping_cart");

    const fetchClientSecret = useCallback(async () => {
        const res = await fetch("http://localhost:8080/checkout/create-checkout-session", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: cartJSON
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Checkout session failed:", res.status, errorText);
            throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        return data.clientSecret;
    }, [cartJSON]); // added cartJSON for dependency

    const options = {fetchClientSecret};

    return (
        <div className="page-wrapper">
            <div className="fade-up">
                <p className="section-subheading">Ready to order?</p>
                <h1 className="section-heading">Checkout</h1>
                <hr className="divider-choc" />
            </div>

            <div className="checkout-wrapper fade-up fade-up-delay-1">
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </div>
        </div>
    );
}
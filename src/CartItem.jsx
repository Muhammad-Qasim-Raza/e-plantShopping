import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [message, setMessage] = useState("");

  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setMessage("Checkout is coming soon — your cart is ready.");
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="empty-cart">
          <div className="empty-icon">✦</div>
          <span className="section-kicker">YOUR CART</span>
          <h1>
            Your cart is <span>quiet.</span>
          </h1>
          <p>
            Nothing has found its way home yet. Explore our collection and
            choose something green.
          </p>
          <button className="primary-btn" onClick={() => onNavigate("plants")}>
            Browse plants <span>↗</span>
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-heading">
        <div>
          <span className="section-kicker">YOUR COLLECTION</span>
          <h1>
            Your <span>cart.</span>
          </h1>
          <p>
            {cartItems.length} unique plant{cartItems.length !== 1 ? "s" : ""}{" "}
            selected.
          </p>
        </div>
        <button className="text-btn" onClick={() => onNavigate("plants")}>
          ← Continue shopping
        </button>
      </section>

      <section className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => {
            const itemTotal = item.price * item.quantity;

            return (
              <article className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-product">
                  <span className="cart-product-label">PARADISE NURSERY</span>
                  <h2>{item.name}</h2>
                  <p>Unit price: ${item.price.toFixed(2)}</p>

                  <div className="quantity-row">
                    <div
                      className="quantity-control"
                      aria-label={`Quantity for ${item.name}`}
                    >
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-total">
                  <span>ITEM TOTAL</span>
                  <strong>${itemTotal.toFixed(2)}</strong>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="cart-summary">
          <span className="section-kicker">ORDER SUMMARY</span>
          <h2>Ready to grow.</h2>

          <div className="summary-line">
            <span>Plants</span>
            <span>
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="summary-total">
            <span>Total Cart Amount:</span>
            <strong>${calculateTotalAmount().toFixed(2)}</strong>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout <span>↗</span>
          </button>

          {message && <div className="checkout-message">{message}</div>}

          <button className="continue-btn" onClick={() => onNavigate("plants")}>
            Continue Shopping
          </button>
        </aside>
      </section>
    </main>
  );
}

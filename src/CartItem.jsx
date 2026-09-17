import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

/**
 * CartItem displays all products currently inside the shopping cart.
 *
 * It handles:
 * - Product quantity changes
 * - Product removal
 * - Cart total calculation
 * - Empty-cart state
 * - Checkout feedback
 */
export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.items || []);

  const [message, setMessage] = useState("");

  /**
   * Calculates the complete cart amount.
   *
   * Each product's price is multiplied by its quantity,
   * then all product totals are added together.
   */
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;

      return total + price * quantity;
    }, 0);
  };

  /**
   * Calculates the total number of individual plants
   * currently selected in the cart.
   */
  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => {
      return total + (Number(item.quantity) || 0);
    }, 0);
  };

  /**
   * Decreases a product quantity.
   *
   * Quantity is never allowed to become less than 1.
   * If the user wants to remove the product completely,
   * they can use the Remove button.
   */
  const handleDecrease = (item) => {
    const newQuantity = Math.max(1, Number(item.quantity) - 1);

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: newQuantity,
      }),
    );
  };

  /**
   * Increases a product quantity by one.
   */
  const handleIncrease = (item) => {
    const newQuantity = Number(item.quantity) + 1;

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: newQuantity,
      }),
    );
  };

  /**
   * Removes a product from the cart and clears
   * any previous checkout message.
   */
  const handleRemove = (id) => {
    dispatch(removeItem(id));
    setMessage("");
  };

  /**
   * Displays a temporary checkout status message.
   */
  const handleCheckout = () => {
    setMessage("Checkout is coming soon — your cart is ready.");
  };

  /*
   * Empty-cart state.
   *
   * This prevents the cart page from trying to render
   * product information when there are no cart items.
   */
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="empty-cart">
          <div className="empty-icon" aria-hidden="true">
            ✦
          </div>

          <span className="section-kicker">YOUR CART</span>

          <h1>
            Your cart is <span>quiet.</span>
          </h1>

          <p>
            Nothing has found its way home yet. Explore our collection and
            choose something green.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={() => onNavigate("plants")}
          >
            Browse plants <span aria-hidden="true">↗</span>
          </button>
        </section>
      </main>
    );
  }

  const totalAmount = calculateTotalAmount();
  const totalItems = calculateTotalItems();

  return (
    <main className="cart-page">
      <section className="cart-heading">
        <div>
          <span className="section-kicker">YOUR COLLECTION</span>

          <h1>
            Your <span>cart.</span>
          </h1>

          <p>
            {cartItems.length} unique plant
            {cartItems.length !== 1 ? "s" : ""} selected.
          </p>
        </div>

        <button
          type="button"
          className="text-btn"
          onClick={() => onNavigate("plants")}
        >
          ← Continue shopping
        </button>
      </section>

      <section className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => {
            const price = Number(item.price) || 0;
            const quantity = Math.max(1, Number(item.quantity) || 1);
            const itemTotal = price * quantity;

            return (
              <article className="cart-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.opacity = "0.5";
                  }}
                />

                <div className="cart-product">
                  <span className="cart-product-label">PARADISE NURSERY</span>

                  <h2>{item.name}</h2>

                  <p>Unit price: ${price.toFixed(2)}</p>

                  <div className="quantity-row">
                    <div
                      className="quantity-control"
                      aria-label={`Quantity controls for ${item.name}`}
                    >
                      <button
                        type="button"
                        onClick={() => handleDecrease(item)}
                        disabled={quantity <= 1}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>

                      <span aria-live="polite">{quantity}</span>

                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
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
            <span>{totalItems}</span>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="summary-total">
            <span>Total Cart Amount:</span>

            <strong>${totalAmount.toFixed(2)}</strong>
          </div>

          <button
            type="button"
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Checkout <span aria-hidden="true">↗</span>
          </button>

          {message && (
            <div className="checkout-message" role="status">
              {message}
            </div>
          )}

          <button
            type="button"
            className="continue-btn"
            onClick={() => onNavigate("plants")}
          >
            Continue Shopping
          </button>
        </aside>
      </section>
    </main>
  );
}

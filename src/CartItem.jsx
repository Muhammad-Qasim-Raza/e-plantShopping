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
 * - Invalid product price handling
 */
export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.items || []);

  const [message, setMessage] = useState("");

  /**
   * Validates a product price before using it in calculations.
   *
   * A valid price must be:
   * - A number
   * - Finite
   * - Zero or greater
   */
  const isValidPrice = (price) => {
    const numericPrice = Number(price);

    return Number.isFinite(numericPrice) && numericPrice >= 0;
  };

  /**
   * Safely converts a quantity into a valid positive number.
   */
  const getSafeQuantity = (quantity) => {
    const numericQuantity = Number(quantity);

    if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
      return 1;
    }

    return Math.floor(numericQuantity);
  };

  /**
   * Calculates the complete cart amount.
   *
   * Invalid or missing prices are safely ignored instead of
   * causing NaN or invalid totals to appear in the UI.
   */
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      if (!item || !isValidPrice(item.price)) {
        return total;
      }

      const price = Number(item.price);
      const quantity = Number(item.quantity);

      if (!Number.isFinite(quantity) || quantity <= 0) {
        return total;
      }

      return total + price * quantity;
    }, 0);
  };

  /**
   * Calculates the total number of individual plants
   * currently selected in the cart.
   *
   * Invalid quantities are ignored safely.
   */
  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => {
      if (!item) {
        return total;
      }

      const quantity = Number(item.quantity);

      if (!Number.isFinite(quantity) || quantity <= 0) {
        return total;
      }

      return total + Math.floor(quantity);
    }, 0);
  };

  /**
   * Decreases a product quantity by one.
   *
   * When the quantity reaches zero, CartSlice removes
   * the product from the cart.
   */
  const handleDecrease = (item) => {
    const currentQuantity = getSafeQuantity(item.quantity);
    const newQuantity = currentQuantity - 1;

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: newQuantity,
      }),
    );

    setMessage("");
  };

  /**
   * Increases a product quantity by one.
   */
  const handleIncrease = (item) => {
    const currentQuantity = getSafeQuantity(item.quantity);
    const newQuantity = currentQuantity + 1;

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: newQuantity,
      }),
    );

    setMessage("");
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
   * Displays a checkout status message.
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
            /*
             * Validate product data before displaying it.
             * Invalid prices are displayed as $0.00 rather than
             * allowing NaN or Infinity to reach the UI.
             */
            const hasValidPrice = isValidPrice(item?.price);
            const price = hasValidPrice ? Number(item.price) : 0;

            const quantity = getSafeQuantity(item?.quantity);
            const itemTotal = price * quantity;

            return (
              <article className="cart-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name || "Plant"}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.opacity = "0.5";
                  }}
                />

                <div className="cart-product">
                  <span className="cart-product-label">PARADISE NURSERY</span>

                  <h2>{item.name || "Unnamed Plant"}</h2>

                  <p>Unit price: ${price.toFixed(2)}</p>

                  {!hasValidPrice && (
                    <p
                      role="alert"
                      style={{
                        color: "#b8e86d",
                        marginTop: "6px",
                      }}
                    >
                      Price information is currently unavailable.
                    </p>
                  )}

                  <div className="quantity-row">
                    <div
                      className="quantity-control"
                      aria-label={`Quantity controls for ${
                        item.name || "plant"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleDecrease(item)}
                        aria-label={`Decrease ${item.name || "plant"} quantity`}
                      >
                        −
                      </button>

                      <span aria-live="polite">{quantity}</span>

                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        aria-label={`Increase ${item.name || "plant"} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                      aria-label={`Remove ${item.name || "plant"} from cart`}
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

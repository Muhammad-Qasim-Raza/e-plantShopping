import { useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";

export default function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [page, setPage] = useState("home");
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const openPage = (target) => {
    if (target === "home") {
      setShowProducts(false);
      setPage("home");
    } else {
      setShowProducts(true);
      setPage(target);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className={`navbar ${showProducts ? "navbar-scrolled" : ""}`}>
        <button
          className="brand"
          onClick={() => openPage("home")}
          aria-label="Go to Paradise Nursery home"
        >
          <span className="brand-mark">✦</span>
          <span className="brand-copy">
            <strong>PARADISE</strong>
            <small>NURSERY</small>
          </span>
        </button>

        {showProducts && (
          <nav className="nav-links" aria-label="Main navigation">
            <button
              className={page === "home" ? "active" : ""}
              onClick={() => openPage("home")}
            >
              Home
            </button>
            <button
              className={page === "plants" ? "active" : ""}
              onClick={() => openPage("plants")}
            >
              Plants
            </button>
            <button
              className={`cart-nav ${page === "cart" ? "active" : ""}`}
              onClick={() => openPage("cart")}
            >
              <span>Cart</span>
              <span className="cart-count">{cartCount}</span>
            </button>
          </nav>
        )}
      </header>

      {!showProducts && (
        <>
          <main className="hero">
            <div className="hero-glow hero-glow-one" />
            <div className="hero-glow hero-glow-two" />

            <div className="hero-overlay">
              <div className="hero-content">
                <div className="eyebrow">
                  <span className="eyebrow-dot" />
                  CURATED HOUSEPLANTS • EST. 2024
                </div>

                <h1>
                  Bring a little
                  <span> paradise </span>
                  home.
                </h1>

                <p>
                  Thoughtfully selected houseplants for calmer spaces, greener
                  corners, and a home that feels more alive.
                </p>

                <div className="hero-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      setShowProducts(true);
                      setPage("plants");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Explore plants <span>↗</span>
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() =>
                      document
                        .getElementById("about")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Our story
                  </button>
                </div>

                <div className="hero-stats">
                  <div>
                    <strong>18+</strong>
                    <span>Plant varieties</span>
                  </div>
                  <div>
                    <strong>3</strong>
                    <span>Curated collections</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>Love for green</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-scroll">
              <span>SCROLL TO EXPLORE</span>
              <span className="scroll-line" />
            </div>
          </main>

          <AboutUs />
        </>
      )}

      {showProducts && page === "plants" && (
        <ProductList onNavigate={openPage} />
      )}

      {showProducts && page === "cart" && <CartItem onNavigate={openPage} />}
    </div>
  );
}

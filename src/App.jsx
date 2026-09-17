import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";

const getPageFromPath = () => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/about") return "about";
  if (path === "/plants") return "plants";
  if (path === "/cart") return "cart";

  return "home";
};

const getPathFromPage = (page) => {
  if (page === "about") return "/about";
  if (page === "plants") return "/plants";
  if (page === "cart") return "/cart";

  return "/";
};

export default function App() {
  const [page, setPage] = useState(getPageFromPath);

  const cartItems = useSelector((state) => state.cart?.items || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );

  const openPage = (target) => {
    const nextPath = getPathFromPage(target);

    setPage(target);

    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page: target }, "", nextPath);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath());

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="app">
      <header className="navbar">
        <button
          type="button"
          className="brand"
          onClick={() => openPage("home")}
          aria-label="Go to Paradise Nursery home"
        >
          <span className="brand-mark" aria-hidden="true">
            ✦
          </span>

          <span className="brand-copy">
            <strong>PARADISE</strong>
            <small>NURSERY</small>
          </span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          <button
            type="button"
            className={page === "home" ? "active" : ""}
            onClick={() => openPage("home")}
          >
            Home
          </button>

          <button
            type="button"
            className={page === "about" ? "active" : ""}
            onClick={() => openPage("about")}
          >
            About Us
          </button>

          <button
            type="button"
            className={page === "plants" ? "active" : ""}
            onClick={() => openPage("plants")}
          >
            Plants
          </button>

          <button
            type="button"
            className={`cart-nav ${page === "cart" ? "active" : ""}`}
            onClick={() => openPage("cart")}
            aria-label={`Open cart with ${cartCount} items`}
          >
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </nav>
      </header>

      {page === "home" && (
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
                  type="button"
                  className="primary-btn"
                  onClick={() => openPage("plants")}
                >
                  Get Started <span aria-hidden="true">↗</span>
                </button>

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => openPage("about")}
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
      )}

      {page === "about" && (
        <main className="about-page">
          <AboutUs />
        </main>
      )}

      {page === "plants" && <ProductList />}

      {page === "cart" && <CartItem onNavigate={openPage} />}
    </div>
  );
}

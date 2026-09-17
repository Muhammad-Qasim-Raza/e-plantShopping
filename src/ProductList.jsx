import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

import monstera from "./assets/monstera.jpg";
import birdOfParadise from "./assets/bird-of-paradise.jpg";
import calathea from "./assets/calathea.jpg";
import alocasia from "./assets/alocasia.jpg";
import fiddleLeaf from "./assets/fiddle-leaf.jpg";
import rubberPlant from "./assets/rubber-plant.jpg";

import snakePlant from "./assets/snake-plant.jpg";
import zzPlant from "./assets/zz-plant.jpg";
import pothos from "./assets/pothos.jpg";
import peaceLily from "./assets/peace-lily.jpg";
import chineseEvergreen from "./assets/chinese-evergreen.jpg";
import castIron from "./assets/cast-iron.jpg";

import peperomia from "./assets/peperomia.jpg";
import stringOfHearts from "./assets/string-of-hearts.jpg";
import chineseMoney from "./assets/chinese-money.jpg";
import hoya from "./assets/hoya.jpg";
import prayerPlant from "./assets/prayer-plant.jpg";
import bostonFern from "./assets/boston-fern.jpg";

const categories = [
  {
    name: "Tropical Essentials",
    description: "Bold foliage and easy indoor character.",
    plants: [
      {
        id: 1,
        name: "Monstera Deliciosa",
        price: 42,
        image: monstera,
        description: "Iconic split leaves with a tropical silhouette.",
      },
      {
        id: 2,
        name: "Bird of Paradise",
        price: 58,
        image: birdOfParadise,
        description: "Large sculptural leaves for instant drama.",
      },
      {
        id: 3,
        name: "Calathea Orbifolia",
        price: 36,
        image: calathea,
        description: "Silver-striped foliage with a soft, elegant feel.",
      },
      {
        id: 4,
        name: "Alocasia Polly",
        price: 31,
        image: alocasia,
        description: "Arrow-shaped leaves with graphic contrast.",
      },
      {
        id: 5,
        name: "Fiddle Leaf Fig",
        price: 49,
        image: fiddleLeaf,
        description: "Tall architectural foliage for bright rooms.",
      },
      {
        id: 6,
        name: "Rubber Plant",
        price: 34,
        image: rubberPlant,
        description: "Glossy leaves and a naturally polished look.",
      },
    ],
  },

  {
    name: "Low-Light Favorites",
    description: "Resilient greens for calmer corners.",
    plants: [
      {
        id: 7,
        name: "Snake Plant",
        price: 28,
        image: snakePlant,
        description: "An adaptable classic with striking vertical leaves.",
      },
      {
        id: 8,
        name: "ZZ Plant",
        price: 30,
        image: zzPlant,
        description: "Glossy foliage that thrives on minimal attention.",
      },
      {
        id: 9,
        name: "Pothos",
        price: 24,
        image: pothos,
        description: "Trailing vines that soften shelves and desks.",
      },
      {
        id: 10,
        name: "Peace Lily",
        price: 32,
        image: peaceLily,
        description: "Lush green leaves with graceful white blooms.",
      },
      {
        id: 11,
        name: "Chinese Evergreen",
        price: 29,
        image: chineseEvergreen,
        description: "Patterned foliage made for understated interiors.",
      },
      {
        id: 12,
        name: "Cast Iron Plant",
        price: 27,
        image: castIron,
        description: "Dependable broad leaves for darker spaces.",
      },
    ],
  },

  {
    name: "Desk & Shelf Greens",
    description: "Compact plants for workspaces and small rooms.",
    plants: [
      {
        id: 13,
        name: "Peperomia",
        price: 22,
        image: peperomia,
        description: "Compact rounded foliage with modern character.",
      },
      {
        id: 14,
        name: "String of Hearts",
        price: 26,
        image: stringOfHearts,
        description: "Delicate trailing vines with heart-shaped leaves.",
      },
      {
        id: 15,
        name: "Chinese Money Plant",
        price: 25,
        image: chineseMoney,
        description: "Playful coin-shaped leaves for a bright desk.",
      },
      {
        id: 16,
        name: "Hoya",
        price: 33,
        image: hoya,
        description: "Waxy foliage with a beautiful trailing habit.",
      },
      {
        id: 17,
        name: "Prayer Plant",
        price: 30,
        image: prayerPlant,
        description: "Graphic leaves with rich, expressive markings.",
      },
      {
        id: 18,
        name: "Boston Fern",
        price: 23,
        image: bostonFern,
        description: "Feathery foliage that adds softness and movement.",
      },
    ],
  },
];

export default function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart?.items || []);

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  const handleAddToCart = (plant) => {
    if (!isInCart(plant.id)) {
      dispatch(addItem(plant));
    }
  };

  return (
    <main className="shop-page">
      {/* SHOP HERO */}
      <section className="shop-hero">
        <div className="shop-hero-content">
          <span className="section-kicker">THE COLLECTION</span>

          <h1>
            Find your <span>green.</span>
          </h1>

          <p>
            Eighteen carefully selected houseplants, organized into three
            collections for every kind of space.
          </p>
        </div>

        <div className="collection-badge">
          <strong>18</strong>

          <span>
            PLANTS
            <br />
            TO EXPLORE
          </span>
        </div>
      </section>

      {/* CATALOG */}
      <div className="catalog">
        {categories.map((category, categoryIndex) => (
          <section className="category-section" key={category.name}>
            {/* CATEGORY HEADER */}
            <div className="category-heading">
              <div className="category-title">
                <span className="category-index">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </span>

                <h2>{category.name}</h2>
              </div>

              <p>{category.description}</p>
            </div>

            {/* PLANTS */}
            <div className="plant-grid">
              {category.plants.map((plant) => {
                const added = isInCart(plant.id);

                return (
                  <article
                    className={`plant-card ${added ? "is-added" : ""}`}
                    key={plant.id}
                  >
                    {/* IMAGE */}
                    <div className="plant-image-wrap">
                      <img src={plant.image} alt={plant.name} loading="lazy" />

                      <span className="plant-tag">PARADISE PICK</span>
                    </div>

                    {/* INFORMATION */}
                    <div className="plant-info">
                      <div className="plant-title-row">
                        <h3>{plant.name}</h3>

                        <strong>${plant.price}</strong>
                      </div>

                      <p>{plant.description}</p>

                      {/* ADD BUTTON */}
                      <button
                        type="button"
                        className={`add-btn ${added ? "added" : ""}`}
                        disabled={added}
                        onClick={() => handleAddToCart(plant)}
                      >
                        <span>{added ? "Added to cart" : "Add to cart"}</span>

                        <span className="add-btn-icon" aria-hidden="true">
                          {added ? "✓" : "+"}
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

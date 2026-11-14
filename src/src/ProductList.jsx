import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import CartItem from "./CartItem";
import "./ProductList.css";

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", image: "https://placehold.co/200x200?text=Snake+Plant", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
      { name: "Spider Plant", image: "https://placehold.co/200x200?text=Spider+Plant", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
      { name: "Peace Lily", image: "https://placehold.co/200x200?text=Peace+Lily", description: "Removes mold spores and purifies the air.", cost: "$18" },
      { name: "Boston Fern", image: "https://placehold.co/200x200?text=Boston+Fern", description: "Adds humidity and removes toxins.", cost: "$20" },
      { name: "Rubber Plant", image: "https://placehold.co/200x200?text=Rubber+Plant", description: "Easy to grow and absorbs airborne chemicals.", cost: "$17" },
      { name: "Aloe Vera", image: "https://placehold.co/200x200?text=Aloe+Vera", description: "Purifies the air and soothes skin.", cost: "$14" },
    ],
  },
  {
    category: "Aromatic Fragrant Plants",
    plants: [
      { name: "Lavender", image: "https://placehold.co/200x200?text=Lavender", description: "Calming scent, used in aromatherapy.", cost: "$20" },
      { name: "Jasmine", image: "https://placehold.co/200x200?text=Jasmine", description: "Sweet fragrance that lifts the mood.", cost: "$18" },
      { name: "Rosemary", image: "https://placehold.co/200x200?text=Rosemary", description: "Fresh aroma, great for cooking.", cost: "$15" },
      { name: "Mint", image: "https://placehold.co/200x200?text=Mint", description: "Refreshing scent that repels pests.", cost: "$12" },
      { name: "Lemon Balm", image: "https://placehold.co/200x200?text=Lemon+Balm", description: "Citrus aroma that reduces stress.", cost: "$14" },
      { name: "Hyacinth", image: "https://placehold.co/200x200?text=Hyacinth", description: "Rich floral scent in spring.", cost: "$22" },
    ],
  },
  {
    category: "Insect Repellent Plants",
    plants: [
      { name: "Citronella", image: "https://placehold.co/200x200?text=Citronella", description: "Known for repelling mosquitoes.", cost: "$16" },
      { name: "Marigold", image: "https://placehold.co/200x200?text=Marigold", description: "Deters aphids and other garden pests.", cost: "$10" },
      { name: "Basil", image: "https://placehold.co/200x200?text=Basil", description: "Repels flies and mosquitoes.", cost: "$9" },
      { name: "Catnip", image: "https://placehold.co/200x200?text=Catnip", description: "Repels mosquitoes and attracts cats.", cost: "$13" },
      { name: "Lemongrass", image: "https://placehold.co/200x200?text=Lemongrass", description: "Citrus scent that keeps insects away.", cost: "$15" },
      { name: "Chrysanthemum", image: "https://placehold.co/200x200?text=Chrysanthemum", description: "Natural source of pyrethrin.", cost: "$19" },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <h2>Paradise Nursery</h2>
          <p>Where Green Meets Serenity</p>
        </div>
        <div className="navbar-links">
          <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>
            Plants
          </a>
          <a href="#cart" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            🛒 <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid" id="plants">
          {plantsArray.map((section) => (
            <div key={section.category}>
              <h2 className="category-title">{section.category}</h2>
              <div className="plant-row">
                {section.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="price">{plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;

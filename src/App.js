// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import productsData from "./products.json";
import "./styles.css";


function App() {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function handleBrandFilter(event) {
    setSelectedBrand(event.target.value);
  }

  function handleCategoryFilter(event) {
    setSelectedCategory(event.target.value);
  }

  function handlePriceFilter(event) {
    setSelectedPriceRange(event.target.value);
  }

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedBrand ? product.brand === selectedBrand : true
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );
  // eslint-disable-next-line no-unused-vars
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (selectedPriceRange === "low-to-high") {
      return a.price - b.price;
    } else if (selectedPriceRange === "high-to-low") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="App">
      <header>
        <h1>Products Page</h1>
        <div className="filters">
        <select id="brand-filter" value={selectedBrand} onChange={handleBrandFilter}>
  <option value="">Brand</option>
  <option value="Apple">Apple</option>
  <option value="Samsung">Samsung</option>
  <option value="Google">Google</option>
  <option value="OnePlus">OnePlus</option>
</select>

<select id="category-select" value={selectedCategory} onChange={handleCategoryFilter}>
  <option value="">Category</option>
  <option value="Phone">Phone</option>
  <option value="Tablet">Tablet</option>
  <option value="Laptop">Laptop</option>
  <option value="Watch">Watch</option>
</select>

<select id="price-select" value={selectedPriceRange} onChange={handlePriceFilter}>
  <option value="">Price Range</option>
  <option value="low-to-high">Low to High</option>
  <option value="high-to-low">High to Low</option>
</select>

          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </header>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.brand}</p>
            <p>{product.category}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

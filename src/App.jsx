import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(3);

  useEffect(() => {
    if (search.length >= 2) {
      fetch(`https://dummyjson.com/products/search?q=${search}`)
        .then(res => res.json())
        .then(data => setProducts(data.products))
    }
  }, [search]);

  return (
    <div className="app-container">
      <h1 className="app-title">Product List</h1>

      <form action="" onSubmit={(e) => { e.preventDefault() }} className="search-form">
        <input
          type='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="search-input"
        />
        <button type='submit' className="search-btn">Search</button>
      </form>

      <div className="products-grid">
        {products.slice(0, show).map((product) => (
          <div className='card-wraper' key={product.id}>
            <div className='img'>
              <img src={product.images[0]} alt={product.title} />
              {product.availabilityStatus && (
                <p className="badge availability">{product.availabilityStatus}</p>
              )}
              {product.discountPercentage && (
                <p className="badge discount">-{Math.round(product.discountPercentage)}%</p>
              )}
            </div>
            <div className='card-body'>
              <h4>{product.title}</h4>
              <p className="warranty">{product.warrantyInformation ? product.warrantyInformation : ""}</p>
              <p className="reviews">{product.reviews ? `⭐ ${product.reviews.length} Reviews` : ""}</p>
              <b className="price">${product.price}</b>
            </div>
          </div>
        ))}
      </div>

      {products.length > 0 && (
        <div className="load-more-wrapper">
          <button
            className="load-more-btn"
            onClick={() => show >= products.length ? setShow(show - 3) : setShow(show + 3)}
          >
            {show >= products.length ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

    </div>
  );
};

export default App;
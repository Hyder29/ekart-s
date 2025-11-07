import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');

  // TODO: Implement search and sort functionality
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...productsData];
    
    // Search functionality - implement filtering by title
    if (searchTerm) {
      products = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort functionality - implement price sorting
    if (sortBy === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    }
    
    return products;
  }, [searchTerm, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="catalog">
      <div className="catalog-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          data-testid="search-input"
          className="search-input"
        />
        
        <select
          value={sortBy}
          onChange={handleSortChange}
          data-testid="sort-select"
          className="sort-select"
        >
          <option value="none">Sort by Price</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      
      <div className="product-grid">
        {filteredAndSortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
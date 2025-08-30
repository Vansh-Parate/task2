import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  // State management
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [enterKeyPressed, setEnterKeyPressed] = useState(false);
  const [searchArticleNo, setSearchArticleNo] = useState('');
  const [searchProductName, setSearchProductName] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

  // API functions
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`);
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data);
      } else {
        setError(result.error || 'Failed to fetch products');
      }
    } catch {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  const searchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchArticleNo) params.append('articleNo', searchArticleNo);
      if (searchProductName) params.append('productName', searchProductName);
      
      const response = await fetch(`${API_BASE_URL}/products/search?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data);
      } else {
        setError(result.error || 'Failed to search products');
      }
    } catch {
      setError('Failed to search products');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, searchArticleNo, searchProductName]);

  const updateProduct = async (id, field, value) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product.id === id ? { ...product, [field]: value } : product
          )
        );
        return true;
      } else {
        setError(result.error || 'Failed to update product');
        return false;
      }
    } catch {
      setError('Failed to update product');
      return false;
    }
  };

  const createProduct = async () => {
    const newProduct = {
      articleNo: '',
      productName: '',
      inPrice: 0,
      price: 0,
      unit: 'piece',
      inStock: 0,
      description: ''
    };

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setProducts(prevProducts => [result.data, ...prevProducts]);
        return result.data;
      } else {
        setError(result.error || 'Failed to create product');
        return null;
      }
    } catch {
      setError('Failed to create product');
      return null;
    }
  };

  // Cell editing handlers
  const handleCellEdit = (productId, field, value) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId ? { ...product, [field]: value } : product
      )
    );
  };

  const handleCellSave = async (productId, field, value) => {
    const success = await updateProduct(productId, field, value);
    if (success) {
      setEditingCell(null);
    }
  };

  const handleCellClick = (productId, field) => {
    setEditingCell(`${productId}-${field}`);
  };

  const handleKeyPress = (e, productId, field, value) => {
    if (e.key === 'Enter') {
      setEnterKeyPressed(true);
      setTimeout(() => setEnterKeyPressed(false), 200);
      handleCellSave(productId, field, value);
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      fetchProducts();
    }
  };

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    aValue = String(aValue || '').toLowerCase();
    bValue = String(bValue || '').toLowerCase();
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortClass = (field) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
  };

  // UI handlers
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = useCallback(() => {
    if (searchArticleNo || searchProductName) {
      searchProducts();
    } else {
      fetchProducts();
    }
  }, [searchArticleNo, searchProductName, searchProducts, fetchProducts]);

  const handleNewProduct = async () => {
    const newProduct = await createProduct();
    if (newProduct) {
      setEditingCell(`${newProduct.id}-articleNo`);
    }
  };

  // Effects
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && (e.target.placeholder === 'Search Article No...' || e.target.placeholder === 'Search Product...')) {
        handleSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchArticleNo, searchProductName, handleSearch]);

  // Render functions
  const renderEditableCell = (product, field, type = 'text') => {
    const isEditing = editingCell === `${product.id}-${field}`;
    const value = product[field];
    
    if (isEditing) {
      const inputProps = {
        type: type,
        value: value,
        onChange: (e) => handleCellEdit(product.id, field, type === 'number' ? parseFloat(e.target.value) : e.target.value),
        onBlur: (e) => handleCellSave(product.id, field, type === 'number' ? parseFloat(e.target.value) : e.target.value),
        onKeyPress: (e) => handleKeyPress(e, product.id, field, value),
        autoFocus: true,
        className: enterKeyPressed ? 'enter-feedback' : ''
      };

      return type === 'textarea' ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      );
    }
    
    return (
      <span onClick={() => handleCellClick(product.id, field)}>
        {value}
      </span>
    );
  };

  const renderTableRow = (product, isDesktop = true) => {
    if (isDesktop) {
      return (
        <div className="table-row desktop-table" key={`${product.id}-desktop`}>
          <div className="table-cell">
            <div className="cell-content">
              {renderEditableCell(product, 'articleNo')}
            </div>
          </div>
          <div className="table-cell">
            <div className="cell-content">
              {renderEditableCell(product, 'productName')}
            </div>
          </div>
          <div className="table-cell">
            <div className="cell-content">
              {renderEditableCell(product, 'inPrice', 'number')}
            </div>
          </div>
          <div className="table-cell">
            <div className="cell-content">
              {renderEditableCell(product, 'price', 'number')}
            </div>
          </div>
          <div className="table-cell">
            <div className="cell-content">
              {renderEditableCell(product, 'unit')}
            </div>
          </div>
          <div className="table-cell">
            <div className="cell-content">
              {renderEditableCell(product, 'inStock', 'number')}
            </div>
          </div>
          <div className="table-cell">
            <div className="cell-content">
              {renderEditableCell(product, 'description', 'textarea')}
            </div>
          </div>
        </div>
      );
    }

    // Tablet view
    return (
      <div className="table-row tablet-table" key={`${product.id}-tablet`}>
        <div className="table-cell">
          <div className="cell-content">
            {renderEditableCell(product, 'articleNo')}
          </div>
        </div>
        <div className="table-cell">
          <div className="cell-content">
            {renderEditableCell(product, 'productName')}
          </div>
        </div>
        <div className="table-cell">
          <div className="cell-content">
            {renderEditableCell(product, 'price', 'number')}
          </div>
        </div>
        <div className="table-cell">
          <div className="cell-content">
            {renderEditableCell(product, 'inStock', 'number')}
          </div>
        </div>
        <div className="table-cell">
          <div className="cell-content">
            {renderEditableCell(product, 'unit')}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="hamburger-menu" onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="user-profile">
            <div className="profile-picture">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Profile" />
              <div className="online-indicator"></div>
            </div>
            <div className="user-info">
              <div className="user-name">John Andre</div>
              <div className="college-name">Storfjord AS</div>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="country-selector">
            <span>Norsk Bokmål</span>
            <img className="flag" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM0AAACUCAMAAAAH411kAAAAYFBMVEW6DC8AIFv////Mz9kHDFPO0tvcnKW7ETK1AA7eo6kADlRXXoL19vgACFL78/TNb3e4ACbCQFG3AB/8+Ph4e5SzAADJZGrFytVgZIUAFFZGT3gBGVgHJF6+L0HhrrTnu8B+1P45AAABTUlEQVR4nO3aTU/CQBRG4QEVZUQFEQHx4///Sxe6YMCY5t60OTTn2TZ507OcTksJWa7W0x+Ll4dJq94vfp89Pj3H5gdmDZc1XNZwWcNlDZc1XNZwWcNlDZc1XNZwWcNlDZc1XNZwWcNlDZc1XNZwWcNlDZc1XNZwWcNlDZc1XNSau5DNR6ea101sPqrMYz671Ky/ZsH5oDJN+q9mcNY0rOmNNQ1rejOymquk7a6e1OzfttnRqHKdVA+TU4eaHY0qZ+9yyazhsobLGi5ruKzhsobLGq6R1WQPSKzT2k3Snyfp7GjUyL5yZAes6Y01DWt6Y02DVTOLmXe8xR3WyG7YY6h/P8RYw2UNlzVc1nBZw2UNlzVc1nBZw2UNlzVc1nBZw2UNlzVc1nBZw2UNlzVc1nBZw2UNlzVc1nBZw2XNEG5Djmvqe2t/VLOMzUd9A7A6sW6FY5d3AAAAAElFTkSuQmCC"></img>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="menu-title">
          <h2>Menu</h2>
          <div className="menu-underline"></div>
        </div>
        
        <nav className="menu-items">
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </span>
            <span className="menu-text">Invoices</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <span className="menu-text">Customers</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </span>
            <span className="menu-text">My Business</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10"/>
                <path d="M12 20V4"/>
                <path d="M6 20v-6"/>
              </svg>
            </span>
            <span className="menu-text">Invoice Journal</span>
          </div>
          
          <div className="menu-item active">
            <div className="active-indicator"></div>
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11H1l8-8 8 8h-8v8z"/>
                <path d="M21 12l-9 9-9-9"/>
              </svg>
            </span>
            <span className="menu-text">Price List</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
                <path d="M12 2v6h6"/>
              </svg>
            </span>
            <span className="menu-text">Multiple Invoicing</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </span>
            <span className="menu-text">Unpaid Invoices</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,12 20,22 4,22 4,12"/>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
            <span className="menu-text">Offer</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </span>
            <span className="menu-text">Inventory Control</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <line x1="12" y1="11" x2="12" y2="15"/>
                <line x1="9" y1="13" x2="15" y2="13"/>
              </svg>
            </span>
            <span className="menu-text">Member Invoicing</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
              </svg>
            </span>
            <span className="menu-text">Import/Export</span>
          </div>
          
          <div className="menu-item">
            <span className="menu-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </span>
            <span className="menu-text">Log out</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search and Actions */}
        <div className="search-actions">
          <div className="search-fields">
            <div className="search-input">
              <input type="text" placeholder="Search Article No..." onChange={(e) => setSearchArticleNo(e.target.value)} />
              <span className="search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
            </div>
            <div className="search-input">
              <input type="text" placeholder="Search Product..." onChange={(e) => setSearchProductName(e.target.value)} />
              <span className="search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="action-btn new-product" onClick={handleNewProduct}>
              <span className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </span>
              <span>New Product</span>
            </button>
            <button className="action-btn print-list">
              <span className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6,9 6,2 18,2 18,9"/>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
              </span>
              <span>Print List</span>
            </button>
            <button className="action-btn advanced-mode">
              <span className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </span>
              <span>Advanced mode</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-table">
          {/* Desktop Table Structure */}
          <div className="table-header desktop-table">
            <div 
              className={`header-cell sortable ${getSortClass('articleNo')}`}
              onClick={() => handleSort('articleNo')}
            >
              <span>Article No.</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div 
              className={`header-cell sortable ${getSortClass('productName')}`}
              onClick={() => handleSort('productName')}
            >
              <span>Product/Service</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div className="header-cell">In Price</div>
            <div className="header-cell">Price</div>
            <div className="header-cell">Unit</div>
            <div className="header-cell">In Stock</div>
            <div className="header-cell">Description</div>
          </div>
          
          {/* Tablet Table Structure */}
          <div className="table-header tablet-table">
            <div 
              className={`header-cell sortable ${getSortClass('articleNo')}`}
              onClick={() => handleSort('articleNo')}
            >
              <span>Article No.</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div 
              className={`header-cell sortable ${getSortClass('productName')}`}
              onClick={() => handleSort('productName')}
            >
              <span>Product/Service</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div 
              className={`header-cell sortable ${getSortClass('price')}`}
              onClick={() => handleSort('price')}
            >
              <span>Price</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div 
              className={`header-cell sortable ${getSortClass('inStock')}`}
              onClick={() => handleSort('inStock')}
            >
              <span>In Stock</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div 
              className={`header-cell sortable ${getSortClass('unit')}`}
              onClick={() => handleSort('unit')}
            >
              <span>Unit</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div className="header-cell">
              <span></span>
            </div>
          </div>

          {/* Mobile Table Structure */}
          <div className="table-header mobile-table">
            <div 
              className={`header-cell sortable ${getSortClass('productName')}`}
              onClick={() => handleSort('productName')}
            >
              <span>Product/Service</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div 
              className={`header-cell sortable ${getSortClass('price')}`}
              onClick={() => handleSort('price')}
            >
              <span>Price</span>
              <span className="sort-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </div>
            <div className="header-cell">
              <span></span>
            </div>
          </div>
          
          <div className="table-body">
            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
                         {!loading && !error && sortedProducts.map((product) => (
               <React.Fragment key={product.id}>
                {renderTableRow(product, true)}  {/* Desktop */}
                {renderTableRow(product, false)} {/* Tablet */}

                 {/* Mobile Table Row */}
                 <div className="table-row mobile-table">
                   <div className="table-cell">
                     <div className="cell-content">
                      {renderEditableCell(product, 'productName')}
                     </div>
                   </div>
                   <div className="table-cell">
                     <div className="cell-content">
                      {renderEditableCell(product, 'price', 'number')}
                     </div>
                   </div>
                 </div>
               </React.Fragment>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

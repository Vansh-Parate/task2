import { useState } from 'react';
import './App.css';

function App() {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
              <input type="text" placeholder="Search Article No..." />
              <span className="search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
            </div>
            <div className="search-input">
              <input type="text" placeholder="Search Product..." />
              <span className="search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="action-btn new-product">
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
          
          {/* Tablet/Mobile Table Structure */}
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
            <div className="header-cell">Price</div>
            <div className="header-cell">In Stock</div>
            <div className="header-cell">Unit</div>
            <div className="header-cell"></div>
          </div>
          
          <div className="table-body">
            {/* Desktop Table Row */}
            <div className="table-row desktop-table">
              <div className="table-cell">
                <div className="cell-content">1234567890</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">This is a test product with fifty characters this!</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">900500</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">1500800</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">kilometers/hour</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">2500600</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">This is the description with fifty characters this... <span>⋯</span></div>
              </div>
            </div>
            
            {/* Tablet/Mobile Table Row */}
            <div className="table-row tablet-table">
              <div className="table-cell">
                <div className="cell-content">1234567890</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">This is a test product with fifty characters this!</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">1500800</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">2500600</div>
              </div>
              <div className="table-cell">
                <div className="cell-content">kilometers/hour</div>
              </div>
              <div className="table-cell actions">
                <div className="cell-content">
                  <div className="three-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

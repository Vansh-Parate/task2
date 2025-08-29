# Pricelist Application

A modern web application for managing product pricelists with a clean, responsive design. Built with React (Vite) frontend and Fastify + Sequelize backend.

## Features

- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔍 **Search Functionality**: Search by article number or product name
- ✏️ **Inline Editing**: Edit product details directly in the table
- 💾 **Real-time Updates**: Changes are saved to PostgreSQL database
- 🎨 **Modern UI**: Clean, professional interface matching the provided design
- 📊 **20+ Sample Products**: Pre-populated with test data for demonstration

## Tech Stack

### Frontend
- **React 19** with Vite
- **Vanilla CSS** for styling
- **Responsive design** with mobile-first approach

### Backend
- **Fastify** - High-performance web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - Database
- **CORS** enabled for cross-origin requests

## Prerequisites

- Node.js (v16 or higher)
- Neon DB account (or any PostgreSQL database)
- npm or yarn package manager

## Installation & Setup

### 1. Database Setup

Create a Neon DB database or use any PostgreSQL database. Get your connection string from Neon DB dashboard.

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit backend/config.env with your Neon DB connection string:
# DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require
# PORT=3001

# Start the backend server
npm run dev
```

The backend will automatically:
- Connect to the database
- Create the products table
- Seed 22 sample products

### 3. Frontend Setup

```bash
# In the root directory
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search?articleNo=&productName=` - Search products

### Health Check
- `GET /health` - Server health status

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  articleNo VARCHAR(255) UNIQUE NOT NULL,
  productName VARCHAR(255) NOT NULL,
  inPrice DECIMAL(10,2) NOT NULL DEFAULT 0,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  unit VARCHAR(255) NOT NULL DEFAULT 'piece',
  inStock INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Responsive Design

The application adapts to different screen sizes:

- **Desktop**: Shows all 8 columns (Article No., Product/Service, In Price, Price, Unit, In Stock, Description, Actions)
- **Tablet**: Shows 6 columns (hides In Stock)
- **Mobile**: Shows 3 columns (Article No., Product/Service, Actions)

## Usage

1. **View Products**: All products are displayed in a scrollable table
2. **Search**: Use the search fields to filter products by article number or product name
3. **Edit**: Click the edit button (✏️) to modify product details inline
4. **Save**: Click the save button (💾) to persist changes
5. **Cancel**: Click the cancel button (❌) to discard changes

## Development

### Project Structure
```
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── backend/
│   ├── config/
│   │   └── database.js  # Database configuration
│   ├── models/
│   │   └── Product.js   # Product model
│   ├── routes/
│   │   └── products.js  # API routes
│   ├── seeders/
│   │   └── seedData.js  # Sample data
│   ├── server.js        # Fastify server
│   └── package.json     # Backend dependencies
└── package.json         # Frontend dependencies
```

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

## Environment Variables

Create a `backend/config.env` file:

```env
DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require
PORT=3001
```

Replace the `DATABASE_URL` with your actual Neon DB connection string from the dashboard.

## Troubleshooting

1. **Database Connection Error**: Ensure your Neon DB connection string is correct and the database is accessible
2. **SSL Connection Issues**: Neon DB requires SSL, which is configured in the connection
3. **CORS Error**: Backend CORS is configured to allow all origins in development
4. **Port Conflicts**: Change the PORT in config.env if 3001 is already in use

## License

This project is created for demonstration purposes.

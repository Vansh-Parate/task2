# Product Price List Management System

A full-stack web application for managing product price lists with real-time editing capabilities.

## Features

- **Product Management**: Create, read, update, and delete products
- **Real-time Editing**: Inline cell editing with keyboard shortcuts
- **Search & Filter**: Search by article number or product name
- **Sorting**: Sort products by any column
- **Responsive Design**: Works on desktop, tablet, and mobile
- **RESTful API**: Fastify backend with PostgreSQL database

## Tech Stack

### Frontend
- React 19 with Vite
- Modern CSS with responsive design
- Real-time data updates

### Backend
- Fastify web framework
- Sequelize ORM
- PostgreSQL database
- RESTful API design

## Project Structure

```
├── src/                    # Frontend React application
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── backend/               # Backend API server
│   ├── server.js          # Main server file
│   ├── config/
│   │   └── database.js    # Database configuration
│   ├── models/
│   │   └── Product.js     # Product data model
│   ├── routes/
│   │   └── products.js    # Product API routes
│   └── seeders/
│       └── seedData.js    # Database seeding
├── package.json           # Frontend dependencies
└── backend/package.json   # Backend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (or Neon DB)

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp config.env.example config.env
   ```

4. Update `backend/config.env` with your database URL:
   ```
   DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The API will be available at http://localhost:3001

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search` - Search products
- `GET /health` - Health check

## Development

### Code Style
- Clean, readable code with meaningful comments
- Consistent error handling
- Professional structure without over-engineering
- Medium-level complexity suitable for team development

### Key Features
- **Error Handling**: Comprehensive error handling throughout the application
- **Validation**: Input validation on both frontend and backend
- **Responsive Design**: Mobile-first approach with breakpoints
- **Real-time Updates**: Immediate UI updates with optimistic rendering
- **Keyboard Navigation**: Full keyboard support for editing

## Contributing

1. Follow the existing code style
2. Add meaningful comments for complex logic
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is for educational and demonstration purposes.

import Fastify from 'fastify';
import cors from '@fastify/cors';
import process from 'process';
import { connectDB } from './config/database.js';
import { seedProducts } from './seeders/seedData.js';
import productRoutes from './routes/products.js';


// Initialize Fastify instance
const fastify = Fastify({
  logger: true
});

// Configure CORS
await fastify.register(cors, {
  origin: true, // Allow all origins for now
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

// Register API routes
await fastify.register(productRoutes);

// Health check endpoint
fastify.get('/health', async () => {
  return { 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  };
});

// Server startup function
const start = async () => {
  try {
    // Initialize database connection
    await connectDB();
    
    // Seed initial data if needed
    await seedProducts();
    
    // Start HTTP server
    const port = process.env.PORT || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    
    console.log(`✅ Server running on port ${port}`);
  } catch (err) {
    fastify.log.error('Server startup failed:', err);
    process.exit(1);
  }
};

start();

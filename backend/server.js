import Fastify from 'fastify';
import cors from '@fastify/cors';
import { connectDB } from './config/database.js';
import { seedProducts } from './seeders/seedData.js';
import productRoutes from './routes/products.js';

const fastify = Fastify({
  logger: true
});

// Register CORS
await fastify.register(cors, {
  origin: true,
  credentials: true
});

// Register routes
await fastify.register(productRoutes);

// Health check endpoint
fastify.get('/health', async (request, reply) => {
  return { status: 'OK', timestamp: new Date().toISOString() };
});

// Start server
const start = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Seed products
    await seedProducts();
    
    // Start server
    const port = process.env.PORT || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

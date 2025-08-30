import Product from '../models/Product.js';
import { Op } from 'sequelize';

export default async function productRoutes(fastify) {
  // Get all products
  fastify.get('/api/products', async (request, reply) => {
    try {
      const products = await Product.findAll({
        order: [['createdAt', 'DESC']]
      });
      return { success: true, data: products };
    } catch {
      reply.code(500);
      return { success: false, error: 'Failed to fetch products' };
    }
  });

  // Get single product by ID
  fastify.get('/api/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const product = await Product.findByPk(id);
      
      if (!product) {
        reply.code(404);
        return { success: false, error: 'Product not found' };
      }
      
      return { success: true, data: product };
    } catch {
      reply.code(500);
      return { success: false, error: 'Failed to fetch product' };
    }
  });

  // Create new product
  fastify.post('/api/products', async (request, reply) => {
    try {
      const productData = request.body;
      
      // Validate required fields
      if (!productData.articleNo || !productData.productName) {
        reply.code(400);
        return { success: false, error: 'Article number and product name are required' };
      }
      
      const product = await Product.create(productData);
      reply.code(201);
      return { success: true, data: product };
    } catch (error) {
      // Handle validation errors
      if (error.name === 'SequelizeValidationError') {
        reply.code(400);
        return { success: false, error: 'Validation error: ' + error.message };
      }
      
      // Handle unique constraint errors
      if (error.name === 'SequelizeUniqueConstraintError') {
        reply.code(400);
        return { success: false, error: 'Article number must be unique' };
      }
      
      reply.code(500);
      return { success: false, error: 'Failed to create product' };
    }
  });

  // Update existing product
  fastify.put('/api/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const updateData = request.body;
      
      const product = await Product.findByPk(id);
      if (!product) {
        reply.code(404);
        return { success: false, error: 'Product not found' };
      }
      
      await product.update(updateData);
      return { success: true, data: product };
    } catch (error) {
      // Handle validation errors
      if (error.name === 'SequelizeValidationError') {
        reply.code(400);
        return { success: false, error: 'Validation error: ' + error.message };
      }
      
      // Handle unique constraint errors
      if (error.name === 'SequelizeUniqueConstraintError') {
        reply.code(400);
        return { success: false, error: 'Article number must be unique' };
      }
      
      reply.code(500);
      return { success: false, error: 'Failed to update product' };
    }
  });

  // Delete product
  fastify.delete('/api/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const product = await Product.findByPk(id);
      
      if (!product) {
        reply.code(404);
        return { success: false, error: 'Product not found' };
      }
      
      await product.destroy();
      return { success: true, message: 'Product deleted successfully' };
    } catch {
      reply.code(500);
      return { success: false, error: 'Failed to delete product' };
    }
  });

  // Search products by article number or product name
  fastify.get('/api/products/search', async (request, reply) => {
    try {
      const { articleNo, productName } = request.query;
      const whereClause = {};
      
      // Build search conditions
      if (articleNo) {
        whereClause.articleNo = { [Op.iLike]: `%${articleNo}%` };
      }
      
      if (productName) {
        whereClause.productName = { [Op.iLike]: `%${productName}%` };
      }
      
      const products = await Product.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']]
      });
      
      return { success: true, data: products };
    } catch {
      reply.code(500);
      return { success: false, error: 'Failed to search products' };
    }
  });
}

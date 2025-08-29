import Product from '../models/Product.js';

export default async function productRoutes(fastify, options) {
  // Get all products
  fastify.get('/api/products', async (request, reply) => {
    try {
      const products = await Product.findAll({
        order: [['createdAt', 'DESC']]
      });
      return { success: true, data: products };
    } catch (error) {
      reply.code(500);
      return { success: false, error: error.message };
    }
  });

  // Get single product
  fastify.get('/api/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const product = await Product.findByPk(id);
      
      if (!product) {
        reply.code(404);
        return { success: false, error: 'Product not found' };
      }
      
      return { success: true, data: product };
    } catch (error) {
      reply.code(500);
      return { success: false, error: error.message };
    }
  });

  // Create new product
  fastify.post('/api/products', async (request, reply) => {
    try {
      const productData = request.body;
      const product = await Product.create(productData);
      reply.code(201);
      return { success: true, data: product };
    } catch (error) {
      reply.code(400);
      return { success: false, error: error.message };
    }
  });

  // Update product
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
      reply.code(400);
      return { success: false, error: error.message };
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
    } catch (error) {
      reply.code(500);
      return { success: false, error: error.message };
    }
  });

  // Search products
  fastify.get('/api/products/search', async (request, reply) => {
    try {
      const { articleNo, productName } = request.query;
      const whereClause = {};
      
      if (articleNo) {
        whereClause.articleNo = { [fastify.sequelize.Op.iLike]: `%${articleNo}%` };
      }
      
      if (productName) {
        whereClause.productName = { [fastify.sequelize.Op.iLike]: `%${productName}%` };
      }
      
      const products = await Product.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']]
      });
      
      return { success: true, data: products };
    } catch (error) {
      reply.code(500);
      return { success: false, error: error.message };
    }
  });
}

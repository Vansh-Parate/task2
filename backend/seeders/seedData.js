import Product from '../models/Product.js';

export const seedProducts = async () => {
  try {
    // Check if products already exist
    const existingProducts = await Product.count();
    if (existingProducts > 0) {
      console.log('Products already seeded, skipping...');
      return;
    }

    const products = [
      {
        articleNo: '1234567890',
        productName: 'This is a test product with fifty characters this!',
        inPrice: 900.50,
        price: 1500.80,
        unit: 'kilometers/hour',
        inStock: 2500,
        description: 'This is the description with fifty characters this'
      },
      {
        articleNo: 'SONY-DSLR-001',
        productName: 'Sony DSLR 12345',
        inPrice: 12000.00,
        price: 15000.00,
        unit: 'piece',
        inStock: 15,
        description: 'Professional DSLR camera with advanced features'
      },
      {
        articleNo: 'RANDOM-001',
        productName: 'Random product',
        inPrice: 1000.00,
        price: 1234.00,
        unit: 'piece',
        inStock: 50,
        description: 'A random product for testing purposes'
      },
      {
        articleNo: 'LAPTOP-001',
        productName: 'MacBook Pro 16"',
        inPrice: 2500.00,
        price: 3200.00,
        unit: 'piece',
        inStock: 8,
        description: 'High-performance laptop for professionals'
      },
      {
        articleNo: 'PHONE-001',
        productName: 'iPhone 15 Pro',
        inPrice: 800.00,
        price: 1200.00,
        unit: 'piece',
        inStock: 25,
        description: 'Latest iPhone with advanced camera system'
      },
      {
        articleNo: 'HEADPHONES-001',
        productName: 'Sony WH-1000XM5',
        inPrice: 300.00,
        price: 450.00,
        unit: 'piece',
        inStock: 30,
        description: 'Premium noise-cancelling headphones'
      },
      {
        articleNo: 'MONITOR-001',
        productName: 'Dell UltraSharp 27"',
        inPrice: 400.00,
        price: 600.00,
        unit: 'piece',
        inStock: 12,
        description: 'Professional grade monitor with 4K resolution'
      },
      {
        articleNo: 'KEYBOARD-001',
        productName: 'Mechanical Gaming Keyboard',
        inPrice: 80.00,
        price: 120.00,
        unit: 'piece',
        inStock: 45,
        description: 'RGB mechanical keyboard with custom switches'
      },
      {
        articleNo: 'MOUSE-001',
        productName: 'Logitech G Pro X',
        inPrice: 60.00,
        price: 90.00,
        unit: 'piece',
        inStock: 60,
        description: 'Wireless gaming mouse with HERO sensor'
      },
      {
        articleNo: 'SPEAKERS-001',
        productName: 'Bose Companion 20',
        inPrice: 150.00,
        price: 220.00,
        unit: 'pair',
        inStock: 18,
        description: 'Premium desktop speakers with subwoofer'
      },
      {
        articleNo: 'WEBCAM-001',
        productName: 'Logitech StreamCam',
        inPrice: 120.00,
        price: 180.00,
        unit: 'piece',
        inStock: 22,
        description: '1080p webcam with autofocus and HDR'
      },
      {
        articleNo: 'MICROPHONE-001',
        productName: 'Blue Yeti USB Microphone',
        inPrice: 100.00,
        price: 150.00,
        unit: 'piece',
        inStock: 35,
        description: 'Professional USB microphone for streaming'
      },
      {
        articleNo: 'TABLET-001',
        productName: 'iPad Pro 12.9"',
        inPrice: 900.00,
        price: 1200.00,
        unit: 'piece',
        inStock: 10,
        description: 'Professional tablet with M2 chip'
      },
      {
        articleNo: 'WATCH-001',
        productName: 'Apple Watch Series 9',
        inPrice: 300.00,
        price: 450.00,
        unit: 'piece',
        inStock: 28,
        description: 'Latest smartwatch with health monitoring'
      },
      {
        articleNo: 'DRONE-001',
        productName: 'DJI Mini 3 Pro',
        inPrice: 600.00,
        price: 850.00,
        unit: 'piece',
        inStock: 8,
        description: 'Compact drone with 4K camera'
      },
      {
        articleNo: 'GAMING-001',
        productName: 'PlayStation 5',
        inPrice: 400.00,
        price: 550.00,
        unit: 'piece',
        inStock: 15,
        description: 'Next-gen gaming console'
      },
      {
        articleNo: 'NETWORK-001',
        productName: 'TP-Link Archer C7',
        inPrice: 50.00,
        price: 75.00,
        unit: 'piece',
        inStock: 40,
        description: 'Dual-band wireless router'
      },
      {
        articleNo: 'STORAGE-001',
        productName: 'Samsung 970 EVO SSD',
        inPrice: 80.00,
        price: 120.00,
        unit: 'piece',
        inStock: 55,
        description: '1TB NVMe SSD for high-speed storage'
      },
      {
        articleNo: 'POWER-001',
        productName: 'Anker PowerCore 26800',
        inPrice: 40.00,
        price: 65.00,
        unit: 'piece',
        inStock: 70,
        description: 'High-capacity portable charger'
      },
      {
        articleNo: 'CABLE-001',
        productName: 'USB-C to Lightning Cable',
        inPrice: 15.00,
        price: 25.00,
        unit: 'piece',
        inStock: 100,
        description: 'Fast charging cable for Apple devices'
      },
      {
        articleNo: 'STAND-001',
        productName: 'Laptop Stand Aluminum',
        inPrice: 25.00,
        price: 40.00,
        unit: 'piece',
        inStock: 80,
        description: 'Adjustable laptop stand for ergonomics'
      },
      {
        articleNo: 'LAMP-001',
        productName: 'LED Desk Lamp',
        inPrice: 30.00,
        price: 50.00,
        unit: 'piece',
        inStock: 65,
        description: 'Adjustable LED desk lamp with touch control'
      }
    ];

    await Product.bulkCreate(products);
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

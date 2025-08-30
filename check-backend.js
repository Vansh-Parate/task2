// Simple backend health check
const checkBackend = async () => {
  const backendUrl = 'https://task2-u9sw.onrender.com';
  
  try {
    console.log('🔍 Checking backend health...');
    
    // Check health endpoint
    const healthResponse = await fetch(`${backendUrl}/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Backend is running:', healthData);
    } else {
      console.log('❌ Backend health check failed:', healthResponse.status);
    }
    
    // Check products endpoint
    const productsResponse = await fetch(`${backendUrl}/api/products`);
    if (productsResponse.ok) {
      const productsData = await productsResponse.json();
      console.log('✅ Products endpoint working:', productsData.success);
    } else {
      console.log('❌ Products endpoint failed:', productsResponse.status);
    }
    
  } catch (error) {
    console.log('❌ Backend check failed:', error.message);
  }
};

// Run check
checkBackend();

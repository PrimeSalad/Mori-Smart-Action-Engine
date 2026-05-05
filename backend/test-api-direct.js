require('dotenv').config();

async function testDirectAPI() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found');
    process.exit(1);
  }
  
  console.log('Testing Gemini API directly...\n');
  console.log('API Key:', apiKey.substring(0, 10) + '...\n');
  
  // Test with v1 API (not v1beta)
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{
      parts: [{
        text: 'Say hello in one word'
      }]
    }]
  };
  
  try {
    console.log('🧪 Testing v1 API with gemini-pro...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS! v1 API works!');
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Error:', response.status, response.statusText);
      console.log('Details:', JSON.stringify(data, null, 2));
      
      // Try listing models
      console.log('\n📋 Trying to list models...');
      const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
      const listResponse = await fetch(listUrl);
      const listData = await listResponse.json();
      
      if (listResponse.ok) {
        console.log('\n✅ Available models:');
        listData.models.forEach(model => {
          console.log(`  - ${model.name}`);
          console.log(`    Display name: ${model.displayName}`);
          console.log(`    Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
        });
      } else {
        console.log('❌ Could not list models:', JSON.stringify(listData, null, 2));
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDirectAPI();

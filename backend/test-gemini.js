require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  console.log('Testing Gemini API...\n');
  
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }
  
  console.log('✅ API Key found:', process.env.GEMINI_API_KEY.substring(0, 10) + '...\n');
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Test 1: List available models
  console.log('📋 Listing available models...');
  try {
    const models = await genAI.listModels();
    console.log('\n✅ Available models:');
    for await (const model of models) {
      console.log(`  - ${model.name}`);
      console.log(`    Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
    }
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
  }
  
  // Test 2: Try generating content with different models
  const modelsToTry = [
    'gemini-1.5-pro',
    'gemini-1.5-flash', 
    'gemini-pro',
    'gemini-1.0-pro'
  ];
  
  console.log('\n🧪 Testing content generation...\n');
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello in one word');
      const response = await result.response;
      const text = response.text();
      console.log(`✅ ${modelName} works! Response: ${text}\n`);
      
      // If this works, save it as the recommended model
      console.log(`\n🎉 SUCCESS! Use this model in your code: "${modelName}"\n`);
      break;
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message}\n`);
    }
  }
}

testGemini().catch(console.error);

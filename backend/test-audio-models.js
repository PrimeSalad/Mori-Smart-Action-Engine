require('dotenv').config();

async function testAudioModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('Checking which models support audio...\n');
  
  const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  const response = await fetch(listUrl);
  const data = await response.json();
  
  console.log('Models with audio support:\n');
  data.models.forEach(model => {
    const methods = model.supportedGenerationMethods || [];
    const inputModalities = model.inputTokenLimit ? 'text' : '';
    
    console.log(`${model.name}`);
    console.log(`  Display: ${model.displayName}`);
    console.log(`  Methods: ${methods.join(', ')}`);
    
    // Check description for audio support
    if (model.description && model.description.toLowerCase().includes('audio')) {
      console.log(`  ✅ Supports audio (from description)`);
    }
    console.log('');
  });
}

testAudioModels();

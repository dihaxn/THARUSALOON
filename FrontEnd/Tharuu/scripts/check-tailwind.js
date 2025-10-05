const fs = require('fs');
const path = require('path');

async function run(){
  const postcss = require('postcss');
  const configPath = path.resolve(__dirname, '..', 'postcss.config.cjs');
  const config = require(configPath);
  const inputCss = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'index.css'), 'utf8');
  try{
    const result = await postcss(config.plugins).process(inputCss, { from: undefined });
    const css = result.css;
    fs.writeFileSync(path.resolve(__dirname, '..', 'tmp', 'tailwind-processed.css'), css, 'utf8');
    console.log('Processed CSS length:', css.length);
    console.log('Contains .text-4xl:', css.includes('.text-4xl'));
    console.log('Contains .text-blue-600:', css.includes('.text-blue-600'));
    console.log('First 500 chars:\n', css.slice(0,500));
  }catch(err){
    console.error('PostCSS processing failed:', err);
    process.exitCode = 2;
  }
}

run();

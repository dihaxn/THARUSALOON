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
    const tmpDir = path.resolve(__dirname, '..', 'tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
    fs.writeFileSync(path.resolve(tmpDir, 'tailwind-processed.css'), css, 'utf8');
    console.log('Processed CSS length:', css.length);
    console.log('Contains .text-4xl:', css.includes('.text-4xl'));
    console.log('Contains .text-blue-600:', css.includes('.text-blue-600'));
    const matches = [];
    const re = /\.text-[^\s,{]+/g;
    let m;
    while((m = re.exec(css))){ matches.push(m[0]); if(matches.length>30) break; }
    console.log('text-* selectors found (up to 30):', matches.slice(0,30));
    console.log('First 500 chars:\n', css.slice(0,500));
  }catch(err){
    console.error('PostCSS processing failed:', err);
    process.exitCode = 2;
  }
}

run();

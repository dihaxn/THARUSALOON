// PostCSS config: Tailwind's PostCSS plugin moved to a separate package
// Install with: npm install -D @tailwindcss/postcss
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};

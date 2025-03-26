module.exports = {
  purge: false,
  content: [
    '/layouts/**/*.html',
    './layouts/index.html',
    './layouts/_default/*.html', // Hugo template files
    './layouts/_default/baseof.html', // Hugo template files
    './content/**/*.md', // Markdown files with classes
    './themes/**/layouts/**/*.html', // If using a theme
    './static/**/*.html', // Static HTML files
    './index.html', // Root index.html
    './public/**/*.html',
    '/layouts/index.html',
  ],
  safelist: ['text-red-500', 'text-3xl', 'font-bold'],
  theme: {
    extend: {},
  },
  plugins: [],
};

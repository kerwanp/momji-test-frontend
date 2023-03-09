const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

console.log(createGlobPatternsForDependencies(__dirname));

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

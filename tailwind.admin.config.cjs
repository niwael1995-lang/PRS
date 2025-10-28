/**
 * Tailwind config for compiling admin CSS.
 * We explicitly disable preflight so the default Django admin styles are not reset.
 */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './backend/templates/**/*.html',
    './backend/**/templates/**/*.html',
    './src/admin/**/*.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

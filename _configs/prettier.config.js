module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  singleQuote: true,
  overrides: [
    {
      files: '*.ejs',
      options: { parser: 'html' },
    },
  ],
};

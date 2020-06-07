module.exports = {
  purge: [
      '../templates/*.ep',
      '../templates/*/*.ep',
      '../templates/*/*/*ep',
  ],
  target: 'relaxed',
  prefix: '',
  important: false,
  separator: ':',
  theme: {},
  variants: {},
  corePlugins: {},
  plugins: [],
}

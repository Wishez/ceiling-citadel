module.exports = {
  modules: true,
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    'cssnano': {},
    "autoprefixer": {
      	"grid": true
    }
  }
}

// "css-mqpacker": {},
// "postcss-import": {},
// "css-declaration-sorter": {order: 'smacss'},
// "cssnano": {},

# unplugin-vue-jsx-hmr

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-jsx-hmr?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-jsx-hmr)


## Usage

Supports VUE2/3 non-SSR environments with hot-reload


## Install

```bash
npm i unplugin-vue-jsx-hmr
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-vue-jsx-hmr/vite'

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-jsx-hmr/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    chainWebpack(config) {
      config.module.rules.delete('tsx')
    },
    plugins: [
      require('unplugin-vue-jsx-hmr/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>


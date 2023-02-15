# unplugin-vue-jsx

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-jsx?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-jsx)

Starter template for [unplugin](https://github.com/unjs/unplugin).

## Template Usage

To use this template, clone it down using:

```bash
npx degit antfu/unplugin-vue-jsx my-unplugin
```

And do a global replace of `unplugin-vue-jsx` with your plugin name.

Then you can start developing your unplugin 🔥

To test your plugin, run: `pnpm run dev`
To release a new version, run: `pnpm run release`

## Install

```bash
npm i unplugin-vue-jsx
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-vue-jsx/vite'

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from 'unplugin-vue-jsx/rollup'

export default {
  plugins: [
    Starter({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-jsx/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-vue-jsx/nuxt', { /* options */ }],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-jsx/webpack')({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from 'unplugin-vue-jsx/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      '.agents/**',
      '.opencode/**',
      'assets/**',
      '.taste-skill/**',
    ],
  },
)

import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import type { InferAuthEvents, InferAuthenticators } from '@adonisjs/auth/types'

const authConfig = defineConfig({
  default: 'api',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/usuario'),
      }),
    }),
  },
})

export default authConfig

declare module '@adonisjs/auth/types' {
  // @ts-ignore
  interface Guards extends InferAuthEvents<typeof authConfig> {}
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}

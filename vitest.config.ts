import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), AutoImport({ dts: true, imports: ['vitest'] })],
  test: {
    environment: 'jsdom'
  }
})

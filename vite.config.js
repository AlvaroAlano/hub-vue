import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/hub-vue/', // <-- ISSO É VITAL PARA O GITHUB PAGES!
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate', // Atualiza o app dos usuários automaticamente quando você lançar versão nova
      includeAssets: ['favicon.ico', 'apple-icon.png'], // Arquivos que vão pro cache
      manifest: {
        name: 'ConvCard Hub | Suporte',
        short_name: 'ConvCard Hub',
        description: 'Hub de ferramentas e tutoriais do suporte ConvCard',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
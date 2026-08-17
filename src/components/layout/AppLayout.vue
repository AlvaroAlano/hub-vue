<template>
  <!--
    Shell estático: AppSidebar e AppHeader nunca re-renderizam ao trocar de seção.
    Apenas o <slot> (main) é substituído.
  -->
  <div class="flex h-screen overflow-hidden">

    <AppSidebar @triggerSnake="showSnake = !showSnake" />

    <SnakeWidget :isOpen="showSnake" @close="showSnake = false" />

    <!-- Coluna direita: header fixo + conteúdo rolável -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AppHeader />

      <!-- main é o único elemento que rola — sidebar e header ficam intactos -->
      <main class="flex-1 overflow-y-auto scroll-smooth">
        <slot />
      </main>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader  from './AppHeader.vue'
import SnakeWidget from '../SnakeWidget.vue'

const showSnake = ref(false)
</script>

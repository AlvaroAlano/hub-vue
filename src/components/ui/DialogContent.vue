<template>
  <!-- Botão X de fechar: z-index relativo ao card — NUNCA ultrapassa o conteúdo -->
  <div class="relative rounded-lg border border-border bg-card text-card-foreground shadow-lg">
    <button
      v-if="showClose"
      @click="$emit('close')"
      class="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label="Fechar"
    >
      <!-- X inline SVG — sem dependência de FontAwesome ou Lucide aqui -->
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
      </svg>
    </button>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  showClose: { type: Boolean, default: true },
})
defineEmits(['close'])
</script>

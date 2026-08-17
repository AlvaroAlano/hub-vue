<template>
  <Teleport to="body">
    <!-- Overlay — z-60, fecha ao clicar fora -->
    <Transition name="dialog-overlay">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
        @click="$emit('update:modelValue', false)"
      />
    </Transition>

    <!-- Container do conteúdo — z-70, acima do overlay -->
    <Transition name="dialog-content">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-70 flex items-center justify-center p-4 pointer-events-none"
      >
        <div class="pointer-events-auto w-full max-w-lg">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch, onUnmounted } from 'vue'

const props = defineProps({ modelValue: Boolean })
const emit  = defineEmits(['update:modelValue'])

const onKeydown = (e) => {
  if (e.key === 'Escape') emit('update:modelValue', false)
}

watch(() => props.modelValue, (open) => {
  if (open) {
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeydown)
  } else {
    document.documentElement.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  document.documentElement.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.dialog-overlay-enter-active,
.dialog-overlay-leave-active { transition: opacity 0.15s ease; }
.dialog-overlay-enter-from,
.dialog-overlay-leave-to     { opacity: 0; }

.dialog-content-enter-active,
.dialog-content-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dialog-content-enter-from,
.dialog-content-leave-to     { opacity: 0; transform: scale(0.96); }
</style>

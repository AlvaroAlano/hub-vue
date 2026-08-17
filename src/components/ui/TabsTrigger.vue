<template>
  <button
    @click="setActive(value)"
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium',
      'transition-all duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'disabled:pointer-events-none disabled:opacity-50',
      active === value
        ? 'bg-background text-foreground shadow'
        : 'text-muted-foreground hover:text-foreground',
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
import { inject } from 'vue'

defineProps({ value: { type: String, required: true } })

const { active, setActive } = inject('tabs')
</script>

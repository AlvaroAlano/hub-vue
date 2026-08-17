<template>
  <div v-show="active === value" class="mt-2 focus-visible:outline-none">
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({ value: { type: String, required: true } })

const { active } = inject('tabs')
</script>

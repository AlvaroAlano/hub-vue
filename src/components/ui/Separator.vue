<template>
  <div
    role="separator"
    :class="[
      'shrink-0',
      orientation === 'horizontal' ? 'h-px w-full bg-border' : 'h-full w-px bg-border',
    ]"
  />
</template>

<script setup>
defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: v => ['horizontal', 'vertical'].includes(v),
  },
})
</script>

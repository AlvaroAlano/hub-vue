<template>
  <div class="relative inline-flex group/tooltip">
    <!-- Elemento que ativa o tooltip -->
    <slot name="trigger" />

    <!-- Conteúdo do tooltip — z-50 garantido aqui, nunca inline nos consumidores -->
    <div
      :class="[
        'absolute pointer-events-none z-50 whitespace-nowrap',
        'px-3 py-1.5 rounded-md text-xs font-medium',
        'bg-foreground text-background shadow-md',
        'opacity-0 group-hover/tooltip:opacity-100',
        'transition-opacity duration-150',
        positions[side],
      ]"
      role="tooltip"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  side: {
    type: String,
    default: 'top',
    validator: v => ['top', 'right', 'bottom', 'left'].includes(v),
  },
})

const positions = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
}
</script>

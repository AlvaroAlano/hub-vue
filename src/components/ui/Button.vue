<template>
  <button
    v-bind="$attrs"
    :class="cn(base, variants[variant], sizes[size])"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineOptions({ inheritAttrs: false })

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: v => ['default', 'outline', 'ghost', 'destructive', 'link'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg', 'icon'].includes(v),
  },
  disabled: Boolean,
})

const base = [
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
  'transition-all duration-150',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:opacity-50',
  'active:scale-95',
].join(' ')

const variants = {
  default:     'bg-primary text-primary-foreground shadow hover:bg-primary/90',
  outline:     'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  ghost:       'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
  link:        'text-primary underline-offset-4 hover:underline p-0 h-auto',
}

const sizes = {
  sm:   'h-8 px-3 text-xs',
  md:   'h-9 px-4 py-2',
  lg:   'h-10 px-8 text-base',
  icon: 'h-9 w-9',
}

const cn = (...classes) => classes.filter(Boolean).join(' ')
</script>

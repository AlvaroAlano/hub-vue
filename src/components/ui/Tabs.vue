<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { ref, provide, watch } from 'vue'

const props = defineProps({
  modelValue:   { type: String, default: undefined },
  defaultValue: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const active = ref(props.modelValue ?? props.defaultValue)

watch(() => props.modelValue, (val) => {
  if (val !== undefined) active.value = val
})

const setActive = (val) => {
  active.value = val
  emit('update:modelValue', val)
}

provide('tabs', { active, setActive })
</script>

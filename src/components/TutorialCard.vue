<template>
  <details
    class="searchable-item group bg-card border border-border rounded-xl shadow-none transition-all duration-300 md:open:col-span-2"
  >
    <summary class="flex justify-between items-center py-3 px-4 cursor-pointer hover:bg-muted/50 transition-colors gap-2 list-none [&::-webkit-details-marker]:hidden">
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <div :class="['w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0', colorBg || 'bg-zinc-500/10', colorText || 'text-zinc-500']">
          <component :is="resolvedIcon" class="w-3.5 h-3.5" />
        </div>

        <div class="flex-1 min-w-0 pr-2">
          <h4 class="font-bold text-foreground text-sm break-words">{{ title }}</h4>
          <p class="text-xs text-muted-foreground break-words mt-0.5">{{ summary }}</p>
        </div>
      </div>

      <ChevronDown class="w-4 h-4 text-muted-foreground transition-transform duration-300 flex-shrink-0 group-open:rotate-180" />
    </summary>

    <!-- Truque grid-template-rows 0fr → 1fr: anima a altura sem precisar medir pixels via JS -->
    <div class="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
      <div class="overflow-hidden">
        <div class="p-6 border-t border-border bg-muted/30 text-sm text-foreground space-y-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </details>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { iconMap } from '../iconMap.js'

const props = defineProps({
  title: String,
  summary: String,
  icon: String,
  colorBg: String,
  colorText: String
})

const resolvedIcon = computed(() => iconMap[props.icon] ?? null)
</script>

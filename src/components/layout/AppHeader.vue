<template>
  <!-- z-30: acima da sidebar (z-20), abaixo de tooltips (z-50) e modais (z-60+) -->
  <header class="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border">
    <div class="flex items-center gap-4 px-6 py-3">

      <!-- ── Logo slot ─────────────────────────────────────────── -->
      <div class="shrink-0 flex items-center">
        <slot name="logo">
          <!-- Placeholder até o asset definitivo ser fornecido -->
        </slot>
      </div>

      <!-- ── Barra de busca ────────────────────────────────────── -->
      <div class="relative flex-1 max-w-2xl group">
        <Search
          :size="17"
          class="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-500 dark:text-brand-400 pointer-events-none transition-transform group-focus-within:scale-110"
        />
        <input
          ref="searchInputEl"
          v-model="query"
          @input="search"
          type="text"
          placeholder="Buscar Postman, FileZilla, Ambientes..."
          class="w-full h-10 bg-brand-50/60 dark:bg-brand-900/10 border-2 border-brand-200 dark:border-brand-800/70 rounded-xl pl-10 pr-14 text-sm font-medium
                 shadow-sm shadow-brand-500/5 placeholder:text-muted-foreground placeholder:font-normal
                 focus:outline-none focus:ring-4 focus:ring-brand-500/15 focus:border-brand-500 dark:focus:border-brand-400
                 hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md hover:shadow-brand-500/10 transition-all"
        />
        <button
          v-if="query"
          @click="clear(searchInputEl)"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          title="Limpar pesquisa"
        >
          <X :size="14" />
        </button>
        <kbd
          v-else
          title="Atalho: /"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center min-w-[20px] px-1.5 py-0.5 rounded-md
                 bg-brand-100/80 dark:bg-brand-800/50 border border-brand-200 dark:border-brand-700
                 text-xs font-bold text-brand-600 dark:text-brand-300 pointer-events-none select-none"
        >
          /
        </kbd>
      </div>

      <!-- ── Ações ─────────────────────────────────────────────── -->
      <div class="flex items-center gap-2 shrink-0 ml-auto">

        <!-- Botão PWA Refresh -->
        <div class="relative flex items-center">
          <!-- Badge "Atualização Pendente" -->
          <div
            v-if="needsRefresh"
            class="absolute right-11 bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap flex items-center gap-1 z-10"
          >
            <AlertCircle :size="10" />
            Atualização Pendente
            <span class="absolute -right-1 top-1.5 w-2 h-2 bg-destructive rotate-45" />
          </div>

          <button
            @click="reloadPage"
            title="Sincronizar Sistema"
            :class="[
              'flex items-center justify-center w-9 h-9 rounded-lg border shadow-sm transition-all cursor-pointer relative',
              needsRefresh
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-500 hover:bg-red-100'
                : 'bg-background/60 border-border text-muted-foreground hover:text-primary hover:bg-background',
            ]"
          >
            <RefreshCw :size="15" />
            <!-- Dot animado quando há atualização -->
            <span v-if="needsRefresh" class="absolute -top-1 -right-1 flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-background" />
            </span>
          </button>
        </div>

        <!-- Lembretes e Scratchpad -->
        <Lembretes />
        <Scratchpad />

        <!-- Strip de ferramentas AI -->
        <div class="flex items-center gap-2 bg-background/60 px-2 py-1.5 rounded-lg border border-border shadow-sm">
          <a
            v-for="tool in aiTools"
            :key="tool.title"
            :href="tool.url"
            target="_blank"
            rel="noopener noreferrer"
            :title="tool.title"
            class="hover:scale-110 transition-transform"
          >
            <img :src="tool.favicon" :alt="tool.title" class="w-5 h-5 rounded-full object-cover">
          </a>
          <span class="w-px h-4 bg-border mx-0.5" />
          <a
            href="https://web.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Web"
            class="hover:scale-110 transition-transform"
          >
            <img src="https://www.google.com/s2/favicons?domain=whatsapp.com&sz=128" alt="WhatsApp" class="w-5 h-5 rounded-full object-cover">
          </a>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Search, X, RefreshCw, AlertCircle } from '@lucide/vue'
import { useSearch } from '../../composables/useSearch.js'
import Lembretes  from '../sections/Lembretes.vue'
import Scratchpad from '../sections/Scratchpad.vue'

// ── Busca global (singleton compartilhado com App.vue) ───────────────
const { query, search, clear } = useSearch()
const searchInputEl = ref(null)

// ── PWA Refresh ──────────────────────────────────────────────────────
const needsRefresh = ref(false)

onMounted(() => {
  const last = localStorage.getItem('hub_last_refresh')
  if (!last) {
    needsRefresh.value = true
  } else {
    const hours = (Date.now() - parseInt(last)) / 3_600_000
    if (hours > 12) needsRefresh.value = true
  }
})

const reloadPage = async () => {
  try {
    localStorage.setItem('hub_last_refresh', Date.now().toString())
    if ('caches' in window) {
      const names = await caches.keys()
      await Promise.all(names.map(n => caches.delete(n)))
    }
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations()
      for (const r of regs) await r.unregister()
    }
  } catch (e) {
    console.error('Erro ao limpar cache:', e)
  } finally {
    window.location.reload()
  }
}

// ── Atalho de busca ──────────────────────────────────────────────────
// Ctrl/Cmd+K é reservado pelo Chrome/Edge para focar a barra de endereço
// (modo de busca) e não pode ser sobrescrito por JS — preventDefault()
// não tem efeito sobre esse atalho do navegador. "/" é o padrão usado
// por GitHub, Slack e Gmail e não sofre esse conflito.
const onKeydown = (e) => {
  const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'
  const isSlash = e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey
  if (!isCtrlK && !isSlash) return

  const target = e.target
  const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable
  if (isSlash && isTyping) return // deixa "/" ser digitado normalmente em outros campos

  e.preventDefault()
  searchInputEl.value?.focus()
  document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(()  => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

// ── Ferramentas AI ───────────────────────────────────────────────────
const aiTools = [
  { title: 'ChatGPT',          url: 'https://chatgpt.com',          favicon: 'https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128'       },
  { title: 'Gemini',           url: 'https://gemini.google.com',    favicon: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128'  },
  { title: 'Microsoft Copilot',url: 'https://copilot.microsoft.com',favicon: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128'      },
  { title: 'Claude AI',        url: 'https://claude.ai',            favicon: 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128'          },
]
</script>

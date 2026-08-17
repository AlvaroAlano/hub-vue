<template>
  <section id="parametros" class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
        <SlidersHorizontal class="w-5 h-5 text-pink-600" /> Parâmetros do Sistema
      </h2>
      <span class="text-xs md:text-sm font-mono bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 px-3 py-1.5 rounded-lg font-bold shadow-sm">
        {{ parametros.length }} cadastrados
      </span>
    </div>

    <div class="bg-card p-4 md:p-5 rounded-xl border border-border shadow-sm mb-5 space-y-4 md:space-y-5">
      
      <div class="relative w-full">
        <Search class="w-4 h-4 absolute left-4 top-3.5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar parâmetro, descrição ou observação..."
          class="w-full bg-muted border border-border rounded-lg pl-11 pr-10 py-3 text-sm md:text-base focus:ring-2 focus:ring-ring outline-none transition-all text-foreground placeholder:text-muted-foreground shadow-inner"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 top-3.5 text-muted-foreground hover:text-red-500 transition-colors" title="Limpar">
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="flex flex-wrap gap-2 md:gap-3">
        <button
          @click="activeCategory = 'Todos'"
          :class="['px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all shadow-sm', activeCategory === 'Todos' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80']"
        >
          Todos
        </button>
        <button
          v-for="cat in fixedCategories"
          :key="cat"
          @click="activeCategory = cat"
          :class="['px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all shadow-sm', activeCategory === cat ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80']"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="space-y-2 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar scroll-smooth">
      
      <div v-if="filteredParams.length === 0" class="text-center py-8 text-muted-foreground">
        <Ghost class="w-8 h-8 mb-2 opacity-30 dark:opacity-50" />
        <p class="text-xs md:text-sm">Nenhum parâmetro encontrado para "<strong>{{ searchQuery }}</strong>"</p>
      </div>

      <details
        v-for="param in filteredParams"
        :key="param.nome"
        :open="searchQuery.length > 2"
        class="searchable-item group bg-card border border-border rounded-lg overflow-hidden shadow-sm"
      >
        <summary class="flex justify-between items-center p-3 cursor-pointer hover:bg-muted transition-colors">
          <div class="flex items-center gap-2.5 overflow-hidden">
            <div :class="['w-8 h-8 rounded-lg flex items-center justify-center font-bold flex-shrink-0 text-sm shadow-sm', param.style.bg, param.style.text]">
              <component :is="iconMap[param.style.icon]" class="w-4 h-4" />
            </div>
            <div class="overflow-hidden min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <h4 class="font-bold text-foreground text-xs truncate">{{ param.nome }}</h4>
                <span class="hidden md:inline-block px-1.5 py-0.5 rounded text-[8px] font-bold bg-muted text-muted-foreground uppercase tracking-wider border border-border flex-shrink-0">
                  {{ param.categoria }}
                </span>
              </div>
              <p class="text-[11px] text-muted-foreground truncate">{{ param.descricao }}</p>
            </div>
          </div>
          <ChevronDown class="w-3 h-3 text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0 ml-2" />
        </summary>

        <div class="p-4 border-t border-border bg-muted/50 text-sm space-y-4">
          <div class="flex flex-col gap-3 bg-card p-3 rounded-lg border border-border shadow-sm">
            
            <div class="flex items-center justify-between">
              <div class="font-mono text-xs md:text-sm font-bold text-primary select-all">{{ param.nome }}</div>
              <button @click="copyText($event, param.nome)" class="text-muted-foreground hover:text-primary transition-colors px-2 py-1 bg-muted rounded border border-border flex items-center gap-1.5 text-[10px] font-bold shadow-sm">
                <Copy class="w-3 h-3" /> <span class="hidden md:inline">Copiar</span>
              </button>
            </div>

            <div v-if="param.niveis && param.niveis.length > 0">
              <strong class="block mb-1.5 text-[9px] text-muted-foreground uppercase font-bold tracking-widest flex items-center gap-1"><Layers class="w-3 h-3" /> Níveis</strong>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="nivel in param.niveis" :key="nivel" class="px-2 py-0.5 rounded text-[9px] font-bold bg-muted text-foreground border border-border shadow-sm">
                  {{ nivel }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center gap-2 mt-1">
              <span class="px-1.5 py-0.5 rounded text-[9px] font-mono bg-muted text-muted-foreground border border-border">
                Tipo: {{ param.tipo || 'NÃO DEFINIDO' }}
              </span>
            </div>

            <div v-if="param.descricaoHtml" class="mt-2 text-foreground" v-html="param.descricaoHtml"></div>
            
            <div v-else class="mt-2 text-foreground space-y-1.5">
              <strong class="text-[11px] text-foreground block mb-0.5">Descrição Básica:</strong>
              <p class="text-[11px] leading-relaxed">{{ param.descricao }}</p>
            </div>

            <div v-if="param.observacao" class="mt-2 p-2.5 bg-amber-50 dark:bg-amber-900/10 rounded border border-amber-200 dark:border-amber-800/30">
              <strong class="text-[10px] text-amber-700 dark:text-amber-500 uppercase tracking-widest flex items-center gap-1 mb-1">
                <Lightbulb class="w-3 h-3" /> Observação / Exemplo
              </strong>
              <p class="text-[11px] text-foreground leading-relaxed">{{ param.observacao }}</p>
            </div>
            
            <div v-if="param.auxiliares" class="mt-1 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800/30">
              <strong class="text-[9px] text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                <Info class="w-3 h-3" /> Parâmetros Auxiliares
              </strong>
              <p class="text-[11px] text-foreground font-mono mt-1">{{ param.auxiliares }}</p>
            </div>
          </div>
        </div>
      </details>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronDown, Copy, Ghost, Info, Layers, Lightbulb, Search, SlidersHorizontal, X } from '@lucide/vue'
import { iconMap } from '../../iconMap.js'
import { copyText } from '../../utils'
import rawParametros from './parametros.json'

const searchQuery = ref('')
const activeCategory = ref('Todos')

// Filtros Fixos Exigidos
const fixedCategories = ['Boleto', 'Mód. Usuário / App. Usuário', 'Outros']

// =====================================================================
// 🎨 CATEGORIZAÇÃO RESTRITA AOS 3 GRUPOS + CORES
// =====================================================================
const assignStyleAndCategory = (nome) => {
  const n = (nome || '').toUpperCase()
  
  if (n.includes('BOL') || n.includes('COBRANCA') || n.includes('FATURA')) {
    return { categoria: 'Boleto', style: { icon: 'fa-file-invoice-dollar', bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-600 dark:text-amber-400' } }
  }
  if (n.includes('APP') || n.includes('QR_CODE') || n.includes('TOUR') || n.includes('COMPROVANTE')) {
    return { categoria: 'Mód. Usuário / App. Usuário', style: { icon: 'fa-mobile-screen', bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-600 dark:text-purple-400' } }
  }
  
  // Tudo que não for Boleto ou App, cai em Outros
  return { categoria: 'Outros', style: { icon: 'fa-sliders', bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-600 dark:text-blue-400' } }
}

const parametros = rawParametros.map(p => {
  const meta = assignStyleAndCategory(p.nome)
  return {
    ...p,
    categoria: meta.categoria,
    style: meta.style
  }
})

const filteredParams = computed(() => {
  let result = parametros

  if (activeCategory.value !== 'Todos') {
    result = result.filter(p => p.categoria === activeCategory.value)
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      (p.nome && p.nome.toLowerCase().includes(q)) || 
      (p.descricao && p.descricao.toLowerCase().includes(q)) ||
      (p.descricaoHtml && p.descricaoHtml.toLowerCase().includes(q)) ||
      (p.observacao && p.observacao.toLowerCase().includes(q)) || // Busca no novo campo
      (p.tipo && p.tipo.toLowerCase().includes(q))
    )
  }

  return result
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #334155;
}
</style>
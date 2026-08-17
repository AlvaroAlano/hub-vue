<template>
  <AppLayout>
    <div class="px-8 pt-4 pb-12 max-w-7xl mx-auto space-y-10">

      <!-- Estado "sem resultados" — lê o singleton de useSearch -->
      <div v-if="noResults" class="flex flex-col items-center justify-center py-20 text-center">
        <div class="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-2xl mb-4 shadow-inner">
          <Ghost class="w-7 h-7" />
        </div>
        <h3 class="text-lg font-bold text-foreground mb-2">Nenhum resultado encontrado</h3>
        <p class="text-sm text-muted-foreground max-w-md">
          Não encontramos nada para "<strong class="text-foreground">{{ query }}</strong>".
          Tente usar outras palavras-chave.
        </p>
        <button
          @click="clear()"
          class="mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-bold hover:bg-secondary/80 transition-colors"
        >
          Limpar pesquisa
        </button>
      </div>

      <BaseConhecimento />
      <CodigosRetorno />
      <Parametros />
      <MCCs />
      <Ferramentas />
      <Ambientes />
      <Manuais />
      <CentralDocumentos />
      <Softwares />
      <Contatos />

    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout        from './components/layout/AppLayout.vue'
import { useSearch }    from './composables/useSearch.js'
import { Ghost }        from '@lucide/vue'

import BaseConhecimento  from './components/sections/BaseConhecimento.vue'
import CodigosRetorno    from './components/sections/CodigosRetorno.vue'
import Parametros        from './components/sections/Parametros.vue'
import MCCs              from './components/sections/MCCs.vue'
import Ferramentas       from './components/sections/Ferramentas.vue'
import Ambientes         from './components/sections/Ambientes.vue'
import Manuais           from './components/sections/Manuais.vue'
import CentralDocumentos from './components/sections/CentralDocumentos.vue'
import Softwares         from './components/sections/Softwares.vue'
import Contatos          from './components/sections/Contatos.vue'

// Singleton compartilhado com AppHeader — noResults e query já estão reativos
const { noResults, query, clear } = useSearch()
</script>

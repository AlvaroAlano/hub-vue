<template>
  <section id="documentos">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
        <FolderOpen class="w-5 h-5 text-blue-500" /> Central de Documentos
      </h2>

      <div class="relative w-full sm:w-72">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search class="w-4 h-4 text-muted-foreground" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          class="bg-card border border-border text-foreground text-sm rounded-lg focus:ring-2 focus:ring-ring block w-full pl-10 p-2.5 outline-none transition-all shadow-sm"
          placeholder="Buscar documento..."
        />
      </div>
    </div>

    <div class="bg-card p-6 rounded-xl border border-border shadow-sm">
      <p class="text-xs text-muted-foreground mb-6">Acesso rápido a manuais, layouts de conciliação e documentos técnicos da operação.</p>

      <div v-if="documentosFiltrados.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        <div v-for="doc in documentosFiltrados" :key="doc.id" :class="['searchable-item bg-muted/50 border border-border rounded-xl p-3 flex items-center gap-3 hover:shadow-sm transition-all group overflow-hidden relative', doc.theme.hoverBorder]">
          <div :class="['absolute right-0 top-0 w-24 h-full bg-gradient-to-l to-transparent -z-10 transition-colors', doc.theme.bgGradient]"></div>

          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform overflow-hidden', doc.theme.iconBg, doc.theme.iconColor]">
            <component :is="doc.icone" class="w-5 h-5" />
          </div>

          <div class="flex-1 min-w-0 pr-2">
            <h4 :class="['font-bold text-foreground text-sm leading-snug transition-colors line-clamp-2', doc.theme.textHover]">
              {{ doc.title }}
            </h4>
          </div>

          <div class="flex items-center gap-1.5 flex-shrink-0">
            <a :href="doc.linkAbrir" target="_blank" rel="noopener noreferrer" :class="['px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer', doc.theme.btnBg, doc.theme.btnText]">
              Abrir
            </a>

            <a :href="doc.fileDownload" download title="Fazer Download" :class="['w-8 h-8 flex items-center justify-center text-muted-foreground rounded-md transition-colors', doc.theme.btnBg, doc.theme.btnHoverText]">
              <Download class="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      <div v-else class="text-center py-10">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground mb-3">
          <FileX2 class="w-6 h-6" />
        </div>
        <p class="text-sm font-medium text-muted-foreground">Nenhum documento encontrado para "<span class="font-bold">{{ searchQuery }}</span>"</p>
        <button @click="searchQuery = ''" class="mt-2 text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Limpar pesquisa</button>
      </div>

      <!-- Documentos agrupados por parceiro -->
      <div class="mt-8">
        <h3 class="text-sm font-bold text-muted-foreground uppercase mb-3">Documentos por Parceiro</h3>

        <details v-for="parceiro in parceiros" :key="parceiro.nome" class="searchable-item group bg-muted/50 border border-border rounded-xl overflow-hidden shadow-sm">
          <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-muted transition-colors">
            <div class="flex items-center gap-3">
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', parceiro.theme.iconBg, parceiro.theme.iconColor]">
                <component :is="parceiro.icone" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-bold text-foreground text-sm">{{ parceiro.nome }}</h4>
                <p class="text-xs text-muted-foreground">{{ parceiro.descricao }}</p>
              </div>
            </div>
            <ChevronDown class="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0" />
          </summary>

          <div class="p-4 border-t border-border bg-card">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                v-for="doc in parceiro.documentos"
                :key="doc.title"
                :href="doc.link"
                target="_blank"
                rel="noopener noreferrer"
                :class="['flex items-center gap-3 bg-muted/50 border border-border rounded-lg p-3 transition-all group/doc', parceiro.theme.hoverBorder]"
              >
                <div :class="['w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', parceiro.theme.iconBg, parceiro.theme.iconColor]">
                  <FileText class="w-4 h-4" />
                </div>
                <span :class="['flex-1 min-w-0 text-sm font-medium text-foreground truncate transition-colors', parceiro.theme.textHover]">{{ doc.title }}</span>
                <ExternalLink :class="['w-4 h-4 text-muted-foreground flex-shrink-0 transition-colors', parceiro.theme.textHover]" />
              </a>
            </div>
          </div>
        </details>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Building2, ChevronDown, CloudDownload, Download, ExternalLink, FileCode, FileText, FileX2, FolderOpen, Receipt, Search } from '@lucide/vue'

const searchQuery = ref('');

const documentos = ref([
  {
    id: 1,
    title: 'Manual Mensageria (Liquidação ELO)',
    linkAbrir: 'https://convc.link/GjduS',
    fileDownload: '/manual_liquidacao_elo.pdf',
    icone: FileText,
    theme: {
      hoverBorder: 'hover:border-blue-500',
      bgGradient: 'from-blue-500/5 group-hover:from-blue-500/10',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
      btnBg: 'bg-blue-100/50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40',
      btnText: 'text-blue-600 dark:text-blue-400',
      btnHoverText: 'hover:text-blue-600 dark:hover:text-blue-400'
    }
  },
  {
    id: 2,
    title: 'Conciliação Financeira (Software Express V1.7d)',
    linkAbrir: 'https://convc.link/Gn6ZM',
    fileDownload: '/conciliacao_se.pdf',
    icone: Receipt,
    theme: {
      hoverBorder: 'hover:border-emerald-500',
      bgGradient: 'from-emerald-500/5 group-hover:from-emerald-500/10',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
      btnBg: 'bg-emerald-100/50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40',
      btnText: 'text-emerald-600 dark:text-emerald-400',
      btnHoverText: 'hover:text-emerald-600 dark:hover:text-emerald-400'
    }
  },
  {
    id: 3,
    title: 'Layout Padrão Conciliação Convcard v2.00',
    linkAbrir: 'https://convc.link/ip5C3',
    fileDownload: '/layout_padrao_convcard.pdf',
    icone: FileText,
    theme: {
      hoverBorder: 'hover:border-brand-500',
      bgGradient: 'from-brand-500/5 group-hover:from-brand-500/10',
      iconBg: 'bg-brand-100 dark:bg-brand-900/40',
      iconColor: 'text-brand-600 dark:text-brand-400',
      textHover: 'group-hover:text-brand-600 dark:group-hover:text-brand-400',
      btnBg: 'bg-brand-100/50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/40',
      btnText: 'text-brand-600 dark:text-brand-400',
      btnHoverText: 'hover:text-brand-600 dark:hover:text-brand-400'
    }
  },
  {
    id: 4,
    title: 'Layout Conciliação (Equals S/A v0.3)',
    linkAbrir: 'https://convc.link/4fZAR',
    fileDownload: '/layout_equals.pdf',
    icone: FileCode,
    theme: {
      hoverBorder: 'hover:border-purple-500',
      bgGradient: 'from-purple-500/5 group-hover:from-purple-500/10',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      textHover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
      btnBg: 'bg-purple-100/50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40',
      btnText: 'text-purple-600 dark:text-purple-400',
      btnHoverText: 'hover:text-purple-600 dark:hover:text-purple-400'
    }
  },
  {
    id: 5,
    title: 'Manual Importação Centralizada (cad_820)',
    linkAbrir: 'https://convc.link/zIe7u',
    fileDownload: '/importacao_centralizada.pdf',
    icone: CloudDownload,
    theme: {
      hoverBorder: 'hover:border-amber-500',
      bgGradient: 'from-amber-500/5 group-hover:from-amber-500/10',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      textHover: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
      btnBg: 'bg-amber-100/50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40',
      btnText: 'text-amber-600 dark:text-amber-400',
      btnHoverText: 'hover:text-amber-600 dark:hover:text-amber-400'
    }
  },
  {
    id: 6,
    title: 'Manual CNAB 240 (Sicredi)',
    linkAbrir: 'https://convc.link/gJQbd',
    fileDownload: '/manual_sicredi_cnab240.pdf',
    icone: Building2,
    theme: {
      hoverBorder: 'hover:border-green-500',
      bgGradient: 'from-green-500/5 group-hover:from-green-500/10',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      iconColor: 'text-green-600 dark:text-green-400',
      textHover: 'group-hover:text-green-600 dark:group-hover:text-green-400',
      btnBg: 'bg-green-100/50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40',
      btnText: 'text-green-600 dark:text-green-400',
      btnHoverText: 'hover:text-green-600 dark:hover:text-green-400'
    }
  },
  {
    id: 7,
    title: 'Manual - TEF Convcard (Integração Trier)',
    linkAbrir: 'https://convc.link/3iiPz',
    fileDownload: '/manual_tef_trier.html',
    icone: Receipt,
    theme: {
      hoverBorder: 'hover:border-sky-500',
      bgGradient: 'from-sky-500/5 group-hover:from-sky-500/10',
      iconBg: 'bg-sky-100 dark:bg-sky-900/40',
      iconColor: 'text-sky-600 dark:text-sky-400',
      textHover: 'group-hover:text-sky-600 dark:group-hover:text-sky-400',
      btnBg: 'bg-sky-100/50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-900/40',
      btnText: 'text-sky-600 dark:text-sky-400',
      btnHoverText: 'hover:text-sky-600 dark:hover:text-sky-400'
    }
  },
  {
    id: 8,
    title: 'Documentação API - Consulta de Vendas (TEF e Não-TEF)',
    linkAbrir: 'https://convc.link/I63bU',
    fileDownload: 'https://convc.link/I63bU',
    icone: FileCode,
    theme: {
      hoverBorder: 'hover:border-teal-500',
      bgGradient: 'from-teal-500/5 group-hover:from-teal-500/10',
      iconBg: 'bg-teal-100 dark:bg-teal-900/40',
      iconColor: 'text-teal-600 dark:text-teal-400',
      textHover: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
      btnBg: 'bg-teal-100/50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/40',
      btnText: 'text-teal-600 dark:text-teal-400',
      btnHoverText: 'hover:text-teal-600 dark:hover:text-teal-400'
    }
  },
  {
    id: 9,
    title: 'Documentação API - Convcard PJ (Integração REST / RH)',
    linkAbrir: 'https://documenter.getpostman.com/view/6290764/Tz5s2vy9',
    fileDownload: 'https://documenter.getpostman.com/view/6290764/Tz5s2vy9',
    icone: FileCode,
    theme: {
      hoverBorder: 'hover:border-indigo-500',
      bgGradient: 'from-indigo-500/5 group-hover:from-indigo-500/10',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      textHover: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
      btnBg: 'bg-indigo-100/50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40',
      btnText: 'text-indigo-600 dark:text-indigo-400',
      btnHoverText: 'hover:text-indigo-600 dark:hover:text-indigo-400'
    }
  }
]);

const parceiros = ref([
  {
    nome: 'Resomaq',
    descricao: 'Documentação técnica ELO — autorização, gravação de cartões e liquidação.',
    icone: Building2,
    theme: {
      hoverBorder: 'hover:border-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textHover: 'group-hover/doc:text-blue-600 dark:group-hover/doc:text-blue-400'
    },
    documentos: [
      { title: 'Emissores CL ELO - Versão 10', link: 'https://convc.link/iRxGz' },
      { title: 'Documentação API Autorização Elo - Rede Compras v0.3', link: 'https://convc.link/POPd3' },
      { title: 'Documentação da Gravação dos Cartões V04', link: 'https://convc.link/Ycn6Y' },
      { title: 'Modos de Entrada', link: 'https://convc.link/RirWD' },
      { title: 'Manual Mensageria da Liquidação v01', link: 'https://convc.link/DvCqU' },
      { title: 'Documentação API Autorização Externa ELO v0.7', link: 'https://convc.link/enefj' }
    ]
  }
]);

const documentosFiltrados = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return documentos.value;

  return documentos.value.filter(doc =>
    doc.title.toLowerCase().includes(query)
  );
});
</script>

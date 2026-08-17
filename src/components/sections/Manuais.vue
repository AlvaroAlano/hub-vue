<template>
  <section id="manuais">
    <!-- Cabeçalho com Título e Busca -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
        <BookMarked class="w-5 h-5 text-teal-600" /> Manuais do Sistema
      </h2>
      
      <div class="relative w-full sm:w-72">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search class="w-4 h-4 text-muted-foreground" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="bg-card border border-border text-foreground text-sm rounded-lg focus:ring-2 focus:ring-ring block w-full pl-10 p-2.5 outline-none transition-all shadow-sm" 
          placeholder="Buscar manual..." 
        />
      </div>
    </div>

    <div class="bg-card p-6 rounded-xl border border-border shadow-sm">
      <p class="text-xs text-muted-foreground mb-6">Links de rápido acesso para manuais de uso, configuração e procedimentos do sistema.</p>

      <!-- Grid de Manuais -->
      <div v-if="manuaisFiltrados.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
        
        <div v-for="manual in manuaisFiltrados" :key="manual.id" :class="['searchable-item bg-muted/50 border border-border rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm transition-all group relative', manual.tema.hoverBorder]">
          
          <!-- Cabeçalho do Card -->
          <div class="flex items-start gap-3">
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 transition-transform group-hover:scale-105', manual.tema.iconBg, manual.tema.iconColor]">
              <component :is="manual.icone" class="w-5 h-5" />
            </div>
            <div class="flex-1 min-w-0 pt-1">
              <h4 :class="['font-bold text-foreground text-sm leading-snug transition-colors', manual.tema.textHover]">
                {{ manual.titulo }}
              </h4>
            </div>
          </div>

          <!-- Informações de Data -->
          <div class="flex flex-col gap-1.5 mt-2 text-[11px] text-muted-foreground bg-card p-2.5 rounded-lg border border-border">
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-1.5">
                <CalendarCheck class="w-3 h-3 text-muted-foreground" /> Atualização:
              </span>
              <strong class="text-foreground">{{ manual.dataAtualizacao }}</strong>
            </div>
            <div class="h-px bg-border"></div>
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-1.5">
                <Clock class="w-3 h-3 text-muted-foreground" /> Validade:
              </span>
              
              <div v-if="manual.dataValidade" class="flex items-center gap-1 cursor-help" :title="verificarValidade(manual.dataValidade).tooltip">
                <AlertTriangle v-if="verificarValidade(manual.dataValidade).isExpiring" class="w-3 h-3 text-orange-500 animate-pulse" />
                <CircleX v-if="verificarValidade(manual.dataValidade).isExpired" class="w-3 h-3 text-red-500" />
                <strong :class="verificarValidade(manual.dataValidade).class">{{ manual.dataValidade }}</strong>
              </div>
              <strong v-else class="text-emerald-600 dark:text-emerald-400">Sem validade</strong>
            </div>
          </div>

          <!-- Botões -->
          <div class="flex items-center gap-2 mt-auto pt-2">
            <a :href="manual.link" target="_blank" rel="noopener noreferrer" :class="['flex-1 text-center px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5', manual.tema.btnBg, manual.tema.btnText]">
              <ExternalLink class="w-3 h-3" /> Abrir
            </a>
            
            <button @click="copyText($event, manual.link)" :class="['flex-1 text-center px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5', manual.tema.btnBg, manual.tema.btnText]">
              <Copy class="w-3 h-3" /> Copiar
            </button>
          </div>
          
        </div>

      </div>

      <!-- Estado Vazio da Pesquisa -->
      <div v-else class="text-center py-10">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground mb-3">
          <FileX2 class="w-6 h-6" />
        </div>
        <p class="text-sm font-medium text-muted-foreground">Nenhum manual encontrado para "<span class="font-bold">{{ searchQuery }}</span>"</p>
        <button @click="searchQuery = ''" class="mt-2 text-xs text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 font-semibold transition-colors">Limpar pesquisa</button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  AlertTriangle, BookMarked, CalendarCheck, CircleX, Clock, Copy,
  ExternalLink, FileX2, Search
} from '@lucide/vue'
import { iconMap } from '../../iconMap.js'
import { copyText } from '../../utils';

const searchQuery = ref('');

// Função para calcular status da validade
const verificarValidade = (dataStr) => {
  if (!dataStr) return { isExpiring: false, isExpired: false, tooltip: '', class: 'text-muted-foreground' };

  const regex = /(\d{2})\/(\d{2})\/(\d{4}) às (\d{2}):(\d{2})/;
  const match = dataStr.match(regex);
  
  if (!match) return { isExpiring: false, isExpired: false, tooltip: '', class: 'text-muted-foreground' };

  const [ , dia, mes, ano, hora, min ] = match;
  const dataValidade = new Date(ano, mes - 1, dia, hora, min);
  const hoje = new Date();

  const diferencaTempo = dataValidade - hoje;
  const diferencaDias = diferencaTempo / (1000 * 60 * 60 * 24);

  if (diferencaTempo < 0) {
    return { isExpired: true, isExpiring: false, tooltip: 'Manual expirado! Verifique a atualização.', class: 'text-red-600 dark:text-red-400 font-bold' };
  } else if (diferencaDias <= 3) {
    return { isExpired: false, isExpiring: true, tooltip: 'Atenção: Expirando em breve!', class: 'text-orange-600 dark:text-orange-400 font-bold' };
  }
  
  return { isExpired: false, isExpiring: false, tooltip: 'Validade no prazo', class: 'text-emerald-600 dark:text-emerald-400' };
};

const manuais = ref([
  {
    id: 1,
    titulo: 'Migração Util',
    link: 'https://convc.link/2wQ0w',
    dataAtualizacao: '12/05/2026',
    dataValidade: '',
    icone: iconMap['fa-file-invoice'],
    tema: {
      hoverBorder: 'hover:border-teal-500',
      iconBg: 'bg-teal-100 dark:bg-teal-900/40',
      iconColor: 'text-teal-600 dark:text-teal-400',
      textHover: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
      btnBg: 'bg-teal-100/50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/40',
      btnText: 'text-teal-600 dark:text-teal-400'
    }
  },
  {
    id: 2,
    titulo: 'Manual do Portal RH',
    link: 'https://convc.link/xJp1m',
    dataAtualizacao: '04/05/2026',
    dataValidade: '',
    icone: iconMap['fa-users-gear'],
    tema: {
      hoverBorder: 'hover:border-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
      btnBg: 'bg-blue-100/50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40',
      btnText: 'text-blue-600 dark:text-blue-400'
    }
  },
  {
    id: 3,
    titulo: 'APP Usuário: Padrão',
    link: 'https://convc.link/envJy',
    dataAtualizacao: '04/05/2026',
    dataValidade: '',
    icone: iconMap['fa-mobile-screen'],
    tema: {
      hoverBorder: 'hover:border-indigo-500',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      textHover: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
      btnBg: 'bg-indigo-100/50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40',
      btnText: 'text-indigo-600 dark:text-indigo-400'
    }
  },
  {
    id: 4,
    titulo: 'APP Usuário: Multi Benefício',
    link: 'https://convc.link/RNcOz',
    dataAtualizacao: '04/05/2026',
    dataValidade: '',
    icone: iconMap['fa-layer-group'],
    tema: {
      hoverBorder: 'hover:border-purple-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      textHover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
      btnBg: 'bg-purple-100/50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40',
      btnText: 'text-purple-600 dark:text-purple-400'
    }
  },
  {
    id: 5,
    titulo: 'APP Usuário: Elo',
    link: 'https://convc.link/AQpJb',
    dataAtualizacao: '04/05/2026',
    dataValidade: '',
    icone: iconMap['fa-cc-discover'],
    tema: {
      hoverBorder: 'hover:border-amber-500',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      textHover: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
      btnBg: 'bg-amber-100/50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40',
      btnText: 'text-amber-600 dark:text-amber-400'
    }
  },
  {
    id: 6,
    titulo: 'Manual ConvcardPay',
    link: 'https://convc.link/gmxih',
    dataAtualizacao: '04/05/2026',
    dataValidade: '',
    icone: iconMap['fa-money-check-dollar'],
    tema: {
      hoverBorder: 'hover:border-emerald-500',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
      btnBg: 'bg-emerald-100/50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40',
      btnText: 'text-emerald-600 dark:text-emerald-400'
    }
  },
  {
    id: 7,
    titulo: 'Manual Configuração de 2FA',
    link: 'https://convc.link/iDS2o',
    dataAtualizacao: '06/05/2026',
    dataValidade: '',
    icone: iconMap['fa-user-lock'],
    tema: {
      hoverBorder: 'hover:border-cyan-500',
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/40',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      textHover: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
      btnBg: 'bg-cyan-100/50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40',
      btnText: 'text-cyan-600 dark:text-cyan-400'
    }
  },
  {
    id: 8,
    titulo: 'Manual de Migração',
    link: 'https://convc.link/Zx738',
    dataAtualizacao: '04/05/2026',
    dataValidade: '',
    icone: iconMap['fa-server'],
    tema: {
      hoverBorder: 'hover:border-rose-500',
      iconBg: 'bg-rose-100 dark:bg-rose-900/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      textHover: 'group-hover:text-rose-600 dark:group-hover:text-rose-400',
      btnBg: 'bg-rose-100/50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40',
      btnText: 'text-rose-600 dark:text-rose-400'
    }
  },
  {
    id: 9,
    titulo: 'Manual TEF Convcard (Integração Trier)',
    link: 'https://convc.link/vMg8g',
    dataAtualizacao: '08/07/2026',
    dataValidade: '',
    icone: iconMap['fa-network-wired'],
    tema: {
      hoverBorder: 'hover:border-sky-500',
      iconBg: 'bg-sky-100 dark:bg-sky-900/40',
      iconColor: 'text-sky-600 dark:text-sky-400',
      textHover: 'group-hover:text-sky-600 dark:group-hover:text-sky-400',
      btnBg: 'bg-sky-100/50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-900/40',
      btnText: 'text-sky-600 dark:text-sky-400'
    }
  }
]);

// Computed Property que faz a filtragem em tempo real
const manuaisFiltrados = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return manuais.value;
  
  return manuais.value.filter(manual => manual.titulo.toLowerCase().includes(query));
});
</script>
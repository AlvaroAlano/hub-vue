<template>
  <aside :class="[isCollapsed ? 'w-20' : 'w-64', 'bg-background/80 backdrop-blur-sm border-r border-border flex flex-col h-screen z-30 shadow-sm transition-all duration-300 relative flex-shrink-0']">
    
    <!-- 1. Cabeçalho / Logo (Fixo) -->
    <div class="h-24 shrink-0 flex items-center justify-center border-b border-border px-4 relative group">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div class="w-full flex items-center justify-center relative z-10">
        <transition name="fade-scale" mode="out-in">
          
          <!-- Logo Completa -->
          <div v-if="!isCollapsed" key="full" class="flex justify-center w-full transform transition-transform hover:scale-105">
            <img src="https://convc.link/PRbma" alt="Logo Light" class="h-14 w-auto block dark:hidden object-contain">
            <img src="https://convc.link/vSeIS" alt="Logo Dark" class="h-14 w-auto hidden dark:block object-contain">
          </div>
          
          <!-- Logo Reduzida / Mini -->
          <div v-else key="mini" class="flex justify-center w-full transform transition-transform hover:scale-110">
            <img src="https://convc.link/bVwdw" alt="Logo Mini Light" class="w-12 h-12 block dark:hidden object-contain drop-shadow-sm">
            <img src="https://convc.link/gJNO3" alt="Logo Mini Dark" class="w-12 h-12 hidden dark:block object-contain">
          </div>

        </transition>
      </div>
    </div>

    <!-- 2. Área de Navegação (Com Scroll Invisível e Mais Compacta) -->
    <div :class="['flex-1 scrollbar-hide py-4 relative transition-all', isCollapsed ? 'overflow-visible z-50' : 'overflow-y-auto overflow-x-hidden z-10']">
      <nav class="px-4 space-y-1">
        
        <a href="#knowledge" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-brand-600 dark:hover:text-brand-400 hover:bg-muted transition-all duration-200 group">
          <BookOpen class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3 text-muted-foreground group-hover:text-brand-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Tutoriais</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          
          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Tutoriais
          </div>
        </a>

        <a href="#retornos" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-red-600 dark:hover:text-red-400 hover:bg-muted transition-all duration-200 group">
          <BugOff class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6 text-muted-foreground group-hover:text-red-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Códigos / Erros</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Códigos / Erros
          </div>
        </a>

        <a href="#parametros" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-pink-600 dark:hover:text-pink-400 hover:bg-muted transition-all duration-200 group">
          <SlidersHorizontal class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6 text-muted-foreground group-hover:text-pink-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Parâmetros</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-pink-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Parâmetros
          </div>
        </a>

        <a href="#mccs" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-muted transition-all duration-200 group">
          <Store class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-muted-foreground group-hover:text-emerald-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Códigos MCC</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Códigos MCC
          </div>
        </a>

        <a href="#ferramentas" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-orange-600 dark:hover:text-orange-400 hover:bg-muted transition-all duration-200 group">
          <Toolbox class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6 text-muted-foreground group-hover:text-orange-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Diário</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Diário
          </div>
        </a>

        <a href="#ambientes" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-green-600 dark:hover:text-green-400 hover:bg-muted transition-all duration-200 group">
          <Network class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-muted-foreground group-hover:text-green-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Ambientes</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Ambientes
          </div>
        </a>

        <a href="#repo-pub" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-sky-600 dark:hover:text-sky-400 hover:bg-muted transition-all duration-200 group">
          <CloudDownload class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:translate-y-0.5 text-muted-foreground group-hover:text-sky-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Repo /pub</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sky-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Repo /pub
          </div>
        </a>

        <a href="#manuais" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-teal-600 dark:hover:text-teal-400 hover:bg-muted transition-all duration-200 group">
          <Bookmark class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-muted-foreground group-hover:text-teal-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Manuais</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Manuais
          </div>
        </a>

        <a href="#documentos" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:bg-muted transition-all duration-200 group">
          <FolderOpen class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-muted-foreground group-hover:text-blue-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Central de Documentos</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Central de Documentos
          </div>
        </a>
      
        <a href="#softwares" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-muted transition-all duration-200 group">
          <Laptop class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-muted-foreground group-hover:text-indigo-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Softwares</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Softwares
          </div>
        </a>

        <a href="#contatos" class="relative px-3 py-2.5 flex items-center space-x-3 rounded-lg text-muted-foreground text-sm font-medium hover:text-amber-600 dark:hover:text-amber-400 hover:bg-muted transition-all duration-200 group">
          <BookUser class="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 text-muted-foreground group-hover:text-amber-500" />
          <span v-show="!isCollapsed" class="whitespace-nowrap transition-opacity duration-300">Contatos</span>
          <div v-show="!isCollapsed" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

          <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            Contatos
          </div>
        </a>
      </nav>
    </div>

    <!-- 3. Seção Inferior: Ações e Tema (Fixos e Mais Compactos) -->
    <div class="p-4 border-t border-border bg-background/50 backdrop-blur-sm relative z-40 shrink-0 flex flex-col gap-2.5">
      
      <!-- Linha de Ações: Versão + Botão de Recolher -->
      <div class="flex items-center transition-all duration-300" :class="isCollapsed ? 'justify-center' : 'justify-between px-1'">
        
        <!-- Texto de Versão (Some quando recolhido) -->
        <div v-show="!isCollapsed">
          <p @click="handleVersionClick" class="text-[10px] text-muted-foreground uppercase tracking-widest font-bold cursor-pointer hover:text-primary select-none transition-colors" title="Clique 3x para uma surpresa">
            Versão 3.2.0
          </p>
        </div>

        <!-- Ícone Botão de Recolher/Expandir -->
        <button @click="toggleSidebar" class="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-all shadow-sm border border-transparent hover:border-border relative group outline-none flex-shrink-0">
          <svg :class="['w-4 h-4 transition-transform duration-300', isCollapsed ? 'rotate-180' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="3" ry="3"></rect>
            <line x1="10" y1="4" x2="10" y2="20"></line>
            <path d="M10 4 H 18 A 3 3 0 0 1 21 7 V 17 A 3 3 0 0 1 18 20 H 10 Z" fill="currentColor" opacity="0.2"></path>
            <line x1="6" y1="9" x2="7" y2="9" stroke-width="2.5"></line>
            <line x1="6" y1="12" x2="7" y2="12" stroke-width="2.5"></line>
            <line x1="6" y1="15" x2="7" y2="15" stroke-width="2.5"></line>
          </svg>

          <!-- Tooltip que aparece no Hover -->
          <div class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
            {{ isCollapsed ? 'Expandir Menu' : 'Recolher Menu' }}
          </div>
        </button>
      </div>

      <!-- Botão de Alterar Tema -->
      <button @click="handleThemeToggle" class="w-full flex items-center justify-center px-3 py-2.5 rounded-lg bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 group relative outline-none">
        <div class="flex items-center gap-3">
          <div class="flex-shrink-0 flex items-center justify-center transition-transform duration-700 ease-in-out" :style="{ transform: `rotate(${themeRotation}deg)` }">
            <Moon class="dark:hidden w-5 h-5 text-muted-foreground group-hover:text-primary" />
            <Sun class="hidden dark:block w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
          </div>
          <span v-show="!isCollapsed" class="text-sm font-semibold text-foreground group-hover:text-primary whitespace-nowrap hidden md:block">Alterar Tema</span>
        </div>
        
        <!-- Tooltip do botão de tema -->
        <div v-show="isCollapsed" class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-bold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg whitespace-nowrap z-50 border border-border transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
          <div class="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-card rotate-45 border-l border-b border-border"></div>
          Alterar Tema
        </div>
      </button>

    </div>
  </aside>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Bookmark, BookOpen, BookUser, BugOff, CloudDownload, FolderOpen,
  Laptop, Moon, Network, SlidersHorizontal, Store, Sun, Toolbox
} from '@lucide/vue'

const emit = defineEmits(['triggerSnake'])
const clickCount = ref(0)

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('sidebar_collapsed', isCollapsed.value)
}

const handleVersionClick = () => {
  clickCount.value++
  if (clickCount.value === 3) {
    clickCount.value = 0
    emit('triggerSnake')
  }
  setTimeout(() => clickCount.value = 0, 2000)
}

const themeRotation = ref(0)

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
  if (document.documentElement.classList.contains('dark')) {
    localStorage.theme = 'dark'
  } else {
    localStorage.theme = 'light'
  }
}

const handleThemeToggle = () => {
  themeRotation.value += 360
  toggleTheme()
}

onMounted(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  }

  if (localStorage.getItem('sidebar_collapsed') === 'true') {
    isCollapsed.value = true
  }
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
  position: absolute;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
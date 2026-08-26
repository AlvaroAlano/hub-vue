<template>
  <!-- z-20: abaixo do header (z-30) e dos tooltips (z-50) -->
  <aside
    :class="[
      isCollapsed ? 'w-20' : 'w-64',
      'bg-background/80 backdrop-blur-sm',
      'border-r border-border',
      'flex flex-col h-screen z-20 shadow-sm',
      'transition-all duration-300 relative flex-shrink-0',
    ]"
  >
    <!-- ── 1. Logo ──────────────────────────────────────────────── -->
    <div class="h-16 shrink-0 flex items-center justify-center border-b border-border px-4">
      <transition name="fade-scale" mode="out-in">
        <div v-if="!isCollapsed" key="full" class="relative h-10 w-full flex justify-center hover:scale-105 transition-transform">
          <img src="/Convcard - Logo_azul.png" alt="Convcard" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-auto object-contain transition-opacity duration-500 opacity-100 dark:opacity-0">
          <img src="/Convcard - Logo_branca.png" alt="Convcard" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-auto object-contain transition-opacity duration-500 opacity-0 dark:opacity-100">
        </div>
        <div v-else key="mini" class="flex justify-center hover:scale-110 transition-transform">
          <img src="https://convc.link/bVwdw" alt="Convcard" class="w-10 h-10 block dark:hidden object-contain">
          <img src="https://convc.link/gJNO3" alt="Convcard" class="w-10 h-10 hidden dark:block object-contain">
        </div>
      </transition>
    </div>

    <!-- ── 2. Navegação ─────────────────────────────────────────── -->
    <!-- overflow-visible quando collapsed para tooltips ultrapassarem a borda -->
    <div :class="['flex-1 py-3 transition-all', isCollapsed ? 'overflow-visible' : 'overflow-y-auto overflow-x-hidden scroll-smooth']">
      <nav class="px-3 space-y-0.5">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          @click="onNavClick(item)"
          :aria-current="activeHref === item.href ? 'true' : undefined"
          :class="[
            'relative flex items-center gap-3 px-3 py-2 rounded-lg',
            'text-sm font-medium',
            'transition-all duration-150 group outline-none',
            'focus-visible:ring-2 focus-visible:ring-ring',
            isCollapsed ? 'justify-center' : '',
            activeHref === item.href
              ? 'text-foreground bg-brand-500/10 dark:bg-brand-400/10 font-semibold'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/10',
          ]"
        >
          <!-- Ícone Lucide -->
          <component
            :is="item.icon"
            :size="18"
            :class="[
              'shrink-0 transition-transform duration-150 group-hover:scale-110',
              activeHref === item.href ? 'text-brand-600 dark:text-brand-400' : '',
            ]"
          />

          <!-- Label (visível quando expandido) -->
          <span v-show="!isCollapsed" class="truncate">{{ item.label }}</span>

          <!-- Barra indicadora esquerda (sempre visível na seção ativa, ou no hover) -->
          <span
            v-show="!isCollapsed"
            :class="[
              'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full transition-opacity duration-150',
              activeHref === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
            ]"
          />

          <!-- Tooltip (visível somente quando collapsed) -->
          <div
            v-show="isCollapsed"
            class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2
                   bg-popover border border-border text-popover-foreground
                   text-xs font-semibold px-3 py-2 rounded-lg shadow-md
                   whitespace-nowrap z-50 pointer-events-none
                   opacity-0 group-hover:opacity-100
                   translate-x-[-6px] group-hover:translate-x-0
                   transition-all duration-200"
          >
            <!-- Seta do tooltip -->
            <span class="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-popover border-l border-b border-border rotate-45" />
            {{ item.label }}
          </div>
        </a>
      </nav>
    </div>

    <!-- ── 3. Rodapé: versão + recolher + tema ──────────────────── -->
    <div class="p-3 border-t border-border bg-background/50 backdrop-blur-sm z-40 shrink-0 flex flex-col gap-2">

      <!-- Versão + botão recolher -->
      <div class="flex items-center" :class="isCollapsed ? 'justify-center' : 'justify-between px-1'">
        <p
          v-show="!isCollapsed"
          @click="handleVersionClick"
          class="text-[10px] text-muted-foreground uppercase tracking-widest font-bold cursor-pointer hover:text-primary select-none transition-colors"
          title="Clique 3x para uma surpresa"
        >
          Versão 3.2.0
        </p>

        <!-- Botão recolher com tooltip -->
        <div class="relative group/collapse">
          <button
            @click="isCollapsed = !isCollapsed"
            class="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-all border border-transparent hover:border-border outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <!-- SVG customizado de panel -->
            <svg :class="['w-4 h-4 transition-transform duration-300', isCollapsed ? 'rotate-180' : '']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="3" ry="3" />
              <line x1="10" y1="4" x2="10" y2="20" />
              <path d="M10 4 H 18 A 3 3 0 0 1 21 7 V 17 A 3 3 0 0 1 18 20 H 10 Z" fill="currentColor" opacity="0.15" />
              <line x1="6" y1="9"  x2="7" y2="9"  stroke-width="2.5" />
              <line x1="6" y1="12" x2="7" y2="12" stroke-width="2.5" />
              <line x1="6" y1="15" x2="7" y2="15" stroke-width="2.5" />
            </svg>
          </button>
          <!-- Tooltip do botão recolher -->
          <div class="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2
                      bg-popover border border-border text-popover-foreground
                      text-xs font-semibold px-3 py-2 rounded-lg shadow-md
                      whitespace-nowrap z-50 pointer-events-none
                      opacity-0 group-hover/collapse:opacity-100
                      translate-x-[-6px] group-hover/collapse:translate-x-0
                      transition-all duration-200">
            <span class="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-popover border-l border-b border-border rotate-45" />
            {{ isCollapsed ? 'Expandir Menu' : 'Recolher Menu' }}
          </div>
        </div>
      </div>

      <!-- Botão tema -->
      <button
        @click="toggle"
        :class="[
          'w-full flex items-center justify-center px-3 py-2.5 rounded-lg',
          'bg-card border border-border shadow-sm',
          'hover:border-primary/30 hover:shadow-md',
          'transition-all duration-200 group outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring',
        ]"
      >
        <div class="flex items-center gap-3">
          <div
            class="shrink-0 transition-transform duration-700 ease-in-out"
            :style="{ transform: `rotate(${themeRotation}deg)` }"
          >
            <Moon v-if="!isDark" :size="16" class="text-muted-foreground group-hover:text-primary transition-colors" />
            <Sun  v-else         :size="16" class="text-yellow-500 group-hover:text-yellow-400 transition-colors" />
          </div>
          <span v-show="!isCollapsed" class="text-sm font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap hidden md:block">
            Alterar Tema
          </span>
        </div>

        <!-- Tooltip tema (quando collapsed) -->
        <div
          v-show="isCollapsed"
          class="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2
                 bg-popover border border-border text-popover-foreground
                 text-xs font-semibold px-3 py-2 rounded-lg shadow-md
                 whitespace-nowrap z-50 pointer-events-none
                 opacity-0 group-hover:opacity-100
                 translate-x-[-6px] group-hover:translate-x-0
                 transition-all duration-200"
        >
          <span class="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-popover border-l border-b border-border rotate-45" />
          Alterar Tema
        </div>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import {
  BookOpen, Bug, SlidersHorizontal, Store, Wrench, Network, CreditCard,
  Bookmark, FolderOpen, FileCode, BookUser,
  Moon, Sun,
} from '@lucide/vue'
import { useTheme }        from '../../composables/useTheme.js'
import { useLocalStorage } from '../../composables/useLocalStorage.js'

const emit = defineEmits(['triggerSnake'])

// ── Composables ─────────────────────────────────────────────────────
const { isDark, themeRotation, toggle, init } = useTheme()
const isCollapsed = useLocalStorage('sidebar_collapsed', false)

// ── Easter egg: versão 3x → Snake ───────────────────────────────────
const clickCount = ref(0)
const handleVersionClick = () => {
  clickCount.value++
  if (clickCount.value === 3) {
    clickCount.value = 0
    emit('triggerSnake')
  }
  setTimeout(() => { clickCount.value = 0 }, 2000)
}

// ── Nav items ────────────────────────────────────────────────────────
const navItems = [
  { href: '#knowledge',   label: 'Tutoriais',             icon: BookOpen         },
  { href: '#retornos',    label: 'Códigos / Erros',       icon: Bug              },
  { href: '#parametros',  label: 'Parâmetros',            icon: SlidersHorizontal },
  { href: '#mccs',        label: 'Códigos MCC',           icon: Store            },
  { href: '#bins',        label: 'BINs / Prefixos',       icon: CreditCard       },
  { href: '#ferramentas', label: 'Diário',                icon: Wrench           },
  { href: '#ambientes',   label: 'Ambientes',             icon: Network          },
  { href: '#manuais',     label: 'Manuais',               icon: Bookmark         },
  { href: '#documentos',  label: 'Central de Documentos', icon: FolderOpen       },
  { href: '#softwares',   label: 'Softwares',             icon: FileCode         },
  { href: '#contatos',    label: 'Contatos',              icon: BookUser         },
]

// ── Scrollspy: destaca no menu a seção visível no momento ────────────
// Regra: a seção ativa é a primeira (na ordem da página) que ainda ocupa
// o topo da área de leitura — ou seja, cuja borda inferior está abaixo de
// uma linha de referência logo abaixo do topo do <main>.
//
// Comparar o TOPO da seção com essa linha (tentativa anterior) não funciona:
// ao clicar num item do menu o navegador ancora a seção ~110px abaixo do
// topo do <main>, logo ABAIXO da linha — então ela não era considerada e o
// destaque caía na seção anterior. Comparar a borda INFERIOR não depende de
// onde exatamente a âncora para, e funciona igual para seções curtas e longas.
const activeHref = ref(navItems[0].href)
const LINE_OFFSET = 140 // px abaixo do topo do <main> (> os ~110px da âncora)
let mainEl = null
let sectionEls = []
let ticking = false

// Ao clicar num item, o destaque fica preso nele enquanto a rolagem suave
// percorre as seções do caminho — mas só até a âncora chegar ao destino ou
// até vencer um prazo. Sem esse prazo, continuar rolando logo após o clique
// congelaria o destaque (qualquer trava baseada em "parou de rolar" nunca
// dispara enquanto os eventos de scroll continuam chegando).
let pendingHref = null
let pendingDeadline = 0

const updateActiveSection = () => {
  ticking = false
  if (!mainEl) return
  const line = mainEl.getBoundingClientRect().top + LINE_OFFSET

  let current = navItems[navItems.length - 1]
  for (let i = 0; i < sectionEls.length; i++) {
    const el = sectionEls[i]
    if (!el) continue
    if (el.getBoundingClientRect().bottom > line) {
      current = navItems[i]
      break
    }
  }

  if (pendingHref) {
    if (current.href === pendingHref || performance.now() > pendingDeadline) {
      pendingHref = null
    } else {
      activeHref.value = pendingHref
      return
    }
  }

  activeHref.value = current.href
}

const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(updateActiveSection)
}

const onNavClick = (item) => {
  activeHref.value = item.href
  pendingHref = item.href
  pendingDeadline = performance.now() + 1200
}

onMounted(() => {
  init()

  nextTick(() => {
    mainEl = document.querySelector('main')
    sectionEls = navItems.map(item => document.querySelector(item.href))
    if (!mainEl) return

    mainEl.addEventListener('scroll', onScroll, { passive: true })
    updateActiveSection()
  })
})

onUnmounted(() => mainEl?.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  position: absolute;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
</style>

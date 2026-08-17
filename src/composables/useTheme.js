import { ref } from 'vue'

// Singleton — compartilhado entre AppSidebar e qualquer outro consumidor
const isDark        = ref(false)
const themeRotation = ref(0)

// Mesmas cores de --background do style.css, usadas para sincronizar a
// barra de título do PWA instalado com o fundo real do app (em vez de
// deixar uma cor de destaque fixa que não acompanha o tema).
const THEME_COLOR_LIGHT = '#ffffff'
const THEME_COLOR_DARK  = '#09090b'

function apply(dark) {
  isDark.value = dark
  if (dark) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }

  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? THEME_COLOR_DARK : THEME_COLOR_LIGHT)
}

export function useTheme() {
  const toggle = () => {
    themeRotation.value += 360
    apply(!isDark.value)
  }

  const init = () => {
    const stored     = localStorage.theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(stored === 'dark' || (!stored && prefersDark))
  }

  return { isDark, themeRotation, toggle, init }
}

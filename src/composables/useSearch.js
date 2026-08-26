import { ref } from 'vue'

// Singleton — AppHeader escreve, App.vue lê o mesmo estado
const query     = ref('')
const noResults = ref(false)

// Busca sem diferenciar acentos: "parametros" encontra "Parâmetros",
// "codigo" encontra "Código". Essencial num hub em português.
const normalize = (str) =>
  str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')

export function useSearch() {
  const search = () => {
    const q = normalize(query.value.trim())
    const sections = document.querySelectorAll('main section')
    let hasMatch = false

    sections.forEach(section => {
      // O texto dos cards raramente repete o assunto da seção (as linhas da
      // tabela de MCC não contêm "MCC", os cards de BIN não contêm "BIN"...).
      // Por isso o título da seção e suas palavras-chave também são pesquisáveis:
      // buscar pelo assunto traz a seção inteira.
      const heading  = section.querySelector('h2')?.textContent ?? ''
      const keywords = section.dataset.searchKeywords ?? ''
      const sectionMatches = q.length > 0 && normalize(`${heading} ${keywords}`).includes(q)

      const items = section.querySelectorAll('.searchable-item')
      let anyVisible = false

      items.forEach(item => {
        const matches =
          q.length === 0 ||
          sectionMatches ||
          normalize(item.textContent).includes(q)

        item.style.display = matches ? '' : 'none'
        if (matches) anyVisible = true

        // Só abre os <details> quando o card em si deu match — se a seção
        // inteira casou, mantém tudo fechado para não despejar o conteúdo.
        if (item.tagName === 'DETAILS') {
          if (matches && q.length > 0 && !sectionMatches) item.open = true
          else if (q.length === 0) item.open = false
        }
      })

      const visible = anyVisible || sectionMatches
      section.style.display = visible ? '' : 'none'
      if (visible) hasMatch = true
    })

    noResults.value = !hasMatch && q.length > 0
  }

  const clear = (inputEl) => {
    query.value = ''
    search()
    inputEl?.focus()
  }

  return { query, noResults, search, clear }
}

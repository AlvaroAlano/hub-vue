import { ref } from 'vue'

// Singleton — AppHeader escreve, App.vue lê o mesmo estado
const query     = ref('')
const noResults = ref(false)

export function useSearch() {
  const search = () => {
    const q       = query.value.toLowerCase()
    const items   = document.querySelectorAll('.searchable-item')
    const sections = document.querySelectorAll('main section')
    let hasMatch  = false

    items.forEach(item => {
      const matches = item.textContent.toLowerCase().includes(q)
      item.style.display = matches ? '' : 'none'
      if (item.tagName === 'DETAILS') {
        if (matches && q.length > 0) item.open = true
        else if (q.length === 0)     item.open = false
      }
    })

    sections.forEach(section => {
      const visible = [...section.querySelectorAll('.searchable-item')]
        .some(i => i.style.display !== 'none')
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

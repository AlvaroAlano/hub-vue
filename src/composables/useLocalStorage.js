import { ref, watch } from 'vue'

/**
 * Ref que persiste automaticamente no localStorage.
 * Substitui os três usos manuais espalhados em Sidebar, Scratchpad e Lembretes.
 *
 * @param {string} key            - Chave no localStorage
 * @param {*}      defaultValue   - Valor inicial quando a chave não existe
 */
export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const data   = ref(stored !== null ? JSON.parse(stored) : defaultValue)

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }, { deep: true })

  return data
}

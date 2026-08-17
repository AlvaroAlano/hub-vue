// src/utils.js
export function copyText(event, text) {
    navigator.clipboard.writeText(text)

    const btn = event.currentTarget

    // Works with both <i> (legacy) and <svg> (Lucide) icon children
    btn.classList.add('!text-green-500')

    setTimeout(() => {
        btn.classList.remove('!text-green-500')
    }, 2000)
}

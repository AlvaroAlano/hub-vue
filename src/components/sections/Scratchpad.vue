<template>
  <div class="relative">
    
    <button
      @click="isOpen = !isOpen"
      :class="['w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md', isOpen ? 'bg-muted border-border text-primary' : 'bg-card/60 border-border text-muted-foreground hover:bg-card hover:text-primary']"
      title="Bloco de Notas"
    >
      <StickyNote class="w-5 h-5" />
    </button>

    <transition name="fade-slide">
      <div v-show="isOpen" class="absolute top-full right-0 mt-4 w-[320px] md:w-[400px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col h-[400px] origin-top-right z-50">

        <div class="bg-muted px-4 py-3 flex justify-between items-center border-b border-border">
          <div class="flex items-center gap-2 font-bold text-sm text-foreground">
            <PenSquare class="w-4 h-4 text-brand-500" /> Notas Rápidas
          </div>
          <div class="flex items-center gap-4 text-muted-foreground">
            <button @click="copyAll" title="Copiar tudo" class="hover:text-brand-500 transition-colors">
              <Copy class="w-4 h-4" />
            </button>
            <button @click="clearNotes" title="Limpar bloco" class="hover:text-red-500 transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
            <div class="w-px h-4 bg-border"></div>
            <button @click="isOpen = false" title="Fechar" class="hover:text-foreground transition-colors">
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div v-if="showCopied" class="bg-green-500 text-white text-xs font-bold text-center py-1.5 transition-all">
          Conteúdo copiado!
        </div>

        <textarea
          v-model="notes"
          placeholder="Cole aqui CNPJs, códigos, logs, rascunhos...&#10;Tudo que digitar é salvo automaticamente!"
          class="flex-1 w-full p-4 resize-none outline-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground custom-scrollbar leading-relaxed"
        ></textarea>
        
        <div class="bg-muted/50 px-4 py-2 border-t border-border flex justify-between items-center text-[10px] text-muted-foreground font-mono">
          <span class="flex items-center gap-1"><CloudCheck class="w-3 h-3 text-green-500" />Salvo localmente</span>
          <span>{{ notes.length }} caracteres</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { CloudCheck, Copy, PenSquare, StickyNote, Trash2, X } from '@lucide/vue'

const isOpen = ref(false)
const notes = ref('')
const showCopied = ref(false)

onMounted(() => {
  const savedNotes = localStorage.getItem('hub_scratchpad')
  if (savedNotes) {
    notes.value = savedNotes
  }
})

watch(notes, (newValue) => {
  localStorage.setItem('hub_scratchpad', newValue)
})

const clearNotes = () => {
  if(notes.value.trim() === '') return
  if (confirm('Tem certeza que deseja apagar todas as suas notas?')) {
    notes.value = ''
  }
}

const copyAll = () => {
  if(notes.value.trim() === '') return
  navigator.clipboard.writeText(notes.value)
  showCopied.value = true
  setTimeout(() => {
    showCopied.value = false
  }, 2000)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95); 
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}
</style>
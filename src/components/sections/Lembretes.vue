<template>
  <div class="relative">
    
    <button
      @click="isOpen = !isOpen"
      :class="['w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md relative', isOpen ? 'bg-muted border-border text-primary' : 'bg-card/60 border-border text-muted-foreground hover:bg-card hover:text-primary']"
      title="Lembretes e Alertas"
    >
      <Bell :class="['w-5 h-5', temAlertaAtivo ? 'animate-bounce text-red-500' : '']" />
      
      <span v-if="temAlertaAtivo" class="absolute -top-1 -right-1 flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
    </button>

    <transition name="fade-slide">
      <div v-show="isOpen" class="absolute top-full right-0 mt-4 w-[350px] md:w-[480px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col origin-top-right z-50">
        
        <div class="bg-muted px-4 py-3 flex justify-between items-center border-b border-border">
          <div class="flex items-center gap-2 font-bold text-sm text-foreground">
            <CalendarCheck class="w-4 h-4 text-brand-500" /> Lembretes da Equipe
          </div>
          <button @click="isOpen = false" class="text-muted-foreground hover:text-red-500 transition-colors">
            <X class="w-4 h-4" />
          </button>
        </div>

        <div v-if="statusNotificacao === 'default' || statusNotificacao === 'denied'" class="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-blue-100 dark:border-blue-900/50 flex flex-col gap-2">
          <p class="text-[10px] text-blue-800 dark:text-blue-300 flex items-center gap-1">
            <Monitor class="w-3 h-3" /> Quer ser avisado pelo Windows se a aba estiver minimizada?
          </p>
          <button @click="solicitarPermissao" class="bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg text-xs font-bold transition-colors w-full">
            Ativar Notificações do Sistema
          </button>
        </div>

        <div class="p-4 border-b border-border bg-muted/50">
          <div class="flex flex-col gap-3">
            <input 
              v-model="novoTitulo" 
              type="text" 
              placeholder="Ex: Verificar Contestações..." 
              class="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-ring outline-none text-foreground placeholder:text-muted-foreground shadow-inner"
            >
            
            <div class="flex flex-wrap md:flex-nowrap gap-2">
              <select v-model="novoTipo" class="px-2 py-2 bg-card border border-border rounded-lg text-xs outline-none text-foreground cursor-pointer shadow-sm">
                <option value="mensal">Todo mês, dia:</option>
                <option value="unico">Data Específica:</option>
              </select>
              
              <input 
                v-if="novoTipo === 'unico'" 
                v-model="novaData" 
                type="date" 
                class="flex-1 px-2 py-2 bg-card border border-border rounded-lg text-xs outline-none text-foreground cursor-pointer shadow-sm"
              >
              
              <input 
                v-if="novoTipo === 'mensal'" 
                v-model="novoDia" 
                type="number" 
                min="1" max="31"
                placeholder="Ex: 30"
                class="flex-1 w-16 px-2 py-2 bg-card border border-border rounded-lg text-xs outline-none text-foreground shadow-sm"
              >

              <input 
                v-model="novaHora" 
                type="time" 
                title="Horário (Opcional)"
                class="w-24 px-2 py-2 bg-card border border-border rounded-lg text-xs outline-none text-foreground shadow-sm cursor-pointer"
              >
              
              <button @click="adicionarLembrete" class="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm">
                Salvar
              </button>
            </div>
          </div>
        </div>

        <div class="max-h-[300px] overflow-y-auto custom-scrollbar scroll-smooth p-2">
          
          <div v-if="lembretes.length === 0" class="text-center py-8 text-muted-foreground text-xs">
            Nenhum lembrete configurado.
          </div>

          <div 
            v-for="(lembrete, index) in lembretesOrdenados" 
            :key="lembrete.id"
            :class="['m-2 p-3 rounded-xl border flex justify-between items-center gap-3 transition-all', isAtivo(lembrete) ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : (isHoje(lembrete) ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800' : 'bg-card border-border')]"
          >
            <div>
              <div :class="['font-bold text-sm mb-0.5 flex items-center gap-1', isAtivo(lembrete) ? 'text-red-700 dark:text-red-400' : (isHoje(lembrete) ? 'text-amber-600 dark:text-amber-500' : 'text-foreground')]">
                <AlertCircle v-if="isAtivo(lembrete)" class="w-3 h-3" />
                <Clock v-else-if="isHoje(lembrete)" class="w-3 h-3" />
                {{ lembrete.titulo }}
              </div>
              <div class="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                <RotateCw v-if="lembrete.tipo === 'mensal'" class="w-2.5 h-2.5" />
                <Calendar v-else class="w-2.5 h-2.5" />
                {{ formatarExibicao(lembrete) }}

                <span v-if="lembrete.hora" :class="['ml-1 px-1.5 py-0.5 rounded flex items-center gap-1', isAtivo(lembrete) ? 'bg-red-100 text-red-600 dark:bg-red-900/50' : 'bg-muted']">
                  <Clock class="w-2.5 h-2.5" /> {{ lembrete.hora }}
                </span>
              </div>
            </div>
            <button @click="removerLembrete(index)" class="w-8 h-8 rounded-lg text-muted-foreground hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors">
              <Trash2 class="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { AlertCircle, Bell, Calendar, CalendarCheck, Clock, Monitor, RotateCw, Trash2, X } from '@lucide/vue'

const isOpen = ref(false)
const lembretes = ref([])
const statusNotificacao = ref(Notification.permission)

// Form de cadastro
const novoTitulo = ref('')
const novoTipo = ref('mensal')
const novoDia = ref('')
const novaData = ref('')
const novaHora = ref('') // Novo campo!

let intervaloNotificacao = null

onMounted(() => {
  const salvos = localStorage.getItem('hub_lembretes')
  if (salvos) {
    lembretes.value = JSON.parse(salvos)
  }

  verificarEDispararNotificacaoNativa()
  intervaloNotificacao = setInterval(verificarEDispararNotificacaoNativa, 60000)
})

onUnmounted(() => {
  if (intervaloNotificacao) clearInterval(intervaloNotificacao)
})

watch(lembretes, (novoValor) => {
  localStorage.setItem('hub_lembretes', JSON.stringify(novoValor))
  verificarEDispararNotificacaoNativa()
}, { deep: true })

// ==========================================
// LÓGICA DE NOTIFICAÇÃO NATIVA (WINDOWS/MAC)
// ==========================================

const solicitarPermissao = async () => {
  const permission = await Notification.requestPermission()
  statusNotificacao.value = permission
  if (permission === 'granted') {
    new Notification("Sucesso!", { body: "O Hub Convcard agora pode enviar alertas." })
  }
}

const verificarEDispararNotificacaoNativa = () => {
  if (statusNotificacao.value !== 'granted' || !temAlertaAtivo.value) return

  const ativosParaNotificar = lembretes.value.filter(l => isAtivo(l))
  if (ativosParaNotificar.length === 0) return

  const hojeString = new Date().toDateString()
  let historico = JSON.parse(localStorage.getItem('hub_historico_notificacoes') || '{}')
  
  // Se virou o dia, reseta o histórico de enviados
  if (historico.data !== hojeString) {
    historico = { data: hojeString, idsEnviados: [] }
  }

  // Só avisa os que ainda não foram avisados hoje
  const novosParaAvisar = ativosParaNotificar.filter(l => !historico.idsEnviados.includes(l.id))

  if (novosParaAvisar.length > 0) {
    const tarefas = novosParaAvisar.map(l => l.titulo).join(', ')

    new Notification("Lembretes do Hub Convcard", {
      body: `Você tem tarefas pendentes: ${tarefas}`,
      icon: '/apple-icon.png' 
    })
    
    // Registra que já avisou esses IDs hoje
    novosParaAvisar.forEach(l => historico.idsEnviados.push(l.id))
    localStorage.setItem('hub_historico_notificacoes', JSON.stringify(historico))
  }
}

// ==========================================
// LÓGICA CRUD E DATAS
// ==========================================

const adicionarLembrete = () => {
  if (!novoTitulo.value) return alert('Preencha o título do lembrete.')
  if (novoTipo.value === 'mensal' && (!novoDia.value || novoDia.value < 1 || novoDia.value > 31)) return alert('Informe um dia válido.')
  if (novoTipo.value === 'unico' && !novaData.value) return alert('Selecione uma data.')

  lembretes.value.push({
    id: Date.now(),
    titulo: novoTitulo.value,
    tipo: novoTipo.value,
    dia: novoTipo.value === 'mensal' ? parseInt(novoDia.value) : null,
    data: novoTipo.value === 'unico' ? novaData.value : null,
    hora: novaHora.value || null // Salva a hora se tiver
  })

  novoTitulo.value = ''
  novoDia.value = ''
  novaData.value = ''
  novaHora.value = ''
}

const removerLembrete = (index) => lembretes.value.splice(index, 1)

// Verifica se o dia bate com hoje (independente da hora)
const isHoje = (lembrete) => {
  const hoje = new Date()
  
  if (lembrete.tipo === 'mensal') {
    const ultimoDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate()
    let diaAlvo = lembrete.dia
    if (diaAlvo > ultimoDiaDoMes) diaAlvo = ultimoDiaDoMes
    return hoje.getDate() === diaAlvo
  } 
  
  if (lembrete.tipo === 'unico') {
    const [ano, mes, dia] = lembrete.data.split('-')
    return parseInt(dia) === hoje.getDate() && 
           parseInt(mes) - 1 === hoje.getMonth() && 
           parseInt(ano) === hoje.getFullYear()
  }
  return false
}

// Verifica se o alerta já deve estar apitando (Dia é hoje AND a hora já passou/está vazia)
const isAtivo = (lembrete) => {
  if (!isHoje(lembrete)) return false
  if (!lembrete.hora) return true // Sem hora = ativo o dia todo

  const agora = new Date()
  const [hora, minuto] = lembrete.hora.split(':').map(Number)
  
  const minutosAgora = (agora.getHours() * 60) + agora.getMinutes()
  const minutosLembrete = (hora * 60) + minuto

  return minutosAgora >= minutosLembrete
}

const temAlertaAtivo = computed(() => lembretes.value.some(l => isAtivo(l)))

const formatarExibicao = (lembrete) => {
  if (lembrete.tipo === 'mensal') return `Todo dia ${lembrete.dia}`
  if (lembrete.tipo === 'unico') {
    const [ano, mes, dia] = lembrete.data.split('-')
    return `${dia}/${mes}/${ano}`
  }
}

// Ordenação: 1º Vermelhos (Ativos), 2º Amarelos (Para Hoje), 3º Futuro
const lembretesOrdenados = computed(() => {
  return [...lembretes.value].sort((a, b) => {
    if (isAtivo(a) && !isAtivo(b)) return -1
    if (!isAtivo(a) && isAtivo(b)) return 1
    
    if (isHoje(a) && !isHoje(b)) return -1
    if (!isHoje(a) && isHoje(b)) return 1
    
    return 0
  })
})
</script>
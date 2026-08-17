<template>
  <div 
    :class="['fixed bottom-20 left-4 z-[60] flex flex-col gap-3 p-4 rounded-2xl border border-white/40 dark:border-border/50 bg-card/80 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-[260px] transform transition-all duration-300 origin-bottom-left', isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none hidden']"
  >
    <div class="flex justify-between items-center border-b border-border/50 pb-2">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <h3 class="text-xs font-bold uppercase tracking-widest text-muted-foreground">ConvSnake</h3>
      </div>
      <div class="flex items-center gap-3">
        <span class="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">PTS: <span>{{ score }}</span></span>
        <button @click="closeGame" class="text-muted-foreground hover:text-red-500 transition-colors">
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <canvas ref="canvasRef" width="225" height="225" class="bg-slate-100 dark:bg-[#0b1120] rounded-lg mx-auto block w-full"></canvas>
    
    <p v-if="gameOver" class="text-center text-[10px] text-red-500 font-bold uppercase">Game Over - Feche e abra para reiniciar</p>
    <p v-else class="text-center text-[10px] text-muted-foreground font-mono opacity-70">Use as setas para jogar</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const canvasRef = ref(null)
const score = ref(0)
const gameOver = ref(false)

let ctx = null
let gameInterval = null
const box = 15
const canvasSize = 225

let snake = []
let d = ""
let food = {}

const closeGame = () => {
  clearInterval(gameInterval)
  emit('close')
}

const draw = () => {
  if (!ctx) return

  ctx.fillStyle = document.documentElement.classList.contains('dark') ? "#0b1120" : "#f1f5f9"
  ctx.fillRect(0, 0, canvasSize, canvasSize)

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? "#0ea5e9" : "#38bdf8"
    ctx.fillRect(snake[i].x, snake[i].y, box, box)
    ctx.strokeStyle = document.documentElement.classList.contains('dark') ? "#0b1120" : "#f1f5f9"
    ctx.strokeRect(snake[i].x, snake[i].y, box, box)
  }

  ctx.fillStyle = "#ef4444"
  ctx.beginPath()
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2.5, 0, 2 * Math.PI)
  ctx.fill()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (d == "LEFT") snakeX -= box
  if (d == "UP") snakeY -= box
  if (d == "RIGHT") snakeX += box
  if (d == "DOWN") snakeY += box

  if (snakeX == food.x && snakeY == food.y) {
    score.value++
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    }
  } else {
    snake.pop()
  }

  let newHead = { x: snakeX, y: snakeY }

  if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(newHead, snake)) {
    clearInterval(gameInterval)
    gameOver.value = true
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? "#fff" : "#1e293b"
    ctx.font = "bold 20px 'JetBrains Mono'"
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER", canvasSize / 2, canvasSize / 2)
    return
  }

  snake.unshift(newHead)
}

const collision = (head, array) => {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) return true
  }
  return false
}

const startGame = () => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  snake = []
  snake[0] = { x: 7 * box, y: 7 * box }
  score.value = 0
  d = ""
  gameOver.value = false
  food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
  }
  clearInterval(gameInterval)
  gameInterval = setInterval(draw, 100)
}

const direction = (event) => {
  if (!props.isOpen) return
  let key = event.keyCode
  if ([37, 38, 39, 40].includes(key)) {
    event.preventDefault()
  }
  if (key == 37 && d != "RIGHT") d = "LEFT"
  else if (key == 38 && d != "DOWN") d = "UP"
  else if (key == 39 && d != "LEFT") d = "RIGHT"
  else if (key == 40 && d != "UP") d = "DOWN"
}

// Fica vigiando a prop isOpen. Se abrir, inicia o jogo.
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    setTimeout(startGame, 10) 
  } else {
    clearInterval(gameInterval)
  }
})

onMounted(() => document.addEventListener("keydown", direction))
onUnmounted(() => document.removeEventListener("keydown", direction))
</script>
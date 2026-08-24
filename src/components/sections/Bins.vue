<template>
  <section id="bins">
    <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
      <CreditCard class="w-5 h-5 text-brand-600" /> BINs / Prefixos
    </h2>

    <div class="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
      <p class="text-xs text-muted-foreground">Prefixos (BINs) para identificação rápida de cartões Convcard, parceiros e da rede ELO.</p>

      <div>
        <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider">
          <CreditCard class="w-3 h-3 inline mr-1 text-brand-500" /> BINs Principais
        </strong>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          <div class="searchable-item bg-muted/50 border border-border rounded-xl p-3 flex items-center justify-between gap-3 hover:border-brand-500 hover:shadow-sm transition-all">
            <span class="text-sm font-medium text-foreground">Convcard</span>
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2.5 py-1 rounded border border-brand-100 dark:border-brand-800">639321</code>
              <button @click="copyText($event, '639321')" class="text-muted-foreground hover:text-primary transition-colors" title="Copiar BIN">
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div class="searchable-item bg-muted/50 border border-border rounded-xl p-3 flex items-center justify-between gap-3 hover:border-brand-500 hover:shadow-sm transition-all">
            <span class="text-sm font-medium text-foreground">Convnet</span>
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2.5 py-1 rounded border border-brand-100 dark:border-brand-800">637228</code>
              <button @click="copyText($event, '637228')" class="text-muted-foreground hover:text-primary transition-colors" title="Copiar BIN">
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div class="searchable-item bg-muted/50 border border-border rounded-xl p-3 flex items-center justify-between gap-3 hover:border-brand-500 hover:shadow-sm transition-all">
            <span class="text-sm font-medium text-foreground">Agafarma</span>
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2.5 py-1 rounded border border-brand-100 dark:border-brand-800">608546</code>
              <button @click="copyText($event, '608546')" class="text-muted-foreground hover:text-primary transition-colors" title="Copiar BIN">
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div>
        <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider">
          <Network class="w-3 h-3 inline mr-1 text-blue-500" /> BINs ELO
        </strong>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <div class="searchable-item bg-muted/50 border border-border rounded-xl p-3 flex items-center justify-between gap-3 hover:border-blue-500 hover:shadow-sm transition-all">
            <span class="text-sm font-medium text-foreground">Util</span>
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded border border-blue-100 dark:border-blue-800">50901039</code>
              <button @click="copyText($event, '50901039')" class="text-muted-foreground hover:text-primary transition-colors" title="Copiar BIN">
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div class="searchable-item bg-muted/50 border border-border rounded-xl p-3 flex items-center justify-between gap-3 hover:border-blue-500 hover:shadow-sm transition-all">
            <span class="text-sm font-medium text-foreground">Convcard</span>
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded border border-blue-100 dark:border-blue-800">50901049</code>
              <button @click="copyText($event, '50901049')" class="text-muted-foreground hover:text-primary transition-colors" title="Copiar BIN">
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div class="searchable-item bg-muted/50 border border-border rounded-xl p-3 flex items-center justify-between gap-3 hover:border-blue-500 hover:shadow-sm transition-all">
            <span class="text-sm font-medium text-foreground">Convnet <span class="text-[10px] text-muted-foreground font-normal">(em uso - Pré-pago)</span></span>
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded border border-blue-100 dark:border-blue-800">50929487</code>
              <button @click="copyText($event, '50929487')" class="text-muted-foreground hover:text-primary transition-colors" title="Copiar BIN">
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div class="searchable-item bg-muted/50 border border-border rounded-xl p-3 flex items-center justify-between gap-3 hover:border-blue-500 hover:shadow-sm transition-all">
            <span class="text-sm font-medium text-foreground">Convnet Novo</span>
            <div class="flex items-center gap-2">
              <code class="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded border border-blue-100 dark:border-blue-800">50901050</code>
              <button @click="copyText($event, '50901050')" class="text-muted-foreground hover:text-primary transition-colors" title="Copiar BIN">
                <Copy class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CreditCard, Copy, Network } from '@lucide/vue'
import { copyText } from '../../utils'
</script>

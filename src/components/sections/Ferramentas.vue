<template>
  <section id="ferramentas">
    <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
      <Wrench class="w-5 h-5 text-purple-600" /> Ferramentas Diárias
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <a href="https://trier.movidesk.com/Account/Login" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:shadow-sm transition-all group hover:border-brand-500">
        <div class="w-8 h-8 rounded-lg bg-[#FF6600] flex items-center justify-center text-white text-lg shadow-sm flex-shrink-0">
          <Headset class="w-4 h-4" />
        </div>
        <div>
          <div class="font-bold text-foreground">Movidesk</div>
          <div class="text-xs text-muted-foreground">Gestão de Chamados</div>
        </div>
      </a>

      <a href="https://sicfarma.triersistemas.com.br/#/login" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:shadow-sm transition-all group hover:border-emerald-500">
        <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-lg shadow-sm flex-shrink-0">
          <Pill class="w-4 h-4" />
        </div>
        <div>
          <div class="font-bold text-foreground">SIC Farma</div>
          <div class="text-xs text-muted-foreground">Sistema Farma</div>
        </div>
      </a>

      <a href="https://webmail.triersistemas.com.br/" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:shadow-sm transition-all group hover:border-blue-500">
        <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg shadow-sm flex-shrink-0">
          <Mail class="w-4 h-4" />
        </div>
        <div>
          <div class="font-bold text-foreground">Webmail</div>
          <div class="text-xs text-muted-foreground">E-mail Corporativo</div>
        </div>
      </a>

      <a href="https://qa.convcard.com.br/monitoramento/#/login" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:shadow-sm transition-all group hover:border-red-500">
        <img src="https://www.google.com/s2/favicons?domain=zabbix.com&sz=128" alt="Monitoramento" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">Monitoramento</div>
          <div class="text-xs text-muted-foreground">Dashboards</div>
        </div>
      </a>

    </div>
  </section>
</template>

<script setup>
import { Headset, Mail, Pill, Wrench } from '@lucide/vue'
</script>

<template>
  <section id="ambientes">
    <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
      <Network class="w-5 h-5 text-brand-600" /> Ambientes Convcard
    </h2>

    <div class="bg-card/50 p-4 md:p-6 rounded-xl border border-border">

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        <a href="https://site.convcard.com.br/crt/" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-brand-500 hover:shadow-sm transition-all group">
          <div class="w-8 h-8 rounded bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200 flex items-center justify-center font-bold text-xs group-hover:bg-brand-600 group-hover:text-white transition-colors flex-shrink-0">CC</div>
          <span class="text-sm font-medium text-foreground">Convcard CRT</span>
        </a>

        <a href="https://site.convcard.com.br/crt01/" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-brand-500 hover:shadow-sm transition-all group">
          <div class="w-8 h-8 rounded bg-muted text-muted-foreground flex items-center justify-center font-bold text-xs group-hover:bg-brand-600 group-hover:text-white transition-colors flex-shrink-0">01</div>
          <span class="text-sm font-medium text-foreground">Convcard CRT01</span>
        </a>

        <a href="https://site.convcard.com.br/crt02/" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-brand-500 hover:shadow-sm transition-all group">
          <div class="w-8 h-8 rounded bg-muted text-muted-foreground flex items-center justify-center font-bold text-xs group-hover:bg-brand-600 group-hover:text-white transition-colors flex-shrink-0">02</div>
          <span class="text-sm font-medium text-foreground">Convcard CRT02</span>
        </a>

        <a href="https://hml.convcard.com.br/" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-orange-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200 flex items-center justify-center text-xs group-hover:bg-orange-500 group-hover:text-white transition-colors flex-shrink-0">
            <FlaskConical class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground">Homologação</span>
          <div class="tooltip-text">
            <strong>Ambiente de Testes:</strong><br>Dados fictícios. Não gera cobrança real.
          </div>
        </a>

        <a href="https://www.convcard.com.br/crtpf/" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-brand-500 hover:shadow-sm transition-all group">
          <div class="w-8 h-8 rounded bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors flex-shrink-0">
            <User class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground">Convcard PF</span>
        </a>

        <a href="https://www.convcard.com.br/sgc/login/crt/portalrh" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-teal-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-200 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors flex-shrink-0">
            <Users class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground">Portal RH CRT</span>
          <div class="tooltip-text">
            <strong>Acesso Suporte:</strong><br>CNPJ: Da Loja<br>CPF Op: 000.000.001-91<br>Senha: joaozinho.fulano.convcard/suasenha
          </div>
        </a>

        <a href="https://www.convcard.com.br/sgc/login/crt01/portalrh" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-teal-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-200 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors flex-shrink-0">
            <Building2 class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground">Portal RH CRT01</span>
          <div class="tooltip-text">
            <strong>Acesso Suporte:</strong><br>CNPJ: Da Loja<br>CPF Op: 000.000.001-91<br>Senha: joaozinho.fulano.convcard/suasenha
          </div>
        </a>

        <a href="https://www.convcard.com.br/repasse/#/login" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-emerald-500 hover:shadow-sm transition-all group">
          <div class="w-8 h-8 rounded bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-200 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors flex-shrink-0">
            <ArrowLeftRight class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground">Repasse</span>
        </a>

        <a href="https://pay.convcard.com/pay/#/login" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-pink-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-200 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors flex-shrink-0">
            <CreditCard class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground">Convcard Pay</span>
          <div class="tooltip-text">
            <strong>Credenciais Padrão:</strong><br>Login: CNPJ da credenciada<br>Senha: CNPJ (apenas números)
          </div>
        </a>

        <a href="https://portalrh.triersistemas.com.br/Portalrh/Account/Login?ReturnUrl=%2fPortalrh" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-slate-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 flex items-center justify-center group-hover:bg-slate-600 group-hover:text-white transition-colors flex-shrink-0">
            <Monitor class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground text-wrap leading-tight">Portal RH Trier</span>
          <div class="tooltip-text">
            <strong>Acesso Externo:</strong><br>Sistema de RH da Trier Sistemas.
          </div>
        </a>

        <a href="https://convc.link/w7jCa" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-purple-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200 flex items-center justify-center font-bold text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors flex-shrink-0">
            <Code class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground text-wrap leading-tight">API Consulta Vendas (Não-TEF)</span>
          <div class="tooltip-text">
            <strong>Doc. de Integração:</strong><br>Consulta de vendas Não-TEF transacionadas via POS Virtual/Convcard Pay.
          </div>
        </a>

        <a href="https://convc.link/I63bU" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-purple-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200 flex items-center justify-center font-bold text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors flex-shrink-0">
            <Code class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground text-wrap leading-tight">API Consulta Vendas (TEF e Não-TEF)</span>
          <div class="tooltip-text">
            <strong>Doc. de Integração:</strong><br>Consulta de vendas TEF e Não-TEF transacionadas via POS Virtual/Convcard Pay.
          </div>
        </a>

        <a href="https://documenter.getpostman.com/view/6290764/Tz5s2vy9" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-purple-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200 flex items-center justify-center font-bold text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors flex-shrink-0">
            <Code class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground text-wrap leading-tight">API Convcard PJ - Integração REST (RH)</span>
          <div class="tooltip-text">
            <strong>Doc. de Integração:</strong><br>Importações centralizadas e consultas via REST/JSON no sistema Convcard Pessoa Jurídica. Uso comum: RH de empresas.
          </div>
        </a>

        <a href="https://aut-h.convcard.com.br/autorizador/docs" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-purple-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200 flex items-center justify-center font-bold text-xs group-hover:bg-purple-600 group-hover:text-white transition-colors flex-shrink-0">
            <FileCode class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground">API Autorizador Convcard (Manual de Integração)</span>
          <div class="tooltip-text">
            <strong>Doc. do Autorizador:</strong><br>Documentação técnica de integração com o autorizador Convcard.
          </div>
        </a>

        <a href="https://site.convcard.com.br/crt/atualizacao" target="_blank" rel="noopener noreferrer" class="searchable-item bg-card border border-border p-3 rounded-xl flex items-center gap-3 hover:border-brand-500 hover:shadow-sm transition-all group relative">
          <div class="w-8 h-8 rounded bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200 flex items-center justify-center font-bold text-xs group-hover:bg-brand-600 group-hover:text-white transition-colors flex-shrink-0">
            <Wallet class="w-4 h-4" />
          </div>
          <span class="text-sm font-medium text-foreground">SITEF / Fiserv (Carteira Digital)</span>
          <div class="tooltip-text">
            <strong>Orientação:</strong><br>Configuração do SITEF / Fiserv para Carteira Digital.
          </div>
        </a>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowLeftRight, Building2, Code, CreditCard, FileCode, FlaskConical, Monitor, Network, User, Users, Wallet } from '@lucide/vue'
</script>

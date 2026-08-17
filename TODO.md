# HUB Convcard — Plano de Refatoração

> Baseado no diagnóstico de 2026-05-27.
> Cada fase é independente e segura para merge incremental.
> Não iniciar fase seguinte antes de validar a anterior no browser.

---

## Fase 1 · Fundação (Setup & CSS)

> Objetivo: Trocar a base visual sem tocar em nenhum componente ainda.
> Ao final desta fase o app deve parecer mais sóbrio, mas ainda funcional.

### 1.1 — Tailwind Config

- [x] Remover a custom shadow `glow` (`0 0 20px rgba(14, 165, 233, 0.15)`) de `tailwind.config.js`
- [x] Remover a custom shadow `fintech` de `tailwind.config.js`
- [x] Remover o bloco `colors.dark` (`dark.bg`, `dark.surface`, `dark.border`) — substituído por CSS variables
- [x] Substituir `brand` (sky cyan) pela paleta Convcard (brand.500=#336BC0, brand.900=#002A53)
- [x] Adicionar tokens semânticos (background, foreground, card, primary, etc.) via CSS variables
- [x] Confirmar que `darkMode: 'class'` está mantido
- [x] Build validado sem erros: `npm run build` ✓

### 1.2 — CSS Variables (Paleta Convcard)

- [x] Substituir `src/style.css` pelo sistema de CSS variables HSL
- [x] `:root` light: branco puro + Azul Escuro (#002A53) como primary
- [x] `.dark` midnight blue derivado do #002A53 (background HSL 214 45% 8%)
- [x] Remover `bg-gradient-to-br` do body — substituído por `bg-background`
- [x] Scrollbar e `.searchable-item` atualizados para usar CSS variables
- [x] `.tooltip-text` atualizado para usar `--popover` e `--border`

### 1.3 — Limpeza de Estilos Globais

- [x] Remover `filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]` das logos no `Sidebar.vue`
- [x] Remover `filter drop-shadow-[0_0_8px_...]` da logo mini dark no `Sidebar.vue`
- [x] `Ambientes.vue` não tinha drop-shadow (confirmado via grep)
- [x] Substituir `backdrop-blur-2xl` do header por `backdrop-blur-sm`
- [x] Remover `animate-bounce` do badge de alerta no `App.vue`
- [x] Remover `backdrop-blur-md` do botão de reload (`App.vue`)
- [x] Substituir todas as referências `dark-bg / dark-surface / dark-border` em `App.vue` e `Sidebar.vue`
- [x] Substituir `shadow-fintech` da sidebar por `shadow-sm`
- [x] Unificar tokens de hover brand no Sidebar: `hover:text-primary`, `bg-card`, `border-border`

### 1.4 — Instalação do Lucide Icons

- [x] Instalar `@lucide/vue` (substituto oficial do depreciado `lucide-vue-next`)
- [x] Criar `src/composables/useIcon.js` com mapeamento completo FA → Lucide (26 ícones)
- [x] **Substituição ainda NÃO feita** — ocorre nas Fases 3 e 4
- [x] FontAwesome permanece no `index.html` até todas as views serem migradas (Fase 4)

---

## Fase 2 · Design System (Componentes Base)

> Objetivo: Criar a biblioteca de componentes UI isolada em `src/components/ui/`.
> Esses componentes NÃO substituem os existentes ainda — existem em paralelo.
> Ao final desta fase temos o design system pronto para consumo.

### 2.1 — Estrutura de Pastas

- [ ] Criar pasta `src/components/ui/`
- [ ] Criar pasta `src/components/layout/`
- [ ] Criar pasta `src/components/sections/` e mover os componentes de conteúdo existentes para lá (sem alterar o código interno ainda):
  - [ ] Mover `Ambientes.vue` → `sections/Ambientes.vue`
  - [ ] Mover `BaseConhecimento.vue` → `sections/BaseConhecimento.vue`
  - [ ] Mover `CentralDocumentos.vue` → `sections/CentralDocumentos.vue`
  - [ ] Mover `CodigosRetorno.vue` → `sections/CodigosRetorno.vue`
  - [ ] Mover `Contatos.vue` → `sections/Contatos.vue`
  - [ ] Mover `Downloads.vue` → `sections/Downloads.vue`
  - [ ] Mover `Ferramentas.vue` → `sections/Ferramentas.vue`
  - [ ] Mover `Lembretes.vue` → `sections/Lembretes.vue`
  - [ ] Mover `Manuais.vue` → `sections/Manuais.vue`
  - [ ] Mover `MCCs.vue` → `sections/MCCs.vue`
  - [ ] Mover `Parametros.vue` → `sections/Parametros.vue`
  - [ ] Mover `Scratchpad.vue` → `sections/Scratchpad.vue`
  - [ ] Mover `Softwares.vue` → `sections/Softwares.vue`
  - [ ] Atualizar todos os imports no `App.vue` para refletir os novos caminhos
  - [ ] Validar que o app continua funcionando após a movimentação

### 2.2 — `<Button>`

- [ ] Criar `src/components/ui/Button.vue`
- [ ] Implementar prop `variant`: `default`, `outline`, `ghost`, `destructive`, `link`
- [ ] Implementar prop `size`: `sm`, `md` (default), `lg`, `icon`
- [ ] Estados obrigatórios: `hover`, `focus-visible` (ring), `disabled` (opacity-50 + cursor-not-allowed), `active` (scale-95)
- [ ] Usar `hsl(var(--primary))` para variant default — sem hardcode de cor
- [ ] Não usar `shadow-glow` nem `ring-brand-*`
- [ ] Testar visualmente: criar um snippet de todos os variants no `App.vue` (remover após teste)

### 2.3 — `<Card>`

- [ ] Criar `src/components/ui/Card.vue` com slots: default (conteúdo livre)
- [ ] Criar `src/components/ui/CardHeader.vue` com slots: `title` e `description`
- [ ] Criar `src/components/ui/CardContent.vue`
- [ ] Criar `src/components/ui/CardFooter.vue`
- [ ] Background: `hsl(var(--card))`, borda: `1px solid hsl(var(--border))`, radius: `var(--radius)`
- [ ] Sem gradientes, sem shadows coloridas — apenas `shadow-sm` neutro permitido

### 2.4 — `<Input>`

- [ ] Criar `src/components/ui/Input.vue`
- [ ] Implementar props: `modelValue`, `placeholder`, `disabled`, `type`
- [ ] Estados: `focus` com `ring-2 ring-ring` (usando CSS variable `--ring`), `disabled` com `opacity-50`
- [ ] Borda: `border border-input` (CSS variable), sem glow azul no focus
- [ ] Testar no campo de busca global do `App.vue` (visual apenas, não substituir ainda)

### 2.5 — `<Badge>`

- [ ] Criar `src/components/ui/Badge.vue`
- [ ] Implementar prop `variant`: `default`, `secondary`, `success`, `warning`, `destructive`, `outline`
- [ ] Substituir todos os badges inline coloridos hardcoded (ex: `bg-red-500 text-white`) pelos variants padronizados
- [ ] Não usar `animate-bounce` nem `animate-ping` em badges — apenas dot estático quando necessário

### 2.6 — `<Tooltip>`

- [ ] Criar `src/components/ui/Tooltip.vue`
- [ ] Implementar via slot trigger + slot content
- [ ] Posicionamento: prop `side` com valores `top`, `right`, `bottom`, `left` (default: `top`)
- [ ] Z-index fixo: `z-50` (dentro do componente, não inline nos consumidores)
- [ ] Animação: `transition-opacity duration-150` — sem transforms exagerados
- [ ] Remover o padrão de triângulo animado (rotate-45) atual — substituir por seta CSS simples ou sem seta
- [ ] Fundo: `bg-zinc-900 text-zinc-50` no light; `bg-zinc-800 text-zinc-100` no dark

### 2.7 — `<Dialog>` (Modal)

- [ ] Criar `src/components/ui/Dialog.vue` com: overlay (`z-60`), container (`z-70`), slot padrão
- [ ] Criar `src/components/ui/DialogHeader.vue`, `DialogContent.vue`, `DialogFooter.vue`
- [ ] Overlay: `bg-black/60 backdrop-blur-sm`, cobre 100vw/100vh, fecha ao clicar fora
- [ ] Transição do modal: `opacity + scale` suave (100ms)
- [ ] O botão X de fechar deve ter `z-index` relativo ao `DialogContent` — nunca ultrapassar o conteúdo
- [ ] Fechar com `Escape` via `@keydown.escape`
- [ ] Travar scroll do body quando aberto (`overflow-hidden` no `<html>`)
- [ ] Testar com o caso específico "Recusar Documento" — confirmar que o X não sobrepõe o texto

### 2.8 — `<Separator>`

- [ ] Criar `src/components/ui/Separator.vue`
- [ ] Implementar prop `orientation`: `horizontal` (default) / `vertical`
- [ ] Estilo: `1px solid hsl(var(--border))` — substitui todas as `border-b` hardcoded com classes como `border-zinc-800`

### 2.9 — `<Tabs>`

- [ ] Criar `src/components/ui/Tabs.vue` com provide/inject para estado ativo
- [ ] Criar `src/components/ui/TabsList.vue`, `TabsTrigger.vue`, `TabsContent.vue`
- [ ] Tab ativa: `bg-background text-foreground shadow-sm` (padrão Shadcn)
- [ ] Tab inativa: `text-muted-foreground hover:text-foreground`
- [ ] Destino imediato: substituir o sistema de tabs do `CodigosRetorno.vue`

---

## Fase 3 · Layout Core & Z-Index

> Objetivo: Refatorar a estrutura principal do app com a hierarquia de z-index correta.
> Esta é a fase mais crítica — testar exaustivamente antes de avançar.

### 3.1 — Composables de Infraestrutura

- [ ] Criar `src/composables/useTheme.js`:
  - [ ] Extrair lógica de dark/light mode do `Sidebar.vue`
  - [ ] Persistir preferência no `localStorage` com chave `hub-theme`
  - [ ] Respeitar `prefers-color-scheme` na primeira visita
  - [ ] Exportar: `isDark` (ref), `toggleTheme()`, `setTheme(mode)`
- [ ] Criar `src/composables/useLocalStorage.js`:
  - [ ] Wrapper genérico: `useLocalStorage(key, defaultValue)`
  - [ ] Substituirá os 3 usos dispersos (Scratchpad, Lembretes, Sidebar collapse)
- [ ] Criar `src/composables/useSearch.js`:
  - [ ] Extrair lógica de busca global do `App.vue`
  - [ ] Exportar: `searchQuery` (ref), `filteredSections` (computed), `clearSearch()`

### 3.2 — `AppSidebar.vue`

- [ ] Criar `src/components/layout/AppSidebar.vue` baseado no `Sidebar.vue` atual
- [ ] Aplicar z-index correto: `z-20` para o container da sidebar
- [ ] Aplicar z-index correto: `z-50` nos tooltips (via componente `<Tooltip>` criado na Fase 2)
- [ ] Remover todas as 11 cores de ícones individuais — unificar em:
  - Inativo: `text-muted-foreground`
  - Ativo: `text-foreground` com `bg-accent`
  - Hover: `text-foreground`
- [ ] Substituir ícones FontAwesome pelos equivalentes Lucide (tabela mapeada na Fase 1.4)
- [ ] Substituir os tooltips copy-paste pelo componente `<Tooltip>` da Fase 2
- [ ] Migrar lógica de collapse para `useLocalStorage` composable
- [ ] Migrar lógica de dark mode para `useTheme` composable
- [ ] Manter easter egg do SnakeWidget (click 3x na versão) — apenas refatorar, não remover
- [ ] Validar: sidebar fixa, sem recarregar ao navegar entre seções
- [ ] Validar: tooltips aparecem acima do header (z-50 > z-30 do header)

### 3.3 — `AppHeader.vue`

- [ ] Criar `src/components/layout/AppHeader.vue` baseado no header inline do `App.vue`
- [ ] Aplicar z-index correto: `z-30`
- [ ] Substituir `backdrop-blur-2xl` por `backdrop-blur-sm` + `bg-background/80`
- [ ] Estrutura do header: `[Logo] ——— [Barra de Busca] ——— [Ações]`
- [ ] Slot para logo no canto esquerdo: aceitar `<img>` ou componente SVG
- [ ] Placeholder de logo: retângulo `w-32 h-8 bg-muted rounded` até asset definitivo ser fornecido
- [ ] Campo de busca: usar componente `<Input>` da Fase 2 com ícone `Search` do Lucide
- [ ] Atalho CTRL+K: manter funcionalidade, migrar lógica para `useSearch` composable
- [ ] Ações do header (AI tools, PWA refresh): refatorar com `<Button variant="ghost" size="icon">`
- [ ] Badge de atualização PWA: usar `<Badge variant="destructive">` sem `animate-bounce`
- [ ] Remover `border-brand-500` do header — substituir por `border-b border-border`

### 3.4 — `AppLayout.vue`

- [ ] Criar `src/components/layout/AppLayout.vue`
- [ ] Estrutura: `<AppSidebar>` + `<div class="flex-1">` com `<AppHeader>` + `<main slot>`
- [ ] Garantir que `<AppSidebar>` e `<AppHeader>` são estáticos — apenas `<slot>` (main) muda ao navegar
- [ ] CSS do layout: `display: flex; height: 100vh; overflow: hidden`
- [ ] Main content: `overflow-y: auto` (scroll apenas no conteúdo, não na página inteira)
- [ ] Aplicar `padding-top` no main para compensar header sticky
- [ ] Testar: trocar seção ativa várias vezes — sidebar e header NÃO devem piscar ou recarregar

### 3.5 — `App.vue` (Limpeza Final)

- [ ] Reduzir `App.vue` ao mínimo: apenas monta `<AppLayout>` e passa a seção ativa como prop/slot
- [ ] Remover todos os imports de seções de dentro do `App.vue` — eles passam a viver no `AppLayout` ou em um router
- [ ] Mover estado `activeSection` para um composable ou prop do `AppLayout`
- [ ] Validar hierarquia de z-index completa com DevTools (inspecionar cada camada)

---

## Fase 4 · Refatoração das Views (Seções de Conteúdo)

> Objetivo: Substituir gradualmente os componentes de seção pelos novos primitivos UI.
> Ordem: começar pelas seções mais simples, terminar nas mais complexas.
> Validar cada seção individualmente antes de avançar para a próxima.

### 4.1 — Ferramentas.vue *(mais simples — sem modais)*

- [ ] Substituir cards manuais pelo componente `<Card>` + `<CardContent>`
- [ ] Substituir botões de link por `<Button variant="outline">`
- [ ] Substituir ícones FA por Lucide equivalentes
- [ ] Validar visual em dark e light mode

### 4.2 — Downloads.vue *(simples — sem modais)*

- [ ] Substituir card do banner por `<Card>`
- [ ] Substituir botões de cópia por `<Button size="icon" variant="ghost">` com ícone `Copy`
- [ ] Validar visual em dark e light mode

### 4.3 — Ambientes.vue

- [ ] Substituir cards de ambiente por `<Card>`
- [ ] Substituir badges de categoria (Lab, Prod, etc.) por `<Badge variant="*">`
- [ ] Substituir tooltips copy-paste pelo componente `<Tooltip>`
- [ ] Remover drop-shadow do logo (feito na Fase 1.3)
- [ ] Validar visual em dark e light mode

### 4.4 — Softwares.vue

- [ ] Substituir cards por `<Card>`
- [ ] Substituir badge "VERSÃO ANTIGA" por `<Badge variant="destructive">`
- [ ] Substituir tooltips copy-paste pelo componente `<Tooltip>`
- [ ] Substituir botões de download/abrir por `<Button>`
- [ ] Validar visual em dark e light mode

### 4.5 — Contatos.vue

- [ ] Substituir blocos colapsáveis manuais por padrão consistente com `<details>` ou `<Card>` expansível
- [ ] Substituir `border-l-4 border-l-blue-500` hardcoded por `border-l-4 border-l-primary`
- [ ] Substituir botões de contato (tel, whatsapp, email) por `<Button variant="outline" size="sm">`
- [ ] Substituir ícones FA por Lucide
- [ ] Validar visual em dark e light mode

### 4.6 — Manuais.vue

- [ ] Substituir cards de manual por `<Card>`
- [ ] Substituir indicadores de validade (verde/laranja/vermelho) por `<Badge variant="*">` dinâmico
- [ ] Remover `animate-pulse` de datas expirando — substituir por `<Badge variant="warning">` estático
- [ ] Substituir botões de abrir/copiar por `<Button>`
- [ ] Validar visual em dark e light mode

### 4.7 — CodigosRetorno.vue

- [ ] Substituir sistema de tabs manual pelo componente `<Tabs>` da Fase 2
- [ ] Substituir cabeçalho da tabela sticky por `<Table>` padronizado
- [ ] Validar que sticky header da tabela ainda funciona após a troca
- [ ] Validar visual em dark e light mode

### 4.8 — MCCs.vue

- [ ] Substituir tabela por `<Table>` padronizado
- [ ] Substituir badge `text-emerald-700` por `<Badge variant="success">`
- [ ] Validar visual em dark e light mode

### 4.9 — Parametros.vue

- [ ] Substituir cabeçalho `text-pink-600` hardcoded por `text-foreground` ou `text-primary`
- [ ] Substituir badges de categoria (Boleto, Mód. Usuário, etc.) por `<Badge variant="secondary">`
- [ ] Substituir `<details>` por padrão consistente com `<Card>` expansível
- [ ] Validar visual em dark e light mode

### 4.10 — BaseConhecimento.vue

- [ ] Auditar todos os blocos coloridos (vermelho = perigo, azul = info, etc.) — padronizar com componente `<Alert>` ou `<Card>` com variant semântico
- [ ] Substituir blocos de código copiável com `<pre>` estilizado padronizado + `<Button size="icon">`
- [ ] Substituir `TutorialCard.vue` interno por `<Card>` expansível com o novo padrão
- [ ] Validar visual em dark e light mode

### 4.11 — CentralDocumentos.vue *(alta prioridade de bug)*

- [ ] **Bug fix imediato:** corrigir z-index do botão de recusa de documento para garantir que o texto não é coberto pelo X
- [ ] Substituir cards de documento por `<Card>`
- [ ] Remover gradientes `bg-gradient-to-l` dos cards — substituir por borda colorida lateral `border-l-4`
- [ ] Substituir botões de download/recusa por `<Button variant="outline">` e `<Button variant="destructive">`
- [ ] Validar que o `<Dialog>` de confirmação (se houver) usa o componente da Fase 2
- [ ] Validar visual em dark e light mode

### 4.12 — Scratchpad.vue

- [ ] Migrar popup para usar composable `useLocalStorage` para persistência
- [ ] Substituir botões por `<Button>`
- [ ] Padronizar z-index do popup para `z-40` (nova hierarquia)
- [ ] Validar visual em dark e light mode

### 4.13 — Lembretes.vue

- [ ] Migrar para `useLocalStorage` composable
- [ ] Substituir popup por estrutura com z-index `z-40`
- [ ] Substituir badge de notificação por `<Badge variant="destructive">` estático (sem animate-bounce)
- [ ] Substituir `animate-ping` no dot por dot estático ou pulse sutil via CSS
- [ ] Substituir banner de permissão de notificação por `<Card>` informativo
- [ ] Validar visual em dark e light mode

---

## Fase 5 · Finalização e Limpeza

> Objetivo: Remover todas as dependências legadas e validar o sistema completo.

### 5.1 — Remoção do FontAwesome

- [ ] Confirmar que todos os ícones FA foram substituídos por Lucide em todos os arquivos
- [ ] Remover `<link rel="stylesheet">` do FontAwesome no `index.html`
- [ ] Buscar por qualquer classe `fa-`, `fas `, `far `, `fab ` remanescente com grep e corrigir
- [ ] Validar build sem erros

### 5.2 — Limpeza de Classes Hardcoded

- [ ] Auditar todos os arquivos em `sections/` buscando por cores hardcoded que deveriam usar variáveis (ex: `text-slate-*`, `bg-slate-*`, `text-brand-*`)
- [ ] Substituir `text-slate-*` por `text-foreground` ou `text-muted-foreground` onde aplicável
- [ ] Substituir `bg-slate-*` por `bg-background`, `bg-card` ou `bg-muted` onde aplicável
- [ ] Substituir `border-slate-*` por `border-border` onde aplicável
- [ ] Substituir `text-brand-*` residuais por `text-primary`
- [ ] Substituir `bg-brand-*` residuais por `bg-primary`

### 5.3 — Auditoria Final de Z-Index

- [ ] Abrir DevTools e inspecionar o stacking context de cada overlay
- [ ] Confirmar hierarquia: base(z-0) → cards(z-10) → sidebar(z-20) → header(z-30) → popups(z-40) → tooltips(z-50) → dialog overlay(z-60) → dialog content(z-70) → snake(z-[9999])
- [ ] Testar especificamente: abrir Scratchpad com header visível — popup deve estar acima do header
- [ ] Testar especificamente: tooltip da sidebar deve aparecer acima do header
- [ ] Testar especificamente: Dialog/modal deve cobrir tudo exceto o SnakeWidget
- [ ] Testar o bug "Recusar Documento" — confirmar resolvido

### 5.4 — Validação de Dark/Light Mode

- [ ] Percorrer todas as seções em dark mode: verificar contraste e ausência de elementos quebrados
- [ ] Percorrer todas as seções em light mode: verificar o mesmo
- [ ] Testar toggle de tema: interface não deve piscar ou perder estado ao alternar
- [ ] Confirmar que a preferência é persistida após F5

### 5.5 — Validação de Responsividade

- [ ] Testar em viewport 1280px (desktop padrão)
- [ ] Testar em viewport 1024px (laptop)
- [ ] Testar em viewport 768px (tablet) — sidebar colapsa corretamente?
- [ ] Verificar se SnakeWidget não cobre conteúdo importante em telas menores

### 5.6 — Build Final e PWA

- [ ] Rodar `npm run build` sem erros ou warnings críticos
- [ ] Validar PWA: service worker atualiza corretamente com o novo código
- [ ] Limpar cache do browser e validar carregamento fresh
- [ ] Confirmar versão do app no footer da sidebar reflete a refatoração

---

## Referência Rápida

### Hierarquia de Z-Index

| z-index | Uso |
|---------|-----|
| `z-0` | Conteúdo base |
| `z-10` | Cards em hover, sticky table head |
| `z-20` | Sidebar (container) |
| `z-30` | Header (sticky) |
| `z-40` | Popups flutuantes (Scratchpad, Lembretes) |
| `z-50` | Tooltips |
| `z-60` | Dialog — overlay escuro |
| `z-70` | Dialog — conteúdo (acima do overlay) |
| `z-[9999]` | SnakeWidget (easter egg isolado) |

### CSS Variables — Mapeamento de Classes

| Classe antiga | Substituto semântico |
|--------------|---------------------|
| `bg-slate-50` / `bg-white` | `bg-background` |
| `bg-slate-800/900` | `bg-card` |
| `text-slate-900` | `text-foreground` |
| `text-slate-500` | `text-muted-foreground` |
| `border-slate-200` | `border-border` |
| `bg-brand-500` | `bg-primary` |
| `text-brand-500` | `text-primary` |

### Paleta Zinc — Referência

| Token | Light | Dark |
|-------|-------|------|
| background | `zinc-50` / white | `zinc-950` |
| card | white | `zinc-900` |
| border | `zinc-200` | `zinc-800` |
| muted | `zinc-100` | `zinc-800` |
| muted-foreground | `zinc-500` | `zinc-400` |

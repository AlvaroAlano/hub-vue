<template>
  <section
    id="contatos"
    data-search-keywords="contato contatos telefone email ramal parceiro cliente associacao prestador fornecedor"
  >
    <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
      <BookUser class="w-5 h-5 text-brand-600" /> Diretório de Contatos
    </h2>
    
    <h3 class="text-sm font-bold text-muted-foreground uppercase mb-3">Parceiros & Sistemas</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <div class="searchable-item p-4 bg-card border border-border rounded-xl flex flex-col gap-2 shadow-sm border-l-4 border-l-blue-500">
        <span class="font-bold text-foreground">Ramal TRIER</span>
        <div class="flex items-center justify-between bg-muted p-2 rounded border border-border">
          <span class="font-mono text-sm text-foreground">*11001</span>
          <button @click="copyText($event, '*11001')" class="text-muted-foreground hover:text-primary"><Copy class="w-3 h-3" /></button>
        </div>
      </div>
      <div class="searchable-item p-4 bg-card border border-border rounded-xl flex flex-col gap-2 shadow-sm">
        <span class="font-bold text-foreground">Logtec</span>
        <div class="flex items-center justify-between bg-muted p-2 rounded border border-border">
          <span class="font-mono text-sm text-foreground">(48) 3658-9860</span>
          <button @click="copyText($event, '4836589860')" class="text-muted-foreground hover:text-primary"><Copy class="w-3 h-3" /></button>
        </div>
      </div>
      <div class="searchable-item p-4 bg-card border border-border rounded-xl flex flex-col gap-2 shadow-sm">
        <span class="font-bold text-foreground">Convcard (Geral)</span>
        <div class="flex items-center justify-between bg-muted p-2 rounded border border-border">
          <span class="font-mono text-sm text-foreground">(48) 3658-9820</span>
          <button @click="copyText($event, '4836589820')" class="text-muted-foreground hover:text-primary"><Copy class="w-3 h-3" /></button>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
      <h3 class="text-sm font-bold text-muted-foreground uppercase">Clientes & Associações</h3>
      <div class="relative w-full md:w-72">
        <Search class="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
        <input v-model="searchQuery" type="text" placeholder="Buscar por Sigla ou Cidade..." class="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground">
      </div>
    </div>

    <div id="associations-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 items-start">
      <details v-for="(assoc, index) in displayedAssociations" :key="index" :open="searchQuery.length > 1" class="searchable-item group bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-muted transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300 flex items-center justify-center font-bold flex-shrink-0">
              <Handshake class="w-4 h-4" />
            </div>
            <div class="overflow-hidden">
              <h4 class="font-bold text-foreground text-sm truncate pr-4">{{ assoc.name }} {{ assoc.city }}</h4>
              <p class="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">CNPJ: {{ assoc.cnpj }}</p>
            </div>
          </div>
          <ChevronDown class="w-3 h-3 text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0" />
        </summary>
        <div class="p-4 border-t border-border bg-muted/50 text-sm space-y-4">
          <div class="space-y-2" v-if="assoc.tel || assoc.wpp || assoc.com">
            <strong class="text-foreground text-[10px] uppercase tracking-wider flex items-center gap-1"><Phone class="w-3 h-3 text-muted-foreground" /> Telefones & Contatos</strong>
            <div class="grid grid-cols-1 gap-2">
              <div v-if="assoc.tel" class="flex items-center justify-between bg-card p-2 rounded border border-border">
                <span class="text-[10px] text-muted-foreground font-medium">Associação</span>
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs">{{ assoc.tel }}</span>
                  <button @click="copyText($event, cleanText(assoc.tel))" class="text-muted-foreground hover:text-primary"><Copy class="w-3 h-3" /></button>
                </div>
              </div>
              <div v-if="assoc.wpp" class="flex items-center justify-between bg-card p-2 rounded border border-border">
                <span class="text-[10px] text-muted-foreground font-medium">WhatsApp Sup.</span>
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs">{{ assoc.wpp }}</span>
                  <button @click="copyText($event, cleanText(assoc.wpp))" class="text-muted-foreground hover:text-green-500">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </button>
                </div>
              </div>
              <div v-if="assoc.com" class="flex items-center justify-between bg-card p-2 rounded border border-border">
                <span class="text-[10px] text-muted-foreground font-medium">Comercial Util</span>
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs">{{ assoc.com }}</span>
                  <button @click="copyText($event, cleanText(assoc.com))" class="text-muted-foreground hover:text-primary"><Copy class="w-3 h-3" /></button>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-2" v-if="assoc.fin || assoc.emsup || assoc.adic">
            <strong class="text-foreground text-[10px] uppercase tracking-wider flex items-center gap-1"><Mail class="w-3 h-3 text-muted-foreground" /> E-mails</strong>
            <div class="grid grid-cols-1 gap-2">
              <div v-if="assoc.fin" class="flex items-center justify-between bg-card p-2 rounded border border-border gap-2">
                <span class="text-[10px] text-muted-foreground font-medium w-16 flex-shrink-0">Financeiro</span>
                <span class="font-mono text-[10px] truncate text-right flex-1" :title="assoc.fin">{{ assoc.fin }}</span>
                <button @click="copyText($event, assoc.fin)" class="text-muted-foreground hover:text-primary flex-shrink-0"><Copy class="w-3 h-3" /></button>
              </div>
              <div v-if="assoc.emsup" class="flex items-center justify-between bg-card p-2 rounded border border-border gap-2">
                <span class="text-[10px] text-muted-foreground font-medium w-16 flex-shrink-0">Suporte</span>
                <span class="font-mono text-[10px] truncate text-right flex-1" :title="assoc.emsup">{{ assoc.emsup }}</span>
                <button @click="copyText($event, assoc.emsup)" class="text-muted-foreground hover:text-primary flex-shrink-0"><Copy class="w-3 h-3" /></button>
              </div>
              <div v-if="assoc.adic" class="flex items-center justify-between bg-card p-2 rounded border border-border gap-2">
                <span class="text-[10px] text-muted-foreground font-medium w-16 flex-shrink-0">Outros</span>
                <span class="font-mono text-[10px] truncate text-right flex-1" :title="assoc.adic">{{ assoc.adic }}</span>
                <button @click="copyText($event, assoc.adic)" class="text-muted-foreground hover:text-primary flex-shrink-0"><Copy class="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>

    <div class="flex justify-center mb-10" v-if="searchQuery.length === 0 && associations.length > itemsLimit">
      <button 
        @click="showAll = !showAll" 
        class="px-6 py-2.5 rounded-full border border-border bg-card text-foreground hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all font-medium text-sm flex items-center gap-2 group"
      >
        <span v-if="!showAll">Mostrar mais associados ({{ associations.length - itemsLimit }})</span>
        <span v-else>Mostrar menos</span>
        <ChevronUp v-if="showAll" class="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
        <ChevronDown v-else class="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
      </button>
    </div>

    <h3 class="text-sm font-bold text-muted-foreground uppercase mb-3 mt-4">Prestadores de Serviço</h3>
    <div class="space-y-3">
      
      <details class="searchable-item group bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-muted transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold">F</div>
            <div>
              <h4 class="font-bold text-foreground text-sm">FISERV / SOFTWARE HOUSE</h4>
              <p class="text-xs text-muted-foreground">Integração TEF e automações.</p>
            </div>
          </div>
          <ChevronDown class="w-3 h-3 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div class="p-4 border-t border-border bg-muted/50 text-sm text-foreground space-y-4">
          <div><strong class="text-foreground block mb-1">Quando acionar:</strong>
            <p>Problemas na integração com TEF, vendas não processando.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-card p-3 rounded border border-border">
              <strong class="block mb-2 text-orange-600">Command Center (24h)</strong>
              <p>Pedro Henrique Mello Duarte</p>
              <p class="font-mono text-xs mt-1">011 3631-1458</p>
              <p class="font-mono text-xs">LATAM.CommandCenter.Brasil@fiserv.com</p>
            </div>
            <div class="bg-card p-3 rounded border border-border">
              <strong class="block mb-2 text-blue-600">Comercial</strong>
              <p>Jonatas Ramos Junior</p>
              <p class="font-mono text-xs mt-1">011 97693-7027</p>
              <p class="font-mono text-xs">jonatas.ramosjunior@Fiserv.com</p>
            </div>
          </div>
        </div>
      </details>

      <details class="searchable-item group bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-muted transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-pink-100 text-pink-600 flex items-center justify-center font-bold">L</div>
            <div>
              <h4 class="font-bold text-foreground text-sm">LINX / DTEF</h4>
              <p class="text-xs text-muted-foreground">Solução DTEF e automações.</p>
            </div>
          </div>
          <ChevronDown class="w-3 h-3 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div class="p-4 border-t border-border bg-muted/50 text-sm text-foreground space-y-4">
          <div><strong class="text-foreground block mb-1">Quando acionar:</strong>
            <p>Falhas em vendas via DTEF, erros de integração.</p>
          </div>
          <ul class="space-y-2">
            <li class="flex flex-col"><span class="font-bold">Vinicius Pirola (Suporte):</span><span class="font-mono text-xs">011 99161-0915 | vinicius.campos@linx.com.br</span></li>
            <li class="flex flex-col"><span class="font-bold">Felipe Bizari (Rede/VPN):</span> <span class="font-mono text-xs">011 94550-9733 | felipe.bizari@linx.com.br</span></li>
            <li class="flex flex-col"><span class="font-bold">Luiz Camargo (Coord. VPN):</span><span class="font-mono text-xs">011 99119-2873 | luiz.camargo@linx.com.br</span></li>
          </ul>
        </div>
      </details>

      <details class="searchable-item group bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-muted transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold">T</div>
            <div>
              <h4 class="font-bold text-foreground text-sm">TOPMED (Telemedicina)</h4>
              <p class="text-xs text-muted-foreground">Integração API, Webhooks e Atendimento.</p>
            </div>
          </div>
          <ChevronDown class="w-3 h-3 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div class="p-4 border-t border-border bg-muted/50 text-sm text-foreground space-y-4">
          <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-100 dark:border-red-900/30">
            <strong class="text-red-700 dark:text-red-400 text-xs block mb-1">Checklist Obrigatório (TI):</strong>
            <p class="text-xs">CNPJ/ID, Endpoint, Horário (UTC-3), Status Code, Logs/Print.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong class="block mb-1 text-foreground">TI / Integrações</strong>
              <p class="font-mono text-xs">ti.topmed@topmed.com.br</p>
              <p class="font-mono text-xs">048 3964-8143</p>
            </div>
            <div><strong class="block mb-1 text-foreground">Customer Success</strong>
              <p class="font-mono text-xs">cs@topmed.com.br</p>
              <p class="font-mono text-xs">048 99185-8948</p>
            </div>
          </div>
        </div>
      </details>

      <details class="searchable-item group bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-muted transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center font-bold">R</div>
            <div>
              <h4 class="font-bold text-foreground text-sm">RV Recargas</h4>
              <p class="text-xs text-muted-foreground">Recargas de celular e pré-pagos.</p>
            </div>
          </div>
          <ChevronDown class="w-3 h-3 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div class="p-4 border-t border-border bg-muted/50 text-sm text-foreground">
          <ul class="space-y-2 font-mono text-xs">
            <li>Marlon (Comercial): 051 98184-1692</li>
            <li>Christian (Suporte): 031 99754-8028</li>
            <li>Davidson (Suporte DSC): 031 99696-6997</li>
          </ul>
        </div>
      </details>

      <details class="searchable-item group bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-muted transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold">E</div>
            <div>
              <h4 class="font-bold text-foreground text-sm">ELO / CIELO (Resomaq)</h4>
              <p class="text-xs text-muted-foreground">Maquininhas e Processamento.</p>
            </div>
          </div>
          <ChevronDown class="w-3 h-3 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div class="p-4 border-t border-border bg-muted/50 text-sm text-foreground space-y-4">
          <div><strong class="text-foreground block mb-2 text-xs uppercase font-bold tracking-wider">Contatos Diretos</strong>
            <ul class="space-y-1 font-mono text-xs">
              <li>Vinicius (Proprietário): 011 99906-4812</li>
              <li>Gilberto Jr (Dev): 011 97200-2481</li>
              <li>Matheus Flores (Dev): 011 99606-4553</li>
            </ul>
          </div>
          <div class="h-px bg-border"></div>
          <div><strong class="text-foreground block mb-2 text-xs uppercase font-bold tracking-wider">Sistema de Chamados</strong>
            <div class="bg-card p-3 rounded border border-border">
              <p class="text-xs mb-2 font-medium">Passo a passo para acessar o TomTicket:</p>
              <ol class="list-decimal list-inside text-xs space-y-2 mb-3 text-foreground">
                <li>Acesse o link: <a href="https://resomaq.tomticket.com/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 font-bold hover:underline inline-flex items-center gap-1">resomaq.tomticket.com <ExternalLink class="w-3 h-3" /></a></li>
                <li>Clique na opção <strong>"Recuperar senha"</strong>.</li>
                <li>Informe o e-mail cadastrado e clique no botão para confirmar.</li>
                <li>Acesse seu e-mail e realize o recadastramento da senha.</li>
              </ol>
              <div class="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-[11px] text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-900/30 flex gap-2">
                <Info class="w-3 h-3 mt-0.5 flex-shrink-0" /><span>Após estes passos, basta acessar a plataforma e criar os chamados quando necessário. Estamos à disposição.</span>
              </div>
            </div>
          </div>
        </div>
      </details>

      <details class="searchable-item group bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <summary class="flex justify-between items-center p-4 cursor-pointer hover:bg-muted transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center font-bold">S</div>
            <div>
              <h4 class="font-bold text-foreground text-sm">SICREDI (PIX)</h4>
              <p class="text-xs text-muted-foreground">Falhas no QR Code ou processamento.</p>
            </div>
          </div>
          <ChevronDown class="w-3 h-3 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div class="p-4 border-t border-border bg-muted/50 text-sm text-foreground">
          <p class="mb-2"><strong>Suporte Dedicado:</strong> Maria Eduarda Baldisserra</p>
          <div class="flex items-center justify-between bg-card p-2 rounded border border-border">
            <span class="font-mono text-xs">051 9832-0012</span>
            <button @click="copyText($event, '05198320012')" class="text-muted-foreground hover:text-primary"><Copy class="w-3 h-3" /></button>
          </div>
        </div>
      </details>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BookUser, ChevronDown, ChevronUp, Copy, ExternalLink, Handshake, Info, Mail, Phone, Search } from '@lucide/vue'
import { copyText } from '../../utils'

// Variáveis reativas
const searchQuery = ref('')
const showAll = ref(false)
const itemsLimit = 6 // Mostra 6 (2 linhas) por padrão

const cleanText = (str) => str ? str.replace(/[^a-zA-Z0-9@.-]/g, '') : ''

// A Tabela Completa de Clientes
const associations = [
  { name: "Conviva", city: "", cnpj: "N/A", tel: "85 3214-4000", wpp: "", com: "", fin: "", adic: "", emsup: "" },
  { name: "FACISC", city: "Florianópolis", cnpj: "78.354.636/0001-29", tel: "48 3952-8844", wpp: "", com: "", fin: "", adic: "", emsup: "" },
  { name: "Convnet (Masterfarma)", city: "Criciúma", cnpj: "08.233.054/0001-09", tel: "48 3437-7363", wpp: "", com: "", fin: "", adic: "", emsup: "" },
  { name: "100% Trabalhador", city: "", cnpj: "N/A", tel: "48 9916-8635", wpp: "", com: "", fin: "", adic: "", emsup: "" },
  { name: "Sindicato Mineiros", city: "", cnpj: "N/A", tel: "48 3433-2459", wpp: "", com: "", fin: "", adic: "", emsup: "" },
  { name: "Facer", city: "", cnpj: "15.884.091/0001-42", tel: "69 3229-8957", wpp: "", com: "", fin: "", adic: "", emsup: "" },
  { name: "ACIBr", city: "Brusque", cnpj: "82.991.126/0001-30", tel: "47 3351-1339", wpp: "47 98456-0325", com: "47 3351-1339", fin: "financeiro@acibr.org.br", adic: "comercial2@acibr.org.br", emsup: "comercial2@acibr.org.br" },
  { name: "ACIJS", city: "Jaraguá do Sul", cnpj: "84.434.372/0001-16", tel: "47 3275-7010", wpp: "47 98835-8568", com: "47 98835-8568", fin: "financeiro@acijs.com.br", adic: "relacionamento@acijs.com.br", emsup: "convenios@acijs.com.br" },
  { name: "ACIC", city: "Caçador", cnpj: "83.059.667/0001-97", tel: "49 3563-1116", wpp: "49 99154-7202", com: "49 99191-3807", fin: "financeiro@portalacic.com.br", adic: "contato@portalacic.com.br", emsup: "comercial@portalacic.com.br" },
  { name: "ACIVALE", city: "Braço do Norte", cnpj: "73.687.139/0001-29", tel: "48 3658-3679", wpp: "48 99983-0350", com: "48 99983-0350", fin: "secretaria@acivale.com.br", adic: "", emsup: "acivale.com@gmail.com" },
  { name: "ACIBIG", city: "Biguaçu", cnpj: "80.152.192/0001-90", tel: "48 3243-4212", wpp: "48 99602-6284", com: "48 99672-0059", fin: "financeiro@acibig.com.br", adic: "administrativo@acibig.com.br", emsup: "solucoesempresariais.acibigcdl@gmail.com" },
  { name: "ACIM", city: "Mafra", cnpj: "82.745.225/0001-31", tel: "47 3642-5367", wpp: "47 98421-5979", com: "47 98421-5979", fin: "financeiro@acimafra.com.br", adic: "executiva@acimafra.com.br", emsup: "administrativo2@acimafra.com.br" },
  { name: "ACIC", city: "Criciúma", cnpj: "83.663.203/0001-95", tel: "48 3461-0900", wpp: "48 99917-1401", com: "48 3461-1006", fin: "financeiro@acicri.com.br", adic: "cartao@acicri.com.br", emsup: "cartao@acicri.com.br" },
  { name: "ACIAS", city: "Schroeder", cnpj: "00.835.401/0001-61", tel: "47 99682-0555", wpp: "47 99682-0555", com: "47 99682-0555", fin: "financeiro@acias.net", adic: "acias@acias.net", emsup: "comercial@acias.net" },
  { name: "ACIAF", city: "Fraiburgo", cnpj: "00.543.237/0001-19", tel: "49 3246-3576", wpp: "49 3246-3576", com: "49 98836-6930", fin: "administrativo@aciaf.com.br", adic: "comercial@aciaf.com.br", emsup: "comercial@aciaf.com.br" },
  { name: "ACIG", city: "Gaspar", cnpj: "83.779.645/0001-00", tel: "47 3332-1371", wpp: "47 92000-9118", com: "47 9264-8702", fin: "financeiro@acigweb.com.br", adic: "contato@acigweb.com.br", emsup: "comercial@acigweb.com.br" },
  { name: "AEMB", city: "Bombinhas", cnpj: "04.803.923/0001-32", tel: "47 3393-6977", wpp: "47 99604-8237", com: "47 99604-8237", fin: "aemb.bombinhas@gmail.com", adic: "", emsup: "aemb.bombinhas@gmail.com" },
  { name: "ACIVA", city: "Vargeão", cnpj: "00.701.234/0001-66", tel: "49 3430-0397", wpp: "49 99926-9432", com: "49 99926-9432", fin: "acivana@hotmail.com", adic: "", emsup: "acivana@hotmail.com" },
  { name: "ACIF", city: "Forquilhinha", cnpj: "19.747.304/0001-45", tel: "48 99839-7880", wpp: "48 99670-0705", com: "48 99670-0705", fin: "aciforquilhinha@aciforquilhinha.org.br", adic: "acifcomercial2014@gmail.com", emsup: "acifcomercial2014@gmail.com" },
  { name: "APEME", city: "Garibaldi", cnpj: "00.808.377/0001-71", tel: "54 3462-2755", wpp: "54 99175-3680", com: "54 99175-3680", fin: "financeiro@apeme.com.br", adic: "convenios2@apeme.com.br", emsup: "convenios2@apeme.com.br" },
  { name: "ACIAM", city: "Massaranduba", cnpj: "83.785.394/0001-68", tel: "47 3379-1151", wpp: "47 3379-1151", com: "47 3379-1151", fin: "financeiro@aciam.net.br", adic: "comercial@aciam.net.br", emsup: "financeiro@aciam.net.br" },
  { name: "ACIIO", city: "Iporã do Oeste", cnpj: "80.629.066/0001-84", tel: "49 3634-1298", wpp: "49 3634-1298", com: "49 3634-1298", fin: "ipora@facisc.org.br", adic: "comercialaciiocdl@hotmail.com", emsup: "comercialaciiocdl@hotmail.com" },
  { name: "ASSEMIT", city: "Itapiranga", cnpj: "05.220.978/0001-82", tel: "49 3677-0123", wpp: "49 3677-0123", com: "49 3677-0123", fin: "assemit@assemit.com.br", adic: "assemit2@assemit.com.br", emsup: "assemit2@assemit.com.br" },
  { name: "ACII", city: "Itajaí", cnpj: "84.301.431/0001-88", tel: "47 3247-5500", wpp: "47 98408-8749", com: "47 98408-8749", fin: "financeiro@acii.com.br", adic: "gerencia@acii.com.br", emsup: "atendimento@acii.com.br" },
  { name: "ACIT", city: "Tubarão", cnpj: "86.445.657/0001-88", tel: "48 3626-6222", wpp: "48 9181-7967", com: "48 3626-6222", fin: "financas@acittubarao.com.br", adic: "secretaria@acittubarao.com.br", emsup: "vendas@acittubarao.com.br" },
  { name: "ACIAC", city: "Corupá", cnpj: "83.785.295/0001-86", tel: "47 3375-2100", wpp: "47 98445-3896", com: "47 98445-3896", fin: "financeiro@aciaccorupa.com.br", adic: "aciac@aciaccorupa.com.br", emsup: "aciac@aciaccorupa.com.br" },
  { name: "ACICE", city: "Campo Erê", cnpj: "04.192.299/0001-84", tel: "49 9911-4167", wpp: "49 9911-4167", com: "49 9911-4167", fin: "aciceassociacaocomercial@gmail.com", adic: "", emsup: "aciceassociacaocomercial@gmail.com" },
  { name: "ACIS", city: "Seara", cnpj: "80.633.746/0001-71", tel: "49 3452-1647", wpp: "49 98435-4590", com: "49 99826-6105", fin: "financeiro-acis@hotmail.com", adic: "executivoacis@gmail.com", emsup: "executivo.acis-seara@hotmail.com" },
  { name: "ACIMVI", city: "Timbó", cnpj: "82.933.698/0001-62", tel: "47 3382-0424", wpp: "47 99268-6145", com: "47 99268-6145", fin: "fernando@acimvi.com.br", adic: "contato@acimvi.com.br", emsup: "fernando@acimvi.com.br" },
  { name: "ACID", city: "Descanso", cnpj: "05.029.099/0001-78", tel: "49 3623-0435", wpp: "48 99624-1314", com: "48 99624-1314", fin: "descanso@facisc.org.br", adic: "executivo@descanso.cdl-sc.org.br", emsup: "utilcard@facisc.org.br" },
  { name: "ACIACA", city: "Campo Alegre", cnpj: "79.367.017/0001-31", tel: "47 3632-2193", wpp: "47 98456-0464", com: "47 98456-0464", fin: "aciaca@aciaca.org.br", adic: "", emsup: "aciaca@aciaca.org.br" },
  { name: "ACIC", city: "Chapecó", cnpj: "83.312.215/0001-75", tel: "49 3321-2800", wpp: "49 98879-9265", com: "49 98879-9265", fin: "financeiro@acichapeco.com.br", adic: "coordenador.fin@acichapeco.com.br", emsup: "suportecomercial@acichapeco.com.br" },
  { name: "ACISLO", city: "São Lourenço", cnpj: "75.433.946/0001-40", tel: "49 3344-1315", wpp: "49 99955-3154", com: "49 3344-1315", fin: "financeiro@acislo.com.br", adic: "executivo@acislo.com.br", emsup: "comercial1@acislo.com.br" },
  { name: "ACIO", city: "Orleans", cnpj: "80.166.168/0001-00", tel: "48 3466-2592", wpp: "48 3466-2592", com: "48 3466-2592", fin: "financeiro@acio.com.br", adic: "orleansacio@gmail.com", emsup: "administrativo@acio.com.br" },
  { name: "ACIU", city: "Urussanga", cnpj: "83.280.214/0001-96", tel: "48 3465-1657", wpp: "48 99645-8580", com: "48 99645-8580", fin: "aciur@engeplus.com.br", adic: "aciu@aciur.com.br", emsup: "aciur@engeplus.com.br" },
  { name: "ACIRP", city: "Capinzal", cnpj: "00.873.928/0001-80", tel: "49 3555-2692", wpp: "49 99819-7695", com: "49 99819-7695", fin: "financeiro@acirp.org.br", adic: "acirpcomercial@gmail.com", emsup: "acirpcomercial@gmail.com" },
  { name: "ACIC", city: "Canoinhas", cnpj: "83.193.987/0001-35", tel: "47 3622-4482", wpp: "47 99764-0370", com: "47 99764-0370", fin: "financeiro@acicanoinhas.com.br", adic: "administrativo@acicanoinhas.com.br", emsup: "atendimento@acicanoinhas.com.br" },
  { name: "ACIM", city: "Mondaí", cnpj: "83.426.163/0001-68", tel: "49 3674-0133", wpp: "48 99624-1314", com: "48 99171-1857", fin: "cdlacimmd@gmail.com", adic: "acimcdlmondai@gmail.com", emsup: "utilcard@facisc.org.br" },
  { name: "ACIN", city: "Navegantes", cnpj: "72.318.090/0001-74", tel: "47 3342-2037", wpp: "47 99142-1300", com: "47 99142-1300", fin: "financeiro@acin.com.br", adic: "atendimento@acin.com.br", emsup: "comercial@acin.com.br" },
  { name: "ACISA-CP", city: "Cunha Porã", cnpj: "06.922.737/0001-48", tel: "49 99100-5939", wpp: "49 99100-5939", com: "49 99100-5939", fin: "acisacp@gmail.com", adic: "certificadodigitalcp@gmail.com", emsup: "acisacp@gmail.com" },
  { name: "ACIP", city: "Pomerode", cnpj: "83.636.399/0001-29", tel: "47 3387-2514", wpp: "47 99905-6129", com: "47 99905-6129", fin: "schirlei@acipomerode.com.br", adic: "", emsup: "schirlei@acipomerode.com.br" },
  { name: "ACIS", city: "Salete", cnpj: "00.284.660/0001-41", tel: "47 3563-0823", wpp: "47 3563-0823", com: "47 3563-0823", fin: "executivo@acisalete.com.br", adic: "", emsup: "executivo@acisalete.com.br" },
  { name: "AEA", city: "Agrolândia", cnpj: "83.455.287/0001-71", tel: "47 3534-4680", wpp: "47 99770-0078", com: "47 9990-0276", fin: "aea@ozt.tec.br", adic: "executiva@aeagrolandia.com.br", emsup: "relacionamento@aeagrolandia.com.br" },
  { name: "ACINE", city: "Nova Erechim", cnpj: "01.041.223/0001-60", tel: "49 98836-9991", wpp: "49 98836-9991", com: "49 98836-9991", fin: "executivo@novaerechim.cdl-sc.org.br", adic: "", emsup: "executivo@novaerechim.cdl-sc.org.br" },
  { name: "ACIAG", city: "Guaramirim", cnpj: "83.784.157/0001-82", tel: "47 3373-7500", wpp: "47 99177-5561", com: "47 99177-5561", fin: "financeiro@aciag.com.br", adic: "solucoes@aciag.com.br", emsup: "solucoes@aciag.com.br" },
  { name: "ACIRCAN", city: "Campos Novos", cnpj: "83.826.958/0001-63", tel: "49 3544-0812", wpp: "49 98829-9596", com: "49 99107-5414", fin: "acircan@acircan.com.br", adic: "executica@acircan.com.br", emsup: "atendimento@acircan.com.br" },
  { name: "CDL", city: "São Carlos", cnpj: "83.425.900/0001-08", tel: "49 93325-4377", wpp: "49 3325-4377", com: "49 93325-4377", fin: "executivo@saocarlos.cdl-sc.org.br", adic: "", emsup: "comercial@saocarlos.cdl-sc.org.br" },
  { name: "ACISMO", city: "S. M. do Oeste", cnpj: "86.251.428/0001-22", tel: "49 99963-4615", wpp: "49 99963-4615", com: "49 99963-4615", fin: "acismo@acismo.com.br", adic: "comercial@acismo.com.br", emsup: "comercial@acismo.com.br" },
  { name: "ACIM", city: "Imbituba", cnpj: "80.987.837/0001-05", tel: "48 3255-1415", wpp: "48 99107-2771", com: "48 99107-2771", fin: "financeiro@acimimbituba.org", adic: "comercial@acimimbituba.org", emsup: "comercial@acimimbituba.org" },
  { name: "ACIQ", city: "Quilombo", cnpj: "01.933.037/0001-35", tel: "49 3346-3129", wpp: "49 92003-9791", com: "49 99980-8371", fin: "aciq.quilombo@hotmail.com", adic: "gestaoaciq@gmail.com", emsup: "aciq.quilombo@hotmail.com" },
  { name: "ACISBS", city: "São Bento do Sul", cnpj: "86.049.301/0001-25", tel: "47 3631-0500", wpp: "47 99787-0755", com: "47 3631-0501", fin: "sabrina@acisbs.org.br", adic: "lilian@acisbs.org.br", emsup: "mayara@acisbs.org.br" },
  { name: "ACIOC", city: "Joaçaba", cnpj: "84.591.858/0001-68", tel: "49 3521-1333", wpp: "49 98808-4126", com: "49 99921-0040", fin: "financeiro@acioc.com.br", adic: "executiva@acioc.com.br", emsup: "administrativo@acioc.com.br" },
  { name: "ACISA", city: "Rolante", cnpj: "05.495.440/0001-80", tel: "51 3547-2423", wpp: "51 98595-4831", com: "51 98595-4831", fin: "atendimento@acisarolante.com.br", adic: "executiva@acisarolante.com.br", emsup: "atendimento@acisarolante.com.br" },
  { name: "ACIPG", city: "Pres. Getúlio", cnpj: "01.361.728/0001-01", tel: "47 3352-2601", wpp: "48 99624-1314", com: "48 99624-1314", fin: "executiva@acipg.com", adic: "acipg@acipg.com", emsup: "utilcard@utilcard.com.br" },
  { name: "ACIL", city: "Laguna", cnpj: "83.711.895/0001-08", tel: "48 99697-6783", wpp: "48 99697-6783", com: "48 99697-6783", fin: "acil.secretaria@gmail.com", adic: "laguna.acil@gmail.com", emsup: "acil.secretaria@gmail.com" },
  { name: "ACISAI", city: "Sto Amaro", cnpj: "02.595.265/0001-05", tel: "48 3245-1844", wpp: "48 99666-8101", com: "48 3245-1844", fin: "executivo@sai.cdl-sc.org.br", adic: "", emsup: "executivo@sai.cdl-sc.org.br" },
  { name: "ACITA", city: "Tangará", cnpj: "76.447.151/0001-91", tel: "49 99907-3352", wpp: "49 99907-3352", com: "49 99907-3352", fin: "acita@acita.net", adic: "acitaboletos@gmail.com", emsup: "acita@acita.net" },
  { name: "ACIX", city: "Xanxerê", cnpj: "83.857.607/0001-10", tel: "49 3433-0420", wpp: "49 98422-6316", com: "49 8422-6316", fin: "financeiro@acix.com.br", adic: "comercial1@acix.com.br", emsup: "comercial1@acix.com.br" },
  { name: "AEI", city: "Itaiópolis", cnpj: "79.357.760/0001-00", tel: "47 3652-2020", wpp: "47 3652-2020", com: "47 3652-2020", fin: "aei_cdl@aeitaiopolis.com.br", adic: "contato@aeitaiopolis.com.br", emsup: "aei_cdl@aeitaiopolis.com.br" },
  { name: "ACIPA", city: "Iraceminha", cnpj: "00.513.896/0001-02", tel: "49 99921-2449", wpp: "49 99921-2449", com: "49 99921-2449", fin: "acipa_iraceminha@hotmail.com", adic: "acipacdliraceminha@gmail.com", emsup: "acipa_iraceminha@hotmail.com" },
  { name: "ACIG", city: "Garopaba", cnpj: "78.625.415/0001-48", tel: "48 99170-4836", wpp: "48 99170-4836", com: "48 99170-4836", fin: "executiva@acigaropaba.com.br", adic: "atendimento@acigaropaba.com.br", emsup: "atendimento@acigaropaba.com.br" }
]

// Filtro Inteligente com Paginação (Mostrar apenas os primeiros se não estiver pesquisando)
const filteredAssociations = computed(() => {
  let result = associations

  // Se tem texto na busca, filtra e mostra TODOS os resultados da busca
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = associations.filter(assoc => 
      assoc.name.toLowerCase().includes(q) || 
      assoc.city.toLowerCase().includes(q) ||
      assoc.cnpj.includes(q)
    )
  }

  return result
})

// Controla a exibição com base no botão "Mostrar Mais"
const displayedAssociations = computed(() => {
  // Se está buscando OU clicou em mostrar todos, não corta a lista
  if (searchQuery.value.length > 0 || showAll.value) {
    return filteredAssociations.value
  }
  // Caso contrário, mostra apenas os primeiros itens
  return filteredAssociations.value.slice(0, itemsLimit)
})

</script>

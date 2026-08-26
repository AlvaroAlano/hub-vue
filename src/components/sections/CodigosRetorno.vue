<template>
  <section
    id="retornos"
    data-search-keywords="codigo codigos retorno retornos erro erros mensagem visor recusa negada transacao"
  >
    <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
      <BugOff class="w-5 h-5 text-red-500" /> Códigos de Retorno
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <a href="./retornos_cardse.xlsx" download class="bg-card border border-border p-4 rounded-xl flex items-center gap-4 hover:border-green-500 hover:shadow-md transition-all group cursor-pointer">
        <div class="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
          <FileSpreadsheet class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-bold text-foreground text-sm">Planilha CardSE</h4>
          <p class="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Download class="w-3 h-3" />Clicar para baixar</p>
        </div>
      </a>

      <a href="./retornos_elo.xlsx" download class="bg-card border border-border p-4 rounded-xl flex items-center gap-4 hover:border-sky-500 hover:shadow-md transition-all group cursor-pointer">
        <div class="w-12 h-12 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
          <FileSpreadsheet class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-bold text-foreground text-sm">Planilha Cartão ELO</h4>
          <p class="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Download class="w-3 h-3" />Clicar para baixar</p>
        </div>
      </a>

      <a href="./retornos_convcard.xls" download class="bg-card border border-border p-4 rounded-xl flex items-center gap-4 hover:border-brand-500 hover:shadow-md transition-all group cursor-pointer">
        <div class="w-12 h-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform flex-shrink-0">
          <Receipt class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-bold text-foreground text-sm">Planilha retornos Convcard</h4>
          <p class="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Download class="w-3 h-3" />Clicar para baixar</p>
        </div>
      </a>
    </div>

    <div class="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      
      <div class="p-4 border-b border-border flex flex-col xl:flex-row gap-4 justify-between items-center bg-muted/50">
        
        <div class="flex p-1 space-x-1 bg-muted rounded-xl w-full xl:w-auto overflow-x-auto">
          <button @click="activeTab = 'convcard'" :class="['px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap', activeTab === 'convcard' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground']">
            Convcard
          </button>
          <button @click="activeTab = 'elo'" :class="['px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap', activeTab === 'elo' ? 'bg-card text-sky-600 shadow-sm' : 'text-muted-foreground hover:text-foreground']">
            Cartão ELO
          </button>
          <button @click="activeTab = 'cardse'" :class="['px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap', activeTab === 'cardse' ? 'bg-card text-green-600 shadow-sm' : 'text-muted-foreground hover:text-foreground']">
            CardSE
          </button>
          <button @click="activeTab = 'pix'" :class="['px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap', activeTab === 'pix' ? 'bg-card text-teal-600 shadow-sm' : 'text-muted-foreground hover:text-foreground']">
            PIX
          </button>
        </div>

        <div class="relative w-full xl:w-96 flex-shrink-0">
          <Search class="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
          <input 
            v-model="searchQuery" 
            type="text" 
            class="w-full pl-10 pr-10 py-2.5 bg-muted border border-border rounded-xl text-sm focus:ring-2 focus:ring-ring outline-none transition-all text-foreground placeholder:text-muted-foreground shadow-inner" 
            placeholder="Buscar por código ou mensagem (ex: 51)..." 
          />
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 top-3 text-muted-foreground hover:text-red-500 transition-colors">
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar scroll-smooth">
        <table class="w-full text-left border-collapse text-sm min-w-[600px]">
          <thead class="sticky top-0 z-10 bg-muted shadow-sm">
            <tr class="text-muted-foreground border-b border-border">
              <th class="py-3 px-6 font-bold w-24 uppercase text-[10px] tracking-wider">Código</th>
              <th class="py-3 px-6 font-bold w-1/3 uppercase text-[10px] tracking-wider">Mensagem</th>
              <th class="py-3 px-6 font-bold uppercase text-[10px] tracking-wider">Detalhes / Ação no Visor</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            
            <tr v-if="filteredCodes.length === 0">
              <td colspan="3" class="py-12 text-center text-muted-foreground">
                <Ghost class="w-8 h-8 mb-3 mx-auto opacity-50" />
                Nenhum código encontrado para "<strong>{{ searchQuery }}</strong>" na aba selecionada.
              </td>
            </tr>

            <tr v-for="item in filteredCodes" :key="item.codigo" class="searchable-item hover:bg-muted/50 transition-colors group">
              <td class="py-3 px-6">
                <span class="font-mono font-bold text-foreground bg-muted px-2 py-1 rounded shadow-sm">{{ item.codigo }}</span>
              </td>
              <td class="py-3 px-6 font-bold text-foreground">
                {{ item.msg }}
              </td>
              <td class="py-3 px-6 text-xs text-muted-foreground leading-relaxed">
                {{ item.detalhes }}
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class="p-3 bg-muted/50 border-t border-border text-xs text-muted-foreground text-center font-mono">
        Exibindo {{ filteredCodes.length }} registro(s).
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BugOff, Download, FileSpreadsheet, Ghost, Receipt, Search, X } from '@lucide/vue'

const activeTab = ref('convcard')
const searchQuery = ref('')

const codesConvcard = [
  // Gerenciador Padrão ConvCard e Tecnologias para Tef Dedicado
  { codigo: '1.0', msg: 'PERDA/ROUBO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '2.0', msg: 'BLOQUEIO TEMPORARIO TITULAR', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '3.0', msg: 'BLOQUEIO TEMPORARIO DEPENDENTE', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '4.0', msg: 'BLOQUEIO TEMPORARIO TITULAR E DEPENDENTE', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '5.0', msg: 'CARTAO CANCELADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '6.0', msg: 'BLOQUEIO POR AFASTAMENTO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '933.0', msg: 'CHAVE DE DESCRIPTOGRAFIA NAO INFORMADA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '934.0', msg: 'VALORES ITENS VENDA TABELADA INVALIDOS', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '935.0', msg: 'ITENS DA VENDA TABELADO INVALIDOS', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '936.0', msg: 'VENDA NAO PERMITIDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '937.0', msg: 'DADOS DO ABASTECIMENTO NAO ENVIADOS', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '938.0', msg: 'COMBUSTIVEL NAO COMPATIVEL COM O VEICULO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '939.0', msg: 'VEICULO NAO LIBERADO PARA ESTE CARTAO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '940.0', msg: 'VEICULO NAO LOCALIZADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '941.0', msg: 'TEMPO LIMITE PARA CONFIRMACAO EXCEDIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '942.0', msg: 'PRODUTO NAO PERMITIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '943.0', msg: 'ITENS DE VENDA NAO ENVIADOS OU NAO AUTORIZADOS', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '944.0', msg: 'CONVENIADA EXIGE ENVIO DO NUMERO DO CUPOM', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '945.0', msg: 'TRANSACAO PRC REQUERIDA PARA ESTA CONVENIADA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '946.0', msg: 'ATUALIZACAO DE SOFTWARE REQUERIDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '947.0', msg: 'APLICATIVO NAO PERMITIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '948.0', msg: 'VLR. MOVIMENTO ABAIXO DO MINIMO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '949.0', msg: 'CARTAO EXPIRADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '950.0', msg: 'VALOR DA PARCELA INFERIOR AO PERMITIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '951.0', msg: 'MOVIMENTO DESFEITO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '952.0', msg: 'REQUER TRANSACAO PELA WEB', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '953.0', msg: 'DIA BLOQUEADO PARA COMPRA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '954.0', msg: 'NUMERO CVC INVALIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '955.0', msg: 'SENHA NAO CONFERE', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '956.0', msg: 'MOVIMENTO JA CONFIRMADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '957.0', msg: 'ERRO DURANTE A VALIDACAO DOS ITENS DE VENDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '958.0', msg: 'VALOR DOS ITENS DE VENDA NAO CONFERE', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '959.0', msg: 'CONVENIADA EXIGE ENVIO DOS ITENS DA VENDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '960.0', msg: 'CONVENIADA NAO LIBERADA PELA CREDENCIADA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '961.0', msg: 'CARTAO COM TRANSACAO EM ANDAMENTO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '962.0', msg: 'EMPRESA DE SOFTWARE NAO HOMOLOGADA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '963.0', msg: 'USUARIO SEM LIMITE DE CREDITO CADASTRADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '964.0', msg: 'MOVIMENTO NAO CONFIRMADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '965.0', msg: 'NSU NAO LOCALIZADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '966.0', msg: 'CANCELAMENTO NAO PERMITIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '967.0', msg: 'CONVENIADA BLOQUEADA TEMPORARIAMENTE', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '968.0', msg: 'INFORMACOES CARTAO NAO PERMITIDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '969.0', msg: 'PARCELAMENTO NAO HABILITADO PELA ADMINISTRADORA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '970.0', msg: 'MES JA FECHADO. DATA MOVTO INVALIDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '971.0', msg: 'MAX.: X. EXCEDIDO MAXIMO PARCELAS CONVENIADA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '972.0', msg: 'FALHA DURANTE O FECHAMENTO DE LOTE', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '973.0', msg: 'FALHA DURANTE A EXECUCAO DO PROCESSO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '974.0', msg: 'CONVENIADA PERMITE VENDA SOMENTE COM RECEITA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '975.0', msg: 'FORMATO DA MENSAGEM INVALIDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '976.0', msg: 'MOVIMENTO JA CANCELADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '977.0', msg: 'VALOR NAO CONFERE COM O INFORMADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '978.0', msg: 'MOVIMENTO NAO LOCALIZADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '979.0', msg: 'NUMERO DE IDENTIFICACAO INVALIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '980.0', msg: 'CREDENCIADA NAO CONFERE', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '981.0', msg: 'TRANS. PENDENDE RETENTAR EM 60 SEG', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '982.0', msg: 'MOVIMENTO JA EFETUADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '983.0', msg: 'CONVENIADA NAO LOCALIZADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '984.0', msg: 'CONVENIADA BLOQUEADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '985.0', msg: 'LIMITE EXCEDIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '986.0', msg: 'RAMO DE ATIV. S/ CONFIG. DE LIMITE CREDITO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '987.0', msg: 'TITULAR NAO LOCALIZADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '988.0', msg: 'RAMO DE ATIVIDADE BLOQUEADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '989.0', msg: 'CARTAO NAO POSSUI SITUACAO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '990.0', msg: 'ADMINISTRADORA INVALIDA PARA ESTE CARTAO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '991.0', msg: 'CARTAO NAO LOCALIZADO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '992.0', msg: 'MAX.: X. EXCEDIDO MAXIMO PARCELAS CREDENCIADA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '993.0', msg: 'CREDENCIADA INVALIDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '994.0', msg: 'CHAVE DE SEGURANCA INVALIDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '995.0', msg: 'CREDENCIADA BLOQUEADA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '996.0', msg: 'ADMINISTRADORA INVALIDA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '997.0', msg: 'ADMINISTRADORA BLOQUEADA', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '998.0', msg: 'MD5 DO PACOTE INVALIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '999.0', msg: 'TAMANHO DO PACOTE INVALIDO', detalhes: 'Gerenciador Padrão ConvCard' },
  { codigo: '*', msg: 'ERRO NAO CADASTRADO NO AUTORIZADOR', detalhes: 'O autorizador retornará esta mensagem quando não identificar o código.' },
  
  // Concentradores Mercados
  { codigo: '0.0', msg: 'APROVADO', detalhes: 'Concentradores Mercados' },
  { codigo: '85.0', msg: 'TAMANHO DO PACOTE INVALIDO / MD5 DO PACOTE INVALIDO / NUMERO DE IDENTIFICACAO INVALIDO', detalhes: 'Concentradores Mercados' },
  { codigo: '86.0', msg: 'ADMINISTRADORA BLOQUEADA / ADMINISTRADORA INVALIDA / ADMINISTRADORA INVALIDA PARA ESTE CARTAO', detalhes: 'Concentradores Mercados' },
  { codigo: '91.0', msg: 'CONVENIADA BLOQUEADA', detalhes: 'Concentradores Mercados' },
  { codigo: '87.0', msg: 'CHAVE DE SEGURANCA INVALIDA', detalhes: 'Concentradores Mercados' },
  { codigo: '88.0', msg: 'CONVENIADA INVALIDA / CONVENIADA NAO CONFERE', detalhes: 'Concentradores Mercados' },
  { codigo: '97.0', msg: 'CARTAO NAO LOCALIZADO / CARTAO NAO POSSUI SITUACAO', detalhes: 'Concentradores Mercados' },
  { codigo: '90.0', msg: 'RAMO DE ATIVIDADE BLOQUEADO', detalhes: 'Concentradores Mercados' },
  { codigo: '96.0', msg: 'TITULAR NAO LOCALIZADO', detalhes: 'Concentradores Mercados' },
  { codigo: '89.0', msg: 'RAMO DE ATIV. S/ CONFIG. DE LIMITE CREDITO', detalhes: 'Concentradores Mercados' },
  { codigo: '99.0', msg: 'LIMITE EXCEDIDO', detalhes: 'Concentradores Mercados' },
  { codigo: '95.0', msg: 'CLIENTE BLOQUEADO / CLIENTE NAO LOCALIZADO', detalhes: 'Concentradores Mercados' },
  { codigo: '50.0', msg: 'MOVIMENTO JA EFETUADO', detalhes: 'Concentradores Mercados' },
  { codigo: '84.0', msg: 'TRANS. PENDENDE RETENTAR EM 30 SEG', detalhes: 'Concentradores Mercados' },
  { codigo: '1.0', msg: 'PERDA/ROUBO', detalhes: 'Concentradores Mercados' },
  { codigo: '2.0', msg: 'BLOQUEIO TEMPORARIO TITULAR', detalhes: 'Concentradores Mercados' },
  { codigo: '3.0', msg: 'BLOQUEIO TEMPORARIO DEPENDENTE', detalhes: 'Concentradores Mercados' },
  { codigo: '4.0', msg: 'BLOQUEIO TEMPORARIO TITULAR E DEPENDENTE', detalhes: 'Concentradores Mercados' },
  { codigo: '5.0', msg: 'CANCELADO', detalhes: 'Concentradores Mercados' }
]

const codesELO = [
  { codigo: '00', msg: 'TRANSAÇÃO APROVADA', detalhes: 'Esse código deve ser usado pelo Emissor para aprovar transações no valor total.' },
  { codigo: '04', msg: 'REFAZER A TRANSAÇÃO', detalhes: 'Esse código deve ser usado pelo Emissor para solicitar que o portador/EC realize novamente a transação caso ele detecte falha na captura das informações da transação ou caso seja necessário atualização da senha negando a 1ª transação.' },
  { codigo: '05', msg: 'GENÉRICA', detalhes: 'A Bandeira poderá utilizar esse código para outras tratativas (genérica).' },
  { codigo: '06', msg: 'CONSULTAR CREDENCIADOR', detalhes: 'Esse motivo deve ser utilizado pelo Credenciador quando ele identificar problemas internos que não necessitem de mudanças na mensageria.' },
  { codigo: '12', msg: 'ERRO NO CARTÃO', detalhes: 'Esse código deve ser usado pelo Emissor quando ele identificar falha na validação do CAVV de transações 3DS ou tokenizada; código de serviço incorreto para cartões físicos; ou problemas no TOKEN.' },
  { codigo: '13', msg: 'VALOR DA TRANSAÇÃO INVÁLIDA', detalhes: 'Esse código deve ser usado pelo Emissor quando identificar que o valor da transação é inválido de acordo com os parâmetros do Emissor.' },
  { codigo: '14', msg: 'NÚMERO DO CARTÃO INVÁLIDO', detalhes: 'Esse código deve ser utilizado pelo Emissor para Nº DO CARTÃO INVÁLIDO/INCORRETO. A Bandeira poderá utilizar esse código para outras tratativas.' },
  { codigo: '19', msg: 'PROBLEMAS ADQUIRENTE', detalhes: 'Esse motivo deve ser utilizado pelo Credenciador quando ele identificar problemas internos que necessitem de mudanças na mensageria.' },
  { codigo: '23', msg: 'VALOR DA PARCELA INVÁLIDO', detalhes: 'Esse código deve ser utilizado pelo Emissor quando o VALOR DA PARCELA ESTÁ FORA DOS LIMITES ou quando o emissor não aceitar o produto Elo Parcelado Loja menor que 12 parcelas.' },
  { codigo: '30', msg: 'ERRO DE FORMATO DA MENSAGEM', detalhes: 'Esse código deve ser usado pelo Emissor quando ele identificar ERRO DE FORMATO NA MENSAGERIA.' },
  { codigo: '38', msg: 'COMPRA EXCEDIDAS TENTATIVAS SENHA', detalhes: 'Esse código deve ser utilizado pelo Emissor quando for EXCEDIDO O Nº DE TENTATIVAS PERMITIDAS DE DIGITAÇÃO DA SENHA (utilizado apenas para compras).' },
  { codigo: '41', msg: 'CARTÃO PERDIDO', detalhes: 'Esse código deve ser utilizado pelo Emissor para CARTÃO COM BLOQUEIO DEFINITIVO pelo motivo "PERDA".' },
  { codigo: '43', msg: 'CARTÃO ROUBADO', detalhes: 'Esse código deve ser utilizado pelo Emissor para CARTÃO COM BLOQUEIO DEFINITIVO pelo motivo "ROUBO".' },
  { codigo: '51', msg: 'LIMITE/SALDO INSUFICIENTE | SERVIÇO NÃO SUPORTADO', detalhes: 'Cartão temporariamente sem saldo/limite, Saque/advance 2 sem trilha 2, Compra com Troco não suportada, ou Verificação de endereço/conta não suportada.' },
  { codigo: '54', msg: 'DATA DE VALIDADE DO CARTÃO', detalhes: 'Esse código deve ser utilizado pelo Emissor para CARTÃO FÍSICO ou TOKEN COM VALIDADE / EXPIRAÇÃO VENCIDA ou INVÁLIDA.' },
  { codigo: '55', msg: 'SENHA INVÁLIDA / NÃO ENVIADA', detalhes: 'Senha digitada não confere, ou não foi enviada na mensageria quando exigida para aprovação.' },
  { codigo: '56', msg: 'SEM REGISTRO DO CARTÃO', detalhes: '1. Nº do cartão não pertence ao Emissor. 2. Nº do cartão não é válido.' },
  { codigo: '57', msg: 'TRANSAÇÃO NÃO PERMITIDA PARA ESSE CARTÃO', detalhes: 'Cartão com bloqueio definitivo (exceto perda/roubo), produtos/serviços não suportados, token inválido/inativo, ou para negar o modo de entrada FALLBACK.' },
  { codigo: '58', msg: 'COMERCIANTE INVÁLIDO', detalhes: 'Esse código deve ser utilizado pelo Emissor quando o MCC do estabelecimento não estiver cadastrado para obtenção de token junto ao Emissor.' },
  { codigo: '59', msg: 'SUSPEITA DE FRAUDE', detalhes: 'Regras de prevenção suspeitam de fraude (necessário contato com emissor) ou ausência de AVISO VIAGEM.' },
  { codigo: '61', msg: 'VALOR MÁXIMO SAQUE/COMPRAS EXCEDIDO', detalhes: 'Esse código deve ser utilizado pelo Emissor quando o valor do saque/compras exceder o limite permitido por ele.' },
  { codigo: '62', msg: 'BLOQUEIO TEMPORÁRIO DE COBRANÇA', detalhes: 'Esse código deve ser utilizado pelo Emissor para cartões com BLOQUEIO TEMPORÁRIO DE COBRANÇA.' },
  { codigo: '63', msg: 'VIOLAÇÃO DE SEGURANÇA', detalhes: 'Esse código deve ser utilizado pelo Emissor quando o CÓDIGO DE SEGURANÇA DO CARTÃO (CVE2) estiver INCORRETO/INVÁLIDO ou MST inválido (token).' },
  { codigo: '64', msg: 'VALOR MÍNIMO DA TRANSAÇÃO - INVÁLIDO', detalhes: 'Esse código deve ser utilizado pelo Emissor quando o VALOR DA TRANSAÇÃO ESTIVER ABAIXO DO MÍNIMO permitido pelo Emissor.' },
  { codigo: '65', msg: 'QUANTIDADE DE SAQUES EXCEDIDOS', detalhes: 'Esse código deve ser utilizado pelo Emissor quando o limite de quantidade de saques estiver excedido.' },
  { codigo: '75', msg: 'SAQUE EXCEDIDAS TENTATIVAS SENHA', detalhes: 'Esse código deve ser utilizado pelo Emissor quando for excedida a quantidade de tentativas de digitação de senha estipuladas pelo Emissor (SAQUES).' },
  { codigo: '76', msg: 'CONTA DESTINO INVÁLIDA OU INEXISTENTE', detalhes: 'Esse código deve ser utilizado pelo Emissor quando conta "PARA" (destino) é inválida/inexistente (Transferência de Fundos).' },
  { codigo: '77', msg: 'CONTA ORIGEM INVÁLIDA OU INEXISTENTE', detalhes: 'Esse código deve ser utilizado pelo Emissor quando conta "DE" (origem) é inválida/inexistente (Transferência de Fundos).' },
  { codigo: '78', msg: 'CARTÃO NOVO SEM DESBLOQUEIO / CARTÃO BLOQUEADO', detalhes: 'Cartão novo ainda não desbloqueado/ativado pelo portador, ou quando o portador bloqueia temporariamente via aplicativo.' },
  { codigo: '82', msg: 'CARTÃO INVÁLIDO (dados internos)', detalhes: 'Esse código deve ser utilizado pelo Emissor quando dados internos do cartão não conferem (ex: criptograma inválido, ATC inválido etc.).' },
  { codigo: '83', msg: 'NÃO É POSSÍVEL VALIDAR A SENHA', detalhes: 'Esse código deve ser utilizado pelo Emissor e será utilizado pela Elo quando não for possível validar ou descriptografar a senha.' },
  { codigo: '85', msg: 'SEM RAZÃO PARA NEGAR', detalhes: 'Verificação da conta do cartão correta, Devoluções de mercadoria e Outros serviços de verificação.' },
  { codigo: '91', msg: 'EMISSOR FORA DO AR', detalhes: 'Esse código será utilizado pela Bandeira quando o Emissor está temporariamente indisponível para autorizar a transação.' },
  { codigo: '96', msg: 'FALHA DO SISTEMA', detalhes: 'Esse código será utilizado pela Bandeira ou pelo Emissor por problemas no processamento da transação.' },
  { codigo: 'AB', msg: 'FUNÇÃO INCORRETA (DÉBITO)', detalhes: 'Esse código será utilizado pelo Emissor para sinalizar o estabelecimento que ele solicitou a autorização na função DÉBITO, mas o cartão não possui essa função ativa.' },
  { codigo: 'AC', msg: 'FUNÇÃO INCORRETA (CRÉDITO)', detalhes: 'Esse código será utilizado pelo Emissor para sinalizar o estabelecimento que ele solicitou a autorização na função CRÉDITO, mas o cartão não possui essa função ativa.' },
  { codigo: 'FM', msg: 'UTILIZAR O CHIP', detalhes: 'Esse código será utilizado pelo Emissor para informar que a transação contactless não terá sucesso e que o portador deve utilizar o chip (contato).' },
  { codigo: 'P5', msg: 'TROCA DE SENHA / FALHA NO DESBLOQUEIO', detalhes: 'Esse código será utilizado pelo Emissor quando ocorreu falha na troca de senha ou falha no desbloqueio.' },
  { codigo: 'P6', msg: 'NOVA SENHA NÃO ACEITA', detalhes: 'Esse código será utilizado pelo Emissor quando a nova senha que o cliente escolheu não atende os critérios mínimos estabelecidos pelo Emissor.' }
]

const codesCardSE = [
  // FISERV
  { codigo: '00', msg: 'AUTORIZADA', detalhes: 'Visor: 00-AUTORIZADA (FISERV)' },
  { codigo: '03', msg: 'ESTABELECIMENTO_INVALIDO', detalhes: 'Visor: 03-ESTAB INVALIDO (FISERV)' },
  { codigo: '12', msg: 'TRANSACAO_INVALIDA', detalhes: 'Visor: 12-ERRO NO CARTAO (FISERV)' },
  { codigo: '13', msg: 'VALOR_INVALIDO', detalhes: 'Visor: 13-VALOR INVALIDO (FISERV)' },
  { codigo: '14', msg: 'IDENTIFICACAO_INVALIDA', detalhes: 'Visor: 14-CARTAO INVALIDO (FISERV)' },
  { codigo: '15', msg: 'EMISSOR_SEM_CONVENIO', detalhes: 'Visor: 15-EMISSOR SEM CONVENIO (FISERV)' },
  { codigo: '19', msg: 'REFAZER_TRANSACAO', detalhes: 'Visor: 19-REFACA OPERACAO (FISERV)' },
  { codigo: '30', msg: 'ERRO_FORMATO_ISO', detalhes: 'Visor: 30-ERRO CONTATAR TEF (FISERV)' },
  { codigo: '40', msg: 'SERVICO_INDISPONIVEL', detalhes: 'Visor: 40-OPERACAO INDISPON (FISERV)' },
  { codigo: '51', msg: 'SALDO_INSUFICIENTE', detalhes: 'Visor: 51-SALDO INSUFICIENTE (FISERV)' },
  { codigo: '54', msg: 'CARTAO_VENCIDO', detalhes: 'Visor: 54-CARTAO VENCIDO (FISERV)' },
  { codigo: '55', msg: 'SENHA_INVALIDA', detalhes: 'Visor: 55-SENHA INVALIDA (FISERV)' },
  { codigo: '56', msg: 'CARTAO_SEM_REGISTRO', detalhes: 'Visor: 56-LIGAR CARTAO (FISERV)' },
  { codigo: '57', msg: 'SERVICO_INVALIDO', detalhes: 'Visor: 57-LIGAR CARTAO (FISERV)' },
  { codigo: '58', msg: 'TRANSACAO_NAO_PERMITIDA', detalhes: 'Visor: 58-LIGAR CARTAO (FISERV)' },
  { codigo: '59', msg: 'SUSPEITA_FRAUDE', detalhes: 'Visor: 59-LIGAR CARTAO (FISERV)' },
  { codigo: '62', msg: 'CARTAO_COM_RESTRICOES', detalhes: 'Visor: 62-LIGAR CARTAO (FISERV)' },
  { codigo: '75', msg: 'EXCEDIDAS_TENTATIVAS', detalhes: 'Visor: 75-EXCEDIDO TENTATIVAS (FISERV)' },
  { codigo: '76', msg: 'TRANSACAO_NAO_ENCONTRADA', detalhes: 'Visor: 76-TRANS NAO ENCONTRADA (FISERV)' },
  { codigo: '77', msg: 'TRANSACAO_ANDAMENTO', detalhes: 'Visor: 77-TRANSACAO EM ANDAMENTO (FISERV)' },
  { codigo: '90', msg: 'QR_CODE_EXPIRADO', detalhes: 'Visor: 90-QR CODE EXPIRADO (FISERV)' },
  { codigo: '91', msg: 'INSTITUICAO_INDISPONIVEL', detalhes: 'Visor: 91-INSTITUICAO INDISPON (FISERV)' },
  { codigo: '96', msg: 'SISTEMA_INDISPONIVEL', detalhes: 'Visor: 96-SISTEMA INDISP (FISERV)' },
  // AUTORIZADOR
  { codigo: 'N0', msg: 'POSSUI_ADIANTAMENTO', detalhes: 'Visor: N0-POSSUI ADIANTAMENTO (AUTORIZADOR)' },
  { codigo: 'N1', msg: 'CADASTRO_INCOMPLETO', detalhes: 'Visor: N1-CADASTRO INCOMPLETO (AUTORIZADOR)' },
  { codigo: 'N2', msg: 'SENHA_NAO_CADASTRADA', detalhes: 'Visor: N2-SENHA NAO CADASTRADA (AUTORIZADOR)' },
  { codigo: 'N3', msg: 'DOCUMENTOS_NAO_CADASTRADOS', detalhes: 'Visor: N3-DOCUMENTOS NAO CADASTRADOS (AUTORIZADOR)' },
  { codigo: 'N4', msg: 'RECURSO_NAO_DISPONIVEL_TEMPORARIAMENTE', detalhes: 'Visor: N4-RECURSO NAO DISPONIVEL (AUTORIZADOR)' },
  { codigo: 'N5', msg: 'VALOR_MAIOR_QUE_O_TOTAL_DE_COMPRAS', detalhes: 'Visor: N5-VALOR MAIOR TOTAL COMPRAS (AUTORIZADOR)' },
  { codigo: 'N6', msg: 'USUARIO_SEM_COMPRA_NO_MES_REFERENCIA', detalhes: 'Visor: N6-USUARIO SEM COMPRA NO MES (AUTORIZADOR)' },
  { codigo: 'N7', msg: 'RECEBIMENTO_NAO_PERMITIDO', detalhes: 'Visor: N7-RECEBIMENTO NAO PERMITIDO (AUTORIZADOR)' },
  { codigo: 'N8', msg: 'CLIENTE_COM_RESTRICAO', detalhes: 'Visor: N8-CLIENTE COM RESTRICAO (AUTORIZADOR)' },
  { codigo: 'N9', msg: 'CONDICAO_DE_PAGAMENTO_NAO_PERMITIDA', detalhes: 'Visor: N9-CONDICAO PAG. NAO PERMIT. (AUTORIZADOR)' },
  { codigo: 'NA', msg: 'FATURA_POSTERIOR_JA_FECHADA', detalhes: 'Visor: NA-PROX. FATURA JA FECHADA (AUTORIZADOR)' },
  { codigo: 'NB', msg: 'CADASTRO_TEMPORARIO_BLOQUEADO', detalhes: 'Visor: NB-CADASTRO TEMP. BLOQUEADO (AUTORIZADOR)' },
  { codigo: 'NC', msg: 'CADASTRO_AGUARDANDO_DESBLOQUEIO', detalhes: 'Visor: NC-CADASTRO AGUARD. DESBLOQ. (AUTORIZADOR)' },
  { codigo: 'ND', msg: 'ERRO_NAO_IDENTIFICADO_PELO_AUTORIZADOR', detalhes: 'Visor: ND-ERRO NAO IDENTIFICADO (AUTORIZADOR)' },
  { codigo: 'NE', msg: 'FATURA_NAO_CONFERE', detalhes: 'Visor: NE-FATURA NAO CONFERE (AUTORIZADOR)' },
  { codigo: 'NF', msg: 'DADOS_DO_RECEBIMENTO_NAO_LOCALIZADOS', detalhes: 'Visor: NF-DADOS NAO LOCALIZADOS (AUTORIZADOR)' },
  { codigo: 'NG', msg: 'FATURA_EM_ABERTO', detalhes: 'Visor: NG-FATURA EM ABERTO (AUTORIZADOR)' },
  { codigo: 'NH', msg: 'RECEBIMENTO_JA_REALIZADO', detalhes: 'Visor: NH-RECEBIMENTO JA REALIZADO (AUTORIZADOR)' },
  { codigo: 'NI', msg: 'FATURA_NAO_LOCALIZADA', detalhes: 'Visor: NI-FATURA NAO LOCALIZADA (AUTORIZADOR)' },
  { codigo: 'NJ', msg: 'VALOR_INFORMADO_MAIOR_QUE_VALOR_FATURA', detalhes: 'Visor: NJ-VALOR MAIOR QUE FATURA (AUTORIZADOR)' },
  { codigo: 'NK', msg: 'TRANS_PENDENDE_RETENTAR_EM_30_SEG', detalhes: 'Visor: NK-TRANS PEND. RETENTAR 30 SEG (AUTORIZADOR)' },
  { codigo: 'NL', msg: 'CADASTRO_PROVISORIO_EXPIRADO', detalhes: 'Visor: NL-CAD. PROVIS. EXPIRADO (AUTORIZADOR)' },
  { codigo: 'NM', msg: 'MES_JA_FECHADO', detalhes: 'Visor: NM-MES JA FECHADO (AUTORIZADOR)' },
  { codigo: 'NN', msg: 'VALOR_INFERIOR_AO_MINIMO_DA_FATURA', detalhes: 'Visor: NN-VALOR INFERIOR MINIMO FATURA (AUTORIZADOR)' },
  { codigo: 'NO', msg: 'CONDICAO_DE_PAGAMENTO_INVALIDA', detalhes: 'Visor: NO-CONDICAO DE PAG. INVALIDA (AUTORIZADOR)' },
  { codigo: 'NP', msg: 'CONDICAO_DE_PAGAMENTO_INATIVA', detalhes: 'Visor: NP-CONDICAO DE PAG. INATIVA (AUTORIZADOR)' },
  { codigo: 'NQ', msg: 'OPERACAO_NAO_PERMITIDA', detalhes: 'Visor: NQ-OPERACAO NAO PERMITIDA (AUTORIZADOR)' },
  { codigo: 'NR', msg: 'TAMANHO_DO_PACOTE_INVALIDO', detalhes: 'Visor: NR-TAMANHO DO PACOTE INVALIDO (AUTORIZADOR)' },
  { codigo: 'NS', msg: 'MD5_DO_PACOTE_INVALIDO', detalhes: 'Visor: NS-MD5 DO PACOTE INVALIDO (AUTORIZADOR)' },
  { codigo: 'NT', msg: 'ADMINISTRADORA_BLOQUEADA', detalhes: 'Visor: NT-ADM. BLOQUEADA (AUTORIZADOR)' },
  { codigo: 'NU', msg: 'ADMINISTRADORA_INVALIDA', detalhes: 'Visor: NU-ADM. INVALIDA (AUTORIZADOR)' },
  { codigo: 'NV', msg: 'LOJA_BLOQUEADA', detalhes: 'Visor: NV-LOJA BLOQUEADA (AUTORIZADOR)' },
  { codigo: 'NW', msg: 'CHAVE_DE_SEGURANCA_INVALIDA', detalhes: 'Visor: NW-CHAVE DE SEG. INVALIDA (AUTORIZADOR)' },
  { codigo: 'NX', msg: 'LOJA_INVALIDA', detalhes: 'Visor: NX-LOJA INVALIDA (AUTORIZADOR)' },
  { codigo: 'NY', msg: 'EXCEDIDO_MAXIMO_PARCELAS_LOJA', detalhes: 'Visor: NY-EXCEDIDO MAX. PARCELAS LOJA (AUTORIZADOR)' },
  { codigo: 'NZ', msg: 'CARTAO_NAO_LOCALIZADO', detalhes: 'Visor: NZ-CARTAO NAO LOCALIZADO (AUTORIZADOR)' },
  { codigo: 'O0', msg: 'ADMINISTRADORA_INVALIDA_PARA_ESTE_CARTAO', detalhes: 'Visor: O0-ADM. INVALIDA PARA ESTE CARTAO (AUTORIZADOR)' },
  { codigo: 'O1', msg: 'CARTAO_NAO_POSSUI_SITUACAO', detalhes: 'Visor: O1-CARTAO NAO POSSUI SITUACAO (AUTORIZADOR)' },
  { codigo: 'O2', msg: 'RAMO_DE_ATIVIDADE_BLOQUEADO', detalhes: 'Visor: O2-RAMO ATIVIDADE BLOQUEADO (AUTORIZADOR)' },
  { codigo: 'O3', msg: 'TITULAR_NAO_LOCALIZADO', detalhes: 'Visor: O3-TITULAR NAO LOCALIZADO (AUTORIZADOR)' },
  { codigo: 'O4', msg: 'RAMO_DE_ATIV_S_CONFIG_DE_LIMITE_CREDITO', detalhes: 'Visor: O4-RAMO DE ATIV S. CONFIG LIMITE (AUTORIZADOR)' },
  { codigo: 'O5', msg: 'CONVENIADA_BLOQUEADO', detalhes: 'Visor: O5-CONVENIADA BLOQUEADA (AUTORIZADOR)' },
  { codigo: 'O6', msg: 'CONVENIADA_NAO_LOCALIZADO', detalhes: 'Visor: O6-CONVENIADA NAO LOCALIZADA (AUTORIZADOR)' },
  { codigo: 'O7', msg: 'MOVIMENTO_JA_EFETUADO', detalhes: 'Visor: O7-MOVIMENTO JA EFETUADO (AUTORIZADOR)' },
  { codigo: 'O8', msg: 'TRANS_PENDENDE_RETENTAR_EM_60_SEG', detalhes: 'Visor: O8-TRANS PEND. RETENTAR 60 SEG (AUTORIZADOR)' },
  { codigo: 'O9', msg: 'LOJA_NAO_CONFERE', detalhes: 'Visor: O9-LOJA NAO CONFERE (AUTORIZADOR)' },
  { codigo: 'OA', msg: 'NUMERO_DE_IDENTIFICACAO_INVALIDO', detalhes: 'Visor: OA-N. IDENTIFICA INVALIDO (AUTORIZADOR)' },
  { codigo: 'OB', msg: 'VALOR_NAO_CONFERE_COM_O_INFORMADO', detalhes: 'Visor: OB-VALOR N. CONF COM O INFORMADO (AUTORIZADOR)' },
  { codigo: 'OC', msg: 'MOVIMENTO_JA_CANCELADO', detalhes: 'Visor: OC-MOVIMENTO JA CANCELADO (AUTORIZADOR)' },
  { codigo: 'OD', msg: 'FORMATO_DA_MENSAGEM_INVALIDA', detalhes: 'Visor: OD-FORMATO DA MENSAGEM INVALIDA (AUTORIZADOR)' },
  { codigo: 'OE', msg: 'CONVENIADA_PERMITE_VENDA_SOMENTE_COM_RECEITA', detalhes: 'Visor: OE-CONV. PERMITE VENDA C. RECEITA (AUTORIZADOR)' },
  { codigo: 'OF', msg: 'FALHA_DURANTE_A_EXECUCAO_DO_PROCESSO', detalhes: 'Visor: OF-FALHA DURANTE EXECUCAO PROCESSO (AUTORIZADOR)' },
  { codigo: 'OG', msg: 'FALHA_DURANTE_O_FECHAMENTO_DE_LOTE', detalhes: 'Visor: OG-FALHA DURANTE FECHAMENTO LOTE (AUTORIZADOR)' },
  { codigo: 'OH', msg: 'EXCEDIDO_MAXIMO_PARCELAS_CONVENIADA', detalhes: 'Visor: OH-EXCEDIDO MAX. PARCELAS CONVENIADA (AUTORIZADOR)' },
  { codigo: 'OI', msg: 'MES_JA_FECHADO_DATA_MOVTO_INVALIDA', detalhes: 'Visor: OI-MES FECHADO DATA MOVTO INVALIDA (AUTORIZADOR)' },
  { codigo: 'OJ', msg: 'PARCELAMENTO_NAO_HABILITADO_PELA_ADMINISTRADORA', detalhes: 'Visor: OJ-PARCELAMENTO NAO HABILITADO (AUTORIZADOR)' },
  { codigo: 'OK', msg: 'INFORMACOES_CARTAO_NAO_PERMITIDA', detalhes: 'Visor: OK-INFORMACOES NAO PERMITIDA (AUTORIZADOR)' },
  { codigo: 'OL', msg: 'CONVENIADA_BLOQUEADA_TEMPORARIAMENTE', detalhes: 'Visor: OL-CONVENIADA BLOQUEADA TEMP. (AUTORIZADOR)' },
  { codigo: 'OM', msg: 'CANCELAMENTO_NAO_PERMITIDO', detalhes: 'Visor: OM-CANCELAMENTO NAO PERMITIDO (AUTORIZADOR)' },
  { codigo: 'ON', msg: 'MOVIMENTO_NAO_CONFIRMADO', detalhes: 'Visor: ON-MOVIMENTO NAO CONFIRMADO (AUTORIZADOR)' },
  { codigo: 'OO', msg: 'USUARIO_SEM_LIMITE_DE_CREDITO_CADASTRADO', detalhes: 'Visor: OO-USUARIO SEM LIMITE CREDITO (AUTORIZADOR)' },
  { codigo: 'OP', msg: 'EMPRESA_DE_SOFTWARE_NAO_HOMOLOGADA', detalhes: 'Visor: OP-SOFTWARE NAO HOMOLOGADO (AUTORIZADOR)' },
  { codigo: 'OQ', msg: 'CARTAO_COM_TRANSACAO_EM_ANDAMENTO', detalhes: 'Visor: OQ-TRANSACAO EM ANDAMENTO (AUTORIZADOR)' },
  { codigo: 'OR', msg: 'CONVENIADA_NAO_LIBERADA_PELA_LOJA', detalhes: 'Visor: OR-CONVENIADA NAO LIBERADA (AUTORIZADOR)' },
  { codigo: 'OS', msg: 'CONVENIADA_EXIGE_ENVIO_DOS_ITENS_DA_VENDA', detalhes: 'Visor: OS-CONVENIADA EXIGE ITENS VENDA (AUTORIZADOR)' },
  { codigo: 'OT', msg: 'VALOR_DOS_ITENS_DE_VENDA_NAO_CONFERE', detalhes: 'Visor: OT-VALOR ITENS VENDA NAO CONFERE (AUTORIZADOR)' },
  { codigo: 'OU', msg: 'ERRO_DURANTE_A_VALIDACAO_DOS_ITENS_DE_VENDA', detalhes: 'Visor: OU-ERRO ITENS DE VENDA (AUTORIZADOR)' },
  { codigo: 'OV', msg: 'MOVIMENTO_JA_CONFIRMADO', detalhes: 'Visor: OV-MOVIMENTO JA CONFIRMADO (AUTORIZADOR)' },
  { codigo: 'OW', msg: 'NUMERO_CVC_INVALIDO', detalhes: 'Visor: OW-NUMERO CVC INVALIDO (AUTORIZADOR)' },
  { codigo: 'OX', msg: 'DIA_BLOQUEADO_PARA_COMPRA', detalhes: 'Visor: OX-DIA BLOQUEADO PARA COMPRA (AUTORIZADOR)' },
  { codigo: 'OY', msg: 'REQUER_TRANSACAO_PELA_WEB', detalhes: 'Visor: OY-REQUER TRANSACAO WEB (AUTORIZADOR)' },
  { codigo: 'OZ', msg: 'MOVIMENTO_DESFEITO', detalhes: 'Visor: OZ-MOVIMENTO DESFEITO (AUTORIZADOR)' },
  { codigo: 'P0', msg: 'VALOR_DA_PARCELA_INFERIOR_AO_PERMITIDO', detalhes: 'Visor: P0-VALOR PARCELA INFERIOR PERMITIDO (AUTORIZADOR)' },
  { codigo: 'P1', msg: 'VLR_MOVIMENTO_ABAIXO_DO_MINIMO', detalhes: 'Visor: P1-VLR MOVIMENTO ABAIXO DO MINIMO (AUTORIZADOR)' },
  { codigo: 'P2', msg: 'APLICATIVO_NAO_PERMITIDO', detalhes: 'Visor: P2-APLICATIVO NAO PERMITIDO (AUTORIZADOR)' },
  { codigo: 'P3', msg: 'ATUALIZACAO_DE_SOFTWARE_REQUERIDA', detalhes: 'Visor: P3-ATUALIZAR SOFTWARE (AUTORIZADOR)' },
  { codigo: 'P4', msg: 'TRANSACAO_PRC_REQUERIDA_PARA_ESTA_CONVENIADA', detalhes: 'Visor: P4-TRANSACAO PRC REQUERIDA (AUTORIZADOR)' },
  { codigo: 'P5', msg: 'CONVENIADA_EXIGE_ENVIO_DO_NUMERO_DO_CUPOM', detalhes: 'Visor: P5-EXIGE ENVIO NUMERO CUPOM (AUTORIZADOR)' },
  { codigo: 'P6', msg: 'ITENS_DE_VENDA_NAO_ENVIADOS_OU_NAO_AUTORIZADOS', detalhes: 'Visor: P6-ITENS VENDA NAO ENVIADOS (AUTORIZADOR)' },
  { codigo: 'P7', msg: 'PRODUTO_NAO_PERMITIDO', detalhes: 'Visor: P7-PRODUTO NAO PERMITIDO (AUTORIZADOR)' },
  { codigo: 'P8', msg: 'TEMPO_LIMITE_PARA_CONFIRMACAO_EXCEDIDO', detalhes: 'Visor: P8-TEMPO LIMITE CONFIR. EXCEDIDO (AUTORIZADOR)' },
  { codigo: 'P9', msg: 'VEICULO_NAO_LOCALIZADO', detalhes: 'Visor: P9-VEICULO NAO LOCALIZADO (AUTORIZADOR)' },
  { codigo: 'PA', msg: 'VEICULO_NAO_LIBERADO_PARA_ESTE_CARTAO', detalhes: 'Visor: PA-VEICULO NAO LIBERADO (AUTORIZADOR)' },
  { codigo: 'PB', msg: 'COMBUSTIVEL_NAO_COMPATIVEL_COM_O_VEICULO', detalhes: 'Visor: PB-COMBUSTIVEL NAO COMPATIVEL (AUTORIZADOR)' },
  { codigo: 'PC', msg: 'DADOS_DO_ABASTECIMENTO_NAO_ENVIADOS', detalhes: 'Visor: PC-ABASTECIMENTO NAO ENVIADOS (AUTORIZADOR)' },
  { codigo: 'PD', msg: 'VENDA_NAO_PERMITIDA', detalhes: 'Visor: PD-VENDA NAO PERMITIDA (AUTORIZADOR)' },
  { codigo: 'PE', msg: 'ITENS_DA_VENDA_TABELADO_INVALIDOS', detalhes: 'Visor: PE-ITENS VENDA TABELADO INVALID (AUTORIZADOR)' },
  { codigo: 'PF', msg: 'VALORES_ITENS_VENDA_TABELADA_INVALIDOS', detalhes: 'Visor: PF-VALORES ITENS VENDA INVALIDOS (AUTORIZADOR)' },
  { codigo: 'PG', msg: 'CHAVE_DE_DESCRIPTOGRAFIA_NAO_INFORMADA', detalhes: 'Visor: PG-CHAVE CRIPT NAO INFORMADA (AUTORIZADOR)' },
  { codigo: 'PH', msg: 'FORMA_DE_CAPTURA_CIELO_NAO_HABILITADA', detalhes: 'Visor: PH-FORMA CAPTURA NAO HABILITADA (AUTORIZADOR)' },
  { codigo: 'PI', msg: 'PERDA_ROUBO', detalhes: 'Visor: PI-PERDA ROUBO (AUTORIZADOR)' },
  { codigo: 'PJ', msg: 'BLOQUEIO_TEMPORARIO_TITULAR', detalhes: 'Visor: PJ-BLOQUEIO TEMP. TITULAR (AUTORIZADOR)' },
  { codigo: 'PK', msg: 'BLOQUEIO_TEMPORARIO_DEPENDENTE', detalhes: 'Visor: PK-BLOQUEIO TEMP. DEPENDENTE (AUTORIZADOR)' },
  { codigo: 'PL', msg: 'BLOQUEIO_TEMPORARIO_TITULAR_E_DEPENDENTE', detalhes: 'Visor: PL-BLOQUEIO TEMP. TIT. DEP. (AUTORIZADOR)' },
  { codigo: 'PM', msg: 'CARTAO_CANCELADO', detalhes: 'Visor: PM-CARTAO CANCELADO (AUTORIZADOR)' },
  { codigo: 'PN', msg: 'BLOQUEIO_POR_AFASTAMENTO', detalhes: 'Visor: PN-BLOQUEIO POR AFASTAMENTO (AUTORIZADOR)' },
  { codigo: 'PO', msg: 'ERRO_NAO_CADASTRADO_NO_AUTORIZADOR', detalhes: 'Visor: PO-ERRO NAO CADASTRADO (AUTORIZADOR)' },
  { codigo: 'PP', msg: 'TERMO_DE_RECEBIMENTO_CARTAO_NAO_ASSINADO', detalhes: 'Visor: PP-TERMO RECEB. CART. PENDENTE (AUTORIZADOR)' },
  { codigo: 'PQ', msg: 'ALTERACAO_NAO_PERMITIDA', detalhes: 'Visor: PQ-ALTERACAO NAO PERMITIDA (AUTORIZADOR)' }
]

const codesPix = [
  { codigo: '0', msg: 'PROCESSANDO', detalhes: 'Transferência PIX em processamento.' },
  { codigo: '1', msg: 'PROCESSANDO', detalhes: 'Transferência PIX em processamento.' },
  { codigo: '2', msg: 'PROCESSANDO ESTORNO', detalhes: 'Estorno da transferência PIX em processamento.' },
  { codigo: '3', msg: 'CANCELADO', detalhes: 'Transferência PIX cancelada.' },
  { codigo: '4', msg: 'CONCLUÍDO', detalhes: 'Transferência PIX concluída com sucesso.' }
]

// Lógica de Filtro Inteligente Computado
const filteredCodes = computed(() => {
  let sourceArray = []

  if (activeTab.value === 'convcard') sourceArray = codesConvcard
  else if (activeTab.value === 'elo') sourceArray = codesELO
  else if (activeTab.value === 'cardse') sourceArray = codesCardSE
  else if (activeTab.value === 'pix') sourceArray = codesPix

  if (!searchQuery.value) return sourceArray

  const q = searchQuery.value.toLowerCase()
  return sourceArray.filter(item => 
    item.codigo.toLowerCase().includes(q) || 
    item.msg.toLowerCase().includes(q) ||
    item.detalhes.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
/* Scrollbar customizada só para essa tabela para ficar elegante */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
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
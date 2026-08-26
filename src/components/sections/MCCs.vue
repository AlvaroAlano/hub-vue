<template>
  <section
    id="mccs"
    class="flex flex-col h-full"
    data-search-keywords="mcc mccs merchant category code ramo atividade taxa remuneracao credenciada"
  >
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-xl md:text-2xl font-bold text-foreground flex items-center gap-3">
        <Store class="w-5 h-5 text-emerald-600" /> Códigos MCC
      </h2>
      <span class="text-xs md:text-sm font-mono bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1.5 rounded-lg font-bold shadow-sm">
        {{ filteredMCCs.length }} encontrados
      </span>
    </div>

    <!-- Barra de Pesquisa -->
    <div class="bg-card p-4 md:p-5 rounded-xl border border-border shadow-sm mb-5">
      <div class="relative w-full">
        <Search class="w-4 h-4 absolute left-4 top-3.5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por código MCC, nome, produtos ou uso..."
          class="w-full bg-muted border border-border rounded-lg pl-11 pr-10 py-3 text-sm md:text-base focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-foreground placeholder:text-muted-foreground shadow-inner"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-4 top-3.5 text-muted-foreground hover:text-red-500 transition-colors" title="Limpar">
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Tabela de Resultados -->
    <div class="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div class="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar scroll-smooth">
        <table class="w-full text-left border-collapse text-sm min-w-[800px]">
          <thead class="sticky top-0 z-10 bg-muted shadow-sm">
            <tr class="text-muted-foreground border-b border-border">
              <th class="py-3 px-6 font-bold w-24 uppercase text-[10px] tracking-wider">MCC</th>
              <th class="py-3 px-6 font-bold w-1/4 uppercase text-[10px] tracking-wider">Nome</th>
              <th class="py-3 px-6 font-bold uppercase text-[10px] tracking-wider">Produtos</th>
              <th class="py-3 px-6 font-bold uppercase text-[10px] tracking-wider">Onde Pode Usar</th>
              <th class="py-3 px-6 font-bold uppercase text-[10px] tracking-wider text-center">Taxas</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">

            <tr v-if="filteredMCCs.length === 0">
              <td colspan="5" class="py-12 text-center text-muted-foreground">
                <Ghost class="w-8 h-8 mb-3 mx-auto opacity-50" />
                Nenhum código MCC encontrado para "<strong>{{ searchQuery }}</strong>".
              </td>
            </tr>

            <tr v-for="(item, index) in filteredMCCs" :key="index" class="searchable-item hover:bg-muted/50 transition-colors group">
              <td class="py-3 px-6 align-top">
                <div class="flex items-center gap-2">
                  <span class="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded shadow-sm border border-emerald-100 dark:border-emerald-800/50">
                    {{ item.codigo }}
                  </span>
                  <button @click="copyText($event, item.codigo)" class="text-muted-foreground hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100" title="Copiar MCC">
                    <Copy class="w-3 h-3" />
                  </button>
                </div>
              </td>
              <td class="py-3 px-6 align-top">
                <div class="font-bold text-foreground mb-1">{{ item.nome }}</div>
                <div v-if="item.observacoes" class="text-[10px] text-muted-foreground bg-amber-50 dark:bg-amber-900/10 p-1.5 rounded border border-amber-100 dark:border-amber-800/30">
                  <Info class="w-3 h-3 text-amber-500 inline mr-1" /> {{ item.observacoes }}
                </div>
              </td>
              <td class="py-3 px-6 align-top">
                <span class="px-2 py-1 bg-muted text-foreground rounded text-xs font-medium whitespace-nowrap">
                  {{ item.produtos }}
                </span>
              </td>
              <td class="py-3 px-6 text-xs text-muted-foreground leading-relaxed align-top">
                <div><strong>Uso:</strong> {{ item.uso }}</div>
                <div v-if="item.exemplo" class="mt-1 text-[10px] italic">Ex: {{ item.exemplo }}</div>
              </td>
              <td class="py-3 px-6 align-top">
                <div class="flex flex-col gap-1 items-center">
                  <div class="text-[10px] text-muted-foreground font-mono flex items-center justify-between w-full bg-muted px-2 py-1 rounded border border-border">
                    <span>Remuneração:</span>
                    <strong class="text-foreground">{{ formatPercent(item.remuneracao) }}</strong>
                  </div>
                  <div class="text-[10px] text-muted-foreground font-mono flex items-center justify-between w-full bg-muted px-2 py-1 rounded border border-border">
                    <span>NFC:</span>
                    <strong class="text-foreground">{{ formatPercent(item.nfc) }}</strong>
                  </div>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class="p-3 bg-muted/50 border-t border-border text-xs text-muted-foreground text-center">
        Todos os MCCs não listados acima ficam com remuneração de <strong class="text-foreground">0,70%</strong>.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Copy, Ghost, Info, Search, Store, X } from '@lucide/vue'
import { copyText } from '../../utils'

const searchQuery = ref('')

const formatPercent = (val) => {
  if (!val || isNaN(parseFloat(val))) return '-';
  return (parseFloat(val) * 100).toFixed(2).replace('.', ',') + '%';
}

const mccs = [
  { codigo: "5300", nome: "Clube de Compras no Atacado", produtos: "Alimentação(PAT)", uso: "Venda por atacado", exemplo: "Sams Club / atacarejos (Combo)", observacoes: "Geralmente não é aceito para cartões benefícios, pois esses estabelecimentos vendem produtos variados, não exclusivamente alimentícios.", remuneracao: "0.017", nfc: "0.002" },
  { codigo: "5411", nome: "Supermercados e Mercearias", produtos: "Alimentação(PAT)", uso: "Supermercados e mercados.", exemplo: "Giassi", observacoes: "Inclui supermercados, hipermercados e atacarejos que vendem alimentos in natura, industrializados e outros produtos para consumo doméstico.", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5422", nome: "Açougues", produtos: "Alimentação(PAT)", uso: "Açougues.", exemplo: "Casa de carnes", observacoes: "Específico para carnes e produtos relacionados.", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5441", nome: "Lojas de doces e balas", produtos: "Alimentação(PAT)", uso: "Loja especializada", exemplo: "Cacau Show", observacoes: "", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5451", nome: "Laticínios", produtos: "Alimentação(PAT)", uso: "Loja que vende queijos e derivados", exemplo: "Casa de Queijos", observacoes: "Inclui feiras, hortifrutis e similares.", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5462", nome: "Padarias (somente para itens não prontos para consumo)", produtos: "Alimentação(PAT)", uso: "Padarias tradicionais, que não vendem refeições prontas", exemplo: "Padaria da Tia Isabel", observacoes: "Para pães, bolos e outros produtos relacionados.", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5499", nome: "Lojas especializadas em alimentos diversos", produtos: "Alimentação(PAT)", uso: "Lojas especializadaem alimentos", exemplo: "Mundo Verde", observacoes: "Mercearias, empórios e lojas de produtos alimentícios variados.", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5462", nome: "Padarias (somente para itens não prontos para consumo)", produtos: "Refeição (PAT)", uso: "Padarias.", exemplo: "Padaria da Tia Isabel", observacoes: "Para pães, bolos e outros produtos relacionados.", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5811", nome: "Distribuição e Produção de Alimento", produtos: "Refeição (PAT)", uso: "Distribuidores de refeições congeladas ou prontas, empresas de buffet,  restaurantes industriais", exemplo: "Liv Up", observacoes: "Distribuição e produção de alimentos", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5812", nome: "Restaurantes de serviço completo", produtos: "Refeição (PAT)", uso: "Restaurante tradicional", exemplo: "Outback", observacoes: "Pode ser que iFood use este", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5813", nome: "Bares e pubs (se permitido pelo emissor)", produtos: "Refeição (PAT)", uso: "Bar especializado em refeição", exemplo: "Boteco São Bento", observacoes: "", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5814", nome: "Lanchonetes de comidas rápidas", produtos: "Refeição (PAT)", uso: "Fast Foods", exemplo: "Subway", observacoes: "", remuneracao: "0.023", nfc: "0.002" },
  { codigo: "5733", nome: "Loja instrumento musicais", produtos: "Cultura", uso: "Venda de instrumentos musicais, acessórios e equipamentos de áudio", exemplo: "Multisom", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "5942", nome: "Livrarias", produtos: "Cultura", uso: "Livrarias", exemplo: "Livraria Catarinense", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "5994", nome: "Lojas de livros e revistas", produtos: "Cultura", uso: "Banca de jornal e provedor de notícias", exemplo: "Saraiva", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "7832", nome: "Cinemas", produtos: "Cultura", uso: "Cinemas, produções cinematográficas", exemplo: "Cinemark", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "7922", nome: "Teatros e espetáculos ao vivo", produtos: "Cultura", uso: "Teatros, produc. teatr. e espetáculos", exemplo: "Teatro de SP", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "7991", nome: "Serviços recreativos culturais", produtos: "Cultura", uso: "Atrações turísticas e exposições, museus, parques culturais)", exemplo: "Museu do Amanhã", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "7996", nome: "Parques de diversão e circos", produtos: "Cultura", uso: "Ingressos e serviços de parques temáticos", exemplo: "Beto Carrero", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "7999", nome: "Serviços de entretenimento e recreação diversos", produtos: "Cultura", uso: "Genérico para estabelecimentos de lazer que não se enquadram em categorias específicas", exemplo: "Escape rooms, boliches, paintball, casas de jogos e recreação.", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "5735", nome: "Lojas de Entretenimento Digital", produtos: "Cultura", uso: "Estabelecimentos que vendem jogos, streaminh e conteúdo digital", exemplo: "Netflix", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "4111", nome: "Empresas de transporte urbano e suburbanos", produtos: "Mobilidade", uso: "Passageiros Diários de Transporte\nSuburbano e Local, incluindo Travessias em Balsas", exemplo: "Metro, ônibus", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "4112", nome: "Ferrovias de Passageiros", produtos: "Mobilidade", uso: "Transporte de passageiros em trem (longa distância)", exemplo: "-", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "4131", nome: "Linhas de ônibus", produtos: "Mobilidade", uso: "Companhias de ônibus", exemplo: "TCL", observacoes: "", remuneracao: "0.0198", nfc: "0.0" },
  { codigo: "4121", nome: "Táxis e transporte por aplicativo", produtos: "Mobilidade", uso: "Táxis e transporte por aplicativo", exemplo: "Uber, 99, Cabify", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "4784", nome: "Pedágios", produtos: "Mobilidade", uso: "Pedágios e passes eletrônicos", exemplo: "Sem Parar", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "7512", nome: "Aluguel de automóveis", produtos: "Mobilidade", uso: "Locação de carros", exemplo: "Localiza", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "5541", nome: "Postos de gasolina", produtos: "Mobilidade", uso: "Postos de gasolina", exemplo: "Premier", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "5542", nome: "Postos de gasolina com loja de conveniência", produtos: "Mobilidade", uso: "Postos de gasolina", exemplo: "Premier Coffee", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "4789", nome: "Outros Serviços de transporte", produtos: "Mobilidade", uso: "Pedágio, estacionamentos", exemplo: "Pédagio Via SC", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "7523", nome: "Estacionamentos pagos e valet", produtos: "Mobilidade", uso: "Estacionamentos pagos e valet", exemplo: "Estacionamento Aeroporto", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "7542", nome: "Serviço de Lavação", produtos: "Mobilidade", uso: "Serviços de reboque e assistência veicular", exemplo: "Reboque 123", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8211", nome: "Educação primária e secundária", produtos: "Educação", uso: "Escolas e ensino fundamental/médio", exemplo: "Colégio Energia", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8220", nome: "Universidades e faculdades", produtos: "Educação", uso: "Faculdades e universidades", exemplo: "Unisul", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8241", nome: "Escolas de cursos técnicos e vocacionais", produtos: "Educação", uso: "Escolas de cursos técnicos e vocacionais", exemplo: "Senai", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8244", nome: "Escola de negócios e administração", produtos: "Educação", uso: "Instituições que oferecem cursos de gestão, MBA e administração", exemplo: "Insper", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8249", nome: "Escola de negócios/vocações", produtos: "Educação", uso: "Refere-se a cursos técnicos, profissionalizantes e escolas de idiomas.", exemplo: "Wizard", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8299", nome: "Outras escolas de treinamento e educação continuada", produtos: "Educação", uso: "Categoria mais genérica de cursos de reforço", exemplo: "Kumon", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8351", nome: "Serviços de cuidados de crianças", produtos: "Educação", uso: "Creches e pré-escolas", exemplo: "Creche Colorir", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "5912", nome: "Farmácias e drogarias", produtos: "Saúde", uso: "Farmácias e drogarias", exemplo: "Masterfarma", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "5975", nome: "Vendas e Serviços de aparelhos auditivos", produtos: "Saúde", uso: "Loja de produtos de beleza, perucas e extensões capilares", exemplo: "Sephora", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "5976", nome: "Bens ortopédicos e próteses", produtos: "Saúde", uso: "Bens ortopédicos e próteses", exemplo: "Loja de Bens ortopédicos e próteses", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8011", nome: "Clínicas médicas gerais", produtos: "Saúde", uso: "Clínicas médicas gerais", exemplo: "Provida", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8021", nome: "Dentistas e ortodontistas", produtos: "Saúde", uso: "Dentistas e ortodontistas", exemplo: "Biodente", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8031", nome: "Osteopatia", produtos: "Saúde", uso: "Osteopatia", exemplo: "Clínica de Osteopatia", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8041", nome: "Quiropraxia e Fisioterapia", produtos: "Saúde", uso: "Quiropraxia e Fisioterapia", exemplo: "Clínica Fisio", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8042", nome: "Oftalmologista e optometristas", produtos: "Saúde", uso: "Oftalmologista e optometristas", exemplo: "Clínica dos Olhos", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8049", nome: "Outras especialidades médicas", produtos: "Saúde", uso: "Fonoaudiologia, nutrição, psicologia", exemplo: "Nutri Anna", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8050", nome: "Casas de repouso, recuperação e enfermagem", produtos: "Saúde", uso: "Casas de repouso, recuperação e enfermagem", exemplo: "Lar dos Velhinhos", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8062", nome: "Hospitais gerais", produtos: "Saúde", uso: "Hospitais privados, clínicas e pronto-socorros", exemplo: "", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8071", nome: "Análises clínicas médicas e dentais", produtos: "Saúde", uso: "Exames laboratoriais, análises clínicas e diagnósticos", exemplo: "Dasa", observacoes: "", remuneracao: "0.007", nfc: "0.0" },
  { codigo: "8099", nome: "Serviços médicos diversos", produtos: "Saúde", uso: "Laboratórios, exames", exemplo: "Laboratório Sta. Luzia", observacoes: "", remuneracao: "0.007", nfc: "0.0" }
];

const filteredMCCs = computed(() => {
  if (!searchQuery.value) return mccs;
  
  const q = searchQuery.value.toLowerCase();
  return mccs.filter(item => 
    item.codigo.toLowerCase().includes(q) || 
    item.nome.toLowerCase().includes(q) ||
    item.produtos.toLowerCase().includes(q) ||
    item.uso.toLowerCase().includes(q) ||
    item.exemplo.toLowerCase().includes(q)
  );
});
</script>

<style scoped>
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
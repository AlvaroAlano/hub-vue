<template>
  <section id="knowledge">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
        <BookOpen class="w-5 h-5 text-brand-600" /> Base de Conhecimento
      </h2>
      <span v-if="!isSearching" class="text-xs font-mono text-muted-foreground">{{ totalCards }} tutoriais</span>
    </div>
  <Transition :name="transitionName" mode="out-in">
  <div class="flex flex-col gap-2" :key="currentPage">

      <TutorialCard
        v-if="isVisible(1)"
        title="Exclusão de Funcionários (cad_947)"
        summary="Remover funcionários sem movimentação." 
        icon="fa-user-minus" 
        colorBg="bg-red-100" 
        colorText="text-red-600"
      >
        <div>
            <p class="mb-2">Está disponível no módulo <code class="bg-muted px-1 rounded text-xs">/adm/cad_947</code> a tela que permite realizar a exclusão de funcionários sem movimentação.</p>
            <p class="text-xs text-muted-foreground">A exclusão pode ser realizada utilizando filtros de Administradora, Conveniada, intervalo de códigos ou pela opção "Informar funcionários por código".</p>
        </div>
        <div class="bg-card p-4 rounded border border-border">
            <strong class="block mb-3 text-xs uppercase text-muted-foreground tracking-wider">Formato para informar códigos</strong>
            <div class="mb-4">
                <span class="text-xs font-bold text-foreground">Exemplos:</span>
                <code class="block mt-1 bg-muted p-2 rounded text-xs font-mono text-blue-600 dark:text-blue-400">1, 1-1, 2-0</code>
            </div>
            <strong class="block mb-2 text-xs font-bold text-foreground">Regras de Interpretação:</strong>
            <ul class="list-disc list-inside text-xs space-y-2 text-muted-foreground mb-4">
                <li><strong>Código sem "-x" (ex: 1):</strong> Sistema considera como <span class="font-mono">1-0</span> (Titular).</li>
                <li><strong>Código com "-x" (ex: 1-1):</strong> Número antes do hífen é o Titular. Número após é o <span class="font-mono">cod_seqfunc</span> do dependente.</li>
                <li><strong>Valor -0:</strong> Sempre representa o titular.</li>
            </ul>
            <div class="bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-100 dark:border-blue-900/30">
                <strong class="block mb-1 text-xs text-blue-700 dark:text-blue-300">Exemplos Práticos:</strong>
                <ul class="text-xs font-mono text-blue-600 dark:text-blue-400 space-y-1">
                    <li>1 &rarr; Titular 1 (1-0)</li>
                    <li>1-1 &rarr; Titular 1, Dependente 1</li>
                    <li>2-0 &rarr; Titular 2</li>
                </ul>
            </div>
        </div>
        <div>
            <strong class="block mb-2 text-foreground">Seleção de Funcionários</strong>
            <p class="text-xs mb-3 text-muted-foreground">É possível definir quais registros serão considerados:</p>
            <ul class="space-y-3 text-xs">
                <li class="flex gap-2"><Check class="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <div><strong class="text-foreground">Todos</strong>
                        <p class="text-muted-foreground">Considera todos os funcionários sem movimento conforme filtros.</p>
                    </div>
                </li>
                <li class="flex gap-2"><Check class="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <div><strong class="text-foreground">Excluir somente dependentes</strong>
                        <p class="text-muted-foreground">Remove apenas dependentes sem movimentação.</p>
                    </div>
                </li>
                <li class="flex gap-2"><Check class="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <div><strong class="text-foreground">Excluir somente nomes repetidos (últimos)</strong>
                        <p class="text-muted-foreground">Remove duplicados, mantendo o primeiro cadastro.</p>
                    </div>
                </li>
                <li class="flex gap-2"><Check class="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <div><strong class="text-foreground">Excluir somente CPFs repetidos (últimos)</strong>
                        <p class="text-muted-foreground">Remove CPF duplicado, mantendo o primeiro cadastro.</p>
                    </div>
                </li>
                <li class="flex gap-2"><Check class="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <div><strong class="text-foreground">Limpar estoque no name</strong>
                        <p class="text-muted-foreground">Remove registros residuais associados ao cadastro.</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 rounded-r text-red-700 dark:text-red-300 text-xs">
            <AlertTriangle class="w-3 h-3 inline mr-1" /> <strong>Obs.:</strong> Recomendamos revisar os filtros antes da exclusão, pois o processo <u>remove definitivamente</u> os registros que não possuem movimentação.
        </div>
      </TutorialCard>

<TutorialCard
        v-if="isVisible(2)"
        title="Repasse de Credenciadas via PIX"
        summary="Configuração de pagamentos (API ou CNAB240) e resolução de problemas de ISPB." 
        icon="fa-money-bill-transfer" 
        colorBg="bg-teal-100" 
        colorText="text-teal-600"
      >
        <div class="space-y-6">
            <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm border border-teal-200 dark:border-teal-900">1</div>
                <div class="flex-1">
                    <h5 class="font-bold text-foreground mb-2">Habilitar Pagamentos (API PIX ou CNAB240)</h5>
                    <p class="mb-3 text-muted-foreground text-xs">
                        Acesse a tela <code class="bg-muted px-1 rounded font-mono">/adm/cad_925</code> (Inf. Banc. Remessa de Créd. por Administ) para realizar a configuração. O processo é simples: basta localizar o campo <strong>Tipo pagamentos PIX</strong> e escolher a modalidade.
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div class="bg-card p-3 rounded border border-border shadow-sm">
                            <strong class="block text-foreground mb-1 text-xs uppercase tracking-wider">
                                <CloudUpload class="w-3 h-3 inline mr-1 text-teal-500" /> Pagamento API PIX
                            </strong>
                            <p class="text-xs text-muted-foreground">
                                Selecione a opção <strong class="text-teal-700 dark:text-teal-400">Habilitado via API</strong>. Apenas alterando este campo, a configuração já estará ativa.
                            </p>
                        </div>
                        <div class="bg-card p-3 rounded border border-border shadow-sm">
                            <strong class="block text-foreground mb-1 text-xs uppercase tracking-wider">
                                <Receipt class="w-3 h-3 inline mr-1 text-teal-500" /> Pagamento CNAB240
                            </strong>
                            <p class="text-xs text-muted-foreground">
                                Selecione a opção <strong class="text-teal-700 dark:text-teal-400">Habilitado via arquivo remessa CNAB240</strong>. Apenas alterando este campo, a configuração já estará ativa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm border border-teal-200 dark:border-teal-900">2</div>
                <div class="flex-1">
                    <h5 class="font-bold text-foreground mb-2">Tratamento de Erro de ISPB</h5>
                    <p class="mb-3 text-muted-foreground text-xs">
                        Os bancos já possuem um ISPB padrão configurado no sistema. No entanto, alguns bancos possuem mais de um ISPB e o padrão pode não funcionar para o repasse PIX.
                    </p>
                    
                    <div class="bg-muted/50 p-3 rounded border border-border mb-3 shadow-sm">
                        <strong class="block text-foreground mb-1 text-xs uppercase tracking-wider">
                            <Search class="w-3 h-3 inline mr-1 text-muted-foreground" /> Onde o erro aparece?
                        </strong>
                        <p class="text-xs text-muted-foreground">
                            Na tela de Geração (<code class="bg-muted px-1 rounded font-mono text-foreground">/grupoadmin/cad_886</code>), verifique a coluna <strong>Ocorrência</strong> da listagem. Se houver alguma mensagem relacionada ao ISPB, o ajuste manual é necessário.
                        </p>
                    </div>

                    <div class="bg-muted/50 p-3 rounded border border-border shadow-sm">
                        <strong class="block text-foreground mb-1 text-xs uppercase tracking-wider">
                            <Wrench class="w-3 h-3 inline mr-1 text-muted-foreground" /> Como corrigir?
                        </strong>
                        <p class="text-xs text-muted-foreground mb-2">
                            Acesse o Cadastro de Credenciadas (<code class="bg-muted px-1 rounded font-mono text-foreground">cad_905</code>) e insira o código manualmente:
                        </p>
                        <ol class="list-decimal list-inside text-xs text-foreground ml-1 space-y-1.5">
                            <li>Vá na seção <strong>Dados conta corrente</strong>.</li>
                            <li>Preencha o campo <strong>ISPB</strong> com o código que funcione para esta função.</li>
                            <li>Clique em <strong class="text-green-600 dark:text-green-500">Salvar novos dados bancários</strong>.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
      </TutorialCard>

    <TutorialCard
        v-if="isVisible(3)"
        title="Configuração de Tarifas e Vínculo de Grupos (cad_926)"
        summary="Definição de regras de tarifas (TED, PIX, etc.) e agrupamento de remessa." 
        icon="fa-money-check-dollar" 
        colorBg="bg-fuchsia-100" 
        colorText="text-fuchsia-600"
      >
        <div class="space-y-6">
            <div>
                <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider">
                    <HandCoins class="w-3 h-3 inline mr-1 text-fuchsia-500" /> Regras de Tarifas
                </strong>
                <p class="text-xs text-muted-foreground mb-3">
                    Na tela <code class="bg-muted px-1 rounded font-mono">/adm/cad_926</code>, além dos dados bancários, você configura os valores cobrados nas operações de repasse para o grupo.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div class="bg-card p-3 rounded border border-border shadow-sm">
                        <span class="text-[10px] text-muted-foreground uppercase font-bold block mb-1">TED / DOC / Transferência</span>
                        <p class="text-xs text-foreground">
                            Preencha o <strong>Vlr. taxa</strong> e o <strong>Vlr. inicial</strong> (a partir de qual valor do repasse a taxa começa a ser cobrada) nos seus respectivos blocos.
                        </p>
                    </div>
                    <div class="bg-card p-3 rounded border border-border shadow-sm">
                        <span class="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Pagamentos via PIX</span>
                        <p class="text-xs text-foreground">
                            Possui seus próprios campos de <strong>Vlr. taxa PIX</strong> e <strong>Vlr. inicial cob. taxa PIX</strong>, permitindo aplicar tarifas exclusivas ou zeradas para essa modalidade.
                        </p>
                    </div>
                </div>
            </div>

            <div class="h-px bg-border"></div>

            <div>
                <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider">
                    <Link class="w-3 h-3 inline mr-1 text-fuchsia-500" /> Regra de Vínculo: Grupo 2
                </strong>
                
                <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3 rounded-r text-yellow-800 dark:text-yellow-200 text-xs shadow-sm mb-3">
                    <AlertTriangle class="w-3 h-3 inline mr-1" /> <strong>Aviso do Sistema:</strong> Ao tentar acessar os dados do Grupo 2 diretamente, o sistema bloqueia e exibe: <em>"Atenção! Os dados de remessa de crédito deste grupo devem ser configurados no grupo 25."</em>
                </div>

                <div class="bg-card p-3 rounded border border-border shadow-sm">
                    <p class="text-xs text-muted-foreground mb-2">
                        <strong>Por que isso acontece?</strong> Por regra de negócio, o Grupo 2 não pode ter suas configurações de tarifas e repasse PIX feitas de forma independente por ele mesmo.
                    </p>
                    <p class="text-xs text-muted-foreground">
                        Para que o repasse funcione corretamente, toda a configuração pertinente ao Grupo 2 deve ser inserida dentro do <strong>Grupo 25</strong>, incluindo-o no campo <strong class="text-foreground">"Grupos para realizar pagamentos PIX (separado por vírgula)"</strong> da referida tela.
                    </p>
                </div>
            </div>
        </div>
      </TutorialCard>

      <TutorialCard
        v-if="isVisible(4)"
        title="Habilitar Múltiplos Créditos (Conveniada)"
        summary="Configuração de parâmetros e cadastro." 
        icon="fa-file-invoice-dollar" 
        colorBg="bg-indigo-100" 
        colorText="text-indigo-600"
      >
        <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">1</div>
            <div>
                <h5 class="font-bold text-foreground mb-2">Configuração de Parâmetros Globais</h5>
                <p class="mb-2 text-muted-foreground">Primeiro, é necessário ativar os parâmetros no nível da administradora e do grupo.</p>
                <ul class="list-disc list-inside space-y-2 ml-1 text-foreground">
                    <li>No <strong>Grupo de Administradora</strong>: Habilite o parâmetro <code class="bg-muted px-2 py-0.5 rounded text-xs border border-border font-mono text-foreground">LIBERARCAMPOMULTIPLOSCREDITOS</code></li>
                    <li>Na <strong>Administradora</strong>: Habilite o parâmetro <code class="bg-muted px-2 py-0.5 rounded text-xs border border-border font-mono text-foreground">FLG_BOLETOADICIONAL</code></li>
                </ul>
            </div>
        </div>
        <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">2</div>
            <div>
                <h5 class="font-bold text-foreground mb-2">Configuração no Cadastro</h5>
                <p class="mb-2 text-muted-foreground">Após ajustar os parâmetros, realize a alteração na conveniada:</p>
                <ol class="list-decimal list-inside space-y-1 ml-1 text-foreground">
                    <li>Acesse o <strong>Cadastro de Conveniadas</strong>.</li>
                    <li>Vá até a seção/aba <strong>Crédito</strong>.</li>
                    <li>Localize a opção <strong>Liberar lançamento de múltiplos créditos</strong>.</li>
                    <li>Altere o valor para <strong class="text-green-600">SIM</strong>.</li>
                </ol>
            </div>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-3 rounded-r text-yellow-800 dark:text-yellow-200 text-xs font-medium">
            <AlertTriangle class="w-3 h-3 inline mr-1" /> <strong>Nota:</strong> Certifique-se de salvar as alterações em cada etapa para que a configuração tenha efeito.
        </div>
      </TutorialCard>

      <TutorialCard
        v-if="isVisible(5)"
        title="Habilitar Webhook Sicredi"
        summary="Configuração para baixa automática de boletos." 
        icon="fa-code-branch" 
        colorBg="bg-green-100" 
        colorText="text-green-600"
      >
        <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm border border-green-200 dark:border-green-900">1</div>
            <div class="flex-1">
                <h5 class="font-bold text-foreground mb-2">Criar Usuário do Robô</h5>
                <p class="mb-2 text-muted-foreground">Acesse a tela <code class="bg-muted px-1 rounded text-xs font-mono">/adm/cad_872</code> na administradora ou grupo de administradoras e cadastre:</p>
                <div class="bg-muted/50 p-3 rounded border border-border mb-3">
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold text-muted-foreground uppercase">Nome de Usuário (Login)</span>
                        <button @click="copyText($event, 'baixa.sicredi.automatica')" class="text-xs text-brand-600 hover:text-brand-800 flex items-center gap-1">
                            <Copy class="w-3 h-3" /> Copiar
                        </button>
                    </div>
                    <code class="block text-sm font-mono text-foreground mt-1">baixa.sicredi.automatica</code>
                </div>
                <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-2 text-red-700 dark:text-red-300 text-xs">
                    <AlertCircle class="w-3 h-3 inline mr-1" /> <strong>IMPORTANTE:</strong> Após salvar, anote o <strong>CÓDIGO (ID)</strong> gerado pelo sistema para este usuário. Você precisará dele no próximo passo.
                </div>
            </div>
        </div>
        <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm border border-green-200 dark:border-green-900">2</div>
            <div class="flex-1">
                <h5 class="font-bold text-foreground mb-2">Configurar Parâmetro</h5>
                <p class="mb-2 text-muted-foreground">Se for Grupo, acesse <code class="bg-muted px-1 rounded text-xs font-mono">cad_909</code>.<br>Se for Administradora, acesse <code class="bg-muted px-1 rounded text-xs font-mono">cad_906</code>.</p>
                <p class="text-muted-foreground mb-2">Localize ou crie o parâmetro abaixo:</p>
                <div class="bg-muted/50 p-3 rounded border border-border">
                    <div class="mb-2">
                        <span class="text-[10px] text-muted-foreground uppercase font-bold">Parâmetro</span>
                        <div class="flex items-center gap-2">
                            <code class="text-xs font-mono text-blue-600 dark:text-blue-400 break-all">HABILITA_BAIXA_BOLETO_WEBHOOK</code>
                            <button @click="copyText($event, 'HABILITA_BAIXA_BOLETO_WEBHOOK')" class="text-muted-foreground hover:text-primary">
                                <Copy class="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <span class="text-[10px] text-muted-foreground uppercase font-bold">Campo 1 (Habilita)</span>
                            <div class="font-bold text-green-600">SIM</div>
                        </div>
                        <div>
                            <span class="text-[10px] text-muted-foreground uppercase font-bold">Campo 2 (Valor)</span>
                            <div class="font-bold text-foreground text-xs bg-yellow-100 dark:bg-yellow-900/40 px-2 py-0.5 rounded inline-block">CÓDIGO DO USUÁRIO</div>
                            <div class="text-[10px] text-muted-foreground mt-0.5">(Código numérico obtido no passo 1)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </TutorialCard>

        <TutorialCard
            v-if="isVisible(6)"
            title="Configuração de API p/ Boletos (Sicoob)"
            summary="Solicitação de dados, certificados e setup de webhook para baixa automática." 
            icon="fa-file-invoice" 
            colorBg="bg-emerald-100" 
            colorText="text-emerald-600"
        >
        <div class="space-y-8">
            <div>
                <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider">
                    <ClipboardList class="w-3 h-3 inline mr-1 text-emerald-500" /> 1. Informações a solicitar ao Cliente
                </strong>
                
                <div class="bg-muted/50 rounded-lg border border-border overflow-hidden shadow-sm mb-4">
                    <div class="bg-muted px-3 py-2 flex justify-between items-center border-b border-border">
                        <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            <Mail class="w-3 h-3 inline mr-1" /> Modelo de Mensagem / E-mail
                        </span>
                        <button 
                            @click="copyText($event, 'Bom dia!\n\nPara habilitar a cobrança registrada online (via API), é necessário o envio das informações abaixo:\n\n- Rede:\n- Banco:\n- Agência:\n- Conta corrente:\n- Chave Aleatória:\n- Client ID:\n- Secret ID (Não é necessário para API do Sicoob):\n\nAlém dos dados bancários, precisamos do Certificado Digital. Por favor, envie o certificado no formato .p12 (ou .PEM acompanhado de um arquivo .KEY e sua senha).\n\nFico no aguardo.')" 
                            class="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors font-medium"
                        >
                            <Copy class="w-3 h-3" /> Copiar Modelo
                        </button>
                    </div>
                    <div class="p-4 text-xs text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed">Bom dia!

Para habilitar a cobrança registrada online (via API), é necessário o envio das informações abaixo:

- Rede:
- Banco:
- Agência:
- Conta corrente:
- Chave Aleatória:
- Client ID:
- Secret ID (Não é necessário para API do Sicoob):

Além dos dados bancários, precisamos do Certificado Digital. Por favor, envie o certificado no formato .p12 (ou .PEM acompanhado de um arquivo .KEY e sua senha).

Fico no aguardo.</div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <strong class="block text-foreground mb-2 uppercase text-xs tracking-wider">
                        <ShieldCheck class="w-3 h-3 inline mr-1 text-emerald-500" /> 2. Certificados
                    </strong>
                    <div class="bg-muted/50 p-3 rounded border border-border text-xs text-muted-foreground h-full">
                        <p class="mb-2">O cliente deve enviar o certificado no formato <strong>.p12</strong>.</p>
                        <p>Caso não consigam, também é aceito o envio de um certificado <strong>.PEM</strong> acompanhado de um arquivo com a senha <strong>.KEY</strong>.</p>
                    </div>
                </div>

                <div>
                    <strong class="block text-foreground mb-2 uppercase text-xs tracking-wider">
                        <Ticket class="w-3 h-3 inline mr-1 text-emerald-500" /> 3. Repasse ao DSV
                    </strong>
                    <div class="bg-orange-50 dark:bg-orange-900/10 p-3 rounded border border-orange-200 dark:border-orange-900/30 text-xs text-orange-800 dark:text-orange-300 h-full">
                        Após reunir <strong>todas</strong> as informações bancárias e os arquivos dos certificados, abra um ticket para a equipe de DSV (Desenvolvimento) realizar a implantação na infraestrutura.
                    </div>
                </div>
            </div>

            <div class="pt-2">
                <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider">
                    <Settings class="w-3 h-3 inline mr-1 text-emerald-500" /> 4. Configurações no Sistema
                </strong>
                <ol class="list-decimal list-inside space-y-4 text-xs text-foreground ml-1">
                    <li>
                        <strong>Atualizar Dados Bancários:</strong> Acesse a tela <code class="bg-muted px-1 rounded font-mono">cad_804</code> (Inf. Bancárias Boleto Registrado) e configure os dados de cobrança recebidos.
                    </li>
                    <li>
                        <strong>Criar Usuário Robô:</strong> Acesse a tela <code class="bg-muted px-1 rounded font-mono">cad_872</code> e cadastre o usuário de integração. Exemplo Sicoob: 
                        <div class="inline-flex items-center gap-2 mt-1.5 ml-4">
                            <code class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 border border-blue-100 dark:border-blue-900/30 rounded font-mono font-bold select-all">baixa.sicoob.automatica</code>
                            <button @click="copyText($event, 'baixa.sicoob.automatica')" class="text-muted-foreground hover:text-primary transition-colors">
                                <Copy class="w-3 h-3" />
                            </button>
                        </div>
                    </li>
                    <li>
                        <strong>Ativar Baixa Automática (Opcional):</strong> Se o cliente desejar baixa automática via Webhook, ative o parâmetro <code class="bg-muted px-1 rounded font-mono select-all">HABILITA_BAIXA_BOLETO_WEBHOOK</code> inserindo o ID gerado no passo anterior.
                        <div class="mt-1.5 ml-4 text-[10px] text-muted-foreground italic">
                            * Veja o card "Habilitar Webhook Sicredi" nesta mesma página para ver o passo a passo detalhado do parâmetro.
                        </div>
                    </li>
                </ol>
            </div>
        </div>
      </TutorialCard>

      <TutorialCard
        v-if="isVisible(7)"
        title="Recuperação de Senha (Pay/Util)"
        summary="Procedimento via Logs no Monitoramento." 
        icon="fa-key" 
        colorBg="bg-red-100" 
        colorText="text-red-600"
      >
        <div class="space-y-2">
            <ol class="list-decimal list-inside space-y-2">
                <li>Acesse o <strong>Monitoramento > Gerenciamento de Aplicações</strong>.</li>
                <li>Filtre por <strong>"Convcard Pay"</strong> e abra a aplicação <strong>"API Gateway MSG"</strong>.</li>
                <li>Em outra aba, acesse o site do Pay, coloque o CNPJ e clique em "Recuperar Senha".</li>
                <li>Volte ao log, copie a URL de recuperação gerada.</li>
                <li>Acesse a URL e altere a senha para <strong class="select-all text-red-500">1234</strong>.</li>
            </ol>
        </div>
      </TutorialCard>

      <TutorialCard
        v-if="isVisible(8)"
        title="Outros Procedimentos Rápidos e Informações"
        summary="Remessa, Histórico e Tipos de Rede." 
        icon="fa-list-check" 
        colorBg="bg-gray-100" 
        colorText="text-gray-600"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div><strong class="block mb-1">Para gerar remessa de crédito:</strong>
                <ul class="list-disc list-inside text-xs">
                    <li>Verificar se banco está cadastrado na tela <code class="bg-gray-200 px-1 rounded">/adm/cad_925</code>.</li>
                    <li>Sequencial deve iniciar com 1 (tabela cadrbcrd).</li>
                    <li>Contas a pagar baixado.</li>
                </ul>
            </div>
            <div class="h-px bg-border"></div>
            <div><strong class="block mb-1">Tipos de Rede:</strong>
                <ul class="list-disc list-inside text-xs">
                    <li><strong>PAT:</strong> Pagamento Antecipado (Pré-pago).</li>
                    <li><strong>Convênio:</strong> Crédito liberado na data estipulada.</li>
                </ul>
            </div>
            <div class="h-px bg-border"></div>
            <div><strong class="block mb-1">Configurar Histórico (Trier):</strong>
                <p class="text-xs">Financeiro > Caixas > Cadastro > Histórico: Verifique nº da ENTRADA.<br>Diversos > Config > "Gerar recebimento Cartão PF no Caixa": SIM. "Cód Histórico": Nº da ENTRADA.</p>
            </div>
        </div>
      </TutorialCard>

      <TutorialCard
        v-if="isVisible(9)"
        title="Configuração Quicktext (E-mails Padrão)"
        summary="Instalação da extensão e importação dos modelos de resposta para o Thunderbird." 
        icon="fa-bolt" 
        colorBg="bg-cyan-100" 
        colorText="text-cyan-600"
      >
        <div class="bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-900/30 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <strong class="text-cyan-800 dark:text-cyan-200 block mb-1">Arquivo de Configuração</strong>
                <p class="text-xs text-cyan-600 dark:text-cyan-400">Baixe o arquivo XML com as respostas prontas antes de iniciar.</p>
            </div>
            <a href="/templates.json" download="templates.json" class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-2">
                <Download class="w-4 h-4" /> Baixar Modelos
            </a>
        </div>
        <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center font-bold text-sm border border-border">1</div>
            <div class="flex-1">
                <h5 class="font-bold text-foreground mb-2">Instalar a Extensão</h5>
                <ol class="list-decimal list-inside space-y-1 ml-1 text-foreground text-xs leading-relaxed">
                    <li>No Thunderbird, clique na <strong>Engrenagem (Configurações)</strong> <span class="text-muted-foreground">(canto inferior esquerdo)</span>.</li>
                    <li>Selecione <strong>"Extensões e Temas"</strong>.</li>
                    <li>Na barra de pesquisa, digite <code class="bg-muted px-1 rounded font-mono text-cyan-600">Quicktext</code>.</li>
                    <li>Vai abrir uma nova aba. Clique no botão verde <strong>"Adicionar ao Thunderbird"</strong> e confirme a instalação.</li>
                </ol>
            </div>
        </div>
        <div class="flex gap-4">
            <div class="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center font-bold text-sm border border-border">2</div>
            <div class="flex-1">
                <h5 class="font-bold text-foreground mb-2">Importar os Modelos</h5>
                <ol class="list-decimal list-inside space-y-1 ml-1 text-foreground text-xs leading-relaxed">
                    <li>Após instalar, clique no ícone do <strong>Quicktext</strong> que apareceu no topo do Thunderbird.</li>
                    <li>Na janela que abrir, vá na aba <strong>"Geral"</strong>.</li>
                    <li>Clique no botão <strong>Importar</strong> (lado direito).</li>
                    <li>Navegue até a pasta onde você baixou o arquivo e selecione-o.</li>
                    <li>Pronto! As respostas aparecerão na tela de composição de e-mail.</li>
                </ol>
            </div>
        </div>
      </TutorialCard>

      <TutorialCard
        v-if="isVisible(10)"
        title="Inativação de Seção do APP + Aviso"
        summary="Parâmetros e cad_994 para instabilidades." 
        icon="fa-power-off" 
        colorBg="bg-red-100" 
        colorText="text-red-600"
      >
        <div class="space-y-6 leading-relaxed">
            <div>
                <strong class="block text-foreground mb-2 uppercase text-xs tracking-wider"><Target class="w-3 h-3 inline mr-1 text-brand-500" /> Objetivo</strong>
                <p class="mb-2 text-xs text-muted-foreground">Procedimento para inativar (remover) um botão/funcionalidade do APP do usuário e exibir um comunicado. Utilizado principalmente em casos de:</p>
                <ul class="list-disc list-inside space-y-1 text-xs text-muted-foreground ml-1 font-medium">
                    <li>Instabilidade no parceiro bancário</li>
                    <li>Indisponibilidade de Pix ou Transferência FLEX</li>
                    <li>Indisponibilidade de Pagamento de Contas/Boletos</li>
                    <li>Não abastecimento de conta operacional</li>
                </ul>
            </div>

            <div class="bg-card p-4 rounded border border-border">
                <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider text-orange-600"><ToggleLeft class="w-3 h-3 inline mr-1" /> Parte 1 — Inativar Botão do App</strong>
                <div class="mb-4">
                    <span class="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Parâmetro:</span>
                    <div class="flex items-center gap-2">
                        <code class="text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-900/30 select-all">INATIVA_SECAO_APLICATIVO_USUARIO</code>
                        <button @click="copyText($event, 'INATIVA_SECAO_APLICATIVO_USUARIO')" class="text-muted-foreground hover:text-primary transition-colors">
                            <Copy class="w-3 h-3" />
                        </button>
                    </div>
                </div>
                <ol class="list-decimal list-inside space-y-2 text-xs text-muted-foreground">
                    <li><strong>Acessar Menu:</strong> ADM > Cadastros > Parâmetros por Grupo de Administradoras (ou módulo correspondente).</li>
                    <li><strong>Selecionar módulo correto:</strong> (Grupo Adm, Adm, Grupo Conv ou Conv). <span class="text-red-500 font-bold underline">Atenção: verifique o escopo antes de salvar!</span></li>
                    <li><strong>Configurar parâmetro:</strong> Valor para <strong class="text-green-600">SIM</strong>.</li>
                    <li><strong>Valor Aux 1:</strong> Selecionar a(s) seção(ões) inativadas (Ex: SAQUE VIA PIX, PAGAR CONTA, QR CODE, etc).</li>
                    <li><strong>Salvar.</strong> O botão desaparecerá do APP para o módulo selecionado.</li>
                </ol>
            </div>

            <div class="bg-card p-4 rounded border border-border">
                <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider text-blue-600"><Megaphone class="w-3 h-3 inline mr-1" /> Parte 2 — Cadastrar Aviso no APP</strong>
                <div class="mb-4 flex items-center gap-2">
                    <span class="text-[10px] text-muted-foreground uppercase font-bold block">Tela:</span>
                    <code class="text-xs font-mono bg-muted px-2 py-0.5 rounded text-foreground">/adm/cad_994</code>
                </div>
                <ol class="list-decimal list-inside space-y-2 text-xs text-muted-foreground">
                    <li>Inserir o texto validado com o cliente.</li>
                    <li>Definir período de validade.</li>
                    <li>Tipo de aviso: <strong>PERIGO - VERMELHO</strong>.</li>
                    <li>Seção aplicável (ex: SAQUE VIA PIX / PAGAR CONTA).</li>
                    <li>Definir escopo de visibilidade (mesmo módulo da inativação).</li>
                    <li>Situação: <strong class="text-green-600">ATIVO</strong>.</li>
                    <li>Salvar.</li>
                </ol>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-muted p-4 rounded border border-border">
                    <strong class="block text-foreground mb-2 text-xs uppercase"><ListChecks class="w-3 h-3 inline mr-1 text-muted-foreground" /> Fluxo Padrão</strong>
                    <ul class="list-disc list-inside text-xs space-y-1.5 text-muted-foreground">
                        <li>Confirmar instabilidade c/ área responsável.</li>
                        <li>Validar texto com cliente (se aplicável).</li>
                        <li>Inativar seção via parâmetro.</li>
                        <li>Cadastrar aviso no APP.</li>
                        <li>Validar no aplicativo.</li>
                        <li>Registrar chamado interno.</li>
                    </ul>
                </div>
                <div class="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded border border-yellow-200 dark:border-yellow-900/30">
                    <strong class="block text-yellow-800 dark:text-yellow-400 mb-2 text-xs uppercase"><AlertTriangle class="w-3 h-3 inline mr-1" /> Atenção & Retorno</strong>
                    <ul class="list-disc list-inside text-xs space-y-1.5 text-yellow-700 dark:text-yellow-500/80">
                        <li>Aviso deve ter a <strong>mesma seção</strong> inativada.</li>
                        <li>Confirmar se o escopo está correto.</li>
                        <li><strong>Nunca deixar ativo após normalização!</strong></li>
                        <li class="mt-2 font-bold text-foreground pt-2 border-t border-yellow-200 dark:border-yellow-900/50 list-none">🔄 Retorno à Normalidade:</li>
                        <li class="list-none pl-4 text-muted-foreground">1. Parâmetro INATIVA_SECAO: <strong>NÃO</strong></li>
                        <li class="list-none pl-4 text-muted-foreground">2. Aviso (cad_994): <strong>INATIVO</strong></li>
                    </ul>
                </div>
            </div>

            <div>
                <strong class="block text-foreground mb-3 uppercase text-xs tracking-wider"><Copy class="w-3 h-3 text-muted-foreground inline mr-1" /> Modelos de Texto</strong>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div class="border border-border rounded overflow-hidden">
                        <div class="bg-muted px-3 py-2 font-bold text-xs text-foreground border-b border-border">
                            🔵 Transferência FLEX / Valor
                        </div>
                        <div class="p-3 space-y-3 bg-card text-xs">
                            <div>
                                <p class="font-bold text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Modelo 1 (Instabilidade c/ Previsão)</p>
                                <p class="text-muted-foreground select-all italic bg-muted/50 p-2 rounded border border-border">"Estamos com instabilidade no serviço de Transferência FLEX devido a problema técnico junto ao banco parceiro. Nossa equipe já está atuando para normalização, com previsão de retorno até às __h de hoje. Agradecemos a compreensão."</p>
                            </div>
                            <div>
                                <p class="font-bold text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Modelo 2 (Indisponibilidade s/ Previsão)</p>
                                <p class="text-muted-foreground select-all italic bg-muted/50 p-2 rounded border border-border">"O serviço de Transferência FLEX está temporariamente indisponível devido a instabilidade operacional no banco parceiro. Estamos trabalhando para restabelecer o serviço o mais breve possível. Pedimos desculpas pelo transtorno."</p>
                            </div>
                            <div>
                                <p class="font-bold text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Modelo 3 (Falta de saldo operacional)</p>
                                <p class="text-muted-foreground select-all italic bg-muted/50 p-2 rounded border border-border">"O serviço de Transferência FLEX encontra-se temporariamente indisponível. Estamos realizando ajustes operacionais para normalização do serviço. Em breve estará disponível novamente."</p>
                            </div>
                        </div>
                    </div>

                    <div class="border border-border rounded overflow-hidden">
                        <div class="bg-muted px-3 py-2 font-bold text-xs text-foreground border-b border-border">
                            🟠 Pagamento de Contas / Boletos
                        </div>
                        <div class="p-3 space-y-3 bg-card text-xs">
                            <div>
                                <p class="font-bold text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Modelo 1 (Problema bancário c/ Previsão)</p>
                                <p class="text-muted-foreground select-all italic bg-muted/50 p-2 rounded border border-border">"O serviço de Pagamento de Contas e Boletos está temporariamente indisponível devido a instabilidade no banco parceiro. Estamos atuando para normalização, com previsão de retorno até às __h. Agradecemos a compreensão."</p>
                            </div>
                            <div>
                                <p class="font-bold text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Modelo 2 (Indisponibilidade geral)</p>
                                <p class="text-muted-foreground select-all italic bg-muted/50 p-2 rounded border border-border">"O pagamento de contas e boletos encontra-se temporariamente indisponível. Nossa equipe já está trabalhando para restabelecer o serviço o mais breve possível."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </TutorialCard>

      <TutorialCard
        v-if="isVisible(11)"
        title="Identificação de BINs e Prefixos"
        summary="Prefixos de cartões tradicionais e BINs da rede ELO." 
        icon="fa-credit-card" 
        colorBg="bg-blue-100" 
        colorText="text-blue-600"
      >
        <div class="space-y-6">
          <div>
            <strong class="block text-foreground mb-2 uppercase text-xs tracking-wider">
              <CreditCard class="w-3 h-3 inline mr-1 text-brand-500" /> Convcard Tradicional
            </strong>
            <div class="bg-card p-3 rounded border border-border flex items-center justify-between shadow-sm">
              <span class="text-sm font-medium text-foreground">Prefixo Padrão</span>
              <div class="flex items-center gap-2">
                <code class="font-mono font-bold text-foreground bg-muted px-2 py-1 rounded">639321</code>
                <button @click="copyText($event, '639321')" class="text-muted-foreground hover:text-primary transition-colors" title="Copiar prefixo">
                  <Copy class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <strong class="block text-foreground mb-2 uppercase text-xs tracking-wider">
              <Network class="w-3 h-3 inline mr-1 text-blue-500" /> BINs ELO
            </strong>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              <div class="bg-card p-3 rounded border border-border flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-sm">
                <span class="text-xs font-medium text-foreground">Util</span>
                <div class="flex items-center gap-2">
                  <code class="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-800">50901039</code>
                  <button @click="copyText($event, '50901039')" class="text-muted-foreground hover:text-primary transition-colors">
                    <Copy class="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div class="bg-card p-3 rounded border border-border flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-sm">
                <span class="text-xs font-medium text-foreground">Convcard</span>
                <div class="flex items-center gap-2">
                  <code class="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-800">50901049</code>
                  <button @click="copyText($event, '50901049')" class="text-muted-foreground hover:text-primary transition-colors">
                    <Copy class="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div class="bg-card p-3 rounded border border-border flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-sm">
                <span class="text-xs font-medium text-foreground">Convnet <span class="text-[10px] text-muted-foreground font-normal">(em uso - Pré-pago)</span></span>
                <div class="flex items-center gap-2">
                  <code class="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-800">50929487</code>
                  <button @click="copyText($event, '50929487')" class="text-muted-foreground hover:text-primary transition-colors">
                    <Copy class="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div class="bg-card p-3 rounded border border-border flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-sm">
                <span class="text-xs font-medium text-foreground">Convnet Novo</span>
                <div class="flex items-center gap-2">
                  <code class="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded border border-blue-100 dark:border-blue-800">50901050</code>
                  <button @click="copyText($event, '50901050')" class="text-muted-foreground hover:text-primary transition-colors">
                    <Copy class="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </TutorialCard>

    </div>
  </Transition>

    <div v-if="!isSearching && totalPages > 1" class="flex items-center justify-center gap-2 mt-6">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/30 hover:shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:shadow-none flex items-center gap-1"
      >
        <ChevronLeft class="w-4 h-4" /> Anterior
      </button>

      <span class="text-sm text-muted-foreground px-2 font-medium">
        Página {{ currentPage }} de {{ totalPages }}
      </span>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary/30 hover:shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:shadow-none flex items-center gap-1"
      >
        Próxima <ChevronRight class="w-4 h-4" />
      </button>
    </div>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import TutorialCard from '../TutorialCard.vue'
import {
  AlertCircle, AlertTriangle, BookOpen, Check, ChevronLeft, ChevronRight, ClipboardList, CloudUpload,
  Copy, CreditCard, Download, HandCoins, Link, ListChecks, Mail, Megaphone,
  Network, Receipt, Search, Settings, ShieldCheck, Target, Ticket, ToggleLeft, Wrench
} from '@lucide/vue'
import { copyText } from '../../utils'
import { useSearch } from '../../composables/useSearch.js'

// ── Paginação ────────────────────────────────────────────────────────
// Mantém a seção compacta mesmo com muitos tutoriais: cards em coluna
// única e largura total (sem o "pulo" de reposicionar no CSS Grid),
// mas só uma página de cada vez fica renderizada.
const totalCards = 11
const pageSize = 10
const totalPages = Math.ceil(totalCards / pageSize)
const currentPage = ref(1)

// Enquanto há busca ativa no header, ignora a paginação e mostra tudo —
// senão a busca global não encontraria cards fora da página atual.
const { query } = useSearch()
const isSearching = computed(() => query.value.length > 0)

const isVisible = (index) => {
  if (isSearching.value) return true
  const start = (currentPage.value - 1) * pageSize
  return index > start && index <= start + pageSize
}

// Direção da transição de página: desliza pra esquerda ao avançar,
// pra direita ao voltar — a página atual sai primeiro, depois a nova entra.
const transitionName = ref('slide-next')

const goToPage = (page) => {
  if (page < 1 || page > totalPages) return
  transitionName.value = page > currentPage.value ? 'slide-next' : 'slide-prev'
  currentPage.value = page
  document.getElementById('knowledge')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-next-enter-from {
  transform: translateX(24px);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-24px);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-24px);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(24px);
  opacity: 0;
}
</style>

<template>
  <section
    id="softwares"
    data-search-keywords="software softwares programa download instalacao ferramenta app"
  >
    <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
      <Laptop class="w-5 h-5 text-brand-600" /> Softwares
    </h2>

    <div class="searchable-item bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mb-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-xl flex-shrink-0">
          <CloudDownload class="w-5 h-5" />
        </div>
        <div>
          <h4 class="font-bold text-foreground">Repositório de Instalação (/pub)</h4>
          <p class="text-xs text-muted-foreground">Baixar POS Virtual, Gerenciador e Utilitários.</p>
          <a href="http://convcard.com.br/pub" target="_blank" rel="noopener noreferrer" class="text-xs text-brand-600 font-bold hover:underline mt-1 inline-flex items-center gap-1">
            Acessar Pasta <ExternalLink class="w-3 h-3" />
          </a>
        </div>
      </div>
      <div class="flex items-center gap-4 bg-muted p-2 rounded-lg border border-border">
        <div class="text-right border-r border-border pr-4">
          <p class="text-[10px] text-muted-foreground uppercase">Usuário</p>
          <button @click="copyText($event, 'convcard')" class="font-mono text-sm font-bold text-foreground hover:text-brand-500 flex items-center gap-2">
            convcard <Copy class="w-3 h-3" />
          </button>
        </div>
        <div class="pl-2">
          <p class="text-[10px] text-muted-foreground uppercase">Senha</p>
          <button @click="copyText($event, 'integrador')" class="font-mono text-sm font-bold text-foreground hover:text-brand-500 flex items-center gap-2">
            integrador <Copy class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <a href="https://drive.google.com/file/d/1YCOmA0r8FBGlraU6oRPl5vLOw7beAbtU/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-red-200 dark:border-red-900/30 flex items-center gap-4 hover:border-red-500 hover:shadow-sm transition-all group relative overflow-hidden">
        <div class="absolute right-0 top-0 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl">VERSÃO ANTIGA</div>
        <img src="https://www.google.com/s2/favicons?domain=anydesk.com&sz=128" alt="AnyDesk" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">AnyDesk Legacy</div>
          <div class="text-xs text-muted-foreground flex items-center gap-1"><HardDrive class="w-3 h-3" /> Link do Drive</div>
        </div>
        <div class="tooltip-text"><strong>Compatibilidade:</strong><br>Versão 6.x. Use apenas se a versão atual falhar.</div>
      </a>

      <a href="https://openvpn.net/client-connect-vpn-for-windows/" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-orange-500 hover:shadow-sm transition-all group">
        <img src="https://www.google.com/s2/favicons?domain=openvpn.net&sz=128" alt="OpenVPN" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">OpenVPN Connect</div>
          <div class="text-xs text-muted-foreground">Acesso Rede Interna</div>
        </div>
      </a>

      <a href="https://www.teamviewer.com/pt-br/download/windows/" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-blue-500 hover:shadow-sm transition-all group">
        <img src="https://www.google.com/s2/favicons?domain=teamviewer.com&sz=128" alt="TeamViewer" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">TeamViewer</div>
          <div class="text-xs text-muted-foreground">Suporte Remoto</div>
        </div>
      </a>

      <a href="https://www.postman.com/downloads/" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-orange-500 hover:shadow-sm transition-all group">
        <img src="https://www.google.com/s2/favicons?domain=postman.com&sz=128" alt="Postman" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">Postman</div>
          <div class="text-xs text-muted-foreground">Testes de API</div>
        </div>
      </a>

      <a href="https://filezilla-project.org/download.php?type=client" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-red-500 hover:shadow-sm transition-all group relative">
        <img src="https://www.google.com/s2/favicons?domain=filezilla-project.org&sz=128" alt="FileZilla" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">FileZilla</div>
          <div class="text-xs text-muted-foreground">Cliente SFTP</div>
        </div>
        <div class="tooltip-text"><strong>Conciliação Financeira:</strong><br>Utilizado para envio de arquivos de conciliação via SFTP.</div>
      </a>

      <a href="https://www.microsip.org/downloads" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-green-500 hover:shadow-sm transition-all group">
        <img src="https://www.google.com/s2/favicons?domain=microsip.org&sz=128" alt="MicroSIP" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">MicroSIP</div>
          <div class="text-xs text-muted-foreground">Ramal VoIP</div>
        </div>
      </a>

      <a href="https://www.thunderbird.net/pt-BR/" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-blue-400 hover:shadow-sm transition-all group">
        <img src="https://www.google.com/s2/favicons?domain=thunderbird.net&sz=128" alt="Thunderbird" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">Thunderbird</div>
          <div class="text-xs text-muted-foreground">Cliente de E-mail</div>
        </div>
      </a>

      <a href="https://app.prntscr.com/pt-br/download.html" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-purple-500 hover:shadow-sm transition-all group">
        <img src="https://www.google.com/s2/favicons?domain=prntscr.com&sz=128" alt="Lightshot" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">Lightshot</div>
          <div class="text-xs text-muted-foreground">Printscreen</div>
        </div>
      </a>

      <a href="https://notepad-plus-plus.org/downloads/" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-slate-500 hover:shadow-sm transition-all group">
        <img src="https://www.google.com/s2/favicons?domain=notepad-plus-plus.org&sz=128" alt="Notepad++" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">Notepad++</div>
          <div class="text-xs text-muted-foreground">Editor de Texto</div>
        </div>
      </a>

      <a href="https://drive.google.com/file/d/1Ep2l29V-7Xs72upIywSoeU6SuOTIbLxN/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="searchable-item p-4 rounded-xl bg-card border border-border flex items-center gap-4 hover:border-brand-500 hover:shadow-sm transition-all group">
        <img src="https://convc.link/kvWa1" alt="Conversor Layout" class="w-8 h-8 app-logo flex-shrink-0">
        <div>
          <div class="font-bold text-foreground">Conversor de Layout</div>
          <div class="text-xs text-muted-foreground">Ferramenta Interna</div>
        </div>
      </a>

    </div>
  </section>
</template>

<script setup>
import { CloudDownload, Copy, ExternalLink, HardDrive, Laptop } from '@lucide/vue'
import { copyText } from '../../utils'
</script>

/**
 * Mapeamento centralizado: FontAwesome → Lucide Icons (@lucide/vue)
 * Substituição ocorre na Fase 3 (layout) e Fase 4 (views).
 * Enquanto isso, este arquivo serve como referência e export point.
 *
 * Uso futuro nos componentes:
 *   import { SearchIcon, XIcon } from '@/composables/useIcon.js'
 *   <SearchIcon :size="16" />
 */

export {
  // Navegação e UI
  Search         as SearchIcon,
  X              as XIcon,
  ChevronDown    as ChevronDownIcon,
  ChevronRight   as ChevronRightIcon,
  ChevronLeft    as ChevronLeftIcon,
  Moon           as MoonIcon,
  Sun            as SunIcon,
  RefreshCw      as RefreshIcon,

  // Sidebar — itens de navegação
  BookOpen       as TutoriaisIcon,
  Bug            as CodigosIcon,
  SlidersHorizontal as ParametrosIcon,
  Store          as MCCIcon,
  Wrench         as FerramentasIcon,
  Network        as AmbientesIcon,
  CloudDownload  as DownloadsIcon,
  Bookmark       as ManuaisIcon,
  FolderOpen     as DocumentosIcon,
  FileCode       as SoftwaresIcon,
  BookUser       as ContatosIcon,

  // Ações comuns
  Copy           as CopyIcon,
  Check          as CheckIcon,
  Plus           as PlusIcon,
  Trash2         as TrashIcon,
  Pencil         as EditIcon,
  ExternalLink   as ExternalLinkIcon,

  // Status / Alertas
  Bell           as BellIcon,
  Info           as InfoIcon,
  AlertTriangle  as WarningIcon,
  CheckCircle    as SuccessIcon,
  CircleX        as ErrorIcon,

  // Misc
  Gamepad2       as GamepadIcon,
  PanelLeftClose as CollapseIcon,
  PanelLeftOpen  as ExpandIcon,
} from '@lucide/vue'

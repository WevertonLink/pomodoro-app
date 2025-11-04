# 🍅 Pomodoro Pro

> Timer Pomodoro profissional e completo com gerenciamento de tarefas, estatísticas, gamificação e PWA.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8)

## 📱 Demonstração

- **Web App:** [Link quando publicado]
- **Instalável:** Sim (PWA)
- **Offline:** Funciona 100% offline

## ✨ Funcionalidades

### ⏱️ Timer Pomodoro
- Timer customizável (foco/pausa curta/pausa longa)
- Progress circular animado com efeito glow
- Auto-start de sessões (configurável)
- Sons automáticos em cada transição
- Contagem de pomodoros diários

### 📝 Gerenciamento de Tarefas
- Criar, editar e deletar tarefas
- Vincular tarefas ao timer
- 5 categorias pré-definidas com ícones e cores
- Progress bar individual por tarefa
- Auto-incremento de pomodoros por tarefa
- Marcar tarefas como completas

### 📊 Dashboard de Estatísticas
- Resumo diário (pomodoros, tempo focado)
- Gráfico de últimos 7 dias
- Heat map de produtividade
- Sistema de streaks (dias consecutivos)
- Estatísticas totais (lifetime)
- Métricas de produtividade

### ⚙️ Configurações Avançadas
- Ajustar durações de foco e pausas
- Auto-start de próximas sessões
- Controle de volume de sons
- Testar sons e notificações
- Dark mode / Light mode
- Reset de configurações

### 📱 Progressive Web App (PWA)
- Instalável no celular e desktop
- Funciona 100% offline
- Service Worker com cache inteligente
- Manifest completo
- Ícones otimizados
- Prompt de instalação automático

## 🛠️ Tecnologias

### Core
- **React 18.3** - UI Library
- **TypeScript 5.5** - Type Safety
- **Vite 5.4** - Build Tool & Dev Server

### UI/UX
- **Tailwind CSS 3.4** - Utility-first CSS
- **shadcn/ui** - Component Library (Radix UI)
- **Framer Motion 11.5** - Animations
- **Lucide React** - Icons

### State Management
- **Jotai 2.10** - Atomic State Management
- **jotai/utils** - LocalStorage Persistence

### PWA
- **vite-plugin-pwa 0.20** - PWA Configuration
- **Workbox 7** - Service Worker & Caching

### Development
- **Eruda** - Mobile DevTools (dev only)
- **ESLint** - Code Linting
- **PostCSS** - CSS Processing

## 📁 Estrutura do Projeto
pomodoro-app/
├── public/
│   ├── icons/
│   │   ├── icon-192x192.svg
│   │   └── icon-512x512.svg
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── timer/
│   │   │   ├── CircularProgress.tsx
│   │   │   └── TimerDisplay.tsx
│   │   ├── tasks/
│   │   │   ├── TaskList.tsx
│   │   │   ├── AddTaskDialog.tsx
│   │   │   └── index.ts
│   │   ├── stats/
│   │   │   ├── StatsPanel.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── SimpleBarChart.tsx
│   │   │   └── HeatMap.tsx
│   │   ├── settings/
│   │   │   ├── SettingsPanel.tsx
│   │   │   └── AboutSection.tsx
│   │   └── pwa/
│   │       ├── InstallPrompt.tsx
│   │       └── OfflineIndicator.tsx
│   │
│   ├── hooks/
│   │   ├── useTimer.ts       # Timer logic
│   │   ├── useTasks.ts       # Tasks management
│   │   ├── useStats.ts       # Statistics tracking
│   │   └── useSettings.ts    # Settings management
│   │
│   ├── store/
│   │   ├── timer-store.ts    # Timer state
│   │   ├── tasks-store.ts    # Tasks state
│   │   ├── stats-store.ts    # Stats state
│   │   └── settings-store.ts # Settings state
│   │
│   ├── types/
│   │   ├── timer.ts          # Timer types
│   │   └── task.ts           # Task types
│   │
│   ├── lib/
│   │   ├── utils.ts          # Utility functions
│   │   └── sounds.ts         # Sound manager
│   │
│   ├── App.tsx               # Main application
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── instructions/             # Development guidelines
│   ├── PROJECT_OVERVIEW.md
│   ├── TECH_STACK.md
│   ├── UI_PATTERNS.md
│   ├── COMMON_MISTAKES.md
│   └── SOUND_LIBRARY.md
│
├── .cursorrules              # AI development rules
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── package.json              # Dependencies
└── README.md                 # This file
## 🚀 Começando

### Pré-requisitos

- Node.js 18+ (recomendado: 22 LTS)
- npm 9+ ou pnpm 8+

### Instalação

```bash
# Clonar repositório
git clone <url-do-repo>
cd pomodoro-app

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
Comandos Disponíveis
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run preview    # Preview da build
npm run lint       # Linting do código
🔧 Configuração
Variáveis de Ambiente
Não há variáveis de ambiente necessárias. Tudo funciona out-of-the-box!
Customização
Alterar Cores do Tema
Edite src/index.css e modifique as variáveis CSS:
:root {
  --primary: 0 84.2% 60.2%;     /* Cor principal (vermelho) */
  --secondary: 210 40% 96.1%;   /* Cor secundária */
  /* ... outras cores */
}
Alterar Durações Padrão
Edite src/store/settings-store.ts:
const defaultSettings: Settings = {
  workDuration: 25,        // Minutos de foco
  breakDuration: 5,        // Pausa curta
  longBreakDuration: 15,   // Pausa longa
  // ...
}
Adicionar Categorias de Tarefas
Edite src/store/tasks-store.ts:
export const defaultCategories: TaskCategory[] = [
  { id: 'work', name: 'Trabalho', color: '#3b82f6', icon: '💼' },
  // Adicione mais categorias aqui
]
📊 Estado da Aplicação
LocalStorage Keys
A aplicação usa LocalStorage para persistência:
pomodoro-settings - Configurações do usuário
pomodoro-tasks - Lista de tarefas
pomodoro-categories - Categorias personalizadas
pomodoro-active-task - Tarefa atualmente vinculada
pomodoro-stats - Estatísticas e métricas
pwa-prompt-seen - Flag de prompt PWA
Limpando Dados
Para resetar completamente:
// No console do navegador
localStorage.clear()
location.reload()
Ou use o botão "Resetar Configurações" nas Settings.
🧪 Testing
Teste Manual
Timer Básico:
Inicie o timer → deve contar regressivamente
Pause → deve parar
Reset → deve voltar ao valor inicial
Skip → deve pular para próxima sessão
Auto-start:
Ative em Configurações
Complete uma sessão
Próxima deve iniciar automaticamente
Tarefas:
Crie uma tarefa
Vincule ao timer (botão Play)
Complete sessão → pomodoro incrementa
PWA:
Ative modo offline no DevTools
App deve continuar funcionando
Service Worker deve estar ativo
🐛 Troubleshooting
Timer não inicia automaticamente
Verifique se auto-start está ativado em Configurações
Verifique se não há erros no console
Sons não tocam
Verifique volume em Configurações
Verifique se sons estão ativados
Alguns navegadores bloqueiam áudio sem interação do usuário
PWA não instala
Certifique-se que está em HTTPS (ou localhost)
Verifique se manifest.json está carregando
Veja erros no DevTools > Application > Manifest
Tela branca após transição
Foi corrigido na v1.0.0
Se persistir, limpe cache e recarregue
📈 Roadmap
✅ Concluído (v1.0.0)
[x] Timer Pomodoro completo
[x] Gerenciamento de tarefas
[x] Dashboard de estatísticas
[x] Configurações avançadas
[x] PWA funcional
[x] Dark mode
[x] Transições automáticas
🚧 Em Desenvolvimento (v1.1.0)
[ ] Sistema de gamificação (XP, níveis, achievements)
[ ] Desafios diários/semanais
[ ] Animações de celebração (confetti)
[ ] Perfil de jogador
🔮 Futuro (v2.0.0)
[ ] Sincronização na nuvem (Supabase)
[ ] Multi-dispositivo
[ ] Notificações PWA (push)
[ ] Sons customizáveis (upload MP3)
[ ] Exportar relatórios (PDF/CSV)
[ ] Integração com Google Calendar
[ ] Modo Zen (fullscreen)
[ ] Temas de cores personalizados
[ ] Atalhos de teclado
[ ] Tutorial interativo (onboarding)
🤝 Contribuindo
Setup de Desenvolvimento
Fork o projeto
Crie uma branch: git checkout -b feature/nova-feature
Faça suas alterações
Commit: git commit -m 'feat: adiciona nova feature'
Push: git push origin feature/nova-feature
Abra um Pull Request
Convenções de Código
Use TypeScript strict mode
Siga o ESLint configurado
Use Prettier para formatação
Componentes: PascalCase
Funções/variáveis: camelCase
Constantes: UPPER_SNAKE_CASE
Arquivos de store: kebab-case
Commit Messages
Seguimos Conventional Commits:
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção
📄 Licença
Este projeto está sob a licença MIT. Veja LICENSE para mais informações.
👨‍💻 Autor
Desenvolvido com ❤️ usando React, TypeScript, Tailwind CSS e shadcn/ui.
🙏 Agradecimentos
shadcn/ui - Componentes incríveis
Tailwind CSS - Utility CSS
Radix UI - Primitivos acessíveis
Lucide - Ícones bonitos
Jotai - State management simples
🍅 Boa produtividade!
README
3. Criar documentação técnica detalhada
cat > docs/SETUP.md << 'SETUP_DOC'
🔧 Setup Completo do Projeto
Ambiente de Desenvolvimento
Requisitos
Node.js: 18.0.0 ou superior (recomendado: 22 LTS)
Package Manager: npm 9+ ou pnpm 8+
Editor: VSCode (recomendado) ou qualquer IDE
Browser: Chrome, Firefox, Edge ou Safari (versões recentes)
Instalação do Zero
1. Preparar Ambiente
# Verificar versão do Node
node --version  # deve ser >= 18

# Atualizar npm (se necessário)
npm install -g npm@latest

# Instalar pnpm (opcional, mais rápido)
npm install -g pnpm
2. Clonar e Instalar
# Clonar repositório
git clone <url-do-repositorio>
cd pomodoro-app

# Instalar dependências
npm install

# Ou com pnpm
pnpm install
3. Desenvolvimento
# Iniciar servidor de desenvolvimento
npm run dev

# Acesse: http://localhost:5173
Estrutura de Dependências
Dependências de Produção
{
  "react": "^18.3.1",              // UI Library
  "react-dom": "^18.3.1",          // React DOM
  "react-router-dom": "^6.26.2",   // Routing
  "jotai": "^2.10.3",              // State Management
  "framer-motion": "^11.11.17",    // Animations
  "lucide-react": "^0.263.1",      // Icons
  "date-fns": "^4.1.0",            // Date utilities
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4"
}
Dependências de Desenvolvimento
{
  "vite": "^5.4.10",
  "typescript": "~5.6.2",
  "tailwindcss": "^3.4.14",
  "vite-plugin-pwa": "^0.20.5",
  "eruda": "^3.4.0",               // Mobile DevTools
  "@types/react": "^18.3.12",
  "@types/react-dom": "^18.3.1"
}
Configuração do Editor
VSCode Extensions Recomendadas
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "dsznajder.es7-react-js-snippets"
  ]
}
Salve em .vscode/extensions.json
VSCode Settings
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "\"([^\"]*)\""]
  ]
}
Salve em .vscode/settings.json
Build e Deploy
Build Local
# Build de produção
npm run build

# Preview da build
npm run preview

# Build é gerada em: dist/
Deploy
Vercel (Recomendado)
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy de produção
vercel --prod
Netlify
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy de produção
netlify deploy --prod
GitHub Pages
# Adicionar ao vite.config.ts
export default defineConfig({
  base: '/nome-do-repo/',
  // ...
})

# Build
npm run build

# Deploy (manual)
# Copie pasta dist/ para gh-pages branch
Variáveis de Build
Não há variáveis de ambiente necessárias. Tudo funciona out-of-the-box!
Troubleshooting
Erro: "Cannot find module"
# Limpar node_modules e reinstalar
rm -rf node_modules
npm install
Erro: "Port 5173 is in use"
# Usar outra porta
npm run dev -- --port 3000
Erro de TypeScript
# Limpar cache do TypeScript
rm -rf node_modules/.vite
npm run build
Erros de Build
# Verificar versão do Node
node --version

# Limpar tudo e reinstalar
rm -rf node_modules dist .vite
npm install
npm run build
SETUP_DOC
4. Criar guia de arquitetura
cat > docs/ARCHITECTURE.md << 'ARCH_DOC'
🏗️ Arquitetura do Projeto
Visão Geral
O Pomodoro Pro segue uma arquitetura modular e escalável, baseada em React com gerenciamento de estado atômico (Jotai) e design system componetizado (shadcn/ui).
Camadas da Aplicação
┌─────────────────────────────────────────┐
│           UI Components (React)         │
├─────────────────────────────────────────┤
│        Custom Hooks (Business Logic)    │
├─────────────────────────────────────────┤
│      State Management (Jotai Atoms)     │
├─────────────────────────────────────────┤
│         LocalStorage Persistence        │
└─────────────────────────────────────────┘
Fluxo de Dados
Timer Flow
User Action (Start/Pause/Skip)
  ↓
useTimer Hook
  ↓
Update timerStateAtom
  ↓
useEffect detects change
  ↓
Update UI (CircularProgress, Timer Display)
  ↓
On completion → Record stats → Transition to next session
Task Flow
User creates task
  ↓
useTasks.addTask()
  ↓
Update tasksAtom (persisted to localStorage)
  ↓
TaskList re-renders
  ↓
User links task to timer → activeTaskIdAtom
  ↓
Timer completes → incrementTaskPomodoro()
  ↓
Task progress updated
Stats Flow
Timer completes session
  ↓
useTimer calls recordPomodoroComplete()
  ↓
useStats updates statsAtom
  ↓
Daily stats, streaks calculated
  ↓
StatsPanel re-renders with new data
State Management (Jotai)
Atoms Principais
timerStateAtom
{
  mode: 'work' | 'break' | 'longBreak',
  timeRemaining: number,  // seconds
  isRunning: boolean,
  completedPomodoros: number,
  currentSession: number
}
settingsAtom (persisted)
{
  workDuration: number,        // minutes
  breakDuration: number,
  longBreakDuration: number,
  pomodorosUntilLongBreak: number,
  autoStartBreaks: boolean,
  autoStartPomodoros: boolean,
  soundEnabled: boolean,
  soundVolume: number,         // 0-1
  notificationsEnabled: boolean
}
tasksAtom (persisted)
Task[] = [{
  id: string,
  title: string,
  description?: string,
  category?: string,
  estimatedPomodoros: number,
  completedPomodoros: number,
  completed: boolean,
  createdAt: string,
  completedAt?: string
}]
statsAtom (persisted)
{
  dailyStats: DailyStats[],
  totalPomodoros: number,
  totalFocusTime: number,
  currentStreak: number,
  longestStreak: number,
  totalTasksCompleted: number,
  lastUpdated: string
}
Derived Atoms
// Auto-calculated from base atoms
todayStatsAtom
last7DaysStatsAtom
activeTaskAtom
pendingTasksAtom
Component Hierarchy
App
├── Tabs
│   ├── Timer Tab
│   │   ├── CircularProgress
│   │   ├── TimerDisplay
│   │   └── Controls (Buttons)
│   │
│   ├── Tasks Tab
│   │   ├── AddTaskDialog
│   │   └── TaskList
│   │       └── TaskCard[]
│   │
│   ├── Stats Tab
│   │   ├── StatCard[]
│   │   ├── SimpleBarChart
│   │   └── HeatMap
│   │
│   └── Settings Tab
│       └── SettingsPanel
│           ├── Timer Settings
│           ├── Audio Settings
│           ├── Appearance Settings
│           └── AboutSection
│
├── InstallPrompt (PWA)
└── OfflineIndicator
Padrões e Convenções
Component Patterns
Presentational Component
interface Props {
  data: SomeType
  onAction: () => void
}

export function PresentationalComponent({ data, onAction }: Props) {
  return (
    <div>
      {/* Pure UI, no business logic */}
    </div>
  )
}
Container Component
export function ContainerComponent() {
  const { data, actions } = useCustomHook()
  
  return <PresentationalComponent data={data} onAction={actions.doSomething} />
}
Custom Hooks Pattern
export function useFeature() {
  const [state, setState] = useAtom(featureAtom)
  
  const action = useCallback(() => {
    setState(prev => ({ ...prev, /* changes */ }))
  }, [setState])
  
  return { state, action }
}
State Update Pattern
// Always use functional updates
setTimerState(prev => ({
  ...prev,                    // Preserve all fields
  timeRemaining: prev.timeRemaining - 1  // Update only what changed
}))

// Never mutate directly
// ❌ timerState.timeRemaining = 0
Performance Optimizations
1. Memoization
const expensiveCalculation = useMemo(() => {
  return calculateSomething(data)
}, [data])
2. Callback Memoization
const handleClick = useCallback(() => {
  doSomething()
}, [dependencies])
3. Atomic State
// Split state into small atoms instead of one big object
const userAtom = atom({ name: '', email: '' })
const settingsAtom = atom({ theme: 'dark' })

// Instead of:
const appStateAtom = atom({ user: {}, settings: {} })
4. Derived State
// Compute values from existing state
const totalAtom = atom((get) => {
  const items = get(itemsAtom)
  return items.reduce((sum, item) => sum + item.value, 0)
})
PWA Architecture
Service Worker Strategy
Network First for:
- API calls
- Dynamic content

Cache First for:
- Static assets (JS, CSS, images)
- Fonts
- Icons

Stale While Revalidate for:
- App shell
- Components
Offline Strategy
Service Worker intercepts requests
Check cache first
If not in cache, try network
If network fails, serve from cache
Update cache in background
Error Handling
Component Level
<ErrorBoundary fallback={<ErrorUI />}>
  <Component />
</ErrorBoundary>
Hook Level
try {
  await someAsyncOperation()
} catch (error) {
  console.error('Operation failed:', error)
  // Show user-friendly message
}
Global Level
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
Acessibilidade (a11y)
Implementações
Semantic HTML
ARIA labels em botões e inputs
Keyboard navigation (Tab, Enter, Esc, Space)
Focus management em modals
High contrast mode support
Screen reader friendly
Exemplo
<button
  aria-label="Iniciar timer"
  onClick={start}
  disabled={isRunning}
>
  <Play />
</button>
Testes (Futuro)
Estrutura Planejada
src/
├── components/
│   └── Timer/
│       ├── Timer.tsx
│       └── Timer.test.tsx
├── hooks/
│   └── useTimer/
│       ├── useTimer.ts
│       └── useTimer.test.ts
Ferramentas
Vitest (unit tests)
React Testing Library (component tests)
Playwright (e2e tests)
Extensibilidade
Adicionar Nova Feature
Criar types em src/types/
Criar atom em src/store/
Criar hook em src/hooks/
Criar componente em src/components/
Integrar no App.tsx
Adicionar Nova Categoria de Task
// src/store/tasks-store.ts
export const defaultCategories = [
  // ... existing
  { id: 'fitness', name: 'Fitness', color: '#f59e0b', icon: '💪' }
]
Adicionar Novo Achievement (Futuro)
// src/store/achievements-store.ts
export const achievements = [
  // ... existing
  {
    id: 'night-owl',
    name: 'Coruja',
    description: 'Complete um pomodoro após 22h',
    icon: '🦉',
    xp: 50
  }
]
ARCH_DOC
5. Criar arquivo de deployment
cat > docs/DEPLOYMENT.md << 'DEPLOY_DOC'
🚀 Guia de Deployment
Build de Produção
Preparação
# 1. Atualizar versão no package.json
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 2. Build
npm run build

# 3. Testar build localmente
npm run preview

# 4. Verificar dist/
ls -la dist/
Checklist Pré-Deploy
[ ] Todos os testes passando
[ ] Build sem erros
[ ] PWA manifest válido
[ ] Ícones otimizados
[ ] Service Worker funcionando
[ ] Testado em modo offline
[ ] Testado em mobile
[ ] Dark mode funcionando
[ ] Performance aceitável (Lighthouse > 90)
Plataformas de Deploy
1. Vercel (Recomendado) ⭐
Vantagens:
Deploy automático via Git
SSL gratuito
CDN global
Preview deployments
Rollback fácil
Setup:
# Instalar CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Produção
vercel --prod
Ou via GitHub:
Conecte repositório no Vercel Dashboard
Configure build:
Build Command: npm run build
Output Directory: dist
Deploy automático em cada push!
2. Netlify
Setup:
# Instalar CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Produção
netlify deploy --prod
netlify.toml:
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
3. GitHub Pages
Setup:
# Adicionar ao vite.config.ts
export default defineConfig({
  base: '/pomodoro-app/',  // nome do repositório
  // ...
})

# Build
npm run build

# Deploy manual
# Copiar dist/ para branch gh-pages
git subtree push --prefix dist origin gh-pages
Ou usar GitHub Actions:
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
4. Firebase Hosting
# Instalar CLI
npm i -g firebase-tools

# Login
firebase login

# Inicializar
firebase init hosting

# Deploy
firebase deploy
firebase.json:
```bash
# Continuando docs/DEPLOYMENT.md...

cat >> docs/DEPLOYMENT.md << 'DEPLOY_DOC_CONT'
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 5. Docker

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # PWA
    location = /manifest.json {
        add_header Cache-Control "no-cache";
    }

    location = /sw.js {
        add_header Cache-Control "no-cache";
    }
}
```

**Build e Run:**

```bash
# Build image
docker build -t pomodoro-app .

# Run
docker run -p 8080:80 pomodoro-app

# Acesse: http://localhost:8080
```

## Otimizações de Performance

### 1. Build Optimization

**vite.config.ts:**

```typescript
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log em produção
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'framer-motion'],
          'state-vendor': ['jotai']
        }
      }
    }
  }
})
```

### 2. Asset Optimization

```bash
# Otimizar imagens
npm install -D imagemin-cli

# Comprimir ícones
imagemin public/icons/*.png --out-dir=public/icons

# Gerar WebP
imagemin public/icons/*.png --out-dir=public/icons --plugin=webp
```

### 3. PWA Cache Strategy

```typescript
// vite.config.ts
VitePWA({
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
          }
        }
      }
    ]
  }
})
```

## Monitoramento

### Analytics (Opcional)

**Google Analytics:**

```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Error Tracking (Opcional)

**Sentry:**

```bash
npm install @sentry/react
```

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

## Segurança

### Headers de Segurança

**netlify.toml / vercel.json:**

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
```

### HTTPS

Todas as plataformas mencionadas fornecem SSL/HTTPS automático. ✅

## Rollback

### Vercel

```bash
# Ver deployments
vercel ls

# Promover deployment anterior
vercel promote <deployment-url>
```

### Netlify

```bash
# Ver deployments
netlify deploy --list

# Rollback
netlify rollback
```

### Manual (Git)

```bash
# Ver histórico
git log --oneline

# Rollback para commit anterior
git revert <commit-hash>
git push
```

## CI/CD Pipeline

### GitHub Actions (Completo)

```.github/workflows/ci-cd.yml
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  build:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Checklist Final

Antes de cada deploy, verifique:

- [ ] `npm run build` sem erros
- [ ] `npm run preview` funciona
- [ ] PWA instalável
- [ ] Offline funciona
- [ ] Dark/Light mode OK
- [ ] Mobile responsivo
- [ ] Performance boa (Lighthouse)
- [ ] Sem console.errors
- [ ] Version bump no package.json
- [ ] CHANGELOG.md atualizado
- [ ] Git tag criada

## Troubleshooting

### "Failed to fetch" em PWA

- Verifique Service Worker
- Limpe cache do browser
- Verifique manifest.json

### Assets não carregam

- Verifique `base` no vite.config.ts
- Verifique paths no manifest.json
- Verifique CORS headers

### Build muito grande

```bash
# Analise o bundle
npm install -D rollup-plugin-visualizer

# Adicione ao vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  visualizer({ open: true })
]
```

## Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
- [PWA Checklist](https://web.dev/pwa-checklist/)
DEPLOY_DOC_CONT

# 6. Criar CHANGELOG
cat > CHANGELOG.md << 'CHANGELOG'
# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-11-04

### ✨ Adicionado

#### Timer Core (Fase 1-2)
- Timer Pomodoro completo com configurações customizáveis
- Progress circular animado com efeito glow
- Sistema de sons para cada transição
- Controles completos (play, pause, reset, skip)
- Contagem de sessões e pomodoros diários
- Auto-start configurável entre sessões

#### Gerenciamento de Tarefas (Fase 3)
- CRUD completo de tarefas
- Vincular tarefas ao timer ativo
- 5 categorias pré-definidas (Trabalho, Estudo, Pessoal, Saúde, Outro)
- Progress bar individual por tarefa
- Auto-incremento de pomodoros ao completar sessões
- Marcar tarefas como completas

#### Dashboard de Estatísticas (Fase 4)
- Cards de resumo (hoje, foco, sequência, total)
- Gráfico de barras dos últimos 7 dias
- Heat map de produtividade semanal
- Sistema de streaks (dias consecutivos)
- Estatísticas totais (lifetime)
- Métricas de produtividade (média, melhor dia)
- Tracking automático de todas as atividades

#### Configurações Avançadas (Fase 5)
- Ajustar durações de foco, pausa curta e pausa longa
- Configurar intervalo para pausa longa
- Auto-start de pausas e pomodoros
- Controle de volume de sons com teste
- Gerenciar notificações (com teste)
- Toggle de dark mode / light mode
- Reset completo de configurações
- Seção "Sobre o App" com status

#### PWA - Progressive Web App (Fase 6)
- Manifest.json completo
- Service Worker com Workbox
- Cache inteligente de assets
- Funciona 100% offline
- Instalável em celular e desktop
- Ícones otimizados (192x192, 512x512)
- Prompt de instalação automático
- Indicador de status offline
- Meta tags completas para SEO

#### Developer Experience
- Eruda (DevTools mobile) para debug
- Documentação completa
- Setup automatizado
- Cursor Rules para IA
- TypeScript strict mode
- ESLint configurado

### 🔧 Corrigido

- Timer não transicionava automaticamente entre sessões
- Sons repetiam infinitamente ao completar sessão
- Tela branca durante transições (causada por Notification API em PWA)
- Erros de TypeScript em builds
- Imports não utilizados
- Cache de Service Worker causando problemas

### 🎨 Melhorado

- Performance geral da aplicação
- Animações mais suaves
- UI responsiva para todos os tamanhos de tela
- Acessibilidade (keyboard navigation, ARIA labels)
- Dark mode mais polido
- Feedback visual em todas as ações

### 📚 Documentação

- README.md completo
- SETUP.md (guia de instalação)
- ARCHITECTURE.md (arquitetura técnica)
- DEPLOYMENT.md (guia de deploy)
- Comentários inline no código
- Instructions folder com guias

## [Unreleased]

### 🚧 Em Desenvolvimento

#### Gamificação (Fase 7)
- Sistema de XP e níveis
- Achievements (conquistas)
- Desafios diários e semanais
- Animações de celebração
- Perfil de jogador

### 🔮 Planejado (v2.0.0)

- Sincronização na nuvem (Supabase)
- Multi-dispositivo
- Notificações push (PWA)
- Sons customizáveis (upload MP3)
- Exportar relatórios (PDF/CSV)
- Integração com Google Calendar
- Modo Zen (fullscreen)
- Temas de cores personalizados
- Atalhos de teclado
- Tutorial interativo
- Modo Pomodoro estendido
- Grupos/Times (competição)
- Widgets do iOS/Android

---

## Tipos de Mudanças

- `✨ Adicionado` - Novas funcionalidades
- `🔧 Corrigido` - Correções de bugs
- `🎨 Melhorado` - Melhorias em funcionalidades existentes
- `🗑️ Removido` - Funcionalidades removidas
- `🔒 Segurança` - Vulnerabilidades corrigidas
- `📚 Documentação` - Mudanças na documentação
CHANGELOG

# 7. Criar arquivo de contribuição
cat > CONTRIBUTING.md << 'CONTRIBUTING'
# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Pomodoro Pro! 🍅

## Como Contribuir

### 1. Reportar Bugs

Antes de reportar um bug:
- Verifique se já não existe uma issue aberta
- Teste na versão mais recente
- Tente reproduzir o bug

**Template de Bug Report:**

```markdown
**Descrição**
Descrição clara do bug

**Como Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável

**Ambiente**
- Browser: [Chrome 120]
- OS: [Windows 11]
- Versão do App: [1.0.0]
```

### 2. Sugerir Features

**Template de Feature Request:**

```markdown
**Problema**
Qual problema isso resolve?

**Solução Proposta**
Descreva a solução

**Alternativas**
Outras soluções consideradas

**Contexto Adicional**
Screenshots, mockups, etc
```

### 3. Pull Requests

#### Setup

```bash
# Fork o repositório
# Clone seu fork
git clone https://github.com/SEU-USER/pomodoro-app
cd pomodoro-app

# Adicione upstream
git remote add upstream https://github.com/ORIGINAL/pomodoro-app

# Crie uma branch
git checkout -b feature/minha-feature
```

#### Desenvolvimento

```bash
# Instale dependências
npm install

# Rode em dev
npm run dev

# Faça suas mudanças
# Teste tudo

# Commit
git add .
git commit -m "feat: adiciona minha feature"

# Push
git push origin feature/minha-feature
```

#### Checklist do PR

- [ ] Código segue o style guide
- [ ] Funciona em dev e build
- [ ] Testado em diferentes browsers
- [ ] Testado em mobile
- [ ] Sem console.errors
- [ ] TypeScript sem erros
- [ ] Comentários adicionados onde necessário
- [ ] README atualizado (se necessário)
- [ ] CHANGELOG atualizado

## Style Guide

### TypeScript

```typescript
// ✅ Bom
interface User {
  id: string
  name: string
}

const getUser = (id: string): User => {
  return { id, name: 'User' }
}

// ❌ Ruim
const getUser = (id: any) => {
  return { id: id, name: 'User' }
}
```

### React Components

```typescript
// ✅ Bom
interface ButtonProps {
  text: string
  onClick: () => void
}

export function Button({ text, onClick }: ButtonProps) {
  return <button onClick={onClick}>{text}</button>
}

// ❌ Ruim
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.text}</button>
}
```

### Naming Conventions

- **Componentes:** PascalCase (`TimerDisplay.tsx`)
- **Hooks:** camelCase com 'use' (`useTimer.ts`)
- **Utils:** camelCase (`formatTime.ts`)
- **Types:** PascalCase (`TimerState`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_POMODOROS`)
- **Stores:** kebab-case (`timer-store.ts`)

### File Structure

```typescript
// Imports
import { useState } from 'react'
import { useAtom } from 'jotai'

// Types
interface Props {
  // ...
}

// Component
export function Component({ prop }: Props) {
  // Hooks
  const [state, setState] = useState()
  
  // Handlers
  const handleClick = () => {
    // ...
  }
  
  // Render
  return (
    // JSX
  )
}
```

### Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: adiciona novo recurso
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatora código
test: adiciona testes
chore: tarefas de manutenção
perf: melhoria de performance
```

**Exemplos:**

```bash
feat: adiciona sistema de achievements
fix: corrige timer não transicionando
docs: atualiza README com novas instruções
refactor: extrai lógica de timer para hook
```

## Áreas para Contribuir

### 🐛 Bugs Conhecidos

- [ ] Melhorar acessibilidade em modals
- [ ] Otimizar re-renders desnecessários
- [ ] Adicionar error boundaries

### ✨ Features Desejadas

- [ ] Notificações push (PWA)
- [ ] Exportar relatórios
- [ ] Atalhos de teclado
- [ ] Modo Zen
- [ ] Temas personalizados

### 📚 Documentação

- [ ] Tutoriais em vídeo
- [ ] Guia de troubleshooting
- [ ] Exemplos de uso
- [ ] Tradução para outros idiomas

### 🧪 Testes

- [ ] Unit tests para hooks
- [ ] Component tests
- [ ] E2E tests
- [ ] Performance tests

## Processo de Review

1. **Automated Checks:** CI/CD roda automaticamente
2. **Code Review:** Mantainer revisa o código
3. **Testing:** Testa funcionalidade
4. **Approval:** Se tudo OK, PR é aprovado
5. **Merge:** Código é mergeado

## Comunidade

- Seja respeitoso e inclusivo
- Ajude outros contribuidores
- Documente suas mudanças
- Compartilhe conhecimento

## Dúvidas?

Abra uma [Discussion](link) ou entre em contato!

---

**Obrigado por contribuir! 🎉**
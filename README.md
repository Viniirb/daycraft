<div align="center">

<!-- Banner Animado -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=DayCraft&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=fff" />

<h3>
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&multiline=false&width=600&lines=Organize+Sua+Vida+em+Um+S%C3%B3+Lugar;Calend%C3%A1rio+%E2%9C%85+H%C3%A1bitos+%E2%9C%85+Finan%C3%A7as+%E2%9C%85+M%C3%BAsica;Clean+Architecture+%2B+React+%2B+Electron" alt="Typing SVG" />
</h3>

<!-- Badges -->
<p align="center">
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://www.electronjs.org/">
    <img src="https://img.shields.io/badge/Electron-38.4-47848F?style=for-the-badge&logo=electron&logoColor=white" alt="Electron" />
  </a>
  <a href="https://firebase.google.com/">
    <img src="https://img.shields.io/badge/Firebase-12.4-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </a>
</p>

<p align="center">
  <b>DayCraft</b> é uma aplicação desktop moderna e minimalista para gerenciamento pessoal completo.<br>
  Calendário inteligente, tracking de hábitos, gestão de tarefas e muito mais em uma interface elegante.
</p>

<p align="center">
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-contribuindo">Contribuir</a>
</p>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

</div>

## ✨ Funcionalidades

### 🎯 Gerenciamento de Eventos

**7 Tipos de Eventos Diferentes:**
- ✓ **Tarefas** - Organize seus afazeres com checklist integrado
- 🔔 **Lembretes** - Nunca esqueça compromissos importantes
- ⭐ **Datas Especiais** - Aniversários, feriados e comemorações
- 👥 **Reuniões** - Gerencie seus encontros profissionais
- 🎉 **Eventos** - Festas e ocasiões especiais
- 📅 **Compromissos** - Consultas, appointments e mais
- 🎯 **Hábitos** - Sistema completo de tracking de hábitos

### 📋 Recursos Avançados

**Checklist Integrado:**
- ✅ Adicione listas de tarefas dentro de eventos
- ✓ Marque itens como concluídos
- 🗑️ Remova itens com um clique
- 📊 Acompanhe o progresso visualmente

**Sistema de Recorrência:**
- 🔄 Eventos diários
- 📅 Eventos semanais
- 📆 Eventos mensais
- 🚫 Eventos únicos

**Tracking de Hábitos:**
- 🎯 Defina meta de dias (1-365)
- 🔥 Acompanhe sequência (streak) atual
- 📊 Visualize progresso com barra animada
- ➕➖ Controles manuais de incremento/decremento
- 📈 Percentual de conclusão em tempo real

### 🎨 Interface Minimalista

- 🌑 **Design Monocromático** - Preto, branco e cinza com acentos vibrantes
- ✨ **Animações Suaves** - Tailwind CSS animations com delays escalonados
- 🎭 **Logo Personalizado** - Gradiente azul-roxo com animação sparkle
- 💬 **Frases Inspiradoras** - Mensagens motivacionais aleatórias na Dashboard
- 📱 **Totalmente Responsivo** - Adapta-se a qualquer tamanho de tela

### 🗓️ Calendário Completo

- 📅 Visualizações: Mês, Semana, Dia
- 🖱️ Criação por drag & drop ou clique
- ✏️ Edição de eventos com clique
- 🗑️ Exclusão com confirmação
- ⏰ Suporte a horários personalizados
- 🎨 Cores dinâmicas por tipo de evento
- ☁️ Sincronização em tempo real com Firebase

### 🔐 Autenticação & Segurança

- 🔑 Login com Google e GitHub
- 👤 Registro com email/senha
- 🛡️ Dados isolados por usuário
- 🔄 Sessões persistentes
- 🚪 Logout seguro

---

## 🏗️ Arquitetura

DayCraft utiliza **Clean Architecture** para garantir código organizado, testável e manutenível:

```
📂 src/
├── 📂 domain/                    # Camada de Domínio
│   ├── entities/                # Entidades de negócio
│   │   └── Event.ts            # Evento com checklist e hábitos
│   ├── repositories/           # Interfaces de repositórios
│   └── value-objects/          # Objetos de valor
│       ├── EventType.ts        # 7 tipos de eventos
│       └── DateRange.ts        # Manipulação de datas
│
├── 📂 application/              # Camada de Aplicação
│   ├── dto/                    # Data Transfer Objects
│   │   └── CreateEventDTO.ts  # DTO com checklist, recurrence, habits
│   └── use-cases/              # Casos de uso
│       └── event/
│           ├── CreateEvent.ts
│           ├── UpdateEvent.ts
│           ├── DeleteEvent.ts
│           └── GetUserEvents.ts
│
├── 📂 infrastructure/           # Camada de Infraestrutura
│   └── firebase/
│       ├── repositories/       # Implementações Firebase
│       │   └── FirebaseEventRepository.ts
│       └── mappers/            # Conversão de dados
│           └── EventMapper.ts  # Domain ↔ Firestore
│
├── 📂 presentation/             # Camada de Apresentação
│   ├── pages/
│   │   ├── Dashboard.tsx       # Dashboard com frases inspiradoras
│   │   ├── Calendar.tsx        # Calendário FullCalendar
│   │   ├── Music.tsx          # Integração Spotify (em breve)
│   │   ├── Games.tsx          # Steam/PSN (em breve)
│   │   ├── Finance.tsx        # Gestão financeira (em breve)
│   │   └── Hobbies.tsx        # Tracking de hobbies (em breve)
│   │
│   ├── components/
│   │   ├── event/
│   │   │   └── CreateEventModal.tsx  # Modal completo com todos recursos
│   │   └── layout/
│   │       ├── Sidebar.tsx           # Navegação com logo personalizado
│   │       └── MainLayout.tsx        # Layout principal
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useAuth.ts
│   │   └── useEvents.ts
│   │
│   ├── controllers/            # Controladores (facade)
│   │   ├── AuthController.ts
│   │   └── EventController.ts
│   │
│   └── view-models/            # ViewModels para UI
│       └── EventViewModel.ts   # Formato FullCalendar
│
└── 📂 main/                     # Camada Main (Dependency Injection)
    └── factories/              # Factories de dependências
        ├── controllers/
        └── repositories/
```

### 🎯 Princípios Aplicados

- ✅ **Separation of Concerns** - Cada camada com responsabilidade única
- ✅ **Dependency Inversion** - Dependências apontam para abstrações
- ✅ **Single Responsibility** - Classes focadas e coesas
- ✅ **Open/Closed Principle** - Extensível sem modificar código existente
- ✅ **Interface Segregation** - Interfaces específicas e enxutas

---

## 🛠️ Tecnologias

### Core Stack

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| ![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react) | `19.1.1` | UI Library com hooks modernos |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript) | `5.9.3` | Tipagem estática forte |
| ![Electron](https://img.shields.io/badge/Electron-38.4-47848F?logo=electron) | `38.4.0` | Desktop cross-platform |
| ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css) | `3.4.18` | Utility-first CSS |
| ![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite) | `7.1.7` | Build tool ultra-rápido |

### UI & Componentes

- 📆 **FullCalendar** `6.1.19` - Calendário rico e interativo
- 🎨 **Headless UI** `2.2.9` - Componentes acessíveis
- 🎯 **Lucide React** `0.546.0` - Ícones SVG modernos
- 🧭 **React Router DOM** `7.9.4` - Roteamento SPA

### Backend & Database

- 🔥 **Firebase** `12.4.0` - Backend as a Service
- 💾 **Firestore** - NoSQL real-time database
- 🔐 **Firebase Auth** - Autenticação multi-provider
- ⚛️ **React Firebase Hooks** `5.1.1` - Hooks otimizados

### Dev Tools

- 🧹 **ESLint** `9.36.0` - Linter de código
- 📐 **TypeScript ESLint** `8.45.0` - Regras TypeScript
- 🎯 **Autoprefixer** `10.4.21` - Compatibilidade CSS

---

## ⚙️ Instalação

### 📋 Pré-requisitos

- ✅ **Node.js** `18.x` ou superior
- ✅ **npm** `9.x` ou superior
- ✅ **Conta Firebase** ([Console](https://console.firebase.google.com/))

### 🚀 Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/Viniirb/daycraft.git

# Entre no diretório
cd daycraft

# Instale as dependências
npm install

# Configure as variáveis de ambiente (veja abaixo)
# Linux / macOS / Git Bash:
cp .env.example .env
# Windows (cmd.exe):
copy .env.example .env

# Execute o projeto
npm run dev
```

### 🔑 Configuração Firebase

#### 1. Crie um Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Siga o assistente de criação

#### 2. Habilite os Serviços

**Firestore Database:**
- Navegue até `Firestore Database`
- Clique em `Criar banco de dados`
- Escolha modo de produção
- Defina localização

**Authentication:**
- Navegue até `Authentication`
- Clique em `Começar`
- Habilite os provedores:
  - ✅ Google
  - ✅ Email/Senha
  - ✅ GitHub (opcional - configure OAuth App)

#### 3. Configure Regras de Segurança

No Firestore Database → Rules, adicione:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /events/{eventId} {
      allow read, write: if request.auth != null &&
                           request.auth.uid == resource.data.userId;
      allow create: if request.auth != null &&
                       request.auth.uid == request.resource.data.userId;
    }
  }
}
```

#### 4. Obtenha as Credenciais

1. Vá em **Configurações do Projeto** (⚙️)
2. Role até **"Seus apps"**
3. Clique em **Web** (</>) se não existir
4. Copie o objeto `firebaseConfig`

#### 5. Configure `.env`

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto-id
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

⚠️ **IMPORTANTE**: Nunca comite o arquivo `.env`! Ele já está no `.gitignore`.

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento - Inicia app Electron com hot reload
npm run dev

# Build - Compila para produção
npm run build

# Preview - Visualiza build de produção
npm run preview

# Lint - Verifica qualidade do código
npm run lint
```

---

## 🎨 Design System

### Paleta de Cores

```css
/* Monocromático Base */
--bg-primary: #0a0a0a      /* Deep black */
--bg-secondary: #111111     /* Soft black */
--bg-tertiary: #1a1a1a     /* Dark gray */
--bg-hover: #222222        /* Subtle hover */

/* Cores de Acento (apenas highlights) */
--accent-blue: #3b82f6     /* Tarefas */
--accent-yellow: #f59e0b   /* Lembretes */
--accent-purple: #8b5cf6   /* Datas Especiais */
--accent-green: #10b981    /* Reuniões */
--accent-pink: #ec4899     /* Eventos */
--accent-cyan: #06b6d4     /* Compromissos */
--accent-orange: #f97316   /* Hábitos */
```

### Animações Tailwind

- `animate-slide-up` - Entrada de baixo para cima
- `animate-slide-down` - Entrada de cima para baixo
- `animate-slide-in` - Entrada lateral
- `animate-fade-in` - Fade suave
- `animate-scale-in` - Escala com entrada

Delays escalonados para efeito cascata: `0ms`, `100ms`, `200ms`, `300ms`

---

## 🗺️ Roadmap

### ✅ Implementado

- [x] Sistema completo de eventos (7 tipos)
- [x] Checklist integrado em tarefas
- [x] Sistema de recorrência (diária, semanal, mensal)
- [x] Tracking de hábitos com streak e progresso
- [x] Edição e exclusão de eventos
- [x] Suporte a horários personalizados
- [x] Design minimalista com animações
- [x] Logo e branding personalizado
- [x] Frases inspiradoras na Dashboard
- [x] Clean Architecture
- [x] Autenticação completa

### 🚧 Em Desenvolvimento

- [ ] 🎵 **Módulo de Música**
  - [ ] Integração com Spotify API
  - [ ] Exibição de playlists
  - [ ] Estatísticas de escuta
  - [ ] Top artistas e músicas

- [ ] 🎮 **Módulo de Games**
  - [ ] Integração com Steam API
  - [ ] Biblioteca de jogos
  - [ ] Tempo de jogo
  - [ ] Conquistas

- [ ] 💰 **Módulo de Finanças**
  - [ ] Receitas e despesas
  - [ ] Categorização
  - [ ] Gráficos e relatórios
  - [ ] Metas financeiras

### 🔮 Futuro

- [ ] 📊 Widgets customizáveis na Dashboard
- [ ] 🔔 Notificações push do sistema
- [ ] 🌍 Internacionalização (i18n)
- [ ] 📱 Versão mobile (React Native)
- [ ] 🎨 Temas customizáveis
- [ ] 📤 Export/Import de dados
- [ ] 🔄 Sincronização Google Calendar
- [ ] 🤝 Compartilhamento de eventos

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! ❤️

### Como Contribuir

1. 🍴 **Fork** o projeto
2. 🌿 Crie uma branch: `git checkout -b feature/MinhaFeature`
3. 💾 Commit: `git commit -m 'feat: Adiciona MinhaFeature'`
4. 📤 Push: `git push origin feature/MinhaFeature`
5. 🔃 Abra um **Pull Request**

### Conventional Commits

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (sem mudança de código)
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas gerais

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

**Vinicius Rolim Barbosa**

- 🐙 GitHub: [@Viniirb](https://github.com/Viniirb)
- 💼 LinkedIn: [Vinicius Rolim Barbosa](https://www.linkedin.com/in/vinicius-rolim-barbosa-15b066374/)

---

## 🙏 Agradecimentos

- [React Team](https://react.dev/) - Biblioteca incrível
- [Electron](https://www.electronjs.org/) - Desktop apps simplificados
- [Firebase](https://firebase.google.com/) - Backend poderoso
- [FullCalendar](https://fullcalendar.io/) - Calendário completo
- [Tailwind CSS](https://tailwindcss.com/) - CSS utilitário

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=150&section=footer" />

### ⭐ Se este projeto foi útil, deixe uma estrela!

**DayCraft** - Organize sua vida, um dia de cada vez.

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=500&lines=Made+with+%E2%9D%A4%EF%B8%8F+using+React+%2B+TypeScript;Powered+by+Electron+%2B+Firebase;Clean+Architecture+%E2%9C%A8+Open+Source" alt="Footer" />

<br><br>

<sub>© 2025 DayCraft - MIT License</sub>

</div>

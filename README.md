# Pluga Challenge Front

Este projeto é a solução para o desafio técnico da [Pluga](https://pluga.co), migrando uma aplicação React simples para Next.js com TypeScript, seguindo boas práticas de arquitetura e organização de código.

## 📋 Sobre o Desafio

A aplicação lista os apps integrados à Pluga, apresentando funcionalidades de busca e paginação, além de um modal que guarda os últimos apps acessados.

## ✅ Requisitos Implementados

- ✅ Migração para [Next.js](https://nextjs.org)
- ✅ Migração para [TypeScript](https://www.typescriptlang.org)
- ✅ Centralização de estado com [Context Hooks](https://react.dev/reference/react/hooks#context-hooks)
- ✅ Testes com [Jest](https://jestjs.io) e [Testing Library](https://testing-library.com)
- ✅ CI/CD com [GitHub Actions](https://github.com/features/actions) (configurado)
- ✅ README com descrição do projeto

## 🏗️ Arquitetura

O projeto segue uma arquitetura baseada em Atomic Design, organizando os componentes em:

- **Atoms**: Componentes básicos e reutilizáveis (`AppCard`, `SearchInput`, `Pagination`)
- **Molecules**: Componentes compostos (`AppModal`, `EmptyState`)
- **Screens**: Telas completas (`AppsList`)

### Estrutura de Pastas

```
src/
├── app/                # App Router do Next.js
│   ├── layout.tsx     # Layout raiz
│   ├── page.tsx       # Página inicial (redireciona para /challenge)
│   └── challenge/     # Página do desafio
│       └── page.tsx
├── components/
│   ├── atoms/          # Componentes atômicos
│   ├── molecules/      # Componentes compostos
│   └── screens/        # Telas completas
├── context/            # Contextos React para gerenciamento de estado
├── hooks/              # Custom hooks
├── dictionaries/       # Dicionários de internacionalização
├── services/           # Configurações de serviços (axios)
├── types/              # Definições TypeScript
└── utils/              # Funções utilitárias e helpers
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js >= 20.0.0 (recomendado usar nvm)
- NPM >= 10.0.0

**Usando nvm:**
```bash
nvm use 20
# ou se tiver o arquivo .nvmrc:
nvm use
```

### Instalação

```bash
npm install
```

### Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```bash
# API URL para buscar os apps
NEXT_PUBLIC_APPS_API_URL=https://pluga.co
```

Ou copie o arquivo de exemplo:
```bash
cp .env.local.example .env.local
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000` (redireciona automaticamente para `/challenge`)

### Build

```bash
npm run build
```

### Testes

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 🧪 Testes

Os testes foram implementados com Jest e Testing Library, focando em:

- **Funções utilitárias**: Testes unitários para funções puras (`filterApps`, `paginateApps`, `calculateMaxPage`, `manageLastSelectedApps`)
- **Cobertura complementar**: Testes Jest cobrem lógica de negócio que não é coberta pelos testes E2E do Cypress

### Estrutura de Testes

- Testes unitários: `src/utils/functions/*.test.ts`
- Testes de componentes: Cypress (já configurado no projeto)

## 🎨 Tecnologias Utilizadas

- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript 5.7
- **React**: React 19
- **Estilização**: TailwindCSS + DaisyUI
- **Gerenciamento de Estado**: React Context API + React Query
- **HTTP Client**: Axios
- **Testes**: Jest + Testing Library
- **Testes E2E**: Cypress (já configurado)

## 📚 Decisões Técnicas

Consulte [DECISIONS.md](./DECISIONS.md) para documentação detalhada das decisões técnicas tomadas durante o desenvolvimento.

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm test` - Executa testes Jest
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:coverage` - Executa testes com relatório de cobertura
- `npm run check-types` - Verifica tipos TypeScript
- `npm run check-format` - Verifica formatação do código
- `npm run check-lint` - Verifica lint do código
- `npm run format` - Formata o código

## 📝 Licença

Este projeto foi desenvolvido como parte do desafio técnico da Pluga.

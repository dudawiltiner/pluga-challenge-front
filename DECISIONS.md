# Decisões Técnicas

Este documento descreve as principais decisões técnicas tomadas durante o desenvolvimento do desafio Pluga Challenge Front.

## Uso de IA e Processo de Desenvolvimento

### Decisão: Uso de IA Assistente com Supervisão Humana

**Motivação**: Este projeto foi desenvolvido com o auxílio de uma IA (Composer/Cursor) para acelerar o processo de migração e implementação, porém todas as decisões técnicas finais, correções e validações foram realizadas pelo desenvolvedor responsável.

**Processo**:

- A IA foi utilizada para gerar código inicial, estruturas de arquivos e implementações básicas
- Todas as decisões arquiteturais foram revisadas e validadas pelo desenvolvedor
- Correções e ajustes foram feitos manualmente quando necessário
- A escolha de tecnologias e padrões foi sempre validada e aprovada antes da implementação

**Benefícios**:

- Aceleração do desenvolvimento sem comprometer a qualidade
- Aprendizado através da revisão e correção do código gerado
- Garantia de que as decisões técnicas refletem o conhecimento e preferências do desenvolvedor

## 0. Roteamento

### Decisão: App Router do Next.js

**Motivação**: O Next.js 15 recomenda o uso do App Router como padrão. O App Router oferece melhor performance, suporte nativo a Server Components, e uma estrutura mais moderna e intuitiva.

**Implementação**:

- Estrutura baseada em `app/` directory
- `app/layout.tsx`: Layout raiz com metadata e providers
- `app/providers.tsx`: Client Component para providers que precisam de hooks (React Query, Context)
- `app/challenge/page.tsx`: Página do desafio
- `app/page.tsx`: Página inicial que redireciona para `/challenge`

**Benefícios**:

- Melhor performance com Server Components por padrão
- Estrutura mais intuitiva baseada em arquivos
- Suporte nativo a layouts aninhados
- Metadata API integrada
- Melhor suporte a streaming e Suspense

**Migração**:

- Migrado de Pages Router (`pages/`) para App Router (`app/`)
- Providers movidos para Client Component separado (`providers.tsx`)
- Metadata movida para `layout.tsx` usando a API nativa do Next.js

## 1. Arquitetura de Componentes

### Decisão: Atomic Design Pattern

**Motivação**:

- O projeto original já seguia uma estrutura baseada em Atomic Design (atoms, molecules, screens)
- O desenvolvedor possui experiência e preferência por essa abordagem arquitetural
- Facilita a organização, manutenção e escalabilidade do código
- Permite reutilização eficiente de componentes

**Implementação**:

- **Atoms**: Componentes básicos e reutilizáveis (`AppCard`, `SearchInput`, `Pagination`)
- **Molecules**: Componentes compostos (`AppModal`, `EmptyState`)
- **Screens**: Telas completas (`AppsList`)
- Cada componente segue estrutura padronizada: `ComponentName.tsx`, `ComponentName.types.ts`, `ComponentName.enum.ts`, `test/ComponentName.cy.tsx`

**Benefícios**:

- Organização clara e escalável
- Reutilização de componentes
- Facilita manutenção e testes
- Separação clara de responsabilidades
- Padrão conhecido e amplamente adotado na comunidade React

## 2. Gerenciamento de Estado e Dados

### Decisão: React Context API + React Query + Axios

**Motivação**:

- O requisito do desafio especificava o uso de Context Hooks para estado da aplicação
- **React Query**: Escolhido para gerenciar estado assíncrono (requisições HTTP) devido à sua capacidade de cache, refetch automático e gerenciamento de loading/error states
- **Axios**: Preferência do desenvolvedor por sua API mais intuitiva que `fetch`, interceptors, e melhor tratamento de erros
- Combinação permite separar estado de UI (Context) de estado de servidor (React Query)

**Implementação**:

- `AppsContext`: Gerencia estado de UI relacionado aos apps (busca, paginação, últimos visualizados, app selecionado)
- `useGetApps`: Hook customizado usando React Query para buscar dados da API
- `axiosConfig`: Configuração centralizada do Axios com base URL e interceptors
- `DictionaryContext`: Gerencia textos da aplicação (internacionalização)

**Benefícios**:

- React Context: Solução nativa do React para estado de UI
- React Query: Cache automático, refetch inteligente, loading/error states gerenciados
- Axios: API mais limpa, interceptors para tratamento global de erros, melhor TypeScript support
- Separação clara entre estado de UI e estado de servidor
- Facilita testes e manutenção

## 3. Estilização

### Decisão: TailwindCSS + DaisyUI

**Motivação**: O código original já utilizava TailwindCSS com DaisyUI. Mantivemos essa escolha para preservar o design visual e aproveitar os componentes prontos do DaisyUI.

**Implementação**:

- Configuração do TailwindCSS 4.x no Next.js com `@tailwindcss/postcss`
- Uso de classes utilitárias do TailwindCSS
- Componentes do DaisyUI para elementos como modais, botões, cards e inputs
- Migração para TailwindCSS 4.x mantendo compatibilidade com DaisyUI

**Benefícios**:

- Design consistente com o original
- Desenvolvimento rápido com classes utilitárias
- Componentes prontos do DaisyUI
- Versão atualizada do TailwindCSS com melhor performance

## 4. Separação de Responsabilidades

### Decisão: Funções Utilitárias Puras

**Motivação**: Separar lógica de negócio dos componentes facilita testes e reutilização.

**Implementação**:

- `filterApps`: Filtra apps por nome
- `paginateApps`: Pagina array de apps
- `calculateMaxPage`: Calcula número máximo de páginas
- `manageLastSelectedApps`: Gerencia lista de últimos apps selecionados
- Funções de localStorage: `getLastSelectedAppsFromStorage`, `saveLastSelectedAppsToStorage`

**Benefícios**:

- Funções testáveis isoladamente
- Reutilização em diferentes contextos
- Código mais limpo e legível

## 5. Testes

### Decisão: Jest para Funções Utilitárias, Cypress para Componentes

**Motivação**:

- **Cypress como foco principal**: Eu possuo maior conhecimento e experiência com Cypress, e desejava demonstrar essa expertise através de uma cobertura mais abrangente de testes de componentes
- Acredito que o Jest é ideal para testes unitários de funções puras (lógica de negócio isolada). Porém tem um pouco menos de experiência.
- Cypress oferece melhor visualização e depuração de testes de componentes
- Evita duplicação de cobertura mantendo cada ferramenta em seu domínio ideal

**Implementação**:

- Testes Jest para todas as funções utilitárias em `src/utils/functions/*.test.ts`
- Cypress para testes de componentes em `src/components/**/test/*.cy.tsx`
- Estrutura de testes seguindo padrão de cada componente ter sua pasta `test/` com arquivo `.cy.tsx`

**Benefícios**:

- Demonstração de expertise em Cypress através de testes abrangentes
- Cobertura complementar sem sobreposição
- Testes rápidos para lógica de negócio (Jest)
- Testes visuais e interativos para componentes (Cypress)
- Melhor experiência de desenvolvimento e depuração com Cypress

## 6. TypeScript

### Decisão: Tipagem Estrita

**Motivação**: TypeScript ajuda a prevenir erros em tempo de desenvolvimento e melhora a experiência de desenvolvimento.

**Implementação**:

- Tipos definidos em `src/types/app.types.ts`
- Tipagem em todos os componentes e funções
- Configuração strict no `tsconfig.json`

**Benefícios**:

- Detecção precoce de erros
- Melhor autocomplete e IntelliSense
- Documentação implícita através dos tipos

## 7. Estrutura de Pastas

### Decisão: Organização por Feature e Tipo

**Motivação**: Manter consistência com a estrutura existente do projeto `/next` e seguir as melhores práticas do Next.js 15 com App Router.

**Implementação**:

```
src/
├── app/            # App Router do Next.js
│   ├── layout.tsx # Layout raiz
│   ├── page.tsx   # Página inicial
│   └── challenge/ # Página do desafio
├── components/     # Componentes organizados por atomic design
├── context/        # Contextos React
├── hooks/          # Custom hooks
├── dictionaries/   # Dicionários de internacionalização
├── services/       # Configurações de serviços (axios)
├── types/          # Definições TypeScript
└── utils/          # Funções utilitárias
```

**Benefícios**:

- Consistência com o projeto base
- Fácil localização de arquivos
- Escalável para crescimento do projeto
- Segue padrões modernos do Next.js 15

## 8. Path Aliases

### Decisão: Usar aliases para imports

**Motivação**: Melhorar legibilidade e facilitar refatoração.

**Implementação**:

- `@components/*` → `./src/components/*`
- `@hooks/*` → `./src/hooks/*`
- `@utils/*` → `./src/utils/*`
- `@types/*` → `./src/types/*`
- `@context/*` → `./src/context/*`

**Benefícios**:

- Imports mais limpos
- Facilita refatoração
- Consistente com padrões do projeto

## 9. Performance

### Decisão: useMemo para Cálculos Derivados

**Motivação**: Otimizar re-renderizações evitando recálculos desnecessários.

**Implementação**:

- `filteredApps`: Memoizado baseado em `apps` e `search`
- `maxPage`: Memoizado baseado em `filteredApps.length`
- `pagedFilteredApps`: Memoizado baseado em `filteredApps` e `page`

**Benefícios**:

- Melhor performance
- Menos re-renderizações
- Cálculos apenas quando necessário

## 10. Acessibilidade

### Decisão: Manter elementos semânticos e acessíveis

**Motivação**: Garantir que a aplicação seja acessível para todos os usuários.

**Implementação**:

- Uso de elementos semânticos HTML
- Labels apropriados em inputs
- Alt text em imagens
- Navegação por teclado funcional

**Benefícios**:

- Melhor experiência para usuários com necessidades especiais
- Melhor SEO
- Conformidade com padrões web

## 11. Controle de Qualidade

### Decisão: Husky + Commitizen + ESLint + Prettier

**Motivação**:

- Garantir qualidade e consistência do código através de ferramentas automatizadas
- Padronizar commits seguindo Conventional Commits
- Prevenir código com problemas antes mesmo do commit
- Manter formatação consistente em todo o projeto

**Implementação**:

- **Husky**: Git hooks para executar verificações automatizadas
  - **pre-commit**: Executa verificações antes de cada commit:
    - `check-format`: Valida formatação do código (Prettier)
    - `check-lint`: Valida regras de lint (ESLint)
    - `check-types`: Valida tipos TypeScript
    - Bloqueia commit se alguma verificação falhar
  - **pre-push**: Executa verificações antes de cada push:
    - `cy:run:component`: Executa testes de componentes Cypress
    - `build`: Valida que o projeto compila corretamente
    - Bloqueia push se testes ou build falharem
  - **commit-msg**: Valida formato dos commits usando Commitlint e adiciona Gitmoji automaticamente
- **Commitizen + Commitlint**: Ferramentas para padronizar commits
  - **Commitizen**: Interface interativa para criar commits seguindo Conventional Commits
    - Integrado com `npm run commit` para guiar o desenvolvedor
    - Usa `cz-conventional-changelog` como adapter
  - **Commitlint**: Valida formato dos commits no hook `commit-msg`
    - Garante que commits sigam o padrão Conventional Commits
    - Adiciona Gitmoji automaticamente baseado no tipo do commit
- **ESLint**: Linter para identificar problemas no código JavaScript/TypeScript
  - Configuração customizada com:
    - Regras do TypeScript (`@typescript-eslint`)
    - Regras de qualidade de código (SonarJS)
    - Integração com Next.js (`eslint-config-next`)
    - Integração com Prettier (`eslint-config-prettier`)
  - Overrides específicos para:
    - Arquivos de teste (Jest): regras mais flexíveis
    - Arquivos de configuração: permite `require()`
    - Arquivos Cypress: regras específicas para testes E2E
- **Prettier**: Formatador automático de código
  - Garante formatação consistente em todo o projeto
  - Configurações principais:
    - Print width: 80 caracteres
    - Single quotes
    - Trailing commas (ES5)
    - Ordenação automática de imports (`@trivago/prettier-plugin-sort-imports`)
  - Integrado com ESLint através de `eslint-config-prettier` para evitar conflitos

**Estrutura de Configuração**:

```
.husky/
├── pre-commit    # Executa lint e formatação antes do commit
├── pre-push      # Executa testes antes do push
└── commit-msg     # Valida formato dos commits usando Commitlint

.eslintrc.json      # Configuração do ESLint com regras TypeScript e SonarJS
.prettierrc         # Configuração do Prettier com ordenação de imports
package.json        # Configuração do Commitizen (cz-conventional-changelog)
```

**Scripts Disponíveis**:

- `npm run commit`: Cria commit usando Commitizen
- `npm run check-lint`: Verifica problemas de lint sem corrigir
- `npm run check-format`: Verifica formatação sem corrigir
- `npm run format`: Formata código automaticamente

**Benefícios**:

- **Qualidade de código**: Problemas detectados antes do commit
- **Consistência**: Formatação e estilo uniformes em todo o projeto
- **Histórico limpo**: Commits semânticos facilitam rastreabilidade e changelog
- **Produtividade**: Automação reduz trabalho manual e erros humanos
- **Colaboração**: Padrões claros facilitam trabalho em equipe
- **CI/CD**: Integração com GitHub Actions para validação contínua

<div align="center">

# CINEROLETA. 🎬

### Gire e assista, simples assim.

**Uma experiência de descoberta cinematográfica que transforma a indecisão em diversão.**

[Sobre o projeto](#sobre-o-projeto) · [Funcionalidades](#funcionalidades) · [Tecnologias](#tecnologias) · [Como executar](#como-executar) · [Próximos passos](#próximos-passos)

</div>

---

## Sobre o projeto

**Cineroleta** é uma aplicação web de descoberta de filmes que combina uma roleta interativa, filtros personalizados e uma interface de pesquisa integrada ao [The Movie Database (TMDB)](https://www.themoviedb.org/).

A proposta nasceu de uma situação familiar: passar mais tempo decidindo o que assistir do que aproveitando o filme. Em vez de navegar indefinidamente por catálogos, a pessoa escolhe suas preferências, gira a roleta e recebe uma sugestão para a próxima sessão.

O projeto também explora uma direção visual inspirada em cartazes de cinema e no design editorial: tipografia expressiva, contrastes marcantes, formas retas, uma paleta bordô e creme e elementos gráficos que dão personalidade à experiência.

> **Status:** frontend desenvolvido e em preparação para revisão e publicação. O backend será iniciado após a aprovação da etapa de frontend.

## Funcionalidades

### Implementadas no frontend

- **Roleta cinematográfica interativa:** animação de sorteio e apresentação do filme selecionado, com título, ano, nota TMDB e sinopse.
- **Filtros combináveis:** seleção de gênero, ano mínimo de lançamento e nota mínima de avaliação no TMDB.
- **Descoberta de filmes via TMDB:** consulta de títulos com base nos filtros selecionados.
- **Busca por filmes:** pesquisa por nome, com pôsteres, informações básicas e avaliações.
- **Resultados progressivos:** exibição inicial de três filmes e carregamento de mais três a cada clique, com paginação da API quando necessário.
- **Estados de interface:** indicador de carregamento, mensagens para pesquisas sem resultados e tratamento de falhas nas requisições.
- **Navegação e conteúdo:** páginas inicial, Explorar e Sobre.
- **Interfaces de acesso:** formulários de entrada e cadastro com validação básica e modais acessíveis por botões, tecla `Esc` e clique fora da janela.
- **Layout responsivo:** adaptação da interface para desktop, tablet e dispositivos móveis.

**Importante:** os formulários de entrada e cadastro são, por enquanto, demonstrativos. O cadastro de usuários e a autenticação real dependem do backend.

### Como funciona a roleta

1. Selecione um gênero ou mantenha **Todos os gêneros**.
2. Defina, se quiser, o **ano mínimo** e a **nota mínima no TMDB**.
3. Gire a roleta para receber uma sugestão de filme que corresponda aos filtros.
4. Não era bem o que procurava? Gire novamente.

A roda possui segmentos visuais fixos, independentemente da quantidade de filmes elegíveis. O sorteio consulta uma página aleatória de resultados dentro do intervalo acessível pela API do TMDB; portanto, **não equivale a uma distribuição uniforme de todo o catálogo**.

## Design e experiência

A identidade do Cineroleta foi desenvolvida para trazer uma linguagem editorial e cinematográfica a uma experiência simples de descoberta.

- **Direção de arte:** visual expressivo, contemporâneo e com referências ao universo do cinema.
- **Paleta:** bordô profundo, creme, rosa suave e amarelo como cor de destaque.
- **Tipografia:** títulos de grande impacto, hierarquia clara e textos de apoio objetivos.
- **Interface:** componentes reutilizáveis, botões de cantos retos e estados de interação consistentes.
- **Experiência:** uma jornada curta entre escolher preferências, sortear e descobrir um filme.

<!-- Após o deploy, você pode adicionar aqui imagens reais da Home, da roleta e da página Explorar. -->

## Tecnologias

| Tecnologia | Utilização |
| --- | --- |
| [React](https://react.dev/) | Construção da interface em componentes e gerenciamento de estado |
| [Vite](https://vite.dev/) | Ambiente de desenvolvimento e build |
| [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Lógica da aplicação e requisições assíncronas |
| [React Router](https://reactrouter.com/) | Navegação entre páginas |
| CSS3 | Estilização, Grid, Flexbox, animações e responsividade |
| [TMDB API](https://developer.themoviedb.org/) | Pesquisa, descoberta e dados de filmes |
| Fetch API | Comunicação com a API externa |
| ESLint | Análise estática e padronização do código |

A estrutura de estilos utiliza a convenção **BEM**, favorecendo a organização e a manutenção dos componentes.

## Como executar

### Pré-requisitos

- Node.js compatível com a versão do Vite declarada em `package.json`.
- npm.
- Uma chave **API Key v3** do [TMDB](https://www.themoviedb.org/settings/api).

### Instalação

Clone o repositório do frontend e entre na pasta do projeto:

```bash
git clone https://github.com/recastig/cineroleta-frontend.git
cd cineroleta-frontend
```

> Substitua a URL pelo endereço real do seu repositório. Caso a pasta clonada tenha outro nome, utilize esse nome no comando `cd`.

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env.local` na raiz, ao lado do `package.json`:

```dotenv
VITE_TMDB_API_KEY=sua_chave_api_v3
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço local informado no terminal, normalmente `http://localhost:5173`.

### Scripts disponíveis

| Comando | Ação |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza localmente o build |
| `npm run lint` | Executa a análise do ESLint |

> **Segurança:** não publique `.env.local` e não adicione credenciais ao repositório. Variáveis com prefixo `VITE_` são expostas no código entregue ao navegador; portanto, a chave usada no frontend não deve ser tratada como um segredo. A estratégia de acesso à API será reavaliada na integração com o backend.

## Organização do projeto

```text
src/
├── components/
│   ├── About/
│   ├── App/
│   ├── Explore/
│   ├── Footer/
│   ├── Header/
│   ├── Main/
│   ├── ModalWithForm/
│   ├── MovieCard/
│   ├── MovieCardList/
│   ├── Navigation/
│   ├── NothingFound/
│   ├── Preloader/
│   ├── Roulette/
│   └── SearchForm/
├── utils/
│   └── TmdbApi.js
└── main.jsx
```

Cada componente concentra sua estrutura JSX e seus estilos, enquanto as funções de integração com o TMDB ficam separadas em `src/utils/TmdbApi.js`.

## Próximos passos

O Cineroleta está sendo desenvolvido em etapas para validar a experiência do frontend antes da implementação dos serviços próprios.

### 1. Finalização e aprovação do frontend

- [ ] Auditar requisitos funcionais e de responsividade.
- [ ] Validar acessibilidade, estados de erro e interações dos modais.
- [ ] Executar os testes finais de lint e build.
- [ ] Publicar o frontend e configurar a variável de ambiente no serviço de hospedagem.
- [ ] Enviar a Pull Request de `stage-react-api` para `main` para revisão e aprovação.

### 2. Backend e recursos de conta — após a aprovação

- [ ] Criar API própria com **Node.js e Express**.
- [ ] Integrar banco de dados para usuários e informações persistentes.
- [ ] Implementar cadastro, login e autenticação real com JWT.
- [ ] Criar uma área de filmes favoritos vinculada ao usuário.
- [ ] Conectar frontend e backend e validar fluxos completos.
- [ ] Publicar a aplicação full-stack e revisar segurança e tratamento de erros.

### 3. Melhorias futuras

- [ ] Aprimorar a experiência de descoberta e as informações dos filmes.
- [ ] Expandir opções de personalização da roleta.
- [ ] Refinar acessibilidade, desempenho e experiência em dispositivos móveis.

Esses itens representam o planejamento do projeto, não funcionalidades já entregues.

## Créditos e atribuição

Dados de filmes disponibilizados por **[The Movie Database (TMDB)](https://www.themoviedb.org/)**.

> Este produto utiliza a API do TMDB, mas não é endossado nem certificado pelo TMDB.

O Cineroleta é um projeto de estudo e portfólio, com foco em desenvolvimento frontend, integração de APIs, interface e experiência do usuário.

---

<div align="center">

**CINEROLETA.**  
*Gire e assista, simples assim.*

</div>

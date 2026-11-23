<div align="center">

# CINEROLETA. 🎬

### Gire e assista, simples assim.

Uma aplicação full-stack de descoberta cinematográfica que transforma a indecisão em uma experiência interativa.

**[Acessar o Cineroleta](https://cineroleta-xi.vercel.app)** · **[API / Backend](https://github.com/recastig/cineroleta-backend)** · **[Explorar funcionalidades](#funcionalidades)** · **[Executar localmente](#como-executar-localmente)**

</div>

---

## Demonstração

![Demonstração da roleta e da experiência Cineroleta](public/demo/cineroleta-demo.gif)

> **GIF em produção:** demonstração curta da roleta e da navegação pelo projeto.

## Sobre o projeto

O **Cineroleta** nasceu de uma situação cotidiana: passar mais tempo decidindo qual filme assistir do que aproveitando a sessão.

Para simplificar essa escolha, a aplicação combina uma **roleta interativa**, **filtros personalizados** e **pesquisa de títulos** usando dados do [The Movie Database (TMDB)](https://www.themoviedb.org/). Depois de encontrar algo interessante, o usuário pode criar uma conta e salvar filmes em uma lista pessoal de favoritos.

O projeto foi desenvolvido como uma aplicação **full-stack**, com frontend em React, API REST própria em Node.js/Express e persistência de dados no MongoDB. A interface e o backend são publicados separadamente, na Vercel e no Render.

Além do desenvolvimento, o Cineroleta tem uma direção de arte própria, inspirada em cartazes de cinema e no design editorial contemporâneo: tipografia expressiva, contrastes marcantes, paleta bordô e creme, detalhes em amarelo e componentes de cantos retos.

**Status:** projeto concluído, aprovado e publicado.

## Funcionalidades

### Descoberta de filmes

- **Roleta interativa:** sorteia uma sugestão e apresenta título, ano de lançamento, nota TMDB e sinopse.
- **Filtros combináveis:** gênero, ano mínimo de lançamento e nota mínima de avaliação no TMDB.
- **Busca por título:** pesquisa filmes pela API do TMDB, com pôsteres e informações relevantes.
- **Resultados progressivos:** apresenta inicialmente três filmes, com carregamento de mais resultados e paginação quando necessário.
- **Estados de interface:** indicadores de carregamento, mensagens para buscas sem resultados e tratamento de falhas nas requisições.

### Conta e favoritos

- **Cadastro e login reais** integrados à API própria.
- **Autenticação com JWT**, recuperação da sessão ao reabrir a aplicação e opção de logout.
- **Página de favoritos protegida**, acessível apenas a usuários autenticados.
- **Adicionar e remover favoritos** diretamente nos cards de filmes, com persistência no MongoDB.
- **Lista individual de filmes salvos**, vinculada ao usuário autenticado.

### Interface e navegação

- Páginas **Início**, **Explorar**, **Sobre** e **Favoritos**.
- Layout responsivo para desktop, tablet e celular.
- Formulários em modais com validação HTML, fechamento por `Esc`, clique fora da janela e gerenciamento de foco.
- Componentes reutilizáveis e estilos organizados pela convenção **BEM**.

## Como funciona a roleta

1. Escolha um gênero ou mantenha **Todos os gêneros**.
2. Defina, se desejar, o **ano mínimo** e a **nota mínima no TMDB**.
3. Gire a roleta para descobrir uma sugestão de filme correspondente aos filtros.
4. Não gostou da sugestão? Gire novamente.

**Nota técnica:** a roleta utiliza segmentos visuais fixos e consulta resultados elegíveis da API do TMDB. O mecanismo não representa uma amostragem uniformemente distribuída de todo o catálogo.

## Design e experiência

A identidade visual foi pensada para transformar uma funcionalidade simples em uma experiência de descoberta com personalidade.

- **Direção de arte:** referências ao universo do cinema e ao design editorial.
- **Cores:** bordô profundo, creme, rosa suave e amarelo como ponto de destaque.
- **Tipografia:** títulos de grande impacto visual e hierarquia clara.
- **Componentes:** formas retas, estados de interação consistentes e layouts responsivos.
- **Experiência:** fluxo curto entre pesquisar, filtrar, sortear e salvar filmes.

## Tecnologias

| Camada | Tecnologias | Aplicação |
| --- | --- | --- |
| Frontend | React, Vite, JavaScript (ES6+) | Componentes, estados, interações e build |
| Navegação | React Router | Rotas públicas e protegidas |
| Estilização | CSS3, Grid, Flexbox, BEM | Identidade visual e responsividade |
| Backend | Node.js, Express | API REST e regras de negócio |
| Banco de dados | MongoDB Atlas, Mongoose | Usuários e filmes favoritos |
| Autenticação | JWT, bcryptjs | Sessão autenticada e senhas com hash |
| Validação e proteção | express-validator, Helmet, express-rate-limit | Validação de entradas e medidas de segurança |
| Integração externa | TMDB API, Fetch API | Busca, descoberta de filmes e comunicação HTTP |
| Qualidade | ESLint | Padronização e análise estática |
| Deploy | Vercel, Render | Hospedagem do frontend e da API |

## Arquitetura

O projeto está dividido em **dois repositórios**:

- **[cineroleta-frontend](https://github.com/recastig/cineroleta-frontend)** — interface React, integração com TMDB, autenticação e gerenciamento de favoritos.
- **[cineroleta-backend](https://github.com/recastig/cineroleta-backend)** — API REST com Express, autenticação JWT, validação, tratamento de erros e persistência com MongoDB.

Fluxo simplificado:

```text
Usuário
   |
   v
Frontend React (Vercel)
   |                  \
   |                   +--> TMDB API (pesquisa e descoberta)
   v
API REST Node.js/Express (Render)
   |
   v
MongoDB Atlas (usuários e favoritos)
```

### Endpoints principais da API

| Método | Endpoint | Descrição | Autenticação |
| --- | --- | --- | --- |
| `POST` | `/api/signup` | Cadastrar usuário | Não |
| `POST` | `/api/signin` | Autenticar usuário | Não |
| `GET` | `/api/users/me` | Consultar perfil atual | Sim |
| `GET` | `/api/movies` | Listar favoritos do usuário | Sim |
| `POST` | `/api/movies` | Adicionar filme aos favoritos | Sim |
| `DELETE` | `/api/movies/:movieId` | Remover um favorito | Sim |
| `GET` | `/api/health` | Verificar disponibilidade da API | Não |

As rotas privadas recebem o token no cabeçalho `Authorization: Bearer <token>`.

**API publicada:** https://cineroleta-api.onrender.com/api

## Como executar localmente

### Pré-requisitos

- Node.js em versão compatível com o Vite definido em `package.json`.
- npm.
- Uma [API Key v3 do TMDB](https://www.themoviedb.org/settings/api).
- A API do backend acessível (publicada ou executada localmente).

### 1. Clonar e instalar o frontend

```bash
git clone https://github.com/recastig/cineroleta-frontend.git
cd cineroleta-frontend
npm install
```

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do frontend, ao lado de `package.json`:

```dotenv
VITE_TMDB_API_KEY=sua_chave_api_v3
VITE_BACKEND_API_URL=https://cineroleta-api.onrender.com/api
```

Para desenvolvimento com o backend em execução local, utilize `VITE_BACKEND_API_URL=http://localhost:3000/api` em vez da URL publicada. Nesse cenário, inicie também a API e configure seu acesso ao MongoDB conforme as instruções do [repositório do backend](https://github.com/recastig/cineroleta-backend).

### 3. Iniciar o frontend

```bash
npm run dev
```

Abra o endereço exibido pelo Vite no terminal, normalmente `http://localhost:5173`.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Iniciar servidor de desenvolvimento |
| `npm run build` | Gerar build de produção |
| `npm run preview` | Visualizar o build localmente |
| `npm run lint` | Executar o ESLint |

> **Variáveis e segurança:** não versione `.env.local` nem credenciais privadas. Variáveis com prefixo `VITE_` são incorporadas ao bundle do navegador e **não devem conter segredos**. O token de autenticação é utilizado para acessar rotas privadas da API.

## Organização do frontend

```text
src/
├── components/
│   ├── About/
│   ├── App/
│   ├── Explore/
│   ├── Favorites/
│   ├── Footer/
│   ├── Header/
│   ├── Main/
│   ├── ModalWithForm/
│   ├── MovieCard/
│   ├── MovieCardList/
│   ├── Navigation/
│   ├── NothingFound/
│   ├── Preloader/
│   ├── ProtectedRoute/
│   ├── Roulette/
│   └── SearchForm/
├── contexts/
│   └── CurrentUserContext.js
├── utils/
│   ├── AuthApi.js
│   ├── MoviesApi.js
│   └── TmdbApi.js
└── main.jsx
```

Os componentes concentram a interface e os estilos. A comunicação com as APIs fica separada em módulos de `src/utils`, enquanto `CurrentUserContext` disponibiliza as informações do usuário autenticado aos componentes.

## Desafios e aprendizados

O desenvolvimento do Cineroleta envolveu tanto decisões de produto e interface quanto desafios de integração full-stack:

- **Conectar serviços distintos:** integrar um frontend na Vercel com uma API no Render, incluindo configuração de CORS e variáveis de ambiente por ambiente de deploy.
- **Organizar a autenticação:** implementar cadastro, login, validação de JWT, persistência de sessão e proteção de rotas no React.
- **Sincronizar dados externos e próprios:** utilizar o TMDB para consulta de filmes e o MongoDB para manter favoritos individuais.
- **Tratar estados assíncronos:** lidar com carregamento, erros, paginação, requisições canceláveis e feedback durante ações nos favoritos.
- **Unir design e desenvolvimento:** construir uma interface com identidade visual própria sem comprometer a legibilidade ou a adaptação entre tamanhos de tela.

## Evoluções futuras

O projeto está funcional e concluído em seu escopo atual. Algumas ideias para futuras versões são:

- [ ] Ampliar as opções de personalização da roleta.
- [ ] Enriquecer a apresentação e os detalhes dos filmes.
- [ ] Aprofundar testes automatizados, acessibilidade e desempenho.
- [ ] Explorar novas formas de organizar e compartilhar listas pessoais.

## Créditos e atribuição

Os dados cinematográficos são fornecidos pelo **[The Movie Database (TMDB)](https://www.themoviedb.org/)**.

> Este produto utiliza a API do TMDB, mas não é endossado nem certificado pelo TMDB.

O Cineroleta é um projeto de estudo e portfólio que reúne desenvolvimento full-stack, integração de APIs, interface e experiência do usuário.

---

<div align="center">

**CINEROLETA.**  
*Gire e assista, simples assim.*

</div>

# CineHub

Projeto final — Catálogo de filmes (trabalho prático de Programação para Internet I)

## Descrição

CineHub é uma interface simples para pesquisar e visualizar informações de filmes usando a API do The Movie Database (TMDB). O projeto exibe um carrossel com filmes em tendência, permite buscar por títulos, ver detalhes (sinopse, elenco, diretor, nota e trailer) e salvar filmes nos favoritos (localStorage).

O objetivo é demonstrar consumo de API, manipulação do DOM, armazenamento local e responsividade básica.

## Principais funcionalidades

- Carrossel de filmes em tendência (hero)
- Busca por título com resultados em grade
- Página de detalhes do filme com trailer, sinopse, poster, elenco e diretor
- Favoritar filmes (persistência em `localStorage`)
- Página de Favoritos
- Layout responsivo (desktop / tablet / mobile)

## Estrutura do projeto

- `index.html` — página principal
- `pages/favoritos.html` — página de favoritos
- `css/style.css` — estilos do site
- `js/` — lógica JavaScript
  - `api.js` — chamadas à API TMDB
  - `main.js` — lógica principal, eventos e interação
  - `dom.js` — funções que geram HTML (cards, detalhes)
  - `funcoes.js` — utilitários (favoritos/localStorage)
  - `classes.js` — classe `Filme`

## Requisitos

- Navegador moderno com suporte a ES Modules
- Chave da API do TMDB (opcionalmente já presente em `js/api.js`) — recomenda-se usar sua própria chave

## Como executar (local)

A forma mais simples é abrir `index.html` no navegador, mas para evitar restrições de CORS/recursos, recomenda-se servir o diretório com um servidor local. Exemplo com Python (requere Python instalado):

```powershell
# na pasta do projeto
python -m http.server 8000
# depois abra no navegador:
# http://localhost:8000
```

Alternativas:

- Usar a extensão Live Server do VS Code
- `npx http-server . -p 8000` (Node.js)

## Trocar a API key do TMDB

Abra o arquivo `js/api.js` e substitua o valor da constante `API_KEY` pela sua chave:

```js
const API_KEY = "SUA_CHAVE_AQUI";
```

Salve e recarregue a página.

## Notas sobre desenvolvimento

- A lógica e os estilos foram separados (JS = comportamento, CSS = apresentação).
- Os trailers são embutidos via iframe usando URLs do YouTube (`embed`).
- Favoritos são salvos como JSON em `localStorage` (chave `favoritos`).

## Licença

Projeto para fins de estudo/ensino. Use como referência — se for publicar, acrescente uma licença apropriada.

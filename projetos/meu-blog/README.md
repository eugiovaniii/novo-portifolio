# Meu Blog

Pequeno projecto de blog “miniatura” 100 % cliente, construído com HTML,
CSS e JavaScript vanilla. não existe servidor nem banco de dados; os
posts são mantidos no *localStorage* do browser. a aplicação foi concebida
para servir como base de estudo de manipulação de DOM, eventos e
persistência local.

## Visão geral

A página principal se comporta como um **feed** de publicações. há um
botão flutuante no canto inferior‑direito que abre/fecha o formulário
para criar um novo post; o formulário é escondido por padrão. um campo de
pesquisa no cabeçalho permite filtrar o feed em tempo real. cada post
apresenta título, conteúdo e botão de exclusão.

O layout é responsivo e utiliza sombras e transições para tornar a
interface mais atraente. todo o estado (posts, tema, …) fica
gravado no `localStorage`, de modo que sobrevive a recargas do navegador.

## Funcionalidades

- feed de posts exibido em uma `div#postsContainer`;
- botão flutuante (`#newPostBtn`) para mostrar/ocultar o formulário;
- formulário reutilizável para criação (aparecimento dinâmico) e leitura
  de título/conteúdo;
- pesquisa instantânea por título ou texto do post (`#searchInput`);
- exclusão individual de publicações;
- persistência de dados no `localStorage`;
- estrutura CSS simples com regras para o feed e o botão fixo.

## Estrutura de arquivos

- `index.html`

  - `<header>` contendo o nome do blog e o campo de pesquisa;
  - `button#newPostBtn` posicionado no canto via CSS;
  - `<form id="postForm" class="hidden">` – começa oculto, exibido pelo
    botão;
  - `<main>` com título “Feed” e a `div#postsContainer` onde o JS injeta
    os posts;
  - footer com créditos;
  - referências a `style.css` e `script.js`.

- `style.css`

  - regras gerais (fonte, cores, margens);
  - classe `.hidden` para esconder elementos;
  - estilo do feed (`main`, `.post`), do botão flutuante e do cabeçalho;
  - transições e efeitos de hover.

- `script.js`

  - funções puras:

    - `savePost(title,content)` – lê o array de posts do
      `localStorage`, adiciona um objecto e grava de volta;
    - `loadPosts(term = '')` – obtém os posts e os mostra na página; se
      `term` estiver preenchido, faz filtro case‑insensitive por título/
      conteúdo;
    - `filterPosts()` – obtém o valor de `#searchInput` e chama
      `loadPosts`;
    - `deletePost(index)` – remove um post pelo índice e atualiza o
      armazenamento;
  
  - listeners:

    - submit de `#postForm` – previne recarga, valida campos, salva o post,
      atualiza vista e oculta o formulário;
    - clique em `#newPostBtn` – alterna a visibilidade do formulário;
    - input de `#searchInput` – dispara busca a cada tecla;
    - `window.onload` dispara `loadPosts()`.

  - manipulação simples do DOM via `createElement` / `innerHTML` para
    montar os cartões dos posts dinamicamente.

## Como usar

1. abra `index.html` no navegador (duplo‑clique ou via servidor local).
2. clique no botão ✎ no canto para revelar o formulário.
3. preencha “Título” e “Conteúdo” e clique em **Publicar**; o feed será
   atualizado e o formulário ocultado.
4. digite algo na caixa de busca para filtrar o feed em tempo real.
5. use o botão “Apagar” em cada post para removê‑lo.
6. os dados são mantidos no `localStorage`; feche/reabra o navegador e
   os posts permanecerão.

## Observações técnicas

- todos os caminhos são relativos (`style.css`, `script.js`), o que
  facilita hospedar o projecto em GitHub Pages, mesmo em sub‑pasta.
- o armazenamento local é um simples JSON serializado em
  `localStorage.posts`; se o browser for limpo ou acessado de outro
  domínio, os dados não estarão disponíveis.
- o código é intencionalmente mínimo e modularizado; apenas manipula o
  DOM sem frameworks, facilitando extensões (edição, tags, upload de
  imagens, sincronização com API, etc.).
- a classe `.hidden` controla visibilidade; alterar o formulário para
  estar sempre visível exigiria só remover essa classe do HTML.

---

© 2024 | [Giovani Pereira Macedo]

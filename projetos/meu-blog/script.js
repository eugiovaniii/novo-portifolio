// Função para salvar os posts no armazenamento local do navegador
function savePost(title, content) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push({ title, content });
  localStorage.setItem('posts', JSON.stringify(posts));
}

// 'term' opcional para filtrar por título/conteúdo
function loadPosts(term = '') {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  if (term) {
    term = term.toLowerCase();
    posts = posts.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term)
    );
  }
  let postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
      let postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Apagar';
      deleteButton.addEventListener('click', () => deletePost(index));
      postElement.appendChild(deleteButton);
      postsContainer.appendChild(postElement);
  });
}

// chama loadPosts com o termo digitado
function filterPosts() {
  const term = document.getElementById('searchInput').value;
  loadPosts(term);
}

// Função para apagar um post
function deletePost(index) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  loadPosts();
}

// Evento de envio do formulário
document.getElementById('postForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let title = document.getElementById('postTitle').value;
  let content = document.getElementById('postContent').value;
  if (title && content) {
      savePost(title, content);
      loadPosts();
      document.getElementById('postForm').reset();
      document.getElementById('postForm').classList.add('hidden');
  } else {
      alert('Por favor, preencha todos os campos.');
  }
});

// Carregar os posts ao carregar a página
window.onload = loadPosts;

// alterna visibilidade do formulário ao clicar no botão
document.getElementById('newPostBtn').addEventListener('click', () => {
  const form = document.getElementById('postForm');
  form.classList.toggle('hidden');
  if (!form.classList.contains('hidden')) {
    form.querySelector('#postTitle').focus();
  }
});

document.getElementById('searchInput').addEventListener('input', filterPosts);

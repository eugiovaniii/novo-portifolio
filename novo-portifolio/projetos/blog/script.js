// Função para salvar os posts no armazenamento local do navegador
function savePost(title, content) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push({ title, content });
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Função para carregar os posts salvos
function loadPosts() {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
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
  } else {
      alert('Por favor, preencha todos os campos.');
  }
});

// Carregar os posts ao carregar a página
window.onload = loadPosts;
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

// anterior envio via form foi substituído pelo botão único

// Carregar os posts ao carregar a página
window.onload = loadPosts;

// único botão: abre campos ou publica
document.getElementById('newPostBtn').addEventListener('click', () => {
  const form = document.getElementById('postForm');
  const titleEl = document.getElementById('postTitle');
  const contentEl = document.getElementById('postContent');
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    titleEl.focus();
    // scroll to inputs in mobile view
    setTimeout(() => {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  } else {
    const title = titleEl.value.trim();
    const content = contentEl.value.trim();
    if (title && content) {
      savePost(title, content);
      loadPosts();
      titleEl.value = '';
      contentEl.value = '';
      form.classList.add('hidden');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
});

document.getElementById('searchInput').addEventListener('input', filterPosts);

// alterna entre visualização mobile e desktop usando checkbox slider
const viewToggle = document.getElementById('viewToggle');
const viewLabel = document.getElementById('viewModeLabel');
if (viewToggle && viewLabel) {
  // iniciar em modo mobile com controle ligado
  document.body.classList.add('mobile-mode');
  viewToggle.checked = true; // checked = mobile
  viewLabel.textContent = 'Mobile';

  viewToggle.addEventListener('change', () => {
    if (viewToggle.checked) {
      document.body.classList.add('mobile-mode');
      viewLabel.textContent = 'Mobile';
    } else {
      document.body.classList.remove('mobile-mode');
      viewLabel.textContent = 'Desktop';
    }
  });
}

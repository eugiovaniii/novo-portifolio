// Atualizar dinamicamente o ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Adicionar rolagem suave aos links de navegação
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 50, // Ajuste para compensar o menu fixo
        behavior: 'smooth'
      });
    }
  });
});
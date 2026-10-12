/* ==========================================================================
   ARLE CONFEITARIA - JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Alternar Menu Mobile (Hambúrguer)
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Fechar menu ao clicar em um link (para telas pequenas)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Filtro de Categorias do Cardápio
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Adiciona no botão clicado
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (category === 'todos' || itemCategory === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

/**
 * 4. Função para gerar o link direto do WhatsApp ao pedir um produto
 * @param {string} nomeProduto 
 */
function pedirWhatsApp(nomeProduto) {
    // Altere este número para o WhatsApp oficial da confeitaria (com DDD e Código do País 55)
    const numeroTelefone = "5541999999999"; 
    
    const mensagem = `Olá, Arle Confeitaria! Gostaria de fazer o pedido do item: *${nomeProduto}*. Poderiam me informar a disponibilidade e formas de entrega?`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;
    
    window.open(urlWhatsApp, '_blank');
}
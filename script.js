document.querySelectorAll('.whatsapp-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const product = button.closest('.product').querySelector('h3').textContent;
    const phoneNumber = '5511999999999'; // seu número no formato internacional sem o +
    const text = encodeURIComponent(`Quero fazer um pedido de ${product}`);
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, '_blank');
  });
});
window.addEventListener('load', () => {
  alert('Bem-vindo à Arle Confeitaria! Desejamos um dia doce para você.');
});

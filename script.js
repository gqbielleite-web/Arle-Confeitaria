/*
 * Personalize esta configuração com os dados reais da Arle antes de publicar.
 * O telefone deve ter somente números: código do país + DDD + número.
 * Exemplo de formato: 5511999999999 (não use esse número como contato real).
 */
const ARLE_CONFIG = {
  whatsappNumber: "",
  address: "[INSERIR ENDEREÇO COMPLETO]",
  openingHours: "[INSERIR DIAS E HORÁRIOS]",
  mapsDestination: "",
};
const cleanPhone = ARLE_CONFIG.whatsappNumber.replace(/\D/g, "");
const addressIsSet = !ARLE_CONFIG.address.startsWith("[");
const whatsappIsSet = cleanPhone.length >= 12;
document.querySelector("[data-address]").textContent = ARLE_CONFIG.address;
document.querySelector("[data-hours]").textContent = ARLE_CONFIG.openingHours;
document.querySelectorAll("[data-order]").forEach((link) => {
  const product = link.dataset.order;
  const message = product
    ? `Oi, Arle! Quero saber mais sobre ${product} e fazer uma encomenda.`
    : "Oi, Arle! Quero conhecer o cardápio e fazer uma encomenda.";
  if (whatsappIsSet) {
    link.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noreferrer";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert("Preencha whatsappNumber no arquivo script.js com o telefone da Arle.");
    });
  }
});
document.querySelectorAll("[data-map]").forEach((link) => {
  if (addressIsSet || ARLE_CONFIG.mapsDestination.trim()) {
    const destination = ARLE_CONFIG.mapsDestination.trim() || ARLE_CONFIG.address;
    link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
    link.target = "_blank";
    link.rel = "noreferrer";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.alert("Preencha address ou mapsDestination no arquivo script.js para ativar o mapa.");
    });
  }
});
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.querySelector(".menu-toggle-label").textContent = isOpen ? "Abrir menu" : "Fechar menu";
  menu.classList.toggle("is-open", !isOpen);
});
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".menu-toggle-label").textContent = "Abrir menu";
    menu.classList.remove("is-open");
  });
});
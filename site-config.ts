/**
 * DADOS DA ARLE — substitua os campos marcados antes de publicar.
 * O telefone deve conter somente números, com código do país e DDD (ex.: 55...).
 */
export const business = {
  name: 'Arle Confeitaria',
  address: '[INSERIR RUA, NÚMERO, BAIRRO E CIDADE]',
  hours: '[INSERIR DIAS E HORÁRIOS DE FUNCIONAMENTO]',
  whatsappNumber: '', // INSERIR NÚMERO COM DDI + DDD, somente números
  mapsDestination: '', // INSERIR endereço completo ou link de localização do Google Maps
  instagramUrl: '', // INSERIR URL do perfil da Arle no Instagram
} as const;

/** Todas as encomendas usam este número e já abrem com uma mensagem preenchida. */
export function orderLink(product?: string) {
  const message = product
    ? `Oi, Arle! Quero saber mais sobre ${product} e fazer uma encomenda.`
    : 'Oi, Arle! Quero conhecer o cardápio e fazer uma encomenda.';
  const phone = business.whatsappNumber.replace(/\D/g, '');
  const base = phone ? `https://wa.me/${phone}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function mapsLink() {
  const destination = business.mapsDestination.trim() || business.address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
}

export function isConfigured(value: string) {
  return Boolean(value.trim() && !value.startsWith('['));
}

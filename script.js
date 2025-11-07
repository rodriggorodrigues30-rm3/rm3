
const WA_NUMBER = "+5551999468890";

document.getElementById('year').textContent = new Date().getFullYear();

function openWhatsAppWithMessage(text){
  const digits = WA_NUMBER.replace(/[^0-9]/g,'');
  const url = `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

document.getElementById('emergencyBtn').addEventListener('click', () => {
  const msg = "🚨 Atendimento Emergencial 24h 🚨\nOlá! Preciso de um eletricista urgente. Local: (informe endereço).";
  openWhatsAppWithMessage(msg);
});

document.getElementById('waBtn').addEventListener('click', () => {
  const msg = "Olá! Tenho interesse nos serviços da RM³ Instalações Elétricas.";
  openWhatsAppWithMessage(msg);
});

document.getElementById('quoteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value || '';
  const phone = document.getElementById('phone').value || '';
  const message = document.getElementById('message').value || '';
  const msg = `Olá, meu nome é ${name} (${phone}). Gostaria de um orçamento: ${message}`;
  openWhatsAppWithMessage(msg);
});

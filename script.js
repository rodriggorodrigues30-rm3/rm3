// script.js - atualização mensagens multilinha
const MAIN_WHATSAPP = "5551999468890";

function setButtonLinks(){
  const emergency = document.getElementById('emergencyLink');
  const whatsapp = document.getElementById('whatsappLink');
  if(emergency){
    const msg = [
      "Atendimento emergencial 24h",
      "Nome e Endereço:",
      "Descrição do problema:",
      "Atendimento em toda Grande Porto Alegre e região do Vale dos Sinos"
    ].join("%0A");
    emergency.href = `https://wa.me/${MAIN_WHATSAPP}?text=${msg}`;
  }
  if(whatsapp){
    const msg = [
      "Nome e Endereço:",
      "Descrição do que precisa:",
      "Atendimento em toda Grande Porto Alegre e região do Vale dos Sinos"
    ].join("%0A");
    whatsapp.href = `https://wa.me/${MAIN_WHATSAPP}?text=${msg}`;
  }
}

document.addEventListener('DOMContentLoaded', setButtonLinks);

// script.js - atualizações: botões diretos para WhatsApp + rotação de dicas weekly
const MAIN_WHATSAPP = "5551999468890";

const TIPS = [
  "Temperaturas elevadas aumentam consumo; revise disjuntores e conexões.",
  "Evite sobrecarga: distribua aparelhos em circuitos diferentes.",
  "Mantenha ventilação adequada em quadros de distribuição.",
  "Use disjuntores e cabos corretos para cada circuito."
];

const TIP_KEY = "rm3_tip_idx_v3";
const TIP_DATE_KEY = "rm3_tip_date_v3";

function daysBetween(a,b){ return Math.floor((new Date(b)-new Date(a))/(1000*60*60*24)); }

function rotateTipWeekly(){
  try{
    const lastDate = localStorage.getItem(TIP_DATE_KEY);
    let idx = parseInt(localStorage.getItem(TIP_KEY) || "0",10) || 0;
    if(!lastDate || daysBetween(lastDate, new Date().toISOString()) >= 7){
      idx = (idx + 1) % TIPS.length;
      localStorage.setItem(TIP_KEY, idx.toString());
      localStorage.setItem(TIP_DATE_KEY, new Date().toISOString());
    }
    const el = document.getElementById('tipText');
    if(el) el.textContent = TIPS[idx] || TIPS[0];
  }catch(e){ console.error(e); }
}

// Atualiza hrefs das âncoras com mensagens dinâmicas (inclui cidade/região)
function setButtonLinks(){
  const emergency = document.getElementById('emergencyLink');
  const whatsapp = document.getElementById('whatsappLink');
  if(emergency) emergency.href = `https://wa.me/${MAIN_WHATSAPP}?text=${encodeURIComponent('Atendimento emergencial solicitado. Favor retorno urgente. Local: Canoas')}`;
  if(whatsapp) whatsapp.href = `https://wa.me/${MAIN_WHATSAPP}?text=${encodeURIComponent('Solicito orcamento para servicos eletricos. Local: Canoas - Grande Porto Alegre e Vale dos Sinos. Detalhes:')}`;
}

document.addEventListener('DOMContentLoaded', function(){
  // garante que a dica aparece imediatamente (fallback em HTML) e depois atualiza/rota semanal
  rotateTipWeekly();
  setButtonLinks();
});
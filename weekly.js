
(function(){
  const dicas = [
    "Temperaturas elevadas podem aumentar o consumo e aquecimento em fios e disjuntores. Faça revisões periódicas.",
    "Evite sobrecarga: não use muitas extensões em um único ponto. Distribua as cargas.",
    "Mantenha ventilação adequada em quadros de distribuição para reduzir aquecimento.",
    "Cuidado com aparelhos antigos — contatos frouxos aumentam risco de faísca e aquecimento.",
    "Instale proteção diferencial e disjuntores corretos para cada circuito.",
    "Faça inspeções regulares antes da alta temporada (ar-condicionado, aquecedores).",
    "Fiação exposta ou emendada aumenta o risco — prefira sempre emendas técnicas e caixas apropriadas.",
    "Economize energia usando temporizadores e automação para cargas não essenciais."
  ];

  function getWeekNumber(d = new Date()) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  }

  function setWeeklyTip(){
    const el = document.getElementById('weeklyTip');
    if(!el) return;
    const week = getWeekNumber(new Date());
    const tip = dicas[ week % dicas.length ];
    el.textContent = tip;
  }

  // set whatsapp links using correct number
  function setWhatsAppLinks(){
    const number = '5551999468890';
    const emergency = document.getElementById('emergency');
    const whatsapp = document.getElementById('whatsapp');
    if(emergency) emergency.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent('URGÊNCIA: Preciso de atendimento imediato - [endereço]');
    if(whatsapp) whatsapp.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent('ORÇAMENTO: Solicito orçamento - [endereço ou descrição]');
  }

  document.addEventListener('DOMContentLoaded', function(){
    setWeeklyTip();
    setWhatsAppLinks();
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();

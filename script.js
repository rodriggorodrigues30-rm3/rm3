
(function(){
  const PHONE = '+5551999468890'; // updated number
  const emergencyBtn = document.getElementById('emergencyBtn');
  const waBtn = document.getElementById('waBtn');
  const form = document.getElementById('leadForm');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  // WhatsApp messages for different actions
  function waUrlFor(text){
    const base = 'https://wa.me/' + PHONE.replace(/[^0-9]/g,'') + '?text=' + encodeURIComponent(text);
    return base;
  }

  // Emergency button: different message
  emergencyBtn.addEventListener('click', function(e){
    e.preventDefault();
    const msg = "EMERGÊNCIA: Preciso de atendimento imediato (24h). Endereço e detalhes: ";
    window.open(waUrlFor(msg), '_blank');
  });

  // General WhatsApp button (calls for orçamento by default)
  waBtn.addEventListener('click', function(e){
    e.preventDefault();
    const msg = "Olá RM³, gostaria de um orçamento. Meu nome: , telefone: , endereço: ";
    window.open(waUrlFor(msg), '_blank');
  });

  // Form submits as Orçamento message
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const text = `Olá RM³, meu nome é ${name} - ${phone}. ${message}`;
    // save lead locally
    try {
      const leads = JSON.parse(localStorage.getItem('rm3_leads')||'[]');
      leads.unshift({name,phone,message,date:new Date().toISOString()});
      localStorage.setItem('rm3_leads', JSON.stringify(leads));
    } catch(e){}
    window.open(waUrlFor(text), '_blank');
  });

})();

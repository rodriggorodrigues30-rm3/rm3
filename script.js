
function handleForm(e){
  e.preventDefault();
  const name = document.getElementById('name').value || 'Cliente';
  let phone = document.getElementById('phone').value || '+5551999468890';
  phone = phone.replace(/\D/g,'');
  const message = document.getElementById('message').value || 'Solicito orçamento';
  const text = encodeURIComponent('ORÇAMENTO: ' + name + ' - ' + message);
  const url = 'https://wa.me/' + phone + '?text=' + text;
  window.open(url, '_blank');
  // save lead locally
  try {
    const leads = JSON.parse(localStorage.getItem('rm3_leads')||'[]');
    leads.unshift({name,phone,message,date:new Date().toISOString()});
    localStorage.setItem('rm3_leads', JSON.stringify(leads));
  } catch(e){}
}

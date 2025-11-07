
// script.js - RM3 website fixes

// main contact (international format, no + or spaces)
const WHATSAPP_NUMBER = "5551999468890";

// elements
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const descInput = document.getElementById("descInput");
const sendBtn = document.getElementById("sendBtn");
const emergencyBtn = document.getElementById("emergencyBtn");
const whatsappBtn = document.getElementById("whatsappBtn");
const clearDraftBtn = document.getElementById("clearDraftBtn");
const tipText = document.getElementById("tipText");

const DRAFT_KEY = "rm3_orcamento_draft_v1";

// short tips (you can edit or add more phrases)
const TIPS = [
  "Temperaturas elevadas podem aumentar o consumo e aquecer contatos e disjuntores.",
  "Verifique periodicamente fusíveis e conexões por sinais de aquecimento.",
  "Evite ligar vários aparelhos de alta potência na mesma tomada.",
  "Use disjuntores dimensionados corretamente para proteger seu circuito."
];

// load random tip (or rotate)
function loadTip() {
  try {
    // pick random tip
    const idx = Math.floor(Math.random() * TIPS.length);
    tipText.textContent = TIPS[idx];
  } catch(e) {
    tipText.textContent = "Dica indisponível.";
  }
}

// localStorage draft functions
function loadDraft(){
  try{
    const raw = localStorage.getItem(DRAFT_KEY);
    if(!raw) return;
    const data = JSON.parse(raw);
    if(data.name) nameInput.value = data.name;
    if(data.phone) phoneInput.value = data.phone;
    if(data.desc) descInput.value = data.desc;
  }catch(e){ console.error("loadDraft err", e); }
}
function saveDraft(){
  const obj = { name: nameInput.value||"", phone: phoneInput.value||"", desc: descInput.value||"" };
  try{ localStorage.setItem(DRAFT_KEY, JSON.stringify(obj)); }catch(e){ console.error("saveDraft err", e); }
}
function clearDraft(){
  localStorage.removeItem(DRAFT_KEY);
  if(nameInput) nameInput.value = "";
  if(phoneInput) phoneInput.value = "";
  if(descInput) descInput.value = "";
}

// pick contact number to open WA (if user provided a number we'll still use main contact for site messages)
// this returns the number to open the wa.me link with
function pickContactNumber() {
  // default use site phone
  return WHATSAPP_NUMBER;
}

// build whatsapp message
function buildWhatsAppMessage(isEmergency=false){
  const name = (nameInput && nameInput.value.trim()) || "";
  const phone = (phoneInput && phoneInput.value.trim()) || "";
  const desc = (descInput && descInput.value.trim()) || "";
  if(isEmergency){
    let m = "Atendimento emergencial solicitado.\n";
    if(name) m += "Nome: " + name + "\n";
    if(phone) m += "Tel: " + phone + "\n";
    if(desc) m += "Detalhes: " + desc + "\n";
    m += "Por favor, retorno urgente.";
    return m;
  } else {
    let m = "Solicito orçamento:\n";
    if(name) m += "Nome: " + name + "\n";
    if(phone) m += "Telefone: " + phone + "\n";
    if(desc) m += "Descrição: " + desc + "\n";
    m += "\nAguardo contato. Obrigado.";
    return m;
  }
}

// open whatsapp in new tab/window
function openWhatsApp(number, message){
  const num = (number || "").replace(/\D/g, "");
  const encoded = encodeURIComponent(message || "");
  const url = `https://wa.me/${num}?text=${encoded}`;
  // open; if popup blocked user may need to allow or click manually
  window.open(url, "_blank");
}

// attach events
if(sendBtn){
  sendBtn.addEventListener("click", function(){
    saveDraft();
    const message = buildWhatsAppMessage(false);
    const target = pickContactNumber();
    openWhatsApp(target, message);
    // do NOT clear draft automatically to avoid losing data
  });
}
if(clearDraftBtn){
  clearDraftBtn.addEventListener("click", function(){
    clearDraft();
    alert("Rascunho limpo.");
  });
}
if(emergencyBtn){
  emergencyBtn.addEventListener("click", function(){
    // open emergency message
    const message = buildWhatsAppMessage(true);
    openWhatsApp(WHATSAPP_NUMBER, message);
  });
}
if(whatsappBtn){
  whatsappBtn.addEventListener("click", function(){
    const message = "Olá! Gostaria de solicitar atendimento / informações.";
    openWhatsApp(WHATSAPP_NUMBER, message);
  });
}

// save draft while typing
[nameInput, phoneInput, descInput].forEach(el => {
  if(!el) return;
  el.addEventListener("input", saveDraft);
});

// init
loadTip();
loadDraft();

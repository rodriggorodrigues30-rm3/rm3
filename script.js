// Script to handle tips rotation, WhatsApp links and form persistence
(() => {
  const WHATSAPP_NUMBER = "5551999468890"; // +55 51 99946-8890

  // Array of short tips (kept discreet, can rotate weekly)
  const TIPS = [
    "Temperaturas elevadas aumentam consumo; revise disjuntores e conexões.",
    "Evite sobrecarga: distribua aparelhos em circuitos diferentes.",
    "Use disjuntores e cabos adequados — segurança em primeiro lugar.",
    "Mantenha quadros limpos e ventilados para reduzir aquecimento."
  ];

  const TIP_KEY = "rm3_tip_index_v1";
  const TIP_DATE_KEY = "rm3_tip_date_v1";

  function daysSince(dateStr) {
    if (!dateStr) return 9999;
    try {
      const then = new Date(dateStr);
      const now = new Date();
      const diff = Math.floor((now - then) / (1000*60*60*24));
      return diff;
    } catch(e){ return 9999; }
  }

  // Rotate tip weekly (7 days) using localStorage
  function getCurrentTip() {
    try {
      const lastDate = localStorage.getItem(TIP_DATE_KEY);
      const lastIndex = parseInt(localStorage.getItem(TIP_KEY) || "0", 10) || 0;
      const days = daysSince(lastDate);
      if (days >= 7) {
        const next = (lastIndex + 1) % TIPS.length;
        localStorage.setItem(TIP_KEY, next.toString());
        localStorage.setItem(TIP_DATE_KEY, (new Date()).toISOString());
        return TIPS[next];
      }
      return TIPS[lastIndex] || TIPS[0];
    } catch(e) {
      return TIPS[0];
    }
  }

  // If tip blank or not loaded, immediately set one
  function ensureTipLoaded() {
    const el = document.getElementById('tip-text');
    if (!el) return;
    const tip = getCurrentTip();
    el.textContent = tip;
  }

  // Build wa.me url
  function buildWhatsUrl(number, text) {
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  // Form utilities
  function getFormData() {
    return {
      name: document.getElementById('field-name').value.trim(),
      phone: document.getElementById('field-phone').value.trim(),
      message: document.getElementById('field-message').value.trim()
    };
  }

  function saveDraft() {
    try {
      const d = getFormData();
      localStorage.setItem('rm3_form_draft_v1', JSON.stringify(d));
    } catch(e){}
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem('rm3_form_draft_v1');
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.name) document.getElementById('field-name').value = d.name;
      if (d.phone) document.getElementById('field-phone').value = d.phone;
      if (d.message) document.getElementById('field-message').value = d.message;
    } catch(e){}
  }

  function clearDraft() {
    localStorage.removeItem('rm3_form_draft_v1');
    const form = document.getElementById('contact-form');
    if (form) form.reset();
  }

  function buildBudgetMessage(data) {
    return `Olá! Gostaria de solicitar um orçamento.%0A%0ANome: ${data.name || '-'}%0ATelefone: ${data.phone || '-'}%0AServiço/Endereço: ${data.message || '-'}`;
  }

  function buildEmergencyMessage() {
    return `Atendimento emergencial solicitado. Favor contatar o número +55 51 99946-8890 e enviar localização.`;
  }

  // Ensure buttons behave
  function setupButtons() {
    const btnSend = document.getElementById('btn-send');
    const btnEmerg = document.getElementById('btn-emergency');
    const btnWhats = document.getElementById('btn-whatsapp');
    const btnClear = document.getElementById('btn-clear');

    if (btnSend) {
      btnSend.addEventListener('click', (e) => {
        e.preventDefault();
        const data = getFormData();
        // open whatsapp with message (new tab)
        const msg = buildBudgetMessage(data);
        const url = buildWhatsUrl(WHATSAPP_NUMBER, msg);
        window.open(url, '_blank');
        // keep draft saved automatically so user doesn't lose info
      });
    }

    if (btnEmerg) {
      btnEmerg.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = buildEmergencyMessage();
        window.open(buildWhatsUrl(WHATSAPP_NUMBER, msg), '_blank');
      });
    }

    if (btnWhats) {
      btnWhats.addEventListener('click', (e) => {
        e.preventDefault();
        const d = getFormData();
        const useForm = (d.name || d.phone || d.message);
        const msg = useForm ? buildBudgetMessage(d) : "Olá! Gostaria de mais informações sobre os serviços.";
        window.open(buildWhatsUrl(WHATSAPP_NUMBER, msg), '_blank');
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', (e) => {
        e.preventDefault();
        clearDraft();
      });
    }
  }

  // attach save listeners
  function attachSaveListeners() {
    ['field-name','field-phone','field-message'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', saveDraft);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureTipLoaded();
    loadDraft();
    setupButtons();
    attachSaveListeners();
  });

})();
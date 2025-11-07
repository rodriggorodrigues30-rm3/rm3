import React, {useState} from "react";

const WHATSAPP = "+5551999468890";
const EMAIL = "rodriggorodrigues30@gmail.com";
const CIDADE = "Grande Porto Alegre e Vale dos Sinos";

export default function App(){
  const [form,setForm] = useState({name:'', phone:'', message:''});
  const [sent,setSent] = useState(false);

  function handleChange(e){
    setForm({...form,[e.target.name]: e.target.value});
  }
  function handleSubmit(e){
    e.preventDefault();
    const text = `Olá RM³, meu nome é ${form.name} - ${form.phone}. ${form.message}`;
    const waUrl = `https://wa.me/${WHATSAPP.replace(/[^0-9]/g,'')}?text=${encodeURIComponent(text)}`;
    window.open(waUrl,'_blank');
    setSent(true);
    const leads = JSON.parse(localStorage.getItem('rm3_leads')||'[]');
    leads.unshift({...form, date: new Date().toISOString()});
    localStorage.setItem('rm3_leads', JSON.stringify(leads));
  }

  return (
    <div className="rm3-root">
      <header className="top-header">
        <div className="brand-centre">
          <h1>RM³ Instalações Elétricas</h1>
          <p className="sub">Atendimento: {CIDADE}</p>
        </div>
      </header>

      <main className="main-centre">
        <section className="tip">
          <h2>⚡ Dica RM³: Cuidado com o calor e a sobrecarga elétrica</h2>
          <p className="tip-text">Temperaturas elevadas podem aumentar o consumo e causar aquecimento excessivo em fios e disjuntores. Faça revisões periódicas para evitar sobrecargas.</p>

          <div className="actions-row">
            <a className="btn emergency" href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g,'')}?text=${encodeURIComponent('URGÊNCIA: preciso de atendimento emergencial 24h')}`} target="_blank" rel="noreferrer">Atendimento Emergencial 24h</a>
            <a className="btn wa" href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g,'')}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
          </div>
        </section>

        <section className="services-grid">
          <div className="card">Instalações Residenciais<br/><span className="muted">Quadros, tomadas, iluminação e proteção</span></div>
          <div className="card">Manutenção & Urgência<br/><span className="muted">Atendimento rápido para curtos e sobrecargas</span></div>
          <div className="card">Projetos & Laudos<br/><span className="muted">Laudos técnicos e projetos conforme norma</span></div>
          <div className="card">Automação<br/><span className="muted">Tomadas, sensores e eficiência energética</span></div>
        </section>

        <aside className="contact-box" id="contato">
          <h3>Solicitar orçamento</h3>
          {!sent ? (
            <form onSubmit={handleSubmit} className="form">
              <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
              <input name="phone" placeholder="Telefone (WhatsApp)" value={form.phone} onChange={handleChange} required />
              <textarea name="message" placeholder="Descreva o serviço / endereço" value={form.message} onChange={handleChange} rows="4" />
              <button type="submit" className="btn primary">Enviar e Abrir WhatsApp</button>
            </form>
          ):(<div className="notice">Mensagem registrada! Abrindo WhatsApp...</div>)}
        </aside>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} RM³ Instalações Elétricas — {CIDADE}</p>
      </footer>

      <style>{`
        :root{--bg1:#020617;--bg2:#071a2b;--gold:#d8b34a;--muted:#9fb0bd}
        html,body,#root{height:100%;margin:0;font-family:Inter, system-ui, Arial, sans-serif;background:linear-gradient(180deg,var(--bg1),var(--bg2));color:#fff}
        .top-header{padding:20px 10px;text-align:center}
        .brand-centre h1{margin:0;font-size:40px;color:var(--gold);letter-spacing:1px}
        .brand-centre .sub{margin:6px 0 0 0;color:var(--muted)}

        .main-centre{max-width:1200px;margin:18px auto;padding:18px;display:flex;flex-direction:column;gap:24px;align-items:center}
        .tip{max-width:900px;text-align:center}
        .tip h2{margin:0 0 6px 0;font-size:20px;color:var(--gold)}
        .tip-text{color:var(--muted);margin:0 0 14px;padding:0 12px}
        .actions-row{display:flex;gap:12px;justify-content:center;margin-bottom:6px}
        .btn{padding:10px 18px;border-radius:10px;text-decoration:none;display:inline-block}
        .btn.emergency{background:#e0533d;color:white;font-weight:700}
        .btn.wa{background:var(--gold);color:#041017;font-weight:700}

        .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;width:100%;max-width:900px}
        .card{background:rgba(255,255,255,0.03);padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,0.03);min-height:110px}
        .muted{color:var(--muted);font-size:13px}

        .contact-box{width:100%;max-width:420px;background:rgba(255,255,255,0.02);padding:16px;border-radius:12px;display:flex;flex-direction:column;gap:12px}
        .form{display:flex;flex-direction:column;gap:10px}
        .form input,.form textarea{padding:10px;border-radius:8px;background:#062234;border:none;color:white}
        .btn.primary{background:var(--gold);color:#041017;font-weight:700;border-radius:8px;padding:10px}

        .footer{max-width:1200px;margin:22px auto;padding:8px;text-align:center;color:var(--muted)}
        @media(max-width:900px){.brand-centre h1{font-size:28px}.services-grid{grid-template-columns:repeat(1,1fr)}}
      `}</style>
    </div>
  );
}

import React, {useState} from "react";

const WHATSAPP_NUMBER = "+5551999468890";
const WA_DIGITS = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

export default function App(){
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({name:'', phone:'', message:''});

  function handleChange(e){ setForm({...form, [e.target.name]: e.target.value}); }

  function openWhatsApp(text){
    const url = `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  function handleSubmit(e){
    e.preventDefault();
    const text = `Olá RM³, gostaria de solicitar um orçamento.%0A
Meu nome é: ${form.name}%0A
Telefone: ${form.phone}%0A
Endereço:%0A
Descrição do serviço: ${form.message}`;
    openWhatsApp(text);
    setSent(true);
  }

  function emergencyClick(){
    const text = `🚨 Emergência elétrica — preciso de atendimento 24h!%0A
Endereço: `;
    openWhatsApp(text);
  }

  return (
    <div className="rm3-root">
      <header className="rm3-header">
        <div className="brand-text">
          <h1>RM³ Instalações Elétricas</h1>
          <p className="muted">Atendimento: Canoas • Grande Porto Alegre e Vale dos Sinos</p>
        </div>
        <nav className="nav-actions">
          <a className="btn primary" href={`https://wa.me/${WA_DIGITS}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>⚡ Dica RM³: Cuidado com o calor e a sobrecarga elétrica</h2>
          <p className="lead">Serviços profissionais de instalações, manutenção, automação e laudos técnicos.</p>

          <div className="cta-row">
            <button className="btn emergency" onClick={emergencyClick}>Atendimento Emergencial 24h</button>
          </div>
        </div>
      </section>

      <main className="container">
        <section className="services">
          <h3>Serviços</h3>
          <div className="grid">
            <ServiceCard title="Instalações Residenciais" desc="Quadros, tomadas, iluminação, aterramento e proteção."/>
            <ServiceCard title="Manutenção & Urgência" desc="Atendimento rápido para curtos, quedas e sobrecarga."/>
            <ServiceCard title="Projetos & Laudos" desc="Projetos elétricos conforme norma e laudo técnico."/>
            <ServiceCard title="Automação" desc="Automação de tomadas, sensores e eficiência energética."/>
          </div>
        </section>

        <aside className="contact">
          <h3>Solicitar orçamento</h3>
          <p className="muted">Preencha e receba atendimento via WhatsApp em até 24h.</p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="form">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Nome" />
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Telefone (WhatsApp)" />
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Descreva o serviço / endereço"></textarea>
              <button type="submit" className="btn primary">Enviar e Abrir WhatsApp</button>
            </form>
          ) : (
            <div className="notice">Mensagem registrada! Abrindo WhatsApp...</div>
          )}
        </aside>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} RM³ Instalações Elétricas — Canoas • Grande Porto Alegre e Vale dos Sinos</p>
      </footer>

      <a className="floating-wa" href={`https://wa.me/${WA_DIGITS}`} target="_blank" rel="noreferrer">📱</a>

      <style>{`
        :root{--bg1:#020617;--bg2:#071a2b;--gold:#d8b34a;--card:rgba(255,255,255,0.03);--muted:#a9b7c4}
        body,html,#root{margin:0;height:100%;background:linear-gradient(180deg,var(--bg1),var(--bg2));color:white;font-family:Inter,Arial,sans-serif}
        .rm3-header{max-width:1200px;margin:auto;padding:12px 20px;display:flex;justify-content:space-between;align-items:center}
        .brand-text h1{margin:0;font-size:20px}
        .muted{color:var(--muted)}
        .btn{padding:10px 16px;border-radius:10px;cursor:pointer;text-decoration:none;display:inline-block;border:none}
        .btn.primary{background:var(--gold);color:#041017;font-weight:700}
        .btn.emergency{background:#c62828;color:white;font-weight:700;padding:12px 18px;border-radius:12px;box-shadow:0 6px 18px rgba(198,40,40,0.25)}
        .hero{max-width:1200px;margin:auto;padding:20px}
        .lead{color:var(--muted)}
        .container{max-width:1200px;margin:16px auto;display:grid;grid-template-columns:2fr 1fr;gap:20px;padding:0 18px}
        .services,.contact{background:var(--card);padding:16px;border-radius:12px}
        .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
        .card{background:rgba(255,255,255,0.02);padding:14px;border-radius:10px;border:1px solid rgba(255,255,255,0.03)}
        .form{display:flex;flex-direction:column;gap:10px}
        .form input,.form textarea{padding:10px;border-radius:8px;background:#062234;border:none;color:white}
        .footer{text-align:center;color:var(--muted);padding:12px}
        .floating-wa{position:fixed;right:18px;bottom:18px;background:var(--gold);color:#041017;padding:12px 14px;border-radius:50%;text-decoration:none;font-size:18px}
        @media(max-width:900px){.container{grid-template-columns:1fr}}
      `}</style>
    </div>
  )
}

function ServiceCard({ title, desc }){
  return (
    <div className="card">
      <h4 style={{margin:'0 0 6px 0'}}>{title}</h4>
      <p className="muted" style={{margin:0,fontSize:'13px'}}>{desc}</p>
    </div>
  )
}

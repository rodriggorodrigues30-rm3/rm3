import React, { useState } from "react";

const WHATSAPP = "+5551999468890";
const EMAIL = process.env.REACT_APP_EMAIL || "rodriggorodrigues30@gmail.com";
const CIDADE = process.env.REACT_APP_CIDADE || "Canoas";
const REGIAO = process.env.REACT_APP_REGIAO || "Grande Porto Alegre e Vale dos Sinos";

function waUrl(number, text = "") {
  const clean = number.replace(/[^0-9]/g, "");
  const base = `https://wa.me/${clean}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export default function App() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const leads = JSON.parse(localStorage.getItem("rm3_leads") || "[]");
    leads.unshift({ ...form, date: new Date().toISOString() });
    localStorage.setItem("rm3_leads", JSON.stringify(leads));
    setSent(true);
    const text = `Olá RM³, meu nome é ${form.name} - ${form.phone}. ${form.message}`;
    window.open(waUrl(WHATSAPP, text), "_blank");
  }

  return (
    <div className="rm3-root">
      <header className="rm3-header">
        <div className="brand">
          <img src="/logo.png" alt="RM3" className="logo" />
          <div>
            <h1>RM³ Instalações Elétricas</h1>
            <p className="muted">Atendimento: {CIDADE} • {REGIAO}</p>
          </div>
        </div>

        <nav className="nav-actions">
          <a className="btn primary" href={waUrl(WHATSAPP)} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
          <a className="muted link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>⚡ Dica RM³: Cuidado com o calor e a sobrecarga elétrica</h2>
          <p className="lead">Serviços profissionais de instalações, manutenção, automação e laudos técnicos. Atendemos Canoas e Grande Porto Alegre.</p>
          <div className="hero-ctas">
            <a href="#contato" className="btn cta">Solicitar Orçamento</a>
            <a href="#produtos" className="btn outline">Produtos Digitais</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden><div className="spark" /></div>
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

        <aside id="contato" className="contact">
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

          <div className="contact-extra">
            <p className="muted small">Ou ligue: <a className="link" href="tel:+5551999468890">+55 51 99946-8890</a></p>
            <a className="btn outline" href="#produtos">Ver Produtos Digitais</a>
          </div>
        </aside>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} RM³ Instalações Elétricas — {CIDADE} • {REGIAO}</p>
        <p className="muted small">Feito para RM³ — Design profissional</p>
      </footer>

      <a className="floating-wa" href={waUrl(WHATSAPP)} target="_blank" rel="noreferrer" aria-label="Chamar no WhatsApp">📱</a>
      <a className="emergency-action" href={waUrl(WHATSAPP)} target="_blank" rel="noreferrer" aria-label="Atendimento Emergencial 24h">
        <img src="/botao-emergencial.png" alt="Atendimento Emergencial 24h" style={{ height: 64 }} />
      </a>

      <style>{`...`}</style>
    </div>
  );
}

function ServiceCard({ title, desc }) {
  return (
    <div className="card">
      <h4 style={{ margin: "0 0 6px 0" }}>{title}</h4>
      <p className="muted small" style={{ margin: 0 }}>{desc}</p>
    </div>
  );
}

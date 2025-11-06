// src/App.jsx
import React, { useState } from "react";

/*
  RM³ - App.jsx (versão estável)
  Este arquivo força o WhatsApp para +55 51 99946-8890 para garantir funcionamento imediato.
  Se preferir, substitua por process.env.REACT_APP_WHATSAPP para usar variável de ambiente.
*/

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
          {/* logo.png deve estar em /public/logo.png */}
          <img src="/logo.png" alt="RM3" className="logo" />
          <div>
            <h1>RM³ Instalações Elétricas</h1>
            <p className="muted">Atendimento: {CIDADE} • {REGIAO}</p>
          </div>
        </div>

        <nav className="nav-actions">
          <a
            className="btn primary"
            href={waUrl(WHATSAPP)}
            target="_blank"
            rel="noreferrer"
          >
            Chamar no WhatsApp
          </a>
          <a className="muted link" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>⚡ Dica RM³: Cuidado com o calor e a sobrecarga elétrica</h2>
          <p className="lead">
            Serviços profissionais de instalações, manutenção, automação e laudos
            técnicos. Atendemos Canoas e Grande Porto Alegre.
          </p>
          <div className="hero-ctas">
            <a href="#contato" className="btn cta">
              Solicitar Orçamento
            </a>
            <a href="#produtos" className="btn outline">
              Produtos Digitais
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden>
          <div className="spark" />
        </div>
      </section>

      <main className="container">
        <section className="services">
          <h3>Serviços</h3>
          <div className="grid">
            <ServiceCard
              title="Instalações Residenciais"
              desc="Quadros, tomadas, iluminação, aterramento e proteção."
            />
            <ServiceCard
              title="Manutenção & Urgência"
              desc="Atendimento rápido para curtos, quedas e sobrecarga."
            />
            <ServiceCard
              title="Projetos & Laudos"
              desc="Projetos elétricos conforme norma e laudo técnico."
            />
            <ServiceCard
              title="Automação"
              desc="Automação de tomadas, sensores e eficiência energética."
            />
          </div>
        </section>

        <aside id="contato" className="contact">
          <h3>Solicitar orçamento</h3>
          <p className="muted">Preencha e receba atendimento via WhatsApp em até 24h.</p>

          {!sent ? (
            <form onSubmit={handleSubmit} className="form">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nome"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Telefone (WhatsApp)"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Descreva o serviço / endereço"
              />
              <button type="submit" className="btn primary">
                Enviar e Abrir WhatsApp
              </button>
            </form>
          ) : (
            <div className="notice">Mensagem registrada! Abrindo WhatsApp...</div>
          )}

          <div className="contact-extra">
            <p className="muted small">
              Ou ligue: <a className="link" href="tel:+5551999468890">+55 51 99946-8890</a>
            </p>
            <a className="btn outline" href="#produtos">
              Ver Produtos Digitais
            </a>
          </div>
        </aside>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} RM³ Instalações Elétricas — {CIDADE} • {REGIAO}</p>
        <p className="muted small">Feito para RM³ — Design profissional</p>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        className="floating-wa"
        href={waUrl(WHATSAPP)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chamar no WhatsApp"
      >
        📱
      </a>

      {/* Emergency action button (image) */}
      <a
        className="emergency-action"
        href={waUrl(WHATSAPP)}
        target="_blank"
        rel="noreferrer"
        aria-label="Atendimento Emergencial 24h"
      >
        {/* botao-emergencial.png deve estar em /public */}
        <img src="/botao-emergencial.png" alt="Atendimento Emergencial 24h" style={{ height: 64 }} />
      </a>

      <style>{`
        :root{--bg1:#020617;--bg2:#071a2b;--gold:#d8b34a;--card:rgba(255,255,255,0.03);--muted:#a9b7c4}
        *{box-sizing:border-box;font-family:Inter, system-ui, Arial, sans-serif}
        body,html,#root{height:100%;margin:0;padding:0;background:linear-gradient(180deg,var(--bg1),var(--bg2));color:#fff}
        .rm3-header{max-width:1200px;margin:18px auto;padding:12px 20px;display:flex;justify-content:space-between;align-items:center}
        .brand{display:flex;gap:14px;align-items:center}
        .logo{width:64px;height:64px;object-fit:contain;border-radius:8px}
        .brand h1{margin:0;font-size:20px}
        .muted{color:var(--muted)}
        .nav-actions{display:flex;gap:12px;align-items:center}
        .btn{padding:10px 16px;border-radius:10px;text-decoration:none;display:inline-block}
        .btn.primary{background:var(--gold);color:#041017;font-weight:700}
        .btn.outline{background:transparent;border:1px solid rgba(255,255,255,0.08)}
        .hero{max-width:1200px;margin:10px auto;display:flex;gap:20px;align-items:stretch;padding:18px}
        .hero-content{flex:1}
        .hero h2{margin:0 0 6px 0;font-size:22px}
        .lead{color:var(--muted);margin:8px 0 12px}
        .hero-ctas{display:flex;gap:10px}
        .hero-visual{width:260px;background:linear-gradient(135deg, rgba(216,179,74,0.08), rgba(255,255,255,0.02));border-radius:14px;display:flex;align-items:center;justify-content:center}
        .spark{width:160px;height:160px;background:radial-gradient(circle at 30% 20%, rgba(216,179,74,0.28), rgba(216,179,74,0.08) 30%, transparent 50%);border-radius:50%}
        .container{max-width:1200px;margin:16px auto;display:grid;grid-template-columns:2fr 1fr;gap:20px;padding:0 18px}
        .services{background:var(--card);padding:16px;border-radius:12px}
        .services h3{margin-top:0}
        .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
        .card{background:rgba(255,255,255,0.02);padding:14px;border-radius:10px;border:1px solid rgba(255,255,255,0.03)}
        .contact{background:var(--card);padding:16px;border-radius:12px}
        .form{display:flex;flex-direction:column;gap:10px}
        .form input,.form textarea{padding:10px;border-radius:8px;background:#062234;border:none;color:white}
        .notice{background:rgba(0,128,0,0.12);padding:10px;border-radius:8px}
        .footer{max-width:1200px;margin:22px auto;padding:8px;text-align:center;color:var(--muted)}
        .floating-wa{position:fixed;right:18px;bottom:18px;background:var(--gold);color:#041017;padding:12px 14px;border-radius:50%;box-shadow:0 6px 18px rgba(0,0,0,0.5);text-decoration:none;font-size:18px}
        .emergency-action{position:fixed;left:18px;bottom:18px;text-decoration:none;z-index:999}
        @media(max-width:900px){.container{grid-template-columns:1fr}.hero{flex-direction:column}.hero-visual{width:100%;height:140px}}
      `}</style>
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

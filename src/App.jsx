import React, { useState } from "react";

const WHATSAPP = process.env.REACT_APP_WHATSAPP || "+550000000000";
const EMAIL = process.env.REACT_APP_EMAIL || "rodriggorodrigues30@gmail.com";
const CIDADE = process.env.REACT_APP_CIDADE || "Canoas";
const REGIAO = process.env.REACT_APP_REGIAO || "Grande Porto Alegre e Vale dos Sinos";

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
    const waUrl = `https://wa.me/${WHATSAPP.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1 className="title">RM³ Instalações Elétricas</h1>
          <p className="muted">Atendimento: {CIDADE} • {REGIAO}</p>
        </div>
        <div className="actions">
          <a className="btn wa" href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g,"")}`} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
          <a className="muted link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </header>

      <main className="container">
        <section className="left">
          <h2>⚡ Soluções residenciais, comerciais e industriais</h2>
          <p className="muted">Projetos, instalações, manutenção, automação e laudos técnicos. Atendemos {CIDADE}, Grande Porto Alegre e Vale dos Sinos.</p>

          <div className="cards">
            <Card title="Instalações Residenciais" desc="Quadros, tomadas, iluminação, aterramento e proteção." />
            <Card title="Manutenção & Urgência" desc="Atendimento rápido para curtos, quedas e sobrecarga." />
            <Card title="Projetos & Laudos" desc="Projetos elétricos conforme norma e laudo técnico." />
            <Card title="Automação" desc="Automação de tomadas, sensores e eficiência energética." />
          </div>

          <hr />

          <h3>Produtos digitais</h3>
          <p className="muted">E-book, planilha de cálculo de bitola e cursos rápidos — ideal para estudantes e profissionais.</p>
          <div className="actions">
            <a className="btn outline" href="#produtos">Ver Produtos</a>
            <a className="btn primary" href="#contato">Comprar Agora</a>
          </div>
        </section>

        <aside id="contato" className="right">
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

          <hr />
          <p className="muted">Ou ligue: <a className="link" href="tel:+55">(adicione seu telefone)</a></p>
        </aside>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} RM³ Instalações Elétricas — {CIDADE} • {REGIAO}</p>
        <p className="muted small">Desenvolvido para RM³ — Automatizado com suporte IA</p>
      </footer>
    </div>
  );
}

function Card({ title, desc }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p className="muted small">{desc}</p>
    </div>
  );
}

import React, { useState } from "react";
import WeeklyTip from "./components/WeeklyTip";

const WHATSAPP = "+5551999468890";
const EMAIL = "rodriggorodrigues30@gmail.com";
const CIDADE = "Grande Porto Alegre e Vale dos Sinos";

export default function App() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const text = `Olá RM³, meu nome é ${form.name} - ${form.phone}. ${form.message}`;
    const waUrl = `https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      text
    )}`;
    window.open(waUrl, "_blank");
    setSent(true);
    const leads = JSON.parse(localStorage.getItem("rm3_leads") || "[]");
    leads.unshift({ ...form, date: new Date().toISOString() });
    localStorage.setItem("rm3_leads", JSON.stringify(leads));
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
        <WeeklyTip />

        <div className="actions-row">
          <a
            className="btn emergency"
            href={`https://wa.me/${WHATSAPP.replace(
              /[^0-9]/g,
              ""
            )}?text=${encodeURIComponent(
              "URGÊNCIA: preciso de atendimento emergencial 24h"
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Atendimento Emergencial 24h
          </a>
          <a
            className="btn wa"
            href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noreferrer"
          >
            Chamar no WhatsApp
          </a>
        </div>

        <section className="services-grid">
          <div className="card">
            Instalações Residenciais
            <br />
            <span className="muted">
              Quadros, tomadas, iluminação, aterramento e proteção.
            </span>
          </div>
          <div className="card">
            Manutenção & Urgência
            <br />
            <span className="muted">
              Atendimento rápido para curtos, quedas e sobrecargas.
            </span>
          </div>
          <div className="card">
            Projetos & Laudos
            <br />
            <span className="muted">
              Projetos elétricos conforme norma e laudo técnico.
            </span>
          </div>
          <div className="card">
            Automação
            <br />
            <span className="muted">
              Automação de tomadas, sensores e eficiência energética.
            </span>
          </div>
        </section>

        <aside className="contact-box" id="contato">
          <h3>Solicitar orçamento</h3>
          {!sent ? (
            <form onSubmit={handleSubmit} className="form">
              <input
                name="name"
                placeholder="Nome"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="phone"
                placeholder="Telefone (WhatsApp)"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Descreva o serviço / endereço"
                value={form.message}
                onChange={handleChange}
                rows="4"
              />
              <button type="submit" className="btn primary">
                Enviar e Abrir WhatsApp
              </button>
            </form>
          ) : (
            <div className="notice">Mensagem registrada! Abrindo WhatsApp...</div>
          )}
        </aside>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} RM³ Instalações Elétricas — {CIDADE}</p>
      </footer>
    </div>
  );
}

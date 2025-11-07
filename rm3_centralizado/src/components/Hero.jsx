import React from 'react';

const WHATSAPP = '+5551999468890';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="brand">RM³ Instalações Elétricas</h1>
        <p className="sub">Atendimento: Grande Porto Alegre e Vale dos Sinos</p>

        <div className="actionRow">
          <a
            className="btn-emergency"
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(
              'URGÊNCIA: preciso de atendimento emergencial 24h'
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Atendimento Emergencial 24h
          </a>
          <a
            className="btn-whats"
            href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(
              'Olá, gostaria de um orçamento.'
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Chamar no WhatsApp
          </a>
        </div>

        <div className="tip">
          <strong>⚡ Dica RM³:</strong> Temperaturas elevadas aumentam o consumo e aquecimento. Faça revisões elétricas regulares.
        </div>

        <div className="servicesGrid">
          <div className="card">
            <h4>Instalações Residenciais</h4>
            <p>Quadros, tomadas, iluminação, aterramento e proteção.</p>
          </div>
          <div className="card">
            <h4>Manutenção & Urgência</h4>
            <p>Atendimento rápido para curtos, quedas e sobrecarga.</p>
          </div>
          <div className="card">
            <h4>Projetos & Laudos</h4>
            <p>Projetos elétricos conforme norma e laudo técnico.</p>
          </div>
          <div className="card">
            <h4>Automação</h4>
            <p>Automação de tomadas, sensores e eficiência energética.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

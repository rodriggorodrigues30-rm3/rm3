import React from 'react';
import './styles.css';

export default function App() {
  return (
    <section className="hero">
      <h1 className="company-name">RM³ Instalações Elétricas</h1>
      <p className="company-attendance">
        Atendimento: Grande Porto Alegre e Vale dos Sinos
      </p>

      <div className="tip">
        <strong>⚡ Dica RM³:</strong>
        <p className="tip-text">
          Temperaturas elevadas podem sobrecarregar circuitos — mantenha revisões em dia.
        </p>
      </div>

      <div className="hero-actions">
        <a
          className="btn emergency"
          href="https://wa.me/5551999468890?text=URGÊNCIA:%20Preciso%20de%20atendimento%20elétrico%2024h"
          target="_blank"
          rel="noopener noreferrer"
        >
          Atendimento Emergencial 24h
        </a>
        <a
          className="btn whatsapp"
          href="https://wa.me/5551999468890?text=Olá,%20gostaria%20de%20um%20orçamento."
          target="_blank"
          rel="noopener noreferrer"
        >
          Chamar no WhatsApp
        </a>
      </div>

      <div className="services-section">
        <div className="services-grid">
          <div className="service-card">
            <h4>Instalações Residenciais</h4>
            <p>Quadros, tomadas, iluminação, aterramento e proteção.</p>
          </div>
          <div className="service-card">
            <h4>Manutenção & Urgência</h4>
            <p>Atendimento rápido para curtos, quedas e sobrecarga.</p>
          </div>
          <div className="service-card">
            <h4>Projetos & Laudos</h4>
            <p>Projetos elétricos conforme norma e laudo técnico.</p>
          </div>
          <div className="service-card">
            <h4>Automação</h4>
            <p>Automação de tomadas, sensores e eficiência energética.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

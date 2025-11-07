import React from "react";

const dicas = [
  "Temperaturas elevadas podem aumentar o consumo e aquecimento em fios e disjuntores. Faça revisões periódicas.",
  "Evite sobrecarga: não use muitas extensões em um único ponto. Distribua as cargas.",
  "Mantenha ventilação adequada em quadros de distribuição para reduzir aquecimento.",
  "Cuidado com aparelhos antigos — contatos frouxos aumentam risco de faísca e aquecimento.",
  "Instale proteção diferencial e disjuntores corretos para cada circuito.",
  "Faça inspeções regulares antes da alta temporada (ar-condicionado, aquecedores).",
  "Fiação exposta ou emendada aumenta o risco — prefira sempre emendas técnicas e caixas apropriadas.",
  "Economize energia usando temporizadores e automação para cargas não essenciais."
];

function getWeekNumber(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}

function getWeeklyTip() {
  const week = getWeekNumber(new Date());
  return dicas[week % dicas.length];
}

export default function WeeklyTip({ className = "" }) {
  const tip = getWeeklyTip();
  return (
    <div className={className} style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
      <h3 style={{ display: "inline-flex", alignItems: "center", gap: 8, margin: "0 0 8px", color: "#d8b34a" }}>
        ⚡ Dica RM³: <span style={{ fontWeight: 700, marginLeft: 8 }}>Cuidado com o calor e a sobrecarga elétrica</span>
      </h3>
      <p style={{ margin: 8, color: "#9fb0bd", fontSize: "0.95rem", maxWidth: 820 }}>{tip}</p>
    </div>
  );
}

import React, { useState } from "react";
const WHATSAPP = process.env.REACT_APP_WHATSAPP || "+5519999468890";
const EMAIL = process.env.REACT_APP_EMAIL || "rodriggorodrigues30@gmail.com";
const CIDADE = process.env.REACT_APP_CIDADE || "Canoas";
const REGIAO = process.env.REACT_APP_REGIAO || "Grande Porto Alegre e Vale dos Sinos";
export default function App() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleSubmit(e) {
    e.preventDefault();
    const leads = JSON.parse(localStorage.getItem("rm3_leads") || "[]");
    leads.unshift({ ...form, date: new Date().toISOString() });
    localStorage.setItem("rm3_leads", JSON.stringify(leads));
    setSent(true);
    const text = `Olá RM³, meu nome é ${form.name} - ${form.phone}. ${form.message || ""}`;
    const wa = `https://wa.me/${WHATSAPP.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
    window.open(wa, "_blank");
  }
  return (
    <div style={{fontFamily:'Inter, Arial, sans-serif',background:'#021827',minHeight:'100vh',color:'#fff'}}>
      <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:20,maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src="/logo.png" alt="logo" style={{width:72,height:72,borderRadius:10,objectFit:'cover'}} />
          <div>
            <h1 style={{margin:0}}>RM³ Instalações Elétricas</h1>
            <div style={{color:'#9fb0bd'}}>{CIDADE} • {REGIAO}</div>
          </div>
        </div>
        <nav style={{display:'flex',gap:10,alignItems:'center'}}>
          <a href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g,"")}`} style={{background:'#d8b34a',padding:'10px 14px',borderRadius:10,color:'#041017',textDecoration:'none'}}>Chamar no WhatsApp</a>
          <a href={`mailto:${EMAIL}`} style={{color:'#9fb0bd',textDecoration:'underline'}}>{EMAIL}</a>
        </nav>
      </header>

      <main style={{maxWidth:1100,margin:'20px auto',padding:'0 18px',display:'flex',gap:20,alignItems:'center'}}>
        <div style={{flex:1}}>
          <h2>⚡ Dica RM³ — Cuidado com o calor e a sobrecarga elétrica</h2>
          <p style={{color:'#9fb0bd'}}>Serviços profissionais: instalações, manutenção, automação e laudos técnicos. Atendimento rápido para urgências.</p>
          <div style={{display:'flex',gap:10}}>
            <a href="#contato" style={{background:'#d8b34a',padding:'10px 14px',borderRadius:10}}>Solicitar Orçamento</a>
            <a href="#servicos" style={{border:'1px solid rgba(255,255,255,0.06)',padding:'10px 14px',borderRadius:10}}>Ver Serviços</a>
          </div>
        </div>
        <div>
          <img src="/logo.png" alt="visual" style={{width:200,height:200,borderRadius:12}} />
        </div>
      </main>

      <section id="servicos" style={{maxWidth:1100,margin:'16px auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:20,padding:'0 18px'}}>
        <div style={{background:'rgba(255,255,255,0.02)',padding:16,borderRadius:12}}>
          <h3>Serviços</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
            <div style={{background:'rgba(255,255,255,0.02)',padding:14,borderRadius:10}}>
              <h4 style={{margin:'0 0 8px 0'}}>Instalações Residenciais</h4><p style={{color:'#9fb0bd',margin:0}}>Quadros, tomadas, iluminação, aterramento e proteção.</p>
            </div>
            <div style={{background:'rgba(255,255,255,0.02)',padding:14,borderRadius:10}}>
              <h4 style={{margin:'0 0 8px 0'}}>Manutenção & Urgência</h4><p style={{color:'#9fb0bd',margin:0}}>Atendimento rápido para curtos, quedas e sobrecarga.</p>
            </div>
            <div style={{background:'rgba(255,255,255,0.02)',padding:14,borderRadius:10}}>
              <h4 style={{margin:'0 0 8px 0'}}>Projetos & Laudos</h4><p style={{color:'#9fb0bd',margin:0}}>Projetos elétricos conforme norma e laudo técnico.</p>
            </div>
            <div style={{background:'rgba(255,255,255,0.02)',padding:14,borderRadius:10}}>
              <h4 style={{margin:'0 0 8px 0'}}>Automação</h4><p style={{color:'#9fb0bd',margin:0}}>Automação de tomadas, sensores e eficiência energética.</p>
            </div>
          </div>
        </div>

        <aside id="contato" style={{background:'rgba(255,255,255,0.02)',padding:16,borderRadius:12}}>
          <h3>Solicitar orçamento</h3>
          <p style={{color:'#9fb0bd'}}>Preencha e receba atendimento via WhatsApp em até 24h.</p>
          {!sent ? (
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:10}}>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Nome" style={{padding:10,borderRadius:8,background:'#051723',border:'none',color:'#fff'}} />
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Telefone (WhatsApp)" style={{padding:10,borderRadius:8,background:'#051723',border:'none',color:'#fff'}} />
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Descreva o serviço / endereço" style={{padding:10,borderRadius:8,background:'#051723',border:'none',color:'#fff'}}></textarea>
              <button type="submit" style={{background:'#d8b34a',padding:10,borderRadius:8}}>Enviar e Abrir WhatsApp</button>
            </form>
          ) : (
            <div style={{background:'rgba(0,128,0,0.12)',padding:10,borderRadius:8}}>Mensagem registrada! Abrindo WhatsApp...</div>
          )}
        </aside>
      </section>

      <footer style={{maxWidth:1100,margin:'22px auto',padding:8,textAlign:'center',color:'#9fb0bd'}}>© {new Date().getFullYear()} RM³ Instalações Elétricas — {CIDADE} • {REGIAO}</footer>
      <a href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g,"")}`} style={{position:'fixed',right:18,bottom:18,background:'#d8b34a',padding:12,borderRadius:50}}>📱</a>
    </div>
  );
}

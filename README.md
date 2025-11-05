
# RM3 Site - Versão simplificada (Vite + React)
Este projeto é uma versão simplificada do site **RM³ Instalações Elétricas**, pronta para rodar localmente e fazer deploy no Vercel.

## O que está incluído
- App React (src/App.jsx) com formulário que abre WhatsApp e salva leads no localStorage.
- Estilos CSS simples (src/styles.css).
- Deploy com Vercel recomendado.

## Como rodar localmente (passo a passo)
1. Instale Node.js (versão atual LTS). https://nodejs.org/
2. No terminal, rode:
```bash
# dentro da pasta do projeto
npm install
npm run dev
# abra http://localhost:5173
```

## Variáveis de ambiente (opcionais)
Você pode configurar as variáveis no Vercel ou localmente para personalizar:
- REACT_APP_WHATSAPP (ex: +5511999999999)
- REACT_APP_EMAIL (ex: rodriggorodrigues30@gmail.com)
- REACT_APP_CIDADE (ex: Canoas)
- REACT_APP_REGIAO (ex: Grande Porto Alegre, Vale dos Sinos)

## Deploy no Vercel (resumo)
1. Crie repositório no GitHub e envie o código.
2. No vercel.com, clique "Import Project" → selecione o repositório → Deploy.
3. Em Settings do projeto, adicione as Environment Variables acima.
4. Redeploy se necessário.

---
Se quiser, eu posso gerar e enviar os arquivos do e-book e a planilha em seguida, ou montar o repositório no GitHub passo a passo com os comandos prontos.


# RM3 Site - Versão Profissional (Vite + React)
Projeto pronto para deploy no Vercel.

## Como rodar localmente
1. Instale Node.js LTS.
2. No terminal dentro da pasta do projeto:
   npm install
   npm run dev
3. Abra http://localhost:5173

## Variáveis de ambiente (Vercel)
- REACT_APP_WHATSAPP (ex: +5511999999999)
- REACT_APP_EMAIL
- REACT_APP_CIDADE
- REACT_APP_REGIAO

## Subir para o GitHub e deploy na Vercel (comandos)
git init
git add .
git commit -m "RM3 site - versão profissional"
git branch -M main
# criar repo no GitHub e depois:
git remote add origin https://github.com/SEU_USUARIO/rm3-site.git
git push -u origin main

Depois, no Vercel: Import Project -> selecione o repo -> Deploy.

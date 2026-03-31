# CLAUDE.md — Ouv.ai Landing Page

## Projeto
Landing page do SaaS Ouv.ai (www.ouvai.com.br) — Ouvidoria Inteligente para Instituições Financeiras.
Repositório de produção: https://github.com/Ouv-ai/ouvai-website

## Stack
- HTML puro + CSS puro (variáveis CSS em `:root`)
- JavaScript vanilla
- Lucide Icons (via CDN) + SVG inline (marcas)
- Google Fonts: Inter + JetBrains Mono
- GSAP 3.12 + ScrollTrigger (hero scroll-video)
- Single-file: `index.html`

## Regras de Design (OBRIGATÓRIAS)
- Cor primária: Teal `--primary: #28CCCC` — NÃO alterar
- **PROIBIDO**: tons de roxo, fundos "semáforo" (verde/vermelho berrantes)
- Fontes: NÃO trocar Inter nem JetBrains Mono
- Logo: NÃO alterar cores, formas ou fonte do logo
- Design: limpo, corporativo, fundos brancos/cinza claro, textos escuros
- Manter bilinguismo PT/EN com sistema `data-lang` + classes CSS
- Degradês suaves de 200px entre todas as transições de cor claro/escuro

## Estrutura de Seções
1. Navbar (fixed, blur)
2. Hero (canvas rede neural + suporte scroll-video)
3. Problem (desafios da ouvidoria)
4. Solution (fluxo Ouv.ai)
5. How It Works (4 steps com vídeos demo)
6. Features (grid de funcionalidades)
7. Differentials (por que Ouv.ai)
8. Deployment Models (PoC + Enterprise)
9. Metrics (KPIs)
10. Compliance (LGPD, segurança)
11. Contato (formulário nativo B2B com validação e-mail corporativo)
12. Footer

## Formulário de Contato
- Validação client-side: campos obrigatórios + bloqueio de e-mails pessoais (Gmail, Outlook, etc.)
- Submissão: atualmente simulada (setTimeout). TODO: conectar ao backend POST /api/contact
- Mensagem de sucesso substitui o formulário após envio

## Backend (FastAPI — preparado)
- `backend/app/main.py` — app + CORS
- `backend/app/contact.py` — POST /api/contact + email HTML + Reply-To
- `backend/.env.example` — template SMTP
- Iniciar: `cd backend && python -m uvicorn app.main:app --reload`

## Hero Scroll-Video
- Quando `hero-video.mp4` existe na raiz, ativa pin + scrubbing via GSAP
- Sem vídeo: canvas animado com 160 partículas teal (rede neural)
- Recodificar vídeo: `ffmpeg -i input.mp4 -vcodec libx264 -x264-params keyint=1:scenecut=0 -an hero-video.mp4`

## Vídeos Demo (How It Works)
- `videos/captura_automatica.mp4` — Step 01
- `videos/classificacao_inteligente.mp4` — Step 02
- `videos/resposta_com_ia_generativa.mp4` — Step 03
- `videos/envio_simultaneo.mp4` — Step 04

## Comandos
- Frontend: abrir `index.html` no navegador
- Backend: `cd backend && python -m uvicorn app.main:app --reload --port 8000`
- Não há build system

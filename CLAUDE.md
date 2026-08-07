# CLAUDE.md — Ouv ai Landing Page

## Projeto
Landing page do SaaS Ouv.ai (https://ouv.ai) — Ouvidoria Inteligente para Instituições Financeiras.
Repositório de produção: https://github.com/Ouv-ai/ouvai-website

## Domínios (OBRIGATÓRIO — leia antes de mexer em redirect, canonical ou OG)
- **Canônico: `ouv.ai`** — primary domain na Netlify. É o domínio de SEO: `<link rel="canonical">`
  das 3 páginas, `og:url` e `og:image` apontam para ele. `ouvai.com.br` é o domínio ANTIGO e
  responde 301 para `ouv.ai` (regras em `_redirects`).
- **E-mail permanece `@ouvai.com.br`** — `contato@ouvai.com.br` segue ativo e é o único canal de
  contato do site (o formulário é `mailto:`, sem backend). E-mail não é URL: o MX não muda com
  redirect. NÃO trocar por `@ouv.ai`.
- **Páginas jurídicas mantêm `www.ouvai.com.br`** no corpo do texto (`termos.html`,
  `privacidade.html`) — o documento oficial da empresa já foi protocolado com esse endereço, e
  alterá-lo cria divergência jurídica. Vale para o texto; os rótulos de link do rodapé já são `ouv.ai`.
- **NUNCA criar `netlify.toml` com regras de domínio.** O toml é avaliado ANTES do `_redirects`;
  os dois arquivos com direções opostas geram loop infinito e derrubam os dois domínios. Toda
  regra de redirect vive no `_redirects`.
- Direção do redirect já foi invertida uma vez (o commit e297006 apontava para o lado errado
  porque esta documentação declarava `ouvai.com.br` como produção). Se for mexer, confirme o
  primary domain no painel da Netlify antes.

## Stack
- HTML puro + CSS puro (variáveis CSS em `:root`)
- JavaScript vanilla
- Lucide Icons 0.454.0 (CDN pinado + SRI) + SVG inline (marcas)
- Google Fonts: Inter + JetBrains Mono
- GSAP 3.12.5 + ScrollTrigger (CDN pinado + SRI; hero scroll-video)
- Paginas: `index.html` (landing) + `privacidade.html` + `termos.html` (legais, PT-BR)

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
4. Solution (fluxo Ouv ai)
5. How It Works (4 steps com vídeos demo)
6. Features (grid de funcionalidades)
7. Differentials (por que Ouv ai)
8. Deployment Models (PoC + Enterprise)
9. Metrics (KPIs)
10. Compliance (LGPD, segurança)
11. Contato (formulario B2B com validacao de e-mail corporativo — envio via mailto)
12. Footer

## Formulário de Contato
- Validação client-side: campos obrigatórios + bloqueio de e-mails pessoais (Gmail, Outlook, etc.)
- Submissão: SEM backend — monta mailto: para contato@ouvai.com.br com a mensagem preenchida
  e abre o cliente de e-mail do visitante. NUNCA simular envio (compliance).
- Mensagem de sucesso explica que o e-mail foi preparado no aplicativo do visitante

## Regras de Compliance (OBRIGATÓRIAS)
- ZERO claims falsos: numeros citados (permissões, canais, prazos, normativos) devem refletir o produto real
- Resolução correta: BCB nº 222/2022 (não 2024)
- Sem "Lista de Espera" — a empresa está lançada; CTAs são "Agendar/Solicitar Demonstração"
- Não expor custos internos (ex: custo de IA por demanda)
- Links legais reais: termos.html e privacidade.html (manter atualizados a cada mudança de coleta de dados)
- CDNs sempre pinados com SRI (integrity) — nunca @latest

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

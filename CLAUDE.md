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
11. Contato (formulario B2B com validacao de e-mail corporativo — envio via Netlify Forms)
12. Footer

## Formulário de Contato
- Validação client-side: campos obrigatórios + bloqueio de e-mails pessoais (Gmail, Outlook, etc.)
- **Submissão: Netlify Forms** (`name="demo"`, `data-netlify`, honeypot `bot-field`), via
  `fetch` POST urlencoded para `/`, com sucesso inline. NÃO voltar para `mailto:` — o mailto
  dependia do cliente de e-mail do visitante e perdia quem usa webmail ou máquina travada.
  O `mailto:` sobrou só como ALTERNATIVA manual quando o envio falha; NUNCA automático.
- NUNCA simular envio (compliance): o sucesso só aparece com `response.ok`.
- Campos ocultos (`idioma`, `pagina`, `referrer`, `utm_*`) precisam estar **declarados no HTML** —
  a Netlify registra as colunas na detecção do deploy, não no POST.
- A Netlify remove `data-netlify` e `netlify-honeypot` do HTML servido depois de detectar o
  form. Isso é esperado: no servido, confira `name="demo"` + o oculto `form-name`.
- Cada mudança de campo aqui exige atualizar a seção 3 da `privacidade.html` (o que é coletado).

## Regras de Deploy (OBRIGATÓRIAS)
- **Antes de commitar `index.html`: comparar `https://ouv.ai/` servido com o HEAD e reportar
  divergências.** Se o servido não corresponder ao HEAD, houve publicação fora do repositório —
  pare e reporte antes de commitar, ou o commit sobrescreve algo que ninguém tem em git.
  A única divergência esperada é a reescrita de links do Pretty URLs da Netlify
  (`href="termos.html"` servido como `href='/termos'`).
- **Todo deploy sai do `main`; nunca publicar pelo painel.** Publicação manual (drag-and-drop ou
  `netlify deploy --prod` de um diretório local) cria um estado em produção que não existe em
  nenhum commit, e a próxima publicação pelo `main` o apaga sem aviso.
- Prazos por canal vivem em `assets/prazos.js` (`window.OuvPrazos`). A tabela de Canais do
  `index.html` é estática: rode `node scripts/check-prazos.mjs` antes de commitar qualquer
  mudança de prazo — ele falha se as duas divergirem. Testes: `node scripts/test-prazos.mjs`.

## Regras de Screenshot (OBRIGATÓRIAS)
- **Screenshots SOMENTE via navegador headless** (Playwright/Chromium headless):
  `page.screenshot()` / `locator.screenshot()`.
- **NUNCA capturar a tela real do sistema operacional nem janelas do desktop, em hipótese
  alguma** — sem `CopyFromScreen`, `PrintWindow`, `BitBlt` ou equivalente. Capturar a tela expõe
  o que estiver aberto na máquina: numa tentativa de fotografar o popup nativo do `<select>`,
  o browser perdeu o primeiro plano e a captura pegou outro projeto aberto no editor.
- Quando algo só for verificável fora do headless (popup nativo do `<select>`, menu do SO,
  diálogo de arquivo), **descreva o passo para conferência manual** em vez de capturar.
- Para a lista de um `<select>`: `select[size=N]` renderiza dentro da página com a mesma
  cascata de `option` e serve como evidência headless — rotulando como aproximação, porque o
  realce da linha ativa do popup nativo não aparece nela.

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
- `videos/resposta_assistida.mp4` — Step 03
- `videos/envio_simultaneo.mp4` — Step 04

## Comandos
- Frontend: abrir `index.html` no navegador
- Backend: `cd backend && python -m uvicorn app.main:app --reload --port 8000`
- Não há build system

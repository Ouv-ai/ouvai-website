# CLAUDE.md — Ouv.ai Landing Page

## Projeto
Landing page do SaaS Ouv.ai (www.ouvai.com.br) — Ouvidoria Inteligente para Instituições Financeiras.
Repositório de produção: https://github.com/Ouv-ai/ouvai-website

## Stack
- HTML puro + CSS puro (variáveis CSS em `:root`)
- JavaScript vanilla
- Lucide Icons (via CDN)
- Google Fonts: Inter + JetBrains Mono
- Single-file: `index.html`

## Regras de Design (OBRIGATÓRIAS)
- Cor primária: Teal `--primary: #28CCCC` — NÃO alterar
- **PROIBIDO**: tons de roxo, fundos "semáforo" (verde/vermelho berrantes)
- Fontes: NÃO trocar Inter nem JetBrains Mono
- Logo: NÃO alterar cores, formas ou fonte do logo
- Design: limpo, corporativo, fundos brancos/cinza claro, textos escuros
- Manter bilinguismo PT/EN com sistema `data-lang` + classes CSS

## Estrutura de Seções
1. Navbar (fixed)
2. Hero (scroll-video pinned)
3. Problem (desafios da ouvidoria)
4. Solution (fluxo Ouv.ai)
5. How It Works (4 steps)
6. Features (grid de funcionalidades)
7. Differentials (por que Ouv.ai)
8. Deployment Models (PoC + Enterprise)
9. Metrics (KPIs)
10. Compliance (LGPD, segurança)
11. Waitlist/CTA (Google Form embed)
12. Footer

## Dependências Externas (CDN)
- GSAP 3.12 + ScrollTrigger — controle do scroll-video na Hero
- Lucide Icons — ícones SVG

## Hero Scroll-Video
- O Hero é envolvido por `.hero-scroll-wrapper` e pinned via GSAP ScrollTrigger
- O vídeo (`hero-video.mp4`) é controlado pelo scroll (video scrubbing)
- Quando não há vídeo, um canvas animado (partículas + ondas teal) serve como fallback
- Os decoradores CSS (pattern, glow, lines) são ocultados quando o vídeo carrega

### Para adicionar o vídeo de produção:
1. Recodificar com todos keyframes: `ffmpeg -i input.mp4 -vcodec libx264 -x264-params keyint=1:scenecut=0 -an hero-video.mp4`
2. Colocar `hero-video.mp4` na raiz do projeto
3. O sistema detecta automaticamente e ativa o scrubbing

### Para adicionar vídeos nos Step Cards (How It Works):
1. Criar pasta `assets/` com vídeos curtos (5-10s, loop)
2. Substituir `<div class="video-placeholder">` por `<video src="assets/step-xxx.mp4" muted autoplay loop playsinline></video>`

## Comandos
- Abrir local: abrir `index.html` no navegador
- Não há build system — edição direta no HTML

# BRIEF — Site Institucional Ouv ai

## Objetivo

Site institucional ultra profissional para a **Ouv ai**, uma startup B2B SaaS que vende software de gestao inteligente de reclamacoes regulatorias para instituicoes financeiras brasileiras. O site transmite **confianca, sofisticacao e inovacao** — nivel de produto enterprise fintech.

**URL de producao:** https://ouv.ai (dominio antigo ouvai.com.br responde 301 — ver `_redirects`)
**Repositorio:** https://github.com/Ouv-ai/ouvai-website

---

## Arquitetura

### Frontend
- **Entrega:** Arquivo HTML unico auto-contido (inline CSS + JS) — `index.html`
- **Stack:** HTML5 + CSS3 (custom properties) + JavaScript vanilla
- **Fontes:** Google Fonts CDN (Inter + JetBrains Mono)
- **Icones:** Lucide Icons CDN (genericos) + SVG inline (marcas: LinkedIn, WhatsApp, Instagram)
- **Animacoes:** GSAP 3.12 + ScrollTrigger (hero scroll-video), CSS fade-in on scroll
- **Idiomas:** Portugues BR (padrao) + Ingles (toggle no header via `data-lang` + `localStorage`)

### Backend (preparado, nao ativo)
- **Stack:** FastAPI + smtplib (SMTP Gmail)
- **Endpoint:** `POST /api/contact` — recebe leads do formulario e envia por e-mail
- **Status:** Codigo pronto em `backend/`, aguardando configuracao SMTP para ativar
- **Ate la:** Formulario exibe mensagem de sucesso localmente (sem envio real)

---

## Identidade Visual

### Logo
- Nome: **Ouv ai** (de "Ouvidoria" + "AI") — SEM ponto: nome fantasia registrado e "Ouv ai"
- Logo: texto estilizado + icone de headset/atendimento
- Arquivos: `ouv-ai-logo-fundo-claro.png` (principal), `ouv-ai-logo-fundo-escuro.png`, `ouv-ai-simbolo.png` (kit 30/07/2026)

### Paleta de Cores
```css
--primary: #28CCCC;        /* Teal vibrante — cor principal */
--primary-dark: #1da8a8;   /* Hover / enfase */
--primary-light: rgba(40, 204, 204, 0.08);

--bg: #F8FAFC;             /* Fundo principal */
--bg-dark: #0F172A;        /* Secoes escuras (hero, CTA) */
--bg-card: #FFFFFF;
--text: #0F172A;
--text-secondary: #475569;
--text-muted: #94A3B8;
--border: #E2E8F0;
```

**REGRAS:**
- Roxo PROIBIDO
- Fundos "semaforo" (verde/vermelho berrantes) PROIBIDO
- Degrades suaves entre secoes claras/escuras (implementado)

### Tipografia
- **Headlines:** Inter, weight 700-800
- **Body:** Inter, weight 400-500
- **Monospace (dados/numeros):** JetBrains Mono
- NAO trocar fontes

### Tom Visual
- Enterprise fintech — clean, espacado, sofisticado
- Inspiracoes: Stripe, Linear, Vercel
- Gradientes teal no hero
- Animacoes suaves de entrada (fade-in on scroll)
- Zero emojis no corpo do texto

---

## Estrutura de Secoes (Estado Atual)

```
1.  NAVBAR — fixo, blur background, toggle PT/EN
2.  HERO — canvas animado (rede neural 160 particulas), suporte a scroll-video
3.  PROBLEMA — 3 cards (prazos, volume, risco)
4.  SOLUCAO — fluxo visual BACEN → Resposta IA
5.  COMO FUNCIONA — 4 step cards com videos demo (3 ativos, 1 placeholder)
6.  FUNCIONALIDADES — grid 10 features (incluindo RCA)
7.  DIFERENCIAIS — 5 cards (IA que aprende, compliance, integracao, multi-canal, DNA especialista)
8.  MODELOS DE IMPLANTACAO — PoC + Enterprise License (substituiu planos de preco)
9.  METRICAS — 6 KPIs
10. COMPLIANCE — LGPD, criptografia, BCB 222 + badges
11. CONTATO — Formulario nativo B2B (validacao e-mail corporativo)
12. FOOTER — logo, navegacao, redes sociais (LinkedIn + Email ativos)
```

---

## Formulario de Contato (B2B Lead Generation)

### Campos
1. Nome Completo (obrigatorio)
2. E-mail Corporativo (obrigatorio, **bloqueio de dominios pessoais**)
3. Empresa / Instituicao (obrigatorio)
4. Cargo (opcional, placeholder: "ex: Ouvidor, Diretor de CX")
5. Volume mensal de demandas (dropdown: 0-500 / 501-2000 / +2000)
6. Como podemos ajudar? (textarea, obrigatorio)

### Validacao de E-mail Corporativo
Dominios bloqueados: gmail, outlook, hotmail, yahoo, icloud, aol, protonmail, zoho, uol, bol, terra, ig, globo, r7, zipmail e variantes.

### Fluxo de Submissao (sem backend)
1. Validacao client-side (campos obrigatorios + e-mail corporativo)
2. Monta `mailto:contato@ouvai.com.br` com assunto e corpo preenchidos e abre o
   cliente de e-mail do visitante — nenhum dado e armazenado ou enviado a terceiros
3. Mensagem de confirmacao explica o envio pelo proprio e-mail do visitante

---

## Videos Demo (How It Works)

| Step | Arquivo | Status |
|------|---------|--------|
| 01 — Captura Automatica | `videos/captura_automatica.mp4` | Ativo |
| 02 — Classificacao Inteligente | `videos/classificacao_inteligente.mp4` | Ativo |
| 03 — Resposta com IA Generativa | `videos/resposta_com_ia_generativa.mp4` | Ativo |
| 04 — Envio Simultaneo | — | Placeholder (aguardando video) |

Videos: autoplay, loop, muted, sem controles, sem fullscreen.

---

## Hero — Canvas + Scroll-Video

### Canvas Fallback (ativo)
- 160 particulas teal conectadas por linhas (rede neural animada)
- Tamanho: 0.4-2.2px, glow nas maiores
- Conexoes: alcance 140px, linhas 0.6px
- Animacao continua independente do scroll

### Scroll-Video (preparado)
- Ativa automaticamente quando `hero-video.mp4` existe na raiz
- GSAP ScrollTrigger faz pin + video scrubbing
- Recodificar video com keyframes: `ffmpeg -i input.mp4 -vcodec libx264 -x264-params keyint=1:scenecut=0 -an hero-video.mp4`

---

## Transicoes de Cor (Degrades)

Todas as transicoes entre secoes claras/escuras possuem degrades suaves de 200px:

```
Hero (dark) → [degrade] → Problem (light)
Solution (light) → [degrade] → How It Works (dark)
How It Works (dark) → [degrade] → Features (light)
Features (light) → [inline gradient] → Differentials (white)
Differentials → [inline gradient] → Plans (light)
Plans → [inline gradient] → Metrics (white)
Metrics (white) → [degrade] → Compliance (dark)
Compliance → Contato → Footer (dark continuo)
```

---

## Contato e Redes Sociais

| Canal | URL | Status |
|-------|-----|--------|
| E-mail | contato@ouvai.com.br | Ativo |
| LinkedIn | https://www.linkedin.com/company/ouv-ai/ | Ativo |
| Instagram | — | Em breve |
| WhatsApp | — | Em breve |

---

## Arquivos do Projeto

```
SITE_OUV.AI/
├── index.html              # Landing page (frontend completo)
├── ouv-ai-logo-fundo-claro.png   # Logo principal
├── ouv-ai-logo-fundo-escuro.png  # Logo p/ fundo escuro
├── capa.png                # Imagem de capa
├── ouvai-linkedin-*.png    # Banners LinkedIn
├── CLAUDE.md               # Guidelines para IA
├── BRIEF_SITE_OUVAI.md     # Este arquivo
├── README.md               # Documentacao publica
├── .gitignore              # Exclui .env, PDFs, temp files
├── videos/
│   ├── captura_automatica.mp4
│   ├── classificacao_inteligente.mp4
│   └── resposta_com_ia_generativa.mp4
└── backend/
    ├── .env.example        # Template de configuracao SMTP
    ├── requirements.txt    # FastAPI, uvicorn, pydantic-settings
    └── app/
        ├── main.py         # App FastAPI + CORS
        ├── config.py       # Settings via .env
        └── contact.py      # Endpoint POST /api/contact + email HTML
```

---

## Checklist de Entrega

- [x] HTML validado e responsivo (mobile, tablet, desktop)
- [x] Toggle PT/EN funcional com persistencia (localStorage)
- [x] Formulario de contato nativo com validacao e-mail corporativo
- [x] Videos demo nos step cards (3/4)
- [x] Canvas animado no hero (rede neural)
- [x] Degrades suaves entre todas as secoes
- [x] Navbar fixa com blur
- [x] Paleta de cores conforme especificado
- [x] Fontes Inter + JetBrains Mono
- [x] Meta tags SEO + OG
- [x] Favicon
- [x] Links de navegacao interna (scroll suave)
- [x] Icones SVG reais para redes sociais
- [x] Backend FastAPI preparado (aguardando SMTP)
- [x] .gitignore protegendo credenciais
- [ ] Video do 4o step (Envio Simultaneo)
- [ ] Hero scroll-video (aguardando hero-video.mp4)
- [ ] Ativar integracao backend (SMTP)
- [ ] Instagram e WhatsApp
- [x] Termos de Uso e Politica de Privacidade (termos.html + privacidade.html)

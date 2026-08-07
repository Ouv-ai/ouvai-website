# Ouv ai — Site Institucional

Site institucional da [Ouv.ai](https://ouv.ai), plataforma SaaS de ouvidoria inteligente para instituicoes financeiras brasileiras.

## Stack

**Frontend:** HTML5 + CSS3 + JavaScript vanilla (single-file `index.html`)

**Backend:** FastAPI + smtplib (preparado, nao ativo)

**CDN:** Google Fonts (Inter, JetBrains Mono) | Lucide Icons | GSAP ScrollTrigger

## Rodar localmente

### Frontend

Abrir `index.html` no navegador. Sem build necessario.

### Backend (opcional)

```bash
cd backend
cp .env.example .env    # preencher credenciais SMTP
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

## Estrutura

```
├── index.html              # Landing page completa
├── ouv-ai-logo-fundo-claro.png   # Logo principal (kit 30/07/2026; escuro/simbolo/capa og idem)
├── videos/                 # Videos demo (How It Works)
├── backend/                # API FastAPI (formulario de contato)
│   ├── .env.example
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── config.py
│       └── contact.py
├── CLAUDE.md               # Guidelines para IA
├── BRIEF_SITE_OUVAI.md     # Brief completo do projeto
└── .gitignore
```

## Features

- Landing page bilíngue (PT/EN) com toggle e persistência
- Hero com canvas animado (rede neural interativa)
- Suporte a scroll-video (GSAP ScrollTrigger)
- Videos demo em loop nos step cards
- Formulario de contato nativo com validação de e-mail corporativo
- Degrades suaves entre todas as seções
- Design enterprise fintech (Stripe/Linear/Vercel)
- Responsivo (mobile, tablet, desktop)
- Backend FastAPI preparado para envio de leads por e-mail

## Licença

Propriedade de Ouv ai. Todos os direitos reservados.

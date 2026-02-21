# BRIEF — Site Institucional Ouv.ai

## Objetivo

Criar um site institucional ultra profissional para a **Ouv.ai**, uma startup B2B SaaS que vende software de gestao inteligente de reclamacoes regulatorias para instituicoes financeiras brasileiras. O site deve transmitir **confianca, sofisticacao e inovacao** — nivel de produto enterprise fintech.

**Entrega:** Um unico arquivo HTML auto-contido (inline CSS + JS) OU uma pasta com HTML + CSS + JS separados. Sem frameworks pesados. Pode usar CDN para fontes e icones.

**Idiomas:** Portugues BR (padrao) + Ingles (toggle no header). Ambas versoes no mesmo HTML com troca via JS.

---

## Identidade Visual

### Logo
- Nome: **Ouv.ai**
- Pronuncia: "ouv-ai" (de "Ouvidoria" + "AI")
- Logo: texto estilizado "Ouv.ai" com icone de headset/atendimento
- Arquivo disponivel: `logo.png` na raiz do projeto (e `Logo_final.png`)
- **IMPORTANTE:** Usar a imagem do logo existente. Se nao for possivel carregar, usar texto "Ouv.ai" com a fonte Inter Bold + cor primaria

### Paleta de Cores (obrigatorio seguir)
```css
/* Brand */
--primary: #28CCCC;        /* Teal vibrante — cor principal */
--primary-dark: #1da8a8;   /* Hover / enfase */
--primary-light: rgba(40, 204, 204, 0.08);

/* Neutrals — Slate premium */
--bg: #F8FAFC;             /* Fundo principal */
--bg-dark: #0F172A;        /* Secoes escuras (hero, CTA) */
--bg-card: #FFFFFF;
--text: #0F172A;           /* Texto principal */
--text-secondary: #475569;
--text-muted: #94A3B8;
--border: #E2E8F0;

/* Semanticas */
--success: #059669;
--warning: #D97706;
--danger: #E11D48;
--info: #2563EB;
```

### Tipografia
- **Headlines:** Inter (Google Fonts), weight 700-800
- **Body:** Inter, weight 400-500
- **Monospace (dados/numeros):** JetBrains Mono (Google Fonts)
- Fallback: system-ui, -apple-system, sans-serif

### Tom Visual
- **Enterprise fintech** — clean, espacado, sofisticado
- Inspiracoes: Stripe, Linear, Vercel, Notion
- Glassmorphism sutil em cards (backdrop-filter: blur)
- Gradientes teal->azul escuro no hero
- Icones: Lucide Icons (CDN) ou SVG inline
- Animacoes suaves de entrada (fade-in on scroll)
- **ZERO emojis** no corpo do texto (apenas em CTAs se necessario)

---

## Estrutura de Paginas

### Pagina Unica (Single Page Application com scroll sections)

```
1. NAVBAR (fixo no topo, blur background)
2. HERO (full viewport, gradiente escuro, headline + CTA)
3. PROBLEMA (dor do mercado)
4. SOLUCAO (o que o Ouv.ai faz)
5. COMO FUNCIONA (fluxo visual — 4 blocos)
6. FUNCIONALIDADES (grid de features)
7. DIFERENCIAIS (por que nos)
8. PACOTES / PLANOS (3 colunas)
9. NUMEROS / METRICAS (social proof)
10. LISTA DE ESPERA (Google Forms embed + CTA)
11. FOOTER
```

---

## Conteudo — Portugues BR

### 1. NAVBAR
- Logo Ouv.ai (esquerda)
- Links: Solucao | Funcionalidades | Planos | Contato
- Toggle idioma: PT | EN (direita)
- Botao CTA: "Lista de Espera" (cor primaria)

### 2. HERO
**Background:** Gradiente escuro (#0F172A → #1E293B) com pattern sutil geometrico ou linhas conectadas (representando rede/IA)

**Headline:**
> Ouvidoria inteligente para instituicoes financeiras

**Sub-headline:**
> O Ouv.ai automatiza a gestao de reclamacoes regulatorias com IA generativa. Da captura no BACEN ate a resposta final — em minutos, nao dias.

**CTAs:**
- [Botao primario] "Entrar na Lista de Espera"
- [Botao secundario/outline] "Ver Funcionalidades"

**Badge acima do headline:**
> Powered by GPT-4.1 + pgvector

### 3. PROBLEMA
**Headline:** O desafio da ouvidoria bancaria no Brasil

**Cards (3 colunas):**

| Icone | Titulo | Descricao |
|-------|--------|-----------|
| Clock | Prazos apertados | 10 dias uteis para responder ao BACEN. Cada dia conta — e cada atraso gera penalidade. |
| FileWarning | Volume crescente | Reclamacoes no RDR crescem ano a ano. Equipes pequenas nao conseguem escalar. |
| Scale | Risco regulatorio | Respostas mal fundamentadas geram procedencia. Procedencia vira ranking negativo no BACEN. |

### 4. SOLUCAO
**Headline:** Ouv.ai: da reclamacao a resposta em minutos

**Texto:**
> O Ouv.ai e uma plataforma SaaS que conecta inteligencia artificial a gestao regulatoria. Nosso sistema captura automaticamente as demandas do BACEN, classifica com IA, direciona ao backoffice, e gera respostas personalizadas — tudo dentro dos prazos da Resolucao BCB 222.

**Ilustracao:** Fluxo horizontal simplificado:
```
BACEN → Captura IA → Classificacao → Backoffice → Resposta IA → Envio Automatico
```

### 5. COMO FUNCIONA (4 etapas)
**Headline:** Como funciona

| # | Icone | Titulo | Descricao |
|---|-------|--------|-----------|
| 01 | Download | Captura Automatica | Integracao direta com a API do BACEN (RDR Web Service). Demandas sao capturadas automaticamente — zero digitacao manual. |
| 02 | Brain | Classificacao Inteligente | 5 agentes de IA analisam a reclamacao: classificam, priorizam, direcionam ao backoffice e sugerem procedencia. |
| 03 | PenTool | Resposta com IA Generativa | O motor de escrita gera duas versoes: uma para o cliente (empatica) e outra para o BACEN (tecnica). Templates RAG garantem consistencia. |
| 04 | Send | Envio Simultaneo | Resposta enviada ao BACEN via API e ao cliente por e-mail — em um unico clique. PDF gerado automaticamente. |

### 6. FUNCIONALIDADES (grid 3x3 ou 3x4)
**Headline:** Tudo que sua ouvidoria precisa

| Icone | Feature | Descricao |
|-------|---------|-----------|
| Zap | 5 Agentes de IA | Triagem, direcionamento, contexto, template RAG e escrita — pipeline completo. |
| GitBranch | Classificadores N1-N5 | Arvore hierarquica de classificadores editavel, com busca semantica por embeddings. |
| FileText | Templates RAG | Busca por similaridade semantica (pgvector). Top 5 templates sugeridos por caso. |
| Shield | RBAC Dinamico | 16 permissoes configuráveis por perfil, sem deploy. Gestor controla tudo. |
| BarChart3 | Analytics Completo | KPIs, graficos de evolucao, procedencia, canal, timeline de qualidade. |
| Calendar | SLA Automatico | Calculo de prazo com feriados nacionais, alertas de vencimento, prorrogacao via API. |
| Mail | E-mail Integrado | SMTP configuravel, multi-destinatario, preview antes do envio. |
| RefreshCw | Feedback Loop | O sistema aprende com julgamentos do BACEN. Vitorias viram exemplos. Derrotas viram alertas. |
| Globe | Multi-Canal | BACEN, Consumidor.gov, Ouvidoria Direta, Reclame Aqui — um unico painel. |

### 7. DIFERENCIAIS
**Headline:** Por que Ouv.ai?

| Icone | Diferencial | Descricao |
|-------|-------------|-----------|
| Brain | IA que aprende | Motor de aprendizado continuo: respostas aprovadas pelo BACEN retroalimentam a IA. Quanto mais usa, melhor fica. |
| Lock | Compliance nativo | Construido sobre a Resolucao BCB 222. Cada funcionalidade respeita os requisitos regulatorios. |
| Puzzle | Integracao real | API BACEN 100% automatizada. Nao e scraping — e integracao oficial via Web Service SOAP. |
| Layers | Multi-canal | Um unico sistema para todos os canais regulatorios. Sem silos, sem retrabalho. |

### 8. PACOTES / PLANOS
**Headline:** Planos que crescem com sua operacao

**3 colunas:**

**ESSENCIAL**
- Modulo BACEN (captura + resposta)
- 5 agentes de IA
- Dashboard + Analytics basico
- Ate 500 demandas/mes
- Suporte por email
- *A partir de R$ X.XXX/mes*

**PROFISSIONAL** (badge: "Mais popular")
- Tudo do Essencial +
- Multi-canal (Consumidor.gov + Ouvidoria)
- Template RAG + Embeddings
- Feedback Loop (aprendizado continuo)
- Analytics avancado + CSV export
- Ate 2.000 demandas/mes
- Suporte prioritario
- *A partir de R$ X.XXX/mes*

**ENTERPRISE**
- Tudo do Profissional +
- Todos os canais (Reclame Aqui incluso)
- Multi-tenant (conglomerado)
- Integracao CRM/ServiceNow
- API dedicada
- SLA de atendimento 4h
- Demandas ilimitadas
- *Sob consulta*

**Nota abaixo dos planos:**
> Valores finais definidos apos analise do volume e complexidade da operacao. Entre na lista de espera para receber uma proposta personalizada.

### 9. NUMEROS / METRICAS
**Headline:** Numeros que importam

| Numero | Label |
|--------|-------|
| < 15s | Tempo de geracao de resposta IA |
| 5 | Agentes de IA especializados |
| 100% | Automacao da integracao BACEN |
| ~R$ 0,22 | Custo de IA por demanda |
| 10 | Dias uteis — SLA monitorado automaticamente |
| 17 | Migrations de banco — pronto para producao |

### 10. LISTA DE ESPERA
**Background:** Gradiente escuro (mesmo do hero)

**Headline:**
> Pronto para transformar sua ouvidoria?

**Sub-headline:**
> Entre na lista de espera e seja um dos primeiros a usar o Ouv.ai. Vagas limitadas para o programa de acesso antecipado.

**Google Forms embed:**
- Embed via iframe do Google Forms
- Campos: Nome, Email corporativo, Instituicao, Cargo, Volume estimado de demandas/mes
- **URL do form:** [PLACEHOLDER — substituir pela URL real do Google Form]
- Estilizar o iframe para se integrar ao design (border-radius, shadow)

**Alternativa (caso form nao esteja pronto):**
- Botao "Fale Conosco" com link para WhatsApp/LinkedIn
- Texto: "Ou fale diretamente: [WhatsApp] [LinkedIn]"

### 11. FOOTER
- Logo Ouv.ai
- Links: Solucao | Funcionalidades | Planos | Contato
- "Ouv.ai — Ouvidoria inteligente para instituicoes financeiras"
- "Desenvolvido com IA generativa + compliance regulatorio"
- [LinkedIn icon] [WhatsApp icon]
- (c) 2026 Ouv.ai. Todos os direitos reservados.
- Links futuros (placeholder): Termos de Uso | Politica de Privacidade

---

## Conteudo — English

### 2. HERO
**Headline:** Intelligent ombudsman management for financial institutions
**Sub-headline:** Ouv.ai automates regulatory complaint management with generative AI. From BACEN capture to final response — in minutes, not days.
**CTA:** "Join the Waitlist" | "See Features"
**Badge:** Powered by GPT-4.1 + pgvector

### 3. PROBLEM
**Headline:** The challenge of banking ombudsman in Brazil
- **Tight deadlines:** 10 business days to respond to BACEN. Every day counts — every delay triggers penalties.
- **Growing volume:** RDR complaints grow year over year. Small teams can't scale.
- **Regulatory risk:** Poorly substantiated responses lead to adverse rulings. Adverse rulings damage BACEN rankings.

### 4. SOLUTION
**Headline:** Ouv.ai: from complaint to response in minutes
**Text:** Ouv.ai is a SaaS platform that connects artificial intelligence to regulatory management. Our system automatically captures demands from BACEN, classifies with AI, routes to back-office, and generates personalized responses — all within BCB Resolution 222 deadlines.

### 5. HOW IT WORKS
**Headline:** How it works
- 01: **Automatic Capture** — Direct integration with BACEN API (RDR Web Service). Demands are captured automatically — zero manual entry.
- 02: **Intelligent Classification** — 5 AI agents analyze the complaint: classify, prioritize, route to back-office, and suggest merit assessment.
- 03: **AI-Powered Response** — The writing engine generates two versions: one for the customer (empathetic) and one for BACEN (technical). RAG templates ensure consistency.
- 04: **Simultaneous Delivery** — Response sent to BACEN via API and to the customer by email — in a single click. PDF generated automatically.

### 6. FEATURES
**Headline:** Everything your ombudsman needs
(Same grid, translated titles and descriptions)

### 7. WHY OUV.AI
**Headline:** Why Ouv.ai?
- **AI that learns** — Continuous learning engine: BACEN-approved responses feed back into AI. The more you use it, the better it gets.
- **Native compliance** — Built on BCB Resolution 222. Every feature respects regulatory requirements.
- **Real integration** — 100% automated BACEN API. Not scraping — official SOAP Web Service integration.
- **Multi-channel** — One system for all regulatory channels. No silos, no rework.

### 8. PLANS
**Headline:** Plans that grow with your operation
(Same 3 tiers, translated)

### 9. METRICS
**Headline:** Numbers that matter
(Same metrics, translated labels)

### 10. WAITLIST
**Headline:** Ready to transform your ombudsman?
**Sub:** Join the waitlist and be one of the first to use Ouv.ai. Limited spots for the early access program.

### 11. FOOTER
"Ouv.ai — Intelligent ombudsman management for financial institutions"
"Built with generative AI + regulatory compliance"

---

## Requisitos Tecnicos

### Stack
- HTML5 semantico
- CSS3 com custom properties (variáveis)
- JavaScript vanilla (sem frameworks)
- Google Fonts via CDN (Inter + JetBrains Mono)
- Lucide Icons via CDN (ou SVG inline)

### Performance
- Lazy load de imagens (se houver)
- Minificar CSS/JS para producao
- Meta tags OG (Open Graph) para compartilhamento
- Favicon com icone Ouv.ai

### Responsividade
- Mobile-first
- Breakpoints: 480px, 768px, 1024px, 1280px
- Menu hamburger no mobile
- Cards empilham em coluna no mobile

### SEO
```html
<title>Ouv.ai — Ouvidoria Inteligente para Instituicoes Financeiras</title>
<meta name="description" content="Plataforma SaaS com IA generativa para gestao automatizada de reclamacoes regulatorias. Integracao BACEN, multi-canal, compliance BCB 222.">
<meta name="keywords" content="ouvidoria, BACEN, RDR, reclamacoes, IA, inteligencia artificial, compliance, BCB 222, fintech, SaaS, banco, instituicao financeira">
```

### Google Forms
- Embed via `<iframe>` com src do Google Forms
- Placeholder no HTML: `<!-- GOOGLE_FORM_EMBED_URL -->`
- CSS para integrar visual (arredondar bordas, shadow)
- Fallback: se form nao carregar, mostrar botao de contato alternativo

### Toggle de Idioma
- Elementos com `data-lang="pt"` e `data-lang="en"`
- JS simples que alterna `display: none/block`
- Salvar preferencia em `localStorage`
- Default: portugues

---

## Assets Disponiveis

| Arquivo | Localizacao | Uso |
|---------|-------------|-----|
| `Logo_final.png` | Raiz do projeto | Logo principal (usar no navbar e hero) |
| `logo.png` | Raiz do projeto | Logo alternativa |
| `logo_email.png` | Raiz do projeto | Logo para contexto email (menor) |

---

## Placeholders (substituir depois)

| Item | Placeholder | Substituir por |
|------|------------|----------------|
| Google Form URL | `https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true` | URL real do Google Form |
| WhatsApp | `https://wa.me/5511999999999` | Numero real |
| LinkedIn | `https://linkedin.com/company/ouvai` | URL real |
| Email contato | `contato@ouv.ai.com.br` | Email real |
| Precos | `R$ X.XXX/mes` | Valores reais |
| Termos de Uso | `#` | URL real |
| Privacidade | `#` | URL real |

---

## Checklist de Entrega

- [ ] HTML validado (W3C)
- [ ] Responsivo em todos os breakpoints (mobile, tablet, desktop)
- [ ] Toggle PT/EN funcional com persistencia
- [ ] Google Forms embed com placeholder
- [ ] Animacoes suaves de scroll (fade-in)
- [ ] Navbar fixa com blur
- [ ] Paleta de cores exata conforme especificado
- [ ] Fontes Inter + JetBrains Mono carregadas
- [ ] Meta tags SEO + OG
- [ ] Favicon
- [ ] Links de navegacao interna (scroll suave para secoes)
- [ ] Footer com placeholders de contato
- [ ] Zero erros no console
- [ ] Tempo de carregamento < 2s
- [ ] Sem dependencias pesadas (sem React, sem Bootstrap)

---

## Exemplo de Qualidade Visual

O design deve atingir o nivel de qualidade destes sites:
- stripe.com (layout limpo, tipografia, uso de gradientes)
- linear.app (dark sections, animacoes sutis)
- vercel.com (minimalismo, espacamento generoso)
- notion.so (clareza, hierarchy visual)

A sensacao deve ser: "esta empresa e seria, sofisticada e sabe o que faz."

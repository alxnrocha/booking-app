# Prompts de Design — Projeto 13: App de Reservas Multi-Step (Aura Booking / Lumina Luxury Salon & Spa)

Documento de especificações de prompts para geração de referências visuais em modelos de IA generativa (Midjourney v6, FLUX.1 Pro, DALL-E 3, Ideogram).

---

## 🎯 Conceito & Direção Visual

- **Nicho:** Hospitalidade & Agendamento de Serviços Premium (Spa, Salão de Luxo, Consultoria Exclusiva).
- **Estilo:** Luxury Modern Web App, Minimalist Premium UI, Dark & Light Mode sofisticado, Glassmorphism translúcido com bordas finas douradas/champagne.
- **Paleta de Cores:** Fundo Dark Charcoal / Onyx (`#0B0E14`, `#121824`), Acentos em Ouro Champagne (`#E5B56A`, `#D4AF37`), Tons Neutros Quentes (`#F8F9FA`, `#94A3B8`), Sucesso Esmeralda (`#10B981`).
- **Tipografia:** Plus Jakarta Sans para interface e Playfair Display para títulos nobres.
- **Estrutura Multi-Step (4 Passos):**
  1. **Passo 1:** Seleção de Serviços com duração, preço e categoria.
  2. **Passo 2:** Escolha de Profissional Especialista e Calendário de Horários Disponíveis (slots).
  3. **Passo 3:** Formulário de Dados Pessoais & Instruções Especiais.
  4. **Passo 4:** Resumo da Reserva, Confirmação com Voucher e QR Code.

---

## 🖼️ Prompt 1: Multi-Step Booking Flow — Seleção de Serviço & Calendário (Main View)

```text
High-end luxury appointment booking web application interface for a premium wellness and salon brand called "Aura Booking", modern dark mode with champagne gold (#E5B56A) and deep slate (#0B0E14) palette. Top navigation with elegant brand logo, breadcrumb, and a 4-step interactive progress bar with glowing active step indicator ("1. Service -> 2. Professional & Time -> 3. Details -> 4. Confirmation"). Left side shows curated service category cards (Massage, Hair Styling, Facial Spa) with prices, duration badges (45 min, 60 min), and high-resolution thumbnail images. Right side features an interactive glassmorphic monthly calendar with dynamic time-slot chips (Morning, Afternoon, Evening) and selected specialist profile card with avatar, rating (4.9/5), and availability. Ultra-clean typography, modern micro-interactions, luxury aesthetic, Figma presentation, Dribbble trending, Behance featured, 8k resolution, UI screenshot --ar 16:9 --v 6.0 --style raw
```

---

## 🖼️ Prompt 2: Confirmação & Voucher Digital de Agendamento (Confirmation & Ticket View)

```text
Luxury booking confirmation screen and digital receipt voucher UI for a VIP salon and consulting service, dark sleek theme with subtle gold gradient accents and frosted glass effects. Center modal displays a premium digital boarding-pass style appointment card with booking reference code "#AUR-9482", specialist name, date & time breakdown, location map preview, dynamic QR Code for check-in, and action buttons ("Add to Apple Wallet", "Add to Google Calendar", "Download PDF Voucher"). Right side sidebar with live price summary breakdown including subtotal, taxes, and applied promo discount. Ultra-modern UI/UX design, crisp vector graphics, elegant typography, 8k, photorealistic desktop mockup --ar 16:9 --v 6.0
```

---

## 🖼️ Prompt 3: Visão Completa do Formulário Multi-Step (Step-by-Step Desktop Experience)

```text
Complete multi-step service reservation web application desktop interface, modern luxury aesthetic, clean layout with side-by-side view. Left panel displays client information input fields with floating labels, phone input with country selector, special requests textarea, and payment preference toggles. Right panel sticky checkout card showing real-time booking summary with chosen service thumbnail, specialist avatar, selected date and time badge, and animated "Confirm Booking" CTA button with glowing gold hover state. Polished UI, soft shadows, rounded corners, modern design system, Behance UI/UX showcase, 8k --ar 16:9 --v 6.0
```

---

## 📋 Como utilizar:
1. Copie qualquer um dos prompts acima no Midjourney (`/imagine`), FLUX.1 Pro ou DALL-E 3.
2. Salve a imagem gerada em alta definição dentro de `13-booking-app/design/` com o nome `design.png`.

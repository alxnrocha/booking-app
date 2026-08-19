# Blueprint — Proyecto 13: App de Reservas Multi-Step (Aura Booking)

- **Nicho:** Hospitalidade & Agendamento de Serviços Premium (Spa, Salão VIP, Consultoria Exclusiva).
- **Repositório:** `https://github.com/alxnrocha/booking-app` · **Pasta:** `13-booking-app/`
- **Marco Técnico:** Formulário multi-step avançado, validação cruzada entre passos, persistência de rascunho em `sessionStorage` e modelo relacional com controle estrito de concorrência.

### 1. Arquitetura & Estrutura
- SPA React 19 + TypeScript 5.7 + Vite 8.
- Máquina de estados com React Hook Form + Zod e Zustand 5.
- Persistência em `sessionStorage` (`aura_booking_draft`).

### 2. Stack Tecnológica
- **Frontend:** React 19, TypeScript, Tailwind CSS v4, React Hook Form 7, Zod 3, Lucide Icons, `date-fns` 4, `qrcode.react`, `canvas-confetti`.
- **Qualidade & Tooling:** Vitest + React Testing Library, Oxlint, Prettier, GitHub Actions CI.
- **Modelagem Relacional:** MySQL 8.4 LTS com restrição `UNIQUE KEY (professional_id, booking_date, start_time)`.

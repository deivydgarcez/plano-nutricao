# Plano Semanal de Nutrição

App PWA pessoal de nutrição e treino semanal, offline-first, instalável na tela inicial do celular. Construído como single-file (`index.html`) sem frameworks ou dependências externas.

**[Abrir o app →](https://deivydgarcez.github.io/plano-nutricao/)**

---

## Funcionalidades

- **Plano diário de refeições** — 7 dias individuais (SEG–DOM) com cardápios distintos por tipo de treino
- **Check de refeições** — marcar cada refeição como concluída; estado separado por dia do calendário
- **Barra de proteína** — progresso diário em tempo real com meta de 140–169 g conforme o dia
- **Contador de água** — registro de copos com meta diária
- **Registro de energia** — avaliação subjetiva do treino (1–5)
- **Modo objetivo** — Corte / Manutenção / Ganho muscular, com ajuste de protocolo
- **Streak de consistência** — contagem de dias consecutivos com meta batida
- **Histórico permanente** — registro automático diário, visões Diário / Semanal / Mensal
- **Gráficos** — 5 charts inline (proteína, peso, água, energia, correlação proteína×energia)
- **Alerta de estagnação** — aviso quando o peso não evolui por 14+ dias
- **Relatório semanal** — resumo automático ao final da semana
- **Lista de compras mensal** — calculada por porção com macros ao tocar
- **Referência nutricional** — macros + vitaminas + minerais por alimento
- **Notificações** — lembretes opcionais nos horários das refeições
- **Sync Google Drive** — backup automático entre dispositivos via appDataFolder
- **Exportar / Importar** — backup manual em `.json` para troca de aparelho
- **Offline-first** — funciona sem internet após o primeiro acesso (Service Worker)
- **Instalável como PWA** — ícone na tela inicial, sem barra do navegador

---

## Stack técnica

| Camada | Tecnologia |
|---|---|
| App | HTML + CSS + JS puro (single-file) |
| Persistência local | `localStorage` |
| Sync em nuvem | Google Drive API (appDataFolder scope) + Google Identity Services |
| Offline | Service Worker (cache-first) |
| Charts | SVG inline (sem biblioteca) |
| Fontes | Anton + DM Sans (Google Fonts) |
| Deploy | GitHub Pages (branch `main`, raiz) |

---

## Estrutura de arquivos

```
index.html          — app completo (HTML + CSS + JS)
service-worker.js   — cache offline
manifest.json       — configuração PWA
icon-192.png        — ícone PWA
icon-512.png        — ícone PWA
PROJETO.md          — documentação técnica detalhada
```

---

## Plano de treino coberto

| Dia | Tipo | Descrição |
|---|---|---|
| SEG | Muay Thai | Aula com professor · academia |
| TER | Força | Em casa · halteres · kettlebell |
| QUA | Muay Thai | Aula com professor · academia |
| QUI | Força | Em casa · halteres · kettlebell |
| SEX | Força | Em casa · halteres · kettlebell |
| SAB | Descanso | — |
| DOM | Descanso | — |

Meta de proteína: **169 g** nos dias de treino · **140 g** nos dias de descanso.

---

## Como atualizar o app

1. Edite `index.html`
2. Incremente a versão do cache em `service-worker.js` (`plano-nutricao-vN` → `vN+1`)
3. Commit e push para `main` — o Pages atualiza em ~1 min

---

## Dados do usuário

Todo o histórico, marcações e configurações ficam no `localStorage` do navegador. O Google Drive é usado como backup opcional entre dispositivos. Nenhum dado é enviado a servidores externos além do próprio Google Drive do usuário.

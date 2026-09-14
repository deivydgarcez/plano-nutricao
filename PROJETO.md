# Plano Nutricional · Recomposição Corporal — Documentação do Projeto

App pessoal de nutrição, single-file (HTML/CSS/JS puro, sem framework),
offline-first, instalável como PWA. Construído iterativamente.

## 1. Contexto do usuário

- Treino noturno: Muay Thai segunda e quarta às 19h30; treino de força
  (halteres + kettlebell na varanda) terça, quinta e sexta às 20h00.
- Acorda ~9h, primeira refeição ~10h.
- **Objetivo: recomposição corporal.** Peso base 82 kg.
- Nutricionista: Priscila Garcia · CRN-31670 · Centro Médico Dom Pedro.
  Plano atualizado em 13/09/2026.
- **Gastrite crônica grau 2.** Esomeprazol 20 mg uso intermitente (a cada 3 dias).

## 2. Metas nutricionais (plano atual)

- **Proteína:** 123 g/dia (1,5g × 82 kg)
- **Calorias:** ~1600 kcal/dia
- **Água:** 2,8 L/dia (35 ml × 82 kg)
- **Creatina:** 5g/dia, afastar da cafeína (~30 min após o café)
- **Refeição livre:** 1x por semana (não penaliza o plano)

## 3. Estrutura das refeições (mesmas todos os dias)

- **Café da manhã** (~10h): Pão francês + ovo + queijo muçarela + banana + café
- **Almoço** (~13h): Arroz + carne magra + feijão + legumes + salada + laranja
- **Lanche** (~16h30): **Op1** iogurte+uva+granola+whey15g / **Op2** pão+minas frescal+maçã+whey10g
- **Jantar** (~20h): **Op1** sanduíche frango / **Op2** hambúrguer caseiro / **Op3** prato completo

Treino de Muay Thai (Seg/Qua 19h30) e Força (Ter/Qui/Sex 20h00) ficam
entre lanche e jantar na timeline.

## 4. Estrutura técnica do app

Single-file `index.html`. Navegação por abas na barra inferior.

### Abas

1. **Refeições** — seletor de dia (SEG–DOM) para marcar por data.
   Refeições são as mesmas todos os dias. Lanche e Jantar têm seletor
   de opção (Op1/Op2/Op3) persistido por dia no localStorage.
   Cada item de refeição tem substituições inline (toque para expandir).
2. **Suplementos** — Esomeprazol, Creatina, Multivitamínico, Whey.
3. **Preparo** — Frango desfiado (panela + micro-ondas) + Hambúrguer caseiro.
4. **Gastrite** — protocolo grau 2 atualizado.
5. **Compras** — lista mensal por categoria com macros por porção.
6. **Regras** — 10 diretrizes do plano.
7. **Nutrição** — referência nutricional por alimento.
8. **Histórico** — registro automático diário com gráficos.

### Objetos de dados principais (no `<script>`)

- `MEALS` — array com 4 refeições fixas. Lanche e Jantar têm `hasOptions:true`
  com sub-arrays `options[]` (cada um com `key`, `label`, `p`, `sum`, `items[]`).
  Cada item pode ter `subs[]` com lista de substituições da nutricionista.
- `PROT_GOAL=123` — meta fixa de proteína.
- `WATER_GOAL=2800` — meta de água em ml.
- `SUPPS`, `GASTRO_ITEMS`, `MONTHLY`, `NUTRI_CATS`, `RULES` — arrays para as seções.

### Persistência (localStorage)

- `plano_checked_week` — checks da semana atual `{ '2025-01-13-0': true }`.
  Chave = `${YYYY-MM-DD}-${mealIndex}`.
- `plano_opts_${YYYY-MM-DD}` — opções selecionadas por dia `{ lanche:'op1', jantar:'op2' }`.
- `plano_hist_v1` — histórico permanente keyed por data `YYYY-MM-DD`.
  Cada entrada: `{ dayType, protein, goal, done, total, meals[], ts }`.

### PWA

`manifest.json` (standalone, tema #F2682C) + `service-worker.js`
(cache-first, versão atual: `plano-nutricao-v18`). Incrementar a cada deploy.

## 5. Design

Tema escuro "atlético". Fonte display: Anton. Texto: DM Sans.
Cor de destaque âmbar (#F2682C), proteína em teal (#3DBF8C),
gastrite em violeta (#9B5ED4). Cor fixa para todos os dias (sem variação por tipo).

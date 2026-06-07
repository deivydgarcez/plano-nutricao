# Plano Semanal de Nutrição — Documentação do Projeto

App pessoal de nutrição e treino, single-file (HTML/CSS/JS puro, sem framework),
offline-first, instalável como PWA. Construído iterativamente. Este documento
registra o contexto e as decisões para quem for continuar o desenvolvimento.

## 1. Contexto do usuário

- Treino noturno: Muay Thai segunda e quarta às 19h30; treino de força
  (halteres + kettlebell na varanda) terça, quinta e sexta às 20h00.
- Acorda ~9h, primeira refeição ~10h.
- Objetivo: recomposição corporal (perder gordura, manter/ganhar músculo),
  peso base 82-83 kg.
- **Gastrite crônica grau 2.** Usa esomeprazol 20 mg a cada 3 dias
  (uso intermitente, mais de 1 ano).
- Divide compras com a esposa, então a lista de mercado distingue o que é
  uso comum da casa.
- Come frango (base), ovo, alcatra ~1x/semana (com palmito), atum/sardinha
  em lata, tilápia 2x/mês (cara). Feijão no almoço de segunda a sexta.

## 2. Regras nutricionais aplicadas (decisões já validadas)

- Proteína ~169 g nos dias de treino, ~140 g nos dias de descanso.
- Carboidrato concentrado em volta do treino.
- Cafeína só até o almoço (meia-vida 5-6h protege o sono profundo / GH).
- Jantar leve nos dias de treino (não deitar com estômago cheio).
- Hidratação 3-4 L/dia (creatina + proteína alta).
- **Gastrite:** tapioca é a base de carbo (digestão limpa, não fermenta);
  pão só se tostado; psyllium foi REMOVIDO (fibra-gel piora gases na mucosa
  inflamada); pré-treino com 60 min fixos de antecedência; evitar refrigerante,
  fritura e gordura pesada à noite.
- Esomeprazol: nos dias de uso, tomar ~9h em jejum, 30-60 min antes do café.
- Lanche da tarde padrão: omelete de frango desfiado (2 ovos + 80 g frango
  desfiado + 1 fatia muçarela). O frango é cozido em lote no domingo
  (panela comum, 30-35 min — o usuário tem receio de panela de pressão).
- Fim de semana: se não jantar, compensar com 1,5 scoops de whey (~30 g) para
  fechar a meta de proteína.
- Suplementos: creatina 3-5 g toda manhã; multivitamínico no almoço;
  whey Soldiers Elite (~25 g) só com água imediatamente pós-treino.

## 3. Estrutura técnica do app

Single-file `index.html`. Todo o conteúdo é renderizado por JS a partir de
objetos de dados no próprio script. Navegação por abas na barra inferior.

### Abas (seções)
1. **Refeições** — seletor de dia no topo (SEG·QUA / TER·SEX / QUINTA / FIM DE SEM).
   Linha do tempo das refeições com horário, resumo curto sempre visível, e
   detalhes ao tocar. Cada refeição tem um círculo de marcar (check).
   O card do jantar do fim de semana tem botão "Não vou jantar hoje" que abre
   o cálculo de compensação via whey.
2. **Suplementos** — tabela de quando/quanto tomar.
3. **Preparo** — passo a passo do frango desfiado (panela e micro-ondas).
4. **Gastrite** — protocolo grau 2 (7 pontos).
5. **Compras** — lista MENSAL calculada só para o usuário (4,3 semanas/mês),
   por categoria, cada item com macros por porção ao tocar.
6. **Regras** — 6 pilares do plano.
7. **Nutrição** — referência nutricional por alimento (macros + vitaminas +
   minerais + nota de contexto), 7 categorias.
8. **Histórico** — registro automático diário, com visões Diário/Semanal/Mensal
   e botões de exportar/importar backup (.json).

### Objetos de dados principais (no <script>)
- `DAYS` — { mt, tf, qui, fds } cada um com label, sub, color, tot (meta de
  proteína) e `meals[]`. Cada meal: t(hora), n(nome), p(proteína), f(comida
  completa), s(suplemento/nota), w(aviso), g(nota gastrite), sum(resumo curto).
  Meals de treino têm `type:'train'`. O jantar de fds tem `skipable:true`,
  `skipProt`, `skipScoops`.
- `SUPPS`, `GASTRO_ITEMS`, `SHOP`(antigo), `MONTHLY`(lista mensal),
  `NUTRI_CATS`, `RULES` — arrays que alimentam as respectivas seções.

### Persistência (localStorage)
- `plano_current_week` — chave ISO da semana atual (ex: `plano-2026-W23`).
- `plano_checked_week` — objeto dos checks da semana atual `{ 'mt-0': true }`.
- `plano_skipped_<weekKey>` — jantares pulados da semana.
- `plano_hist_v1` — HISTÓRICO permanente, objeto keyed por data `YYYY-MM-DD`.
  Cada entrada: { dayType, protein, goal, done, total, meals[], skippedDinner, ts }.

### Reset semanal
Os checks (`plano_checked_week`) resetam automaticamente quando muda a semana
ISO (toda segunda). O HISTÓRICO (`plano_hist_v1`) NUNCA reseta — acumula o ano
todo. `saveToHistory()` é chamado a cada marcação e grava o snapshot do dia.

### PWA
`manifest.json` (standalone, tema #F2682C) + `service-worker.js`
(cache-first, app shell + Google Fonts). Versão do cache em
`const CACHE = 'plano-nutricao-v1'` — INCREMENTAR a cada deploy.

## 4. Design

Tema escuro "combate/atlético". Fonte display: Anton. Fonte texto: DM Sans.
Cor de destaque âmbar/ember (#F2682C), que muda conforme o dia selecionado
(laranja Muay Thai, azul Força, verde Descanso). Proteína em teal (#3DBF8C),
gastrite em violeta (#9B5ED4), avisos em dourado.

## 5. Ideias / direção futura

O usuário pretende reformular e melhorar o app ao longo do tempo. Possíveis
próximos passos sugeridos: campo de peso no histórico para acompanhar tendência;
registro de energia no treino; lembretes; sincronização opcional do backup;
ajuste dinâmico de calorias conforme objetivo (secar mais rápido vs manter).

## 6. Avisos

Este app é uma ferramenta de organização pessoal, não substitui orientação de
nutricionista ou médico, especialmente quanto à gastrite e ao uso de esomeprazol.

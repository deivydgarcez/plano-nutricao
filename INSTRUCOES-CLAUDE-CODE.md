# Instruções para o Claude Code

Estou te passando um projeto pronto (um app PWA de nutrição) que preciso
publicar no GitHub Pages e depois continuar evoluindo. Leia também o arquivo
`PROJETO.md` desta pasta para entender o contexto completo, as decisões já
tomadas e a estrutura técnica antes de mexer em qualquer coisa.

## Tarefa 1 — Publicar no GitHub Pages

Os arquivos do app já estão prontos nesta pasta:
- `index.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`

O que eu preciso que você faça:

1. Confirme que o git está autenticado na minha conta (`git config user.name`,
   `gh auth status` se o GitHub CLI estiver instalado).
2. Crie um repositório público novo chamado `plano-nutricao` (ou me pergunte
   se prefiro outro nome).
3. Faça o commit inicial com TODOS os arquivos desta pasta na raiz do repo
   (não dentro de subpasta, o GitHub Pages serve a partir da raiz).
4. Faça o push para a branch `main`.
5. Ative o GitHub Pages apontando para branch `main`, pasta `/ (root)`.
   Se tiver o GitHub CLI, pode usar a API; senão me diga para ativar na
   interface web em Settings > Pages.
6. Me devolva a URL final (`https://MEU_USUARIO.github.io/plano-nutricao/`).

Não use nenhum token que eu cole no chat. Use a autenticação que já está
configurada na minha máquina.

## Tarefa 2 — Fluxo de atualização (para o futuro)

Sempre que eu te pedir uma alteração no app:
1. Edite o `index.html` (o app é single-file, todo o HTML/CSS/JS está nele).
2. **Incremente a versão do cache** no `service-worker.js`:
   a linha `const CACHE = 'plano-nutricao-v1';` deve virar `v2`, `v3`, etc.
   Isso é OBRIGATÓRIO, senão os celulares continuam servindo a versão antiga
   do cache offline e não veem a mudança.
3. Commit e push para `main`. O Pages atualiza sozinho em 1-2 min.

## Observações importantes

- Os dados do usuário (histórico, marcações) ficam no `localStorage` do
  navegador de cada dispositivo. NÃO migre nem apague isso. Há um botão de
  exportar/importar backup (.json) na aba Histórico para troca de aparelho.
- O app é offline-first via service worker. Teste sempre se ainda abre offline
  depois de mudanças.
- Mantенha o app como single-file (`index.html`). É proposital, facilita o deploy.

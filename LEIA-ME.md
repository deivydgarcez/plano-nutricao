# Plano Semanal de Nutrição — PWA

App de nutrição e treino que funciona offline e pode ser instalado na tela inicial do celular.

## Arquivos
- `index.html` — o app (com PWA já configurado)
- `manifest.json` — define nome, ícone e modo tela cheia
- `service-worker.js` — faz funcionar offline
- `icon-192.png` / `icon-512.png` — ícones do app

## Como publicar no GitHub Pages

1. Cria um repositório novo no GitHub (ex: `plano-nutricao`). Pode ser público.
2. Sobe TODOS os 5 arquivos na raiz do repositório (não dentro de pasta).
   - Pela web: botão "Add file" > "Upload files" > arrasta tudo > Commit.
   - Por git:
     ```
     git init
     git add .
     git commit -m "app de nutricao pwa"
     git branch -M main
     git remote add origin https://github.com/SEU_USUARIO/plano-nutricao.git
     git push -u origin main
     ```
3. No repositório: Settings > Pages.
4. Em "Source" escolhe "Deploy from a branch", branch `main`, pasta `/ (root)`. Salva.
5. Espera 1-2 minutos. A URL aparece no topo da pagina Pages:
   `https://SEU_USUARIO.github.io/plano-nutricao/`

## Como instalar no celular

1. Abre a URL acima no Chrome (Android) ou Safari (iPhone).
2. Android: menu (3 pontos) > "Adicionar à tela inicial" / "Instalar app".
3. iPhone: botão compartilhar > "Adicionar à Tela de Início".
4. Pronto. Abre em tela cheia, sem barra de navegador, funciona offline.

## Importante sobre os dados
- O histórico fica salvo no navegador/dispositivo onde você usa.
- Sempre que precisar trocar de aparelho, usa o botão "Exportar backup"
  na aba Histórico e depois "Importar backup" no novo aparelho.
- Como você vai reformular o app, lembra de subir a nova versão do index.html
  e mudar a versão no service-worker.js (linha `const CACHE = 'plano-nutricao-v1'`
  vira `v2`, `v3`...) pra forçar a atualização nos celulares.

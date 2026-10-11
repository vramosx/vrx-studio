# VRX Studio — site (v3)

Site estático (HTML + CSS + JS puro, sem build) da VRX Studio. Todo o conteúdo do site está em **inglês**; esta documentação está em português.

## Como rodar

Na pasta do site:

```bash
cd vrx-site
python3 -m http.server 4173
```

Abra http://localhost:4173 no navegador.

> Use um servidor local (como acima) em vez de abrir o `index.html` direto pelo arquivo, para os vídeos e a página de projeto (`project.html?slug=...`) funcionarem em todos os navegadores.

Para publicar, basta enviar a pasta inteira para qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3...).

## Estrutura

```
vrx-site/
├── index.html            Home: hero com vídeo (alterna entre os projetos em destaque), projetos em destaque, catálogo com filtros, studio, contato, rodapé
├── project.html          Modelo reutilizável de página de projeto (project.html?slug=<slug>)
├── data/
│   └── projects.js       ★ ÚNICO arquivo de conteúdo: estúdio, categorias e projetos
├── css/style.css         Todo o visual (cores, tipografia, animações, responsivo)
├── js/
│   ├── common.js         Header, rodapé, animações de entrada, vídeos, lightbox
│   ├── home.js           Renderiza a home a partir do data/projects.js
│   └── project.js        Renderiza a página de projeto a partir do data/projects.js
└── assets/
    ├── brand/            Logo (versão com fundo transparente), símbolo, favicon
    ├── fonts/            Space Grotesk e DM Sans (locais, sem depender do Google Fonts)
    └── media/
        ├── side-scroller/   2.5D Side Scroller
        │   ├── video/       Clipes MP4 H.264 para web (sem áudio, em loop) + trailer
        │   ├── img/         Posters, capturas da gameplay e do editor
        │   └── cards/       Cards das habilidades e dos elementos de fase
        └── xcg-advanced/    XCG Advanced (extensão do Chrome)
            ├── video/       hero-loop, card-loop, loops das features + trailer (vídeo promo completo)
            └── img/         Posters, stills da galeria, screenshots da Chrome Web Store, ícone
```

## Como adicionar um novo projeto

1. Crie uma pasta de mídia, por exemplo `assets/media/meu-projeto/`, e coloque nela a capa (jpg/webp, 16:9) e, se quiser, vídeos.
2. Abra `data/projects.js` e, dentro da lista `projects: [ ... ]`, adicione um novo objeto. No final do arquivo há um **modelo comentado** pronto para copiar. Campos principais:
   - `slug` — identificador na URL (`project.html?slug=meu-projeto`), sem espaços.
   - `title`, `code` (ex.: `"PROJECT 002"`), `tagline`, `summary`, `description` (lista de parágrafos), `tags`.
   - `category` — precisa ser o `id` de uma categoria existente (ex.: `"chrome-extensions"`).
   - `status` — `"in-development"`, `"beta"`, `"released"` ou `"concept"`.
   - `featured: true` — coloca o projeto na seção "Featured" (um painel grande por projeto, alternando lado) e no **hero rotativo** da home (o fundo troca entre os projetos em destaque a cada 9 s, com botões 01/02; a rotação pausa com o botão de pausa, com foco no hero e com `prefers-reduced-motion`). A ordem segue a ordem em `projects`.
   - Opcionais: `statusText` (texto do selo, ex.: "Available on Chrome Web Store"), `icon` (ícone quadrado do produto), `cta` (`title`, `text` da faixa final), `disclaimer` (aviso legal no fim da página), `media.cardPoster` (poster do painel em destaque), `media.heroFocus` / `media.heroFocusMobile` (enquadramento do vídeo do hero, ex.: `"18% 50%"`), `media.trailer.label` (ex.: "Promo video") e `media.trailer.youtubeLink` (link "Watch on YouTube" abaixo do player).
   - `cover` e `media` (`heroVideo`, `heroPoster`, `cardVideo`, `trailer`).
   - `links` — botões de ação. Um link com `url: "#"` ou `todo: true` aparece como botão desativado "Soon". `url: "mailto:"` usa o e-mail do estúdio.
   - `specs` — a faixa de informações no hero (Engine, Platform, Status...).
   - `sections` — as seções da página do projeto. Tipos disponíveis:
     - `cards` — grade de cards com imagem (`title`, `meta`, `text`, `image`, `zoom` opcional)
     - `media` — linhas alternadas de vídeo/imagem com texto (`eyebrow`, `title`, `text`, `video` + `poster` **ou** `image`, `bullets`)
     - `tiles` — blocos compactos com miniatura (`title`, `text`, `image`)
     - `gallery` — galeria com lightbox (`src`, `alt`, `caption`)
     - `highlights` — cards de texto numerados (`title`, `meta`, `text`)
     - `steps` — passo a passo numerado (`title`, `text`)
     - `shortcuts` — tabela de atalhos (`action`, `text`, `keyboard: [...]`, `controller: [...]`)
     - `changelog` — histórico de versões (`version`, `label`, `date` opcional, `notes: [...]`)
     - Qualquer seção aceita `navLabel` (texto do link no menu da página).
   - Seções vazias ou omitidas simplesmente não aparecem; o menu da página é gerado automaticamente.
3. Pronto: o projeto aparece no catálogo da home, no filtro da categoria, no rodapé e ganha sua própria página.

## Como adicionar uma nova categoria

Em `data/projects.js`, adicione um item em `categories`:

```js
{ id: "vscode-extensions", label: "VS Code Extensions", code: "VSC", blurb: "Frase curta sobre a categoria." }
```

A ordem da lista é a ordem das abas de filtro. Categorias sem nenhum projeto **não** ganham aba de filtro; aparecem automaticamente na faixa compacta **"On the horizon"** abaixo do catálogo (e como "· soon" no rodapé). Assim que a categoria tiver um projeto, a aba aparece sozinha. Links diretos para uma categoria: `index.html?category=<id>#projects`.

## Trailer e vídeo do hero

- **Trailer:** a versão final **em inglês** do anúncio de 90 s (`ads/2.5d-side-scroller/2.5d-side-scroller-ad-90s-v2.mp4`) foi recomprimida para web (720p H.264 + AAC) em `assets/media/side-scroller/video/trailer.mp4`. Ela abre com som no player (lightbox) pelos botões "Watch trailer" da home e da página do projeto. O campo opcional `note` mostra uma etiqueta no poster (ex.: "PT-BR").
- **Hero:** loop mudo e sem nenhum texto na tela (`hero-loop.mp4`, ~0,4 MB): trechos de escalada (25,0–26,95 s) e planador (34,5–35,9 s) de `gameplay-clean.mp4`, recortados para fora do HUD e das placas, em câmera lenta (0,6x), com crossfade para loop contínuo. Ele é **espelhado** horizontalmente para o personagem ficar à direita, longe do título; o CSS ainda aplica blur leve e um degradê escuro forte à esquerda.
- **Card em destaque:** o mesmo trecho sem espelhar (`feature-loop.mp4`).

Para trocar o trailer (por exemplo, uma versão em inglês ou um novo render):

1. Converta para web:
   ```bash
   ffmpeg -i trailer-final.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart assets/media/side-scroller/video/trailer.mp4
   ```
2. Em `data/projects.js`, no projeto `2-5d-side-scroller`, ajuste `media.trailer` (`src`, `poster`, `duration`, `note`) — ou use `youtube: "ID_DO_VIDEO"`. Com `src: null` e `youtube: null`, a página mostra automaticamente o placeholder "Official trailer — Coming soon".

Para trocar o vídeo de fundo do hero, substitua `media.heroVideo` (vídeo sem áudio, curto, em loop — de preferência ≤ 3 MB).

Para converter novos clipes em loop para web:

```bash
ffmpeg -i clipe.mp4 -vf "fps=30,scale=960:-2" -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -an saida.mp4
ffmpeg -ss 0.8 -i saida.mp4 -frames:v 1 -q:v 4 poster-saida.jpg
```

## XCG Advanced (v3)

- Página: `project.html?slug=xcg-advanced`. Categoria Chrome Extensions (agora com aba de filtro própria; saiu da faixa "On the horizon").
- Links reais: Chrome Web Store (botão "Add to Chrome") e YouTube ("Watch on YouTube", link externo — nenhum iframe de terceiros é carregado).
- Vídeo de origem: o vídeo promo enviado pelo Victor (1:48,7, 1920×1080). Cortes (tempos do vídeo original):
  - `trailer.mp4` — vídeo completo, 720p H.264 CRF 27 + AAC 128k (~15 MB), com som no player.
  - `hero-loop.mp4` — 1:32,3–1:40,3, carro (stream em modo ultrawide, XCG ligado), recortado para só a área do jogo (sem o selo "XCG ON" e sem as barras), loop com crossfade de 1 s.
  - `card-loop.mp4` — 1:03,5–1:11,5, cavalgada em mundo aberto, mesmo recorte (painel em destaque da home).
  - `ultrawide.mp4` — 1:26–1:36, a troca OFF → ON (quadro padrão com barras pretas → tela cheia com Ambient Light).
  - `filters.mp4` — 0:09–0:17, comparação dividida OFF / ON dos filtros.
  - `sidebar.mp4` — 0:17–0:25 e `adjustments.mp4` — 0:26–0:34,5: recorte 1280×720 do lado direito (barra lateral em tamanho real, sem a legenda "Better ultrawide support").
  - `ambient.mp4` — 0:39,5–0:47,8, Ambient Light (mantém a legenda do vídeo "Immersive ambient lighting").
  - Stills da galeria em resolução original: 0:14,5, 0:20,5, 0:36,5, 0:44, 1:06, 1:24, 1:35,5.
- Da Chrome Web Store (baixados por curl): ícone 128 px (`icon.png`) e os 5 screenshots oficiais 1280×800 (2 deles estão na galeria como `store-*.webp`).
- Atenção: a loja mostra a versão como **1.0.3** e o texto oficial diz **1.03** — o site usa "1.03" como pedido. A loja também mostra nota/avaliações e "Offers in-app purchases"; nada disso foi colocado no site (sem notas, números ou preços).

## Mídia da v2 (origem)

- Clipes da seção Gameplay: recortados de `gameplay-clean.mp4` (gravação sem cursor) com crop 1200×675 a partir de (540,95), que tira o HUD de progresso e a caixa de instruções do PlayStation. Ficam só as placas da própria fase (ex.: "05 PARKOUR").
- Prévia na cena: recortada de `editor-parkour.mp4` (sem painéis nem cursor).
- Capturas do editor: recortes na resolução original dos screenshots (`setup-structure`, `inspector`, `parkour-movements`), sem cursor.
- Ilustrações das habilidades: o fundo cinza (#464646) foi removido por color-key e virou transparência, então elas ficam sobre o fundo azul-marinho dos cards.

## Placeholders a preencher (busque por `TODO` em `data/projects.js`)

- `studio.email` — hoje é `hello@vrxstudio.example` (fictício).
- `studio.socials` — URLs de YouTube, X, GitHub, Discord (os que ficarem com `"#"` não aparecem; sem nenhum, o rodapé simplesmente não mostra redes).
- Link da **Unity Asset Store** e da **Documentação** do 2.5D Side Scroller (hoje aparecem como "Soon").
- Data/informação de lançamento (`specs` → "Release: Coming soon").

## Acessibilidade e movimento

- Respeita `prefers-reduced-motion`: sem animações de entrada, sem autoplay de vídeos, marquee parado.
- Vídeos de fundo são mudos, tocam só quando visíveis e o hero tem botão de pausar.
- Navegação por teclado, link "Skip to content", lightbox com ESC / setas / foco preso.
- Layout responsivo do celular (390 px) ao desktop largo.

## Créditos de mídia

Clipes, cards e capturas do 2.5D Side Scroller vieram da pasta do anúncio (`ads/2.5d-side-scroller`), copiados e recomprimidos — nada foi alterado na pasta original. A mídia do XCG Advanced veio do vídeo promo do Victor e da página da Chrome Web Store; as imagens de jogos (Forza Horizon 5, Hogwarts Legacy) aparecem só como demonstração dentro do vídeo/screenshots, sem uso como marca. Nenhum logo Xbox é usado como identidade visual. Fontes Space Grotesk e DM Sans sob licença SIL Open Font License.

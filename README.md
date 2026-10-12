# Пласт — Oekraïense Scouts in Nederland

Вебсайт Пласту в Нідерландах на Jekyll із власним адаптивним дизайном.
Зовнішня тема, Bootstrap та Font Awesome не використовуються.

## Локальний запуск

Потрібні Ruby 3.3 і Bundler (версію зафіксовано в `Gemfile.lock`).

```sh
bundle install
bundle exec jekyll serve --livereload
```

Відкрий http://localhost:4000. Збережені зміни перебудовують сторінки;
після змін `_config.yml` потрібно перезапустити сервер.

## Сторінки та контент

| Адреса | Файл | Контент |
| --- | --- | --- |
| `/` | `index.md`, `_layouts/home.html` | Головна, вступ, посилання на сторінки |
| `/about/` | `about.html` | Про нас і місія з `_data/sitetext.yml` |
| `/activities/` | `activities.html` | Сходини, табори, вишколи з `_data/activities.yml` |
| `/oseredky/` | `groups.html` | Мапа, міста з `_data/groups.yml`, приєднання |
| `/contacts/` | `contacts.html` | Адреса, пошта та Facebook з `_data/sitetext.yml` |
| `/404.html` | `404.html` | Сторінка помилки в спільному дизайні |

- `_layouts/site.html` — спільний каркас, метадані та підключення CSS/JS.
- `_includes/` — навігація, секції, футер та іконки.
- `_data/navigation.yml` — пункти меню.
- `assets/css/site.css` — кольори, компоненти та адаптивні стилі всіх сторінок.
- `assets/js/site.js` — мобільне меню, копіювання контактів, «Нагору» та вибір міста.
- `_config.yml` — налаштування збірки, назва сайту та логотип.

Розмір логотипа: 96 px на комп’ютері, 64 px на екранах до 992 px.
Копіювання показує «Скопійовано»; кнопки з листами відкривають поштову програму.
Вибір міста додає його назву до теми листа. Посилання на мапі та список міст
ведуть до блоку приєднання і без JavaScript.

## Зображення

- `assets/img/plast-nl-logo.svg` — емблема Пласту на круглому прапорі Нідерландів;
  зовнішній фон прозорий. Емблема походить із Wikimedia Commons.
- `assets/img/hero.jpg` — фото ватри (Wikimedia Commons).
- `assets/img/facebook-logo.png` — офіційний логотип із
  [Meta Brand Resource Center](https://www.meta.com/en-gb/brand/resources/facebook/logo/).
- `assets/img/apple-touch-icon.png` — іконка для додавання сайту на головний екран.

Щоб змінити фото головної сторінки, заміни `hero.jpg` або шлях у `_includes/hero.html`.

### Мапа осередків

`_includes/netherlands-map.svg` містить межі 12 провінцій і позначки центрів
Гааги, Ейндговена, Амстердама та Роттердама. Це не адреси проведення сходин.
Дані меж: [Provincie Noord-Brabant, CC0 1.0](https://data.overheid.nl/dataset/73476-provinciegrenzen-nederland--gegeneraliseerd-vlak-bestand),
[GeoJSON](https://atlas.brabant.nl/data_download/geojson/96d6f95c-7e7a-48af-aba2-090c814a425f.zip), EPSG:28992.

## Перевірка та деплой

```sh
bundle exec jekyll build
node --check assets/js/site.js
git diff --check
```

GitHub Actions збирає й публікує сайт у GitHub Pages після push до `main`.
`CNAME` задає домен `plast-nl.org`. Для URL виду `https://user.github.io/repo/`
задай `baseurl: "/repo"`; для власного домену залиш порожнім.

Внутрішні файли `AGENTS.md`, `README.md`, `output/`, `tmp/` і залежності
не потрапляють у збірку сайту. Друкований посібник зберігається в `output/pdf/`.

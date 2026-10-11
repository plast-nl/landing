# Пласт — Oekraïense Scouts in Nederland

Лендінг української скаутської організації Пласт у Нідерландах.
Побудований на Jekyll. Головна сторінка має власний адаптивний дизайн
із зеленими акцентами; [Agency Jekyll Theme](https://github.com/raviriley/agency-jekyll-theme)
залишається підключеною як `remote_theme` для допоміжних сторінок.

## Локальний запуск

```sh
bundle install
bundle exec jekyll serve
```

Сайт буде доступний за адресою http://localhost:4000.

## Структура контенту

- `_data/sitetext.yml` — увесь текст сторінки (герой, «Про нас», «Місія», «Контакти»).
- `_data/navigation.yml` — пункти меню.
- `_data/style.yml` — налаштування Agency theme; кольори головної сторінки задаються в `assets/css/home.css`.
- `_layouts/home.html` — HTML-структура головної сторінки.
- `_includes/` — навігація, головний банер, секції та футер.
- `assets/css/home.css` — власні стилі головної сторінки та мобільна адаптація.
- `assets/js/home.js` — відкриття та закриття мобільного меню.
- Розмір логотипа: 96 px на комп’ютері, 64 px на екранах до 992 px.
- `_config.yml` — загальні налаштування та email для контактної форми.

## Деплой на GitHub Pages

1. Залийте репозиторій на GitHub.
2. У `_config.yml` за потреби вкажіть `baseurl: "/<назва-репозиторію>"`
   (для адреси виду `https://<user>.github.io/<repo>/`). Для власного домену
   або root-сайту залиште `url` та `baseurl` порожніми.
3. У налаштуваннях репозиторію увімкніть GitHub Pages (гілка `main`, GitHub Actions).

## Зображення

- `assets/img/plast-logo.svg` — емблема Пласту (Wikimedia Commons).
- `assets/img/plast-nl-logo.svg` — емблема на круглому прапорі Нідерландів із прозорим зовнішнім фоном.
- `assets/img/hero.jpg` — фонове фото героя (Wikimedia Commons).

Щоб замінити фото героя, поклади свій файл у `assets/img/` під назвою `hero.jpg`
або онови шлях у `_includes/hero.html`.

## Контакти на сайті

- Facebook: https://www.facebook.com/plastnederland
- Email: plast.org.netherlands@gmail.com
- Адреса: Waterleliegracht 152, 1051 PE Amsterdam

Секція «Контакти» показує лише адресу, пошту та Facebook (без форми).
Щоб змінити — редагуй блок `contact` у `_data/sitetext.yml`.

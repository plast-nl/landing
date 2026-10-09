# Пласт — Oekraïense Scouts in Nederland

Лендінг української скаутської організації Пласт у Нідерландах.
Побудований на [Agency Jekyll Theme](https://github.com/raviriley/agency-jekyll-theme)
(підключений як `remote_theme`).

## Локальний запуск

```sh
bundle install
bundle exec jekyll serve
```

Сайт буде доступний за адресою http://localhost:4000.

## Структура контенту

- `_data/sitetext.yml` — увесь текст сторінки (герой, «Про нас», «Місія», «Контакти»).
- `_data/navigation.yml` — пункти меню.
- `_data/style.yml` — кольори та фонові зображення.
- `_layouts/home.html` — локальне перевизначення, показує лише потрібні секції.
- `_config.yml` — загальні налаштування та email для контактної форми.

## Деплой на GitHub Pages

1. Залийте репозиторій на GitHub.
2. У `_config.yml` за потреби вкажіть `baseurl: "/<назва-репозиторію>"`
   (для адреси виду `https://<user>.github.io/<repo>/`). Для власного домену
   або root-сайту залиште `url` та `baseurl` порожніми.
3. У налаштуваннях репозиторію увімкніть GitHub Pages (гілка `main`, GitHub Actions).

## Зображення

- `assets/img/plast-logo.svg` — емблема Пласту (Wikimedia Commons).
- `assets/img/hero.jpg` — фонове фото героя (Wikimedia Commons).

Щоб замінити фото героя, поклади свій файл у `assets/img/` і онови
`header-image` у `_data/style.yml`.

## Контакти на сайті

- Facebook: https://www.facebook.com/plastnederland
- Email: plast.org.netherlands@gmail.com
- Адреса: Waterleliegracht 152, 1051 PE Amsterdam

Секція «Контакти» показує лише адресу, пошту та Facebook (без форми).
Щоб змінити — редагуй блок `contact` у `_data/sitetext.yml`.

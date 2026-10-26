# 932402.Bayramov.Zaur.lab6
# Лабораторная работа №6. Введение в Node.js и базовый сервер на Express

**Вариант:** 14. Тема: «Генератор цитат» (случайная цитата)

## Цель работы
Освоить запуск Node.js-приложений, работу с модулями, создание HTTP-сервера на Express и превращение статического сайта в PWA (устанавливаемое приложение с офлайн-режимом).

## Стек
Node.js, Express, npm, HTML/CSS/JS, Web App Manifest, Service Worker.

## Запуск
```bash
npm install
npm start
```
Приложение будет доступно по адресу http://localhost:3000

## Структура проекта
```
├─ server.js          сервер Express и маршруты
├─ package.json
└─ public/            статические файлы
   ├─ index.html      главная страница
   ├─ about.html      страница «О себе»
   ├─ style.css
   ├─ script.js       клиентская логика и регистрация service worker
   ├─ manifest.json   манифест PWA
   ├─ sw.js           service worker
   └─ icons/          иконки 192x192 и 512x512
```

## Маршруты

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/` | главная страница |
| GET | `/about` | страница «О себе» |
| GET | `/api/status` | JSON со статусом сервера |
| GET | `/api/quote` | случайная цитата из всех |
| GET | `/api/quote?lang=en` | случайная цитата на выбранном языке |
| GET | `/api/quote/:id` | цитата по индексу (параметр маршрута) |

### Формат ответа `/api/quote`
```json
{ "text": "Talk is cheap. Show me the code.", "author": "Linus Torvalds", "lang": "en" }
```

### Ошибки
Если цитат нет (например, `?lang=xx`), сервер отвечает кодом **500**:
```json
{ "error": "No quotes available" }
```

## Реализация

**Сервер.** Статика отдаётся через `express.static('public')`. Query-параметр `lang` читается из `req.query` и фильтрует массив цитат. Параметр `id` читается из `req.params`.

**PWA.**
- `manifest.json` подключён в `<head>` страниц, содержит имя, `start_url`, `display: standalone`, цвета и иконки 192 и 512 px.
- `sw.js` при установке кеширует статику, при активации удаляет старые версии кеша, на запросы статики отвечает из кеша, при отсутствии файла в кеше обращается к сети.
- Service worker регистрируется в `script.js`.

**Офлайн-режим.** Статические файлы отдаются из кеша. Запросы к `/api/quote` без сети не проходят, поэтому клиент использует запасной массив цитат из `script.js` и помечает такие цитаты как «Офлайн».

## Скриншоты

### Главная страница
<img width="1439" height="911" alt="image" src="https://github.com/user-attachments/assets/77638a1d-7c28-48fe-ad05-8a99ba0d4aa8" />


### Ответ `/api/quote?lang=en`
<img width="1439" height="148" alt="api-quote" src="https://github.com/user-attachments/assets/181782cf-38fa-4882-8025-a42e4203b598" />


### Ошибка 500
<img width="1439" height="144" alt="api-error" src="https://github.com/user-attachments/assets/f7d28daf-788d-48be-8f7b-68932fb26cf9" />


### Манифест
<img width="1438" height="913" alt="manifest" src="https://github.com/user-attachments/assets/fdec4ef7-1df4-4d0c-98db-79290e3f4535" />


### Service worker
<img width="1439" height="912" alt="service-worker" src="https://github.com/user-attachments/assets/c93149d7-b89c-45c1-9262-8b927ac016cd" />


### Работа офлайн
<img width="1439" height="910" alt="offline" src="https://github.com/user-attachments/assets/47ae05b8-1635-4ce5-90d5-c10ef7a970b8" />


## Результат
- проект инициализирован, зависимости установлены
- сервер запускается, все маршруты работают
- статика отдаётся корректно
- query-параметры обрабатываются
- манифест подключён, приложение устанавливается
- service worker зарегистрирован, приложение работает офлайн

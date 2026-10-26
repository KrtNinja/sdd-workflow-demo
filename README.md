# SDD workflow demo

Живой пример Spec-Driven Development для команды: как одна фраза продукта
**«Добавьте контекстный поиск по сайту с горячими клавишами»** превращается
в Dev Spec, вертикальные slices с разбивкой на фронтенд и бэкенд, контракты и OpenSpec Change.

По мотивам доклада Игоря Антонова «Spec-Driven Backend с Claude» (HolyJS 2026), с доработками под нашу команду.

**Кликабельная схема:** откройте `index.html` (или GitHub Pages этого репозитория).
По клику на блок открывается соответствующий файл.

## Процесс

1. **Brainstorming** — агент задаёт вопросы, решает человек. Фронтовые и серверные вопросы обязательно.
2. **Dev Spec** — только поведение: FR/NFR с ID и примерами на данных. Никакого кода. *Checkpoint 1.*
3. **Slices** — вертикальная нарезка, приёмка WHEN/THEN с AC-ID, review-slices. *Checkpoint 2.*
4. **Slice 001 — контракты в коде**: openapi, порты, fixtures. Ревьюят фронт и бэк вместе.
5. **Реализация** — разработчик берёт slice и делает свой Change: `/opsx:propose <id> по <файл slice>` → `/opsx:apply`.
6. **Проверка фичи** — e2e на собранном приложении.
7. **Мерж** — Change удаляется, остаются спека, slices, контракты и тесты с AC-ID.

## Где что лежит

| Что | Где | Живёт |
|---|---|---|
| Правила проекта | [AGENTS.md](AGENTS.md) | постоянно |
| Протокол решений | [docs/site-search/brainstorming.md](docs/site-search/brainstorming.md) | постоянно |
| Бизнес-поведение | [docs/site-search/spec.md](docs/site-search/spec.md) | постоянно |
| Технические решения | [docs/adr/](docs/adr/) | постоянно |
| План и приёмка | [docs/site-search/slices/](docs/site-search/slices/README.md) | постоянно |
| Контракты | [contracts/](contracts/search.openapi.yaml) | постоянно, источник правды |
| Change | `openspec/changes/` → [образец](examples/openspec-change-003-hotkeys/README.md) | удаляется перед мержем |

## Правила AC

- `AC-NNN-k` — общая приёмка slice (поведение для пользователя, на собранном приложении)
- `AC-NNN-Bk` / `AC-NNN-Fk` — приёмка backend- / frontend-половины, каждая закрывает свой PR
- AC описывает наблюдаемое поведение на границе своей половины. Без моков, «без N+1», имён классов
- Контракты — ссылками на файлы. Изменение контракта объявляется в шапке slice
- Чего нет в Dev Spec — в «Открытые вопросы», а не в догадку агента

## Как обновить страницу

После правки любого `.md`/`.yaml`:

```bash
node scripts/build.mjs   # пересобирает assets/content.js
```

Страница работает и как локальный файл, и на GitHub Pages
(Settings → Pages → Deploy from branch → `main` / root).

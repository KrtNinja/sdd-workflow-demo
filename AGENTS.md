# AGENTS.md

Постоянные правила проекта. Агент читает этот файл в каждой сессии.
Здесь нет ничего про конкретную фичу — только то, что верно для всего репозитория.

## Проект
- Frontend: React + TypeScript, тесты Vitest + Testing Library, e2e Playwright
- Backend: Node.js + TypeScript + Express, PostgreSQL, Clean Architecture
- Команды: `npm run typecheck` | `npm test` | `npm run lint` | `npm run e2e`

## Архитектура backend
- presentation → application → domain
- domain не зависит от Express и PostgreSQL
- use cases работают с данными только через порты (`application/ports`)
- в контроллерах нет бизнес-правил, только маппинг HTTP ↔ use case
- модуль не читает таблицы другого модуля напрямую — только через его порт или сервис

## Архитектура frontend
- `features/<name>/` — UI и хуки фичи; `shared/` — переиспользуемое
- глобальные клавиатурные обработчики только через `shared/hotkeys`
- сетевые запросы только через `shared/api`, без fetch в компонентах
- бизнес-правила сервера не дублируются на клиенте (сортировка, фильтрация выдачи)

## Где что лежит
| Что | Где | Живёт |
|---|---|---|
| Бизнес-поведение | `docs/<feature>/spec.md` | постоянно |
| Работы и приёмка | `docs/<feature>/slices/` | постоянно |
| Технические решения | `docs/adr/` | постоянно |
| Контракты | `contracts/`, `src/**/application/ports`, `tests/fixtures` | постоянно, источник правды |
| План реализации slice | `openspec/changes/<id>/` | удаляется перед мержем |

## Тестирование
- Frontend-половина slice проверяется на ответах, сгенерированных из `contracts/*.openapi.yaml`
- Backend-половина — на тестовом PostgreSQL с данными из `tests/fixtures`
- Название теста начинается с AC-ID: `AC-008-1 наличие важнее продаж`
- Общая приёмка slice — Playwright на собранном приложении

## Процесс
- Работаем только по одобренному slice. Нет slice — нет кода.
- Перед реализацией: `/opsx:propose <id>` с файлом slice на входе, затем `/opsx:apply`
- Change не вводит нового поведения: каждый сценарий ссылается на AC-ID или помечен как технический
- Неясность в требованиях → вопрос человеку, а не догадка. Ответ сначала попадает в Dev Spec и slice
- Перед завершением: typecheck, test, lint, сверка со slice
- Перед мержем: решения из Change → ADR или описание PR, найденные ловушки кода → этот файл,
  папка Change удаляется. `/opsx:archive` не запускаем

## Известные ловушки кодовой базы
- `shared/hotkeys/useGlobalShortcut` используется корзиной (Esc). Любое изменение — проверить регрессию корзины
- Остатки хранятся по складам (`warehouse_stock`); читать только через `StockService` модуля заказов

## Why
Slice 003 — открыть поиск с клавиатуры. Вход: `docs/site-search/slices/003-hotkeys.md`
(AC-003-1 … AC-003-8).

## What Changes
- `useGlobalShortcut`: сопоставление по физической клавише и модификатор Mod
  (Cmd на macOS, Ctrl на остальных)
- `isTypingTarget()`: input, textarea, contenteditable
- SearchPanel: регистрация Mod+K и «/» с вызовом `open()`
- хоткеи выключены при ширине < 768 px и при открытом модальном диалоге

## Impact
- `shared/hotkeys` — используется корзиной, нужна регрессия Esc
- `features/search/SearchPanel.tsx` — только вызов `open()`, разметку списка не трогаем (граница с 004)
- Backend не затрагивается

# project structure

```
creative-workspace/
├─ .editorconfig
├─ .gitignore
├─ .npmrc
├─ .prettierignore
├─ .prettierrc
├─ README.md
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
├─ tsconfig.base.json
├─ eslint.config.js
├─ vitest.workspace.ts
├─ docker-compose.yml
├─ .env.example
├─ .env.local.example
│
├─ apps/
│  ├─ desktop/
│  │  ├─ package.json
│  │  ├─ index.html
│  │  ├─ vite.config.ts
│  │  ├─ tsconfig.json
│  │  ├─ public/
│  │  │  ├─ tauri-icon.png
│  │  │  └─ favicon.svg
│  │  ├─ src/
│  │  │  ├─ main.tsx
│  │  │  ├─ App.tsx
│  │  │  ├─ styles/
│  │  │  │  └─ globals.css
│  │  │  ├─ routes/
│  │  │  │  ├─ index.tsx
│  │  │  │  ├─ dashboard.tsx
│  │  │  │  ├─ writing.tsx
│  │  │  │  ├─ notes.tsx
│  │  │  │  ├─ tasks.tsx
│  │  │  │  ├─ ai.tsx
│  │  │  │  └─ settings.tsx
│  │  │  ├─ components/
│  │  │  │  ├─ layout/
│  │  │  │  │  ├─ AppShell.tsx
│  │  │  │  │  ├─ Sidebar.tsx
│  │  │  │  │  ├─ TopBar.tsx
│  │  │  │  │  └─ RightPanel.tsx
│  │  │  │  ├─ writing/
│  │  │  │  │  ├─ WritingEditor.tsx
│  │  │  │  │  ├─ SuggestionPanel.tsx
│  │  │  │  │  ├─ Toolbar.tsx
│  │  │  │  │  ├─ LinkDialog.tsx
│  │  │  │  │  └─ ColorPicker.tsx
│  │  │  │  ├─ notes/
│  │  │  │  │  ├─ NoteCard.tsx
│  │  │  │  │  ├─ NoteList.tsx
│  │  │  │  │  ├─ NoteFilters.tsx
│  │  │  │  │  └─ NoteEditor.tsx
│  │  │  │  ├─ tasks/
│  │  │  │  │  ├─ TaskCard.tsx
│  │  │  │  │  ├─ TaskList.tsx
│  │  │  │  │  ├─ TaskFilters.tsx
│  │  │  │  │  └─ TaskComposer.tsx
│  │  │  │  ├─ ai/
│  │  │  │  │  ├─ AIChatPanel.tsx
│  │  │  │  │  ├─ AIQuickActions.tsx
│  │  │  │  │  └─ AIContextSummary.tsx
│  │  │  │  ├─ common/
│  │  │  │  │  ├─ Button.tsx
│  │  │  │  │  ├─ Card.tsx
│  │  │  │  │  ├─ Modal.tsx
│  │  │  │  │  ├─ Badge.tsx
│  │  │  │  │  ├─ Tabs.tsx
│  │  │  │  │  ├─ Input.tsx
│  │  │  │  │  ├─ Select.tsx
│  │  │  │  │  └─ Spinner.tsx
│  │  │  ├─ hooks/
│  │  │  │  ├─ useWorkspace.ts
│  │  │  │  ├─ useTheme.ts
│  │  │  │  ├─ useDebounce.ts
│  │  │  │  ├─ useLocalSync.ts
│  │  │  │  └─ useHotkeys.ts
│  │  │  ├─ store/
│  │  │  │  ├─ workspace.store.ts
│  │  │  │  ├─ ui.store.ts
│  │  │  │  ├─ notes.store.ts
│  │  │  │  ├─ tasks.store.ts
│  │  │  │  └─ ai.store.ts
│  │  │  ├─ services/
│  │  │  │  ├─ api.ts
│  │  │  │  ├─ sync.ts
│  │  │  │  ├─ storage.ts
│  │  │  │  ├─ editor.ts
│  │  │  │  └─ ai.ts
│  │  │  ├─ lib/
│  │  │  │  ├─ constants.ts
│  │  │  │  ├─ formatters.ts
│  │  │  │  ├─ validators.ts
│  │  │  │  └─ utils.ts
│  │  │  └─ tauri/
│  │  │     ├─ commands.ts
│  │  │     ├─ events.ts
│  │  │     └─ capabilities.ts
│  │  └─ src-tauri/
│  │     ├─ Cargo.toml
│  │     ├─ tauri.conf.json
│  │     ├─ build.rs
│  │     ├─ capabilities/
│  │     │  └─ default.json
│  │     ├─ icons/
│  │     │  ├─ 32x32.png
│  │     │  ├─ 128x128.png
│  │     │  ├─ 128x128@2x.png
│  │     │  ├─ icon.icns
│  │     │  └─ icon.ico
│  │     └─ src/
│  │        ├─ main.rs
│  │        ├─ lib.rs
│  │        ├─ state.rs
│  │        ├─ commands.rs
│  │        ├─ events.rs
│  │        ├─ error.rs
│  │        └─ runtime/
│  │           ├─ mod.rs
│  │           ├─ app_paths.rs
│  │           ├─ file_ops.rs
│  │           └─ window.rs
│  │
│  ├─ web/
│  │  ├─ package.json
│  │  ├─ index.html
│  │  ├─ vite.config.ts
│  │  ├─ tsconfig.json
│  │  ├─ public/
│  │  │  ├─ favicon.svg
│  │  │  └─ manifest.webmanifest
│  │  └─ src/
│  │     ├─ main.tsx
│  │     ├─ App.tsx
│  │     ├─ styles/
│  │     │  └─ globals.css
│  │     ├─ routes/
│  │     │  ├─ index.tsx
│  │     │  ├─ dashboard.tsx
│  │     │  ├─ writing.tsx
│  │     │  ├─ notes.tsx
│  │     │  ├─ tasks.tsx
│  │     │  ├─ ai.tsx
│  │     │  └─ settings.tsx
│  │     ├─ components/
│  │     │  ├─ layout/
│  │     │  │  ├─ AppShell.tsx
│  │     │  │  ├─ Sidebar.tsx
│  │     │  │  ├─ TopBar.tsx
│  │     │  │  └─ RightPanel.tsx
│  │     │  ├─ writing/
│  │     │  ├─ notes/
│  │     │  ├─ tasks/
│  │     │  ├─ ai/
│  │     │  └─ common/
│  │     ├─ hooks/
│  │     │  ├─ useWorkspace.ts
│  │     │  ├─ useTheme.ts
│  │     │  └─ useDebounce.ts
│  │     ├─ store/
│  │     │  ├─ workspace.store.ts
│  │     │  ├─ ui.store.ts
│  │     │  ├─ notes.store.ts
│  │     │  ├─ tasks.store.ts
│  │     │  └─ ai.store.ts
│  │     ├─ services/
│  │     │  ├─ api.ts
│  │     │  ├─ sync.ts
│  │     │  ├─ storage.ts
│  │     │  └─ ai.ts
│  │     └─ lib/
│  │        ├─ constants.ts
│  │        ├─ formatters.ts
│  │        └─ utils.ts
│  │
│  └─ server/
│     ├─ package.json
│     ├─ tsconfig.json
│     ├─ vite.config.ts
│     ├─ public/
│     │  └─ health.txt
│     └─ src/
│        ├─ index.ts
│        ├─ app.ts
│        ├─ env.ts
│        ├─ config/
│        │  ├─ cors.ts
│        │  ├─ db.ts
│        │  ├─ logger.ts
│        │  └─ auth.ts
│        ├─ routes/
│        │  ├─ index.ts
│        │  ├─ health.route.ts
│        │  ├─ auth.route.ts
│        │  ├─ documents.route.ts
│        │  ├─ notes.route.ts
│        │  ├─ tasks.route.ts
│        │  ├─ ai.route.ts
│        │  ├─ sync.route.ts
│        │  └─ attachments.route.ts
│        ├─ controllers/
│        │  ├─ auth.controller.ts
│        │  ├─ documents.controller.ts
│        │  ├─ notes.controller.ts
│        │  ├─ tasks.controller.ts
│        │  ├─ ai.controller.ts
│        │  ├─ sync.controller.ts
│        │  └─ attachments.controller.ts
│        ├─ services/
│        │  ├─ auth.service.ts
│        │  ├─ documents.service.ts
│        │  ├─ notes.service.ts
│        │  ├─ tasks.service.ts
│        │  ├─ ai.service.ts
│        │  ├─ sync.service.ts
│        │  └─ attachments.service.ts
│        ├─ repositories/
│        │  ├─ user.repository.ts
│        │  ├─ documents.repository.ts
│        │  ├─ notes.repository.ts
│        │  ├─ tasks.repository.ts
│        │  ├─ attachments.repository.ts
│        │  └─ sync.repository.ts
│        ├─ middlewares/
│        │  ├─ auth.middleware.ts
│        │  ├─ error.middleware.ts
│        │  ├─ validate.middleware.ts
│        │  └─ rateLimit.middleware.ts
│        ├─ schemas/
│        │  ├─ auth.schema.ts
│        │  ├─ document.schema.ts
│        │  ├─ note.schema.ts
│        │  ├─ task.schema.ts
│        │  ├─ ai.schema.ts
│        │  ├─ sync.schema.ts
│        │  └─ attachment.schema.ts
│        ├─ utils/
│        │  ├─ errors.ts
│        │  ├─ dates.ts
│        │  ├─ pagination.ts
│        │  └─ ids.ts
│        └─ db/
│           ├─ migrations/
│           │  ├─ 0001_init.sql
│           │  ├─ 0002_documents.sql
│           │  ├─ 0003_notes.sql
│           │  ├─ 0004_tasks.sql
│           │  ├─ 0005_attachments.sql
│           │  └─ 0006_sync.sql
│           ├─ seed/
│           │  └─ seed.ts
│           └─ client.ts
│
├─ packages/
│  ├─ contracts/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  ├─ openapi/
│  │  │  ├─ openapi.yaml
│  │  │  ├─ openapi.json
│  │  │  └─ README.md
│  │  ├─ schemas/
│  │  │  ├─ auth/
│  │  │  │  ├─ login.schema.json
│  │  │  │  ├─ register.schema.json
│  │  │  │  ├─ refresh.schema.json
│  │  │  │  └─ user.schema.json
│  │  │  ├─ documents/
│  │  │  │  ├─ document.schema.json
│  │  │  │  ├─ create-document.schema.json
│  │  │  │  └─ update-document.schema.json
│  │  │  ├─ notes/
│  │  │  │  ├─ note.schema.json
│  │  │  │  ├─ create-note.schema.json
│  │  │  │  └─ update-note.schema.json
│  │  │  ├─ tasks/
│  │  │  │  ├─ task.schema.json
│  │  │  │  ├─ create-task.schema.json
│  │  │  │  └─ update-task.schema.json
│  │  │  ├─ ai/
│  │  │  │  ├─ chat.schema.json
│  │  │  │  ├─ analyze-text.schema.json
│  │  │  │  ├─ summarize.schema.json
│  │  │  │  └─ generate-task.schema.json
│  │  │  ├─ sync/
│  │  │  │  ├─ push.schema.json
│  │  │  │  └─ pull.schema.json
│  │  │  └─ attachments/
│  │  │     ├─ attachment.schema.json
│  │  │     └─ upload.schema.json
│  │  ├─ generated/
│  │  │  ├─ types.ts
│  │  │  ├─ validators.ts
│  │  │  └─ index.ts
│  │  ├─ src/
│  │  │  ├─ index.ts
│  │  │  ├─ types.ts
│  │  │  └─ constants.ts
│  │  └─ scripts/
│  │     ├─ generate-types.ts
│  │     └─ generate-openapi.ts
│  │
│  ├─ shared/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  └─ src/
│  │     ├─ index.ts
│  │     ├─ types/
│  │     │  ├─ common.ts
│  │     │  ├─ theme.ts
│  │     │  ├─ workspace.ts
│  │     │  └─ ids.ts
│  │     ├─ utils/
│  │     │  ├─ date.ts
│  │     │  ├─ text.ts
│  │     │  ├─ debounce.ts
│  │     │  └─ sort.ts
│  │     └─ constants/
│  │        ├─ themes.ts
│  │        ├─ routes.ts
│  │        └─ storage.ts
│  │
│  ├─ ui/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  └─ src/
│  │     ├─ index.ts
│  │     ├─ components/
│  │     │  ├─ Button.tsx
│  │     │  ├─ Card.tsx
│  │     │  ├─ Modal.tsx
│  │     │  ├─ Badge.tsx
│  │     │  ├─ Tabs.tsx
│  │     │  ├─ Input.tsx
│  │     │  ├─ Select.tsx
│  │     │  ├─ Sidebar.tsx
│  │     │  ├─ TopBar.tsx
│  │     │  └─ EmptyState.tsx
│  │     ├─ writing/
│  │     │  ├─ EditorFrame.tsx
│  │     │  ├─ EditorToolbar.tsx
│  │     │  ├─ HighlightMark.tsx
│  │     │  └─ SuggestionCard.tsx
│  │     ├─ notes/
│  │     │  ├─ NoteCard.tsx
│  │     │  └─ NoteGrid.tsx
│  │     ├─ tasks/
│  │     │  ├─ TaskCard.tsx
│  │     │  └─ TaskList.tsx
│  │     ├─ ai/
│  │     │  ├─ ChatBox.tsx
│  │     │  └─ QuickAction.tsx
│  │     └─ styles/
│  │        ├─ tokens.css
│  │        └─ globals.css
│  │
│  ├─ api-client/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  └─ src/
│  │     ├─ index.ts
│  │     ├─ client.ts
│  │     ├─ auth.ts
│  │     ├─ documents.ts
│  │     ├─ notes.ts
│  │     ├─ tasks.ts
│  │     ├─ ai.ts
│  │     ├─ sync.ts
│  │     ├─ attachments.ts
│  │     └─ types.ts
│  │
│  └─ storage/
│     ├─ package.json
│     ├─ tsconfig.json
│     └─ src/
│        ├─ index.ts
│        ├─ adapters/
│        │  ├─ browser.adapter.ts
│        │  ├─ tauri.adapter.ts
│        │  ├─ sqlite.adapter.ts
│        │  └─ memory.adapter.ts
│        ├─ repositories/
│        │  ├─ document.repo.ts
│        │  ├─ note.repo.ts
│        │  ├─ task.repo.ts
│        │  └─ sync.repo.ts
│        ├─ queue/
│        │  ├─ sync-queue.ts
│        │  └─ conflict-resolver.ts
│        ├─ cache/
│        │  ├─ cache.ts
│        │  └─ keys.ts
│        └─ utils/
│           ├─ serializer.ts
│           └─ migration.ts
│
├─ tooling/
│  ├─ scripts/
│  │  ├─ validate-openapi.ts
│  │  ├─ generate-types.ts
│  │  ├─ generate-client.ts
│  │  └─ sync-contracts.ts
│  └─ generators/
│     ├─ new-module.ts
│     └─ new-schema.ts
│
├─ docs/
│  ├─ architecture/
│  │  ├─ overview.md
│  │  ├─ data-flow.md
│  │  ├─ sync-strategy.md
│  │  ├─ offline-first.md
│  │  └─ folder-structure.md
│  ├─ api/
│  │  ├─ openapi.md
│  │  ├─ auth.md
│  │  ├─ documents.md
│  │  ├─ notes.md
│  │  ├─ tasks.md
│  │  ├─ ai.md
│  │  └─ sync.md
│  ├─ product/
│  │  ├─ user-flows.md
│  │  ├─ ux-principles.md
│  │  └─ feature-roadmap.md
│  └─ development/
│     ├─ local-setup.md
│     ├─ testing.md
│     └─ deployment.md
│
└─ .github/
   └─ workflows/
      ├─ ci.yml
      ├─ lint.yml
      ├─ test.yml
      └─ release.yml
```
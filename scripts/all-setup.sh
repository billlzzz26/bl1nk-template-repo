#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="creative-workspace"

echo "==> Creating project: $PROJECT_NAME"
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

echo "==> Initializing root files"

cat > package.json <<'EOF'
{
  "name": "creative-workspace",
  "private": true,
  "packageManager": "pnpm@9.0.0",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "format": "prettier . --write",
    "setup": "tsx tooling/scripts/setup-env.ts",
    "codegen": "pnpm --filter @cw/contracts run codegen",
    "codegen:watch": "pnpm --filter @cw/contracts run codegen",
    "validate:openapi": "pnpm --filter @cw/contracts run validate:openapi"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "eslint": "^9.15.0",
    "prettier": "^3.4.2",
    "turbo": "^2.3.3",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
EOF

cat > pnpm-workspace.yaml <<'EOF'
packages:
  - "apps/*"
  - "packages/*"
  - "tooling/*"
EOF

cat > turbo.json <<'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "dev": { "cache": false },
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**", "build/**", ".output/**"] },
    "test": { "dependsOn": ["^build"], "outputs": [] },
    "lint": {},
    "typecheck": {}
  }
}
EOF

cat > tsconfig.base.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": []
  }
}
EOF

cat > .gitignore <<'EOF'
node_modules
dist
build
.output
.env
.env.local
.DS_Store
coverage
*.log
apps/desktop/src-tauri/target
EOF

cat > .editorconfig <<'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
EOF

cat > .prettierrc <<'EOF'
{
  "semi": true,
  "singleQuote": false
}
EOF

cat > .prettierignore <<'EOF'
node_modules
dist
build
.output
coverage
EOF

cat > .npmrc <<'EOF'
auto-install-peers=true
fund=false
EOF

cat > .env.example <<'EOF'
NODE_ENV=development
APP_URL=http://localhost:3000
WEB_URL=http://localhost:3000
API_URL=http://localhost:8787

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
R2_PUBLIC_URL=

DATABASE_URL=
CRATEDB_URL=
CRATEDB_TOKEN=

AI_PROVIDER_MODE=bring-your-own-key
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GEMINI_API_KEY=
OPENCODE_API_KEY=

VERCEL_PROJECT_ID=
VERCEL_ORG_ID=
VERCEL_ANALYTICS_ID=

GITHUB_APP_ID=
GITHUB_APP_PRIVATE_KEY=
GITHUB_APP_CLIENT_ID=
GITHUB_APP_CLIENT_SECRET=

ENABLE_TEAM_DASHBOARD=true
ENABLE_GITHUB_APP=true
ENABLE_SYNC=true
EOF

cat > .env.local.example <<'EOF'
BETTER_AUTH_SECRET=change-me
APP_URL=http://localhost:3000
EOF

cat > README.md <<'EOF'
# Creative Workspace

Monorepo for Desktop (Tauri 2), Web (React 19 + Vite), Server (Hono on Vercel), and shared packages.
EOF

echo "==> Creating folders"

mkdir -p apps/{desktop,web,server}
mkdir -p packages/{contracts,shared,ui,api-client,storage}
mkdir -p tooling/{scripts,generators}
mkdir -p docs/{architecture,api,product,development}
mkdir -p .github/workflows

mkdir -p packages/contracts/{openapi,schemas/{auth,documents,notes,tasks,ai,sync,attachments,teams,dashboard,github},generated,src,scripts}
mkdir -p packages/shared/src/{types,utils,constants}
mkdir -p packages/ui/src/{components/{layout,common},writing,notes,tasks,ai,team,charts,styles}
mkdir -p packages/api-client/src
mkdir -p packages/storage/src/{adapters,repositories,queue,cache,utils}

mkdir -p apps/desktop/src/{styles,routes,components/{layout,writing,notes,tasks,ai,common},hooks,store,services,lib,tauri}
mkdir -p apps/desktop/src-tauri/{capabilities,icons,src,runtime}
mkdir -p apps/web/src/{styles,routes,components/{layout,writing,notes,tasks,ai,common},hooks,store,services,lib}
mkdir -p apps/server/src/{config,routes,controllers,services,repositories,middlewares,schemas,utils,db/{migrations,seed}}

echo "==> Creating files"

touch apps/desktop/{package.json,index.html,vite.config.ts,tsconfig.json}
touch apps/web/{package.json,index.html,vite.config.ts,tsconfig.json}
touch apps/server/{package.json,tsconfig.json}

touch apps/desktop/src/{main.tsx,App.tsx}
touch apps/web/src/{main.tsx,App.tsx}
touch apps/server/src/{index.ts,app.ts,env.ts}

touch apps/desktop/src/styles/globals.css
touch apps/web/src/styles/globals.css

touch apps/desktop/src/routes/{index.tsx,dashboard.tsx,writing.tsx,notes.tsx,tasks.tsx,ai.tsx,settings.tsx}
touch apps/web/src/routes/{index.tsx,dashboard.tsx,writing.tsx,notes.tsx,tasks.tsx,ai.tsx,settings.tsx}

touch apps/desktop/src/components/layout/{AppShell.tsx,Sidebar.tsx,TopBar.tsx,RightPanel.tsx}
touch apps/web/src/components/layout/{AppShell.tsx,Sidebar.tsx,TopBar.tsx,RightPanel.tsx}

touch apps/desktop/src/components/writing/{WritingEditor.tsx,SuggestionPanel.tsx,Toolbar.tsx,LinkDialog.tsx,ColorPicker.tsx}
touch apps/web/src/components/writing/{WritingEditor.tsx,SuggestionPanel.tsx,Toolbar.tsx,LinkDialog.tsx,ColorPicker.tsx}

touch apps/desktop/src/components/notes/{NoteCard.tsx,NoteList.tsx,NoteFilters.tsx,NoteEditor.tsx}
touch apps/web/src/components/notes/{NoteCard.tsx,NoteList.tsx,NoteFilters.tsx,NoteEditor.tsx}

touch apps/desktop/src/components/tasks/{TaskCard.tsx,TaskList.tsx,TaskFilters.tsx,TaskComposer.tsx}
touch apps/web/src/components/tasks/{TaskCard.tsx,TaskList.tsx,TaskFilters.tsx,TaskComposer.tsx}

touch apps/desktop/src/components/ai/{AIChatPanel.tsx,AIQuickActions.tsx,AIContextSummary.tsx}
touch apps/web/src/components/ai/{AIChatPanel.tsx,AIQuickActions.tsx,AIContextSummary.tsx}

touch apps/desktop/src/components/common/{Button.tsx,Card.tsx,Modal.tsx,Badge.tsx,Tabs.tsx,Input.tsx,Select.tsx,Spinner.tsx}
touch apps/web/src/components/common/{Button.tsx,Card.tsx,Modal.tsx,Badge.tsx,Tabs.tsx,Input.tsx,Select.tsx,Spinner.tsx}

touch apps/desktop/src/hooks/{useWorkspace.ts,useTheme.ts,useDebounce.ts,useLocalSync.ts,useHotkeys.ts}
touch apps/web/src/hooks/{useWorkspace.ts,useTheme.ts,useDebounce.ts}

touch apps/desktop/src/store/{workspace.store.ts,ui.store.ts,notes.store.ts,tasks.store.ts,ai.store.ts}
touch apps/web/src/store/{workspace.store.ts,ui.store.ts,notes.store.ts,tasks.store.ts,ai.store.ts}

touch apps/desktop/src/services/{api.ts,sync.ts,storage.ts,editor.ts,ai.ts}
touch apps/web/src/services/{api.ts,sync.ts,storage.ts,ai.ts}

touch apps/desktop/src/lib/{constants.ts,formatters.ts,validators.ts,utils.ts}
touch apps/web/src/lib/{constants.ts,formatters.ts,utils.ts}

touch apps/desktop/src/tauri/{commands.ts,events.ts,capabilities.ts}
touch apps/desktop/src-tauri/{Cargo.toml,tauri.conf.json,build.rs}
touch apps/desktop/src-tauri/capabilities/default.json
touch apps/desktop/src-tauri/src/{main.rs,lib.rs,state.rs,commands.rs,events.rs,error.rs}
touch apps/desktop/src-tauri/src/runtime/{mod.rs,app_paths.ts,file_ops.ts,window.rs}

touch apps/server/src/config/{cors.ts,db.ts,logger.ts,auth.ts}
touch apps/server/src/routes/{index.ts,health.route.ts,auth.route.ts,documents.route.ts,notes.route.ts,tasks.route.ts,ai.route.ts,sync.route.ts,attachments.route.ts,teams.route.ts,dashboard.route.ts,github.route.ts}
touch apps/server/src/controllers/{auth.controller.ts,documents.controller.ts,notes.controller.ts,tasks.controller.ts,ai.controller.ts,sync.controller.ts,attachments.controller.ts,teams.controller.ts,dashboard.controller.ts,github.controller.ts}
touch apps/server/src/services/{auth.service.ts,documents.service.ts,notes.service.ts,tasks.service.ts,ai.service.ts,sync.service.ts,attachments.service.ts,teams.service.ts,dashboard.service.ts,github.service.ts}
touch apps/server/src/repositories/{user.repository.ts,documents.repository.ts,notes.repository.ts,tasks.repository.ts,attachments.repository.ts,sync.repository.ts,teams.repository.ts}
touch apps/server/src/middlewares/{auth.middleware.ts,error.middleware.ts,validate.middleware.ts,rateLimit.middleware.ts}
touch apps/server/src/schemas/{auth.schema.ts,document.schema.ts,note.schema.ts,task.schema.ts,ai.schema.ts,sync.schema.ts,attachment.schema.ts,team.schema.ts,dashboard.schema.ts,github.schema.ts}
touch apps/server/src/utils/{errors.ts,dates.ts,pagination.ts,ids.ts,permissions.ts}
touch apps/server/src/db/client.ts
touch apps/server/src/db/seed/seed.ts
touch apps/server/src/db/migrations/{0001_init.sql,0002_documents.sql,0003_notes.sql,0004_tasks.sql,0005_attachments.sql,0006_sync.sql,0007_teams.sql,0008_audit.sql}

touch packages/contracts/{package.json,tsconfig.json}
touch packages/contracts/openapi/{openapi.yaml,openapi.json,README.md}
touch packages/contracts/generated/{types.ts,validators.ts,index.ts}
touch packages/contracts/src/{index.ts,types.ts,constants.ts}
touch packages/contracts/scripts/{generate-types.ts,generate-openapi.ts,validate-openapi.ts,generate-client.ts}

touch packages/shared/{package.json,tsconfig.json}
touch packages/shared/src/{index.ts}
touch packages/shared/src/types/{common.ts,theme.ts,workspace.ts,ids.ts,team.ts,provider.ts}
touch packages/shared/src/utils/{date.ts,text.ts,debounce.ts,sort.ts}
touch packages/shared/src/constants/{themes.ts,routes.ts,storage.ts,ai.ts}

touch packages/ui/{package.json,tsconfig.json}
touch packages/ui/src/{index.ts}
touch packages/ui/src/components/common/{Button.tsx,Card.tsx,Modal.tsx,Badge.tsx,Tabs.tsx,Input.tsx,Select.tsx,Spinner.tsx,Avatar.tsx,Dropdown.tsx}
touch packages/ui/src/components/layout/{AppShell.tsx,Sidebar.tsx,TopBar.tsx,RightPanel.tsx}
touch packages/ui/src/writing/{EditorFrame.tsx,EditorToolbar.tsx,HighlightMark.tsx,SuggestionCard.tsx}
touch packages/ui/src/notes/{NoteCard.tsx,NoteGrid.tsx}
touch packages/ui/src/tasks/{TaskCard.tsx,TaskList.tsx}
touch packages/ui/src/ai/{ChatBox.tsx,QuickAction.tsx}
touch packages/ui/src/team/{TeamDashboard.tsx,MemberList.tsx,InviteDialog.tsx}
touch packages/ui/src/charts/{MetricCard.tsx,OverviewChart.tsx}
touch packages/ui/src/styles/{tokens.css,globals.css}

touch packages/api-client/{package.json,tsconfig.json}
touch packages/api-client/src/{index.ts,client.ts,auth.ts,documents.ts,notes.ts,tasks.ts,ai.ts,sync.ts,attachments.ts,teams.ts,dashboard.ts,github.ts,types.ts}

touch packages/storage/{package.json,tsconfig.json}
touch packages/storage/src/{index.ts}
touch packages/storage/src/adapters/{browser.adapter.ts,tauri.adapter.ts,sqlite.adapter.ts,memory.adapter.ts}
touch packages/storage/src/repositories/{document.repo.ts,note.repo.ts,task.repo.ts,sync.repo.ts,team.repo.ts}
touch packages/storage/src/queue/{sync-queue.ts,conflict-resolver.ts}
touch packages/storage/src/cache/{cache.ts,keys.ts}
touch packages/storage/src/utils/{serializer.ts,migration.ts}

touch tooling/scripts/{validate-openapi.ts,generate-types.ts,generate-client.ts,sync-contracts.ts,setup-env.ts}
touch tooling/generators/{new-module.ts,new-schema.ts}

touch docs/architecture/{overview.md,data-flow.md,sync-strategy.md,offline-first.md,folder-structure.md}
touch docs/api/{openapi.md,auth.md,documents.md,notes.md,tasks.md,ai.md,sync.md,teams.md,dashboard.md,github.md}
touch docs/product/{user-flows.md,ux-principles.md,feature-roadmap.md}
touch docs/development/{local-setup.md,testing.md,deployment.md}

touch .github/workflows/{ci.yml,lint.yml,test.yml,release.yml,vercel-preview.yml,tauri-release.yml}

echo "==> Writing package manifests"

cat > packages/contracts/package.json <<'EOF'
{
  "name": "@cw/contracts",
  "private": true,
  "type": "module",
  "scripts": {
    "validate:openapi": "tsx scripts/validate-openapi.ts",
    "generate:types": "tsx scripts/generate-types.ts",
    "generate:client": "tsx scripts/generate-client.ts",
    "generate:openapi": "tsx scripts/generate-openapi.ts",
    "codegen": "pnpm validate:openapi && pnpm generate:types && pnpm generate:client"
  }
}
EOF

cat > apps/web/package.json <<'EOF'
{
  "name": "@cw/web",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
EOF

cat > apps/desktop/package.json <<'EOF'
{
  "name": "@cw/desktop",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
EOF

cat > apps/server/package.json <<'EOF'
{
  "name": "@cw/server",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc -p tsconfig.json",
    "test": "vitest",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
EOF

cat > packages/shared/package.json <<'EOF'
{
  "name": "@cw/shared",
  "private": true,
  "type": "module"
}
EOF

cat > packages/ui/package.json <<'EOF'
{
  "name": "@cw/ui",
  "private": true,
  "type": "module"
}
EOF

cat > packages/api-client/package.json <<'EOF'
{
  "name": "@cw/api-client",
  "private": true,
  "type": "module"
}
EOF

cat > packages/storage/package.json <<'EOF'
{
  "name": "@cw/storage",
  "private": true,
  "type": "module"
}
EOF

cat > tooling/scripts/setup-env.ts <<'EOF'
import { existsSync, writeFileSync } from "fs";

for (const file of [".env.example", ".env.local.example"]) {
  if (!existsSync(file)) writeFileSync(file, "");
}

console.log("Environment files are ready.");
EOF

cat > tooling/scripts/generate-from-openapi.ts <<'EOF'
import { execSync } from "child_process";

execSync("pnpm --filter @cw/contracts run validate:openapi", { stdio: "inherit" });
execSync("pnpm --filter @cw/contracts run generate:types", { stdio: "inherit" });
execSync("pnpm --filter @cw/contracts run generate:client", { stdio: "inherit" });

console.log("OpenAPI codegen complete.");
EOF

echo "==> Creating OpenAPI codegen stubs"

cat > packages/contracts/scripts/validate-openapi.ts <<'EOF'
console.log("Validating openapi.yaml...");
EOF

cat > packages/contracts/scripts/generate-types.ts <<'EOF'
console.log("Generating types from openapi.yaml...");
EOF

cat > packages/contracts/scripts/generate-client.ts <<'EOF'
console.log("Generating API client from openapi.yaml...");
EOF

cat > packages/contracts/scripts/generate-openapi.ts <<'EOF'
console.log("Generating openapi.json from openapi.yaml...");
EOF

echo "==> Auto-run setup and codegen"

pnpm install

pnpm --filter @cw/contracts run codegen

echo "==> Done."
echo "Project is ready for framework implementation."

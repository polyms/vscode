# Polyms for Visual Studio Code

Polyms includes the **Polyms color theme**, **file icon theme**, editor language support, and a curated extension pack. It also provides [AI Kit](https://ai-kit.polyms.dev) as a remote MCP server for VS Code's Copilot Chat.

## AI Kit MCP

After installing Polyms, open **Chat** in VS Code. VS Code can discover the **AI Kit** MCP server from the extension, so you do not need to create or edit `.vscode/mcp.json` manually.

- MCP URL: `https://ai-kit.polyms.dev/mcp` (Streamable HTTP).
- Authentication: VS Code handles the server's OAuth sign-in and consent when prompted; installing the extension does not sign you in automatically.
- MCP tools: AI Kit exposes knowledge retrieval and skill-pack discovery/retrieval, subject to your account's access.
- Turn the integration off in Settings using **Polyms: AI Kit MCP: Enabled** (`polyms.aiKitMcp.enabled`). Changes update the registered server definitions without restarting VS Code.

This registration is for the VS Code extension host and supported Copilot sessions. It does not configure standalone Cursor, Claude Code, or Copilot CLI installations, nor does it automatically install AI Kit's native Agent Skills.

## Building

Requires Node.js 26.x and the pnpm version pinned in `package.json` (`packageManager`).

```sh
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build
pnpm run package
```

`build` runs TypeScript's no-emit type check before bundling with esbuild. `package` repeats the validated build before creating a VSIX.

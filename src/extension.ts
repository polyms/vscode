import * as vscode from 'vscode'

const MCP_PROVIDER_ID = 'polyms.aiKit'
const MCP_ENDPOINT = 'https://ai-kit.polyms.dev/mcp'
const MCP_ENABLED_SETTING = 'polyms.aiKitMcp.enabled'

export function activate(context: vscode.ExtensionContext): void {
  const definitionsChanged = new vscode.EventEmitter<void>()

  context.subscriptions.push(
    definitionsChanged,
    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration(MCP_ENABLED_SETTING)) {
        definitionsChanged.fire()
      }
    }),
    vscode.lm.registerMcpServerDefinitionProvider(MCP_PROVIDER_ID, {
      onDidChangeMcpServerDefinitions: definitionsChanged.event,
      provideMcpServerDefinitions: () => {
        const enabled = vscode.workspace.getConfiguration('polyms.aiKitMcp').get<boolean>('enabled', true)
        if (!enabled) {
          return []
        }

        return [
          new vscode.McpHttpServerDefinition('AI Kit', vscode.Uri.parse(MCP_ENDPOINT)),
        ]
      },
    })
  )
}

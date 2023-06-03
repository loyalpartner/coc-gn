import {services, ExtensionContext, LanguageClient, workspace, TransportKind} from 'coc.nvim'
import path from 'path'

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration("gn")
  const serverPath = path.join('build', 'server.js')

  const module = config.lscmd || context.asAbsolutePath(serverPath)

  const baseOptions = {
    module, ipc: TransportKind.ipc,
    options: {
      execArgv: config.execArgv || []
    },
  }
  const serverOptions = {
    run: baseOptions,
    debug: {...baseOptions, runtime: 'node'},
  }
  const clientOptions = {
    documentSelector: [{language: 'gn'}],
  }

  const client = new LanguageClient(
    'GN Language Server',
    serverOptions, clientOptions
  )

  context.subscriptions.push(services.registLanguageClient(client))
}

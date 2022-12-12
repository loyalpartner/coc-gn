import { services, ExtensionContext, LanguageClient, workspace, ServerOptions, TransportKind } from 'coc.nvim';
import path from 'path';

export async function activate(context: ExtensionContext): Promise<void> {
  const executable = context.asAbsolutePath(path.join('build', 'server.js'));

  const config = workspace.getConfiguration('gn');
  const client = new LanguageClient(
    'GN',
    'GN language server',
    {
      run: {
        module: executable,
        transport: TransportKind.ipc,
        options: {
          cwd: workspace.root,
          execArgv: config.execArgv || [],
        },
      },
    } as ServerOptions,
    {
      documentSelector: ['gn', 'gni'],
      initializationOptions: config,
    }
  );

  context.subscriptions.push(services.registLanguageClient(client));
}

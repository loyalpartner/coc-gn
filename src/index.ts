import { services, ExtensionContext, LanguageClient, workspace, ServerOptions } from 'coc.nvim';
import path from 'path';

export async function activate(context: ExtensionContext): Promise<void> {
  const executable = context.asAbsolutePath(path.join('build', 'server.js'));

  const config = workspace.getConfiguration('gn');
  const client = new LanguageClient(
    'gn',
    'gn',
    {
      run: { module: executable },
    } as ServerOptions,
    {
      documentSelector: ['gn'],
      initializationOptions: config,
    }
  );

  context.subscriptions.push(services.registLanguageClient(client));
}

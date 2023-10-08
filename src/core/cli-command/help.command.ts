import { CliCommandInterface } from './cli-command.interface';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        ${chalk.bold('Программа для подготовки данных для REST API сервера.')}
        ${chalk.bold('Пример:')}
            ${chalk.green('npm run ts main.cli.ts --<command> [--arguments]')}
        ${chalk.bold('Команды:')} ${chalk.green(`
          --version:                   # выводит номер версии
          --help:                      # печатает этот текст
          --import <path>:             # импортирует данные из TSV`)}\`
        `);
  }
}

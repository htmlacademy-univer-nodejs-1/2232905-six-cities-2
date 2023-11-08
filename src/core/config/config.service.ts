import { ConfigInterface } from './config.interface.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {configSchema, ConfigSchema} from './config.schema.js';
import {inject, injectable} from 'inversify';
import {config} from 'dotenv';
import {Component} from '../../types/component.enum.js';


@injectable()
export default class ConfigService implements ConfigInterface<ConfigSchema> {
  private readonly config: ConfigSchema;

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    const configOutput = config();

    if (configOutput.error) {
      throw new Error('Error when read .env');
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configSchema.getProperties();
    this.logger.info('.env successfully find');
  }

  public get<T extends keyof ConfigSchema>(key: T): ConfigSchema[T] {
    return this.config[key];
  }
}

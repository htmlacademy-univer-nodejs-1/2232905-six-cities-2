import {LoggerInterface} from '../core/logger/logger.interface.js';
import {inject, injectable} from 'inversify';
import {ConfigInterface} from '../core/config/config.interface.js';
import {ConfigSchema} from '../core/config/config.schema.js';
import {Component} from '../types/component.enum.js';


@injectable()
export default class RestApplication {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface<ConfigSchema>,
  ) {}

  public async init() {
    this.logger.info('App init...');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST: ${this.config.get('DB_HOST')}`);
    this.logger.info(`SALT: ${this.config.get('SALT')}`);
  }
}

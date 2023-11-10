import {LoggerInterface} from '../core/logger/logger.interface.js';
import {inject, injectable} from 'inversify';
import {ConfigInterface} from '../core/config/config.interface.js';
import {ConfigSchema} from '../core/config/config.schema.js';
import {Component} from '../types/component.enum.js';
import {DBClientInterface} from '../core/db-client/db-client.interface';
import {getMongoURI} from '../core/helpers/db';


@injectable()
export default class RestApplication {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface<ConfigSchema>,
    @inject(Component.DBClientInterface) private readonly dbClient: DBClientInterface
  ) {}

  public async init() {
    this.logger.info('App init...');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST: ${this.config.get('DB_HOST')}`);
    this.logger.info(`SALT: ${this.config.get('SALT')}`);

    this.logger.info('DB init');
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.dbClient.connect(mongoUri);
    this.logger.info('DB initialized');
  }
}

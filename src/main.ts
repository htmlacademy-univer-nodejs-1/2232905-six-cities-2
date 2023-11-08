import 'reflect-metadata';
import {Container} from 'inversify';
import {Component} from './types/component.enum.js';
import {LoggerInterface} from './core/logger/logger.interface.js';
import {ConfigInterface} from './core/config/config.interface.js';
import ConfigService from './core/config/config.service.js';
import PinoService from './core/logger/pino.service.js';
import {ConfigSchema} from './core/config/config.schema.js';
import RestApplication from './app/rest-application.js';


const container = new Container();
container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
container.bind<LoggerInterface>(Component.LoggerInterface).to(PinoService).inSingletonScope();
container.bind<ConfigInterface<ConfigSchema>>(Component.ConfigInterface).to(ConfigService).inSingletonScope();

const application = container.get<RestApplication>(Component.RestApplication);
await application.init();

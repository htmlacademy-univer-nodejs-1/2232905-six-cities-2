import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
}

export const configSchema = convict<ConfigSchema>({
  PORT: {
    doc: 'Application server port',
    format: 'port',
    env: 'PORT',
    default: 8000
  },
  SALT: {
    doc: 'Salt for hash passwords',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'Database ip-address',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  }
});

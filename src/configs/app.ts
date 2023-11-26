import {getEnv} from '.';

export const AppConfigs = {
  APP_NAME: getEnv('APP_NAME'),
  SERVER_PORT: getEnv('SERVER_PORT'),
  APP_ROUTE: getEnv('APP_ROUTE'),
};

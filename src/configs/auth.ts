import {getEnv} from '.';
import WebSecurity from '@tawol-tech/tinnie/middlewares/WebSecurity';

export const AuthConfigs = {
  TOKEN_KEY: getEnv('TOKEN_KEY'),
  TOKEN_EXPIRATION_TIME: getEnv('TOKEN_EXPIRATION_TIME'),
  REFRESH_TOKEN_EXPIRATION_TIME: getEnv('REFRESH_TOKEN_EXPIRATION_TIME'),
  TOKEN_HEADER_KEY: getEnv('TOKEN_HEADER_KEY'),
  COOKIE_KEY: getEnv('COOKIE_KEY'),
  COOKIE_PARSER_KEY: getEnv('COOKIE_PARSER_KEY'),
};

const WHITELIST_PATHS = [
  '/*/register', '/*/login', '/*/logout',
  '/*/lov/*',
];
export const webSecurity = new WebSecurity(
    WHITELIST_PATHS,
    AuthConfigs.TOKEN_KEY,
    AuthConfigs.COOKIE_KEY);

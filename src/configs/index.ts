import dotenv from 'dotenv';
if (process.env.NODE_ENV) {
  dotenv.config({path: `${process.env.NODE_ENV}.env`});
} else {
  dotenv.config();
}

export const getEnv = (name: string, defaultValue = '') => {
  return process.env[name] || defaultValue;
};


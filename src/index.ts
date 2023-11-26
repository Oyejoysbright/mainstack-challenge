import http from 'http';
import App from './app';
import {AppConfigs} from './configs/app';
import {connectDB} from './configs/db';
import {LogService} from '@tawol-tech/tinnie/log/LogService';
import {getEnv} from './configs';

( async () => {
  if ( await connectDB()) {
    const port = process.env.PORT || AppConfigs.SERVER_PORT;
    http.createServer(App).listen(port, () => {
      LogService.info(
          `🚀 Server ready at port ::${port} with context path ::${AppConfigs.APP_ROUTE}
          ALLOWED ORIGIN :::: ${getEnv('ALLOWED_ORIGINS').split(',')}`);
    });
  } else {
    LogService.info('Database conection failed.');
  }
})();

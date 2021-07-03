import app from './app';

import './database';
import { initilaizeSetup } from './utils/initialize-setup';

async function main() {
  await initilaizeSetup();
  app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
  });
}

main();

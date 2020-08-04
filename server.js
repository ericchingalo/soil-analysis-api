const shelljs = require('shelljs');

startServer();

async function startServer() {
  command = `npm run start:prod`;
  shelljs.exec(command);
}

const shelljs = require('shelljs');

startServer();

async function startServer() {
  command = `npm run build && npm run start:prod`;
  shelljs.exec(command);
}

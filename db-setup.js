const shelljs = require('shelljs');
const pathTypeOrmConfig = 'ormconfig.json';
try {
  const fileResponse = shelljs.cat(pathTypeOrmConfig);
  const fileContents = fileResponse.stdout;
  const typOrmConfig = JSON.parse(fileContents);
  if (typeof typOrmConfig === 'object' && !Array.isArray(typOrmConfig)) {
    const database = typOrmConfig.database || '';
    const username = typOrmConfig.username || '';
    const password = typOrmConfig.password || '';
    const command = `./db-setup.sh ${username} ${password} ${database}`;
    shelljs.exec(command);
  }
} catch (error) {
  console.log(error);
}

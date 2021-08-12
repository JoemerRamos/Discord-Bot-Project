const { execSync } = require('child_process');

if (process.platform !== 'win32') {
    const output = execSync('npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH', { encoding: 'utf-8' }); // the default is 'buffer'
    console.log('Output was:\n', output);
}

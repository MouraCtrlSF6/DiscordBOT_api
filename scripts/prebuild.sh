#! /bin/sh
npm install
fuser -k 3000/tcp
node ./shell/migrationService/index.js runAll